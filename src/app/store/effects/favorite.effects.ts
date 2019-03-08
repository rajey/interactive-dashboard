import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, from, of } from 'rxjs';
import { tap, withLatestFrom, mergeMap, map, catchError } from 'rxjs/operators';

import { State } from '../reducers';
import {
  FavoriteActionTypes,
  LoadFavoriteAction,
  AddFavoriteAction,
  LoadFavoriteFailAction
} from '../actions/favorite.actions';
import {
  FavoriteService,
  ErrorMessage,
  DashboardPreferences
} from 'src/app/core';
import { getDashboardPreferences } from '../selectors';

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
            map((favorite: any) => new AddFavoriteAction(favorite)),
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
