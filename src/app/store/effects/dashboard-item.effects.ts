import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import {
  DashboardItem,
  DashboardItemService,
  ErrorMessage
} from 'src/app/core';

import {
  AddDashboardItemAction,
  DashboardItemActionTypes,
  InitializeDashboardItemsAction,
  LoadDashboardItemAction,
  LoadDashboardItemFailAction
} from '../actions/dashboard-item.actions';
import { LoadFavoriteAction } from '../actions/favorite.actions';
import { State } from '../reducers';
import { getAllDashboardItems } from '../selectors';

@Injectable()
export class DashboardItemEffects {
  @Effect()
  initializeDashboardItems$: Observable<any> = this.actions$.pipe(
    ofType(DashboardItemActionTypes.InitializeDashboardItems),
    withLatestFrom(this.store.select(getAllDashboardItems)),
    mergeMap(
      ([action, dashboardItems]: [
        InitializeDashboardItemsAction,
        DashboardItem[]
      ]) => {
        return from(
          _.filter(
            action.dashboardItems,
            dashboardItem => !_.find(dashboardItems, ['id', dashboardItem.id])
          )
        ).pipe(
          map(
            (dashboardItem: DashboardItem) =>
              new LoadDashboardItemAction(dashboardItem)
          )
        );
      }
    )
  );

  @Effect()
  loadDashboardItem$: Observable<any> = this.actions$.pipe(
    ofType(DashboardItemActionTypes.LoadDashboardItem),
    mergeMap((action: LoadDashboardItemAction) => {
      if (!action.dashboardItem) {
        return of(null);
      }

      return this.dashboardItemService
        .getDashboardItem(action.dashboardItem.id, action.dashboardItem.type)
        .pipe(
          map(
            (dashboardItem: any) => new AddDashboardItemAction(dashboardItem)
          ),
          catchError((error: ErrorMessage) =>
            of(new LoadDashboardItemFailAction(error, action.dashboardItem.id))
          )
        );
    })
  );

  @Effect({ dispatch: false })
  addDashboardItem$: Observable<any> = this.actions$.pipe(
    ofType(DashboardItemActionTypes.AddDashboardItem),
    map((action: AddDashboardItemAction) => {
      if (action.dashboardItem) {
        const favoriteType = _.camelCase(action.dashboardItem.type);
        const favorite = action.dashboardItem[favoriteType];

        if (favorite && _.isPlainObject(favorite)) {
          this.store.dispatch(
            new LoadFavoriteAction(favorite.id, favoriteType)
          );
        }
      }
    })
  );
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dashboardItemService: DashboardItemService
  ) {}
}
