import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import {
  DashboardPreferences,
  ErrorMessage,
  FavoriteService,
  getVisualizationLayersFromFavorite
} from 'src/app/core';

import { UpdateDashboardItemAction } from '../actions/dashboard-item.actions';
import {
  AddFavoriteAction,
  FavoriteActionTypes,
  LoadFavoriteAction,
  LoadFavoriteFailAction
} from '../actions/favorite.actions';
import { State } from '../reducers';
import { getDashboardPreferences } from '../selectors';
import { LoadAnalyticsAction } from '../actions/analytics.actions';

@Injectable()
export class FavoriteEffects {
  @Effect()
  loadfavorite$: Observable<any> = this.actions$.pipe(
    ofType(FavoriteActionTypes.LoadFavorite),
    withLatestFrom(this.store.select(getDashboardPreferences)),
    mergeMap(
      ([action, dashboardPreferences]: [
        LoadFavoriteAction,
        DashboardPreferences
      ]) => {
        if (!action.favoriteId && action.favoriteType) {
          return of(new AddFavoriteAction(null));
        }

        return this.favoriteService
          .get(action.favoriteId, action.favoriteType, dashboardPreferences)
          .pipe(
            mergeMap((favorite: any) => [
              new AddFavoriteAction(favorite),
              new LoadAnalyticsAction(
                getVisualizationLayersFromFavorite(favorite),
                action.dashboardItemId
              )
            ]),
            catchError((error: ErrorMessage) =>
              of(new LoadFavoriteFailAction(error, action.favoriteId))
            )
          );
      }
    )
  );
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private favoriteService: FavoriteService
  ) {}
}
