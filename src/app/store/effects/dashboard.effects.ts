import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import {
  getCurrentDashboardId,
  getStandardizedDashboards,
  User
} from 'src/app/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';

import {
  AddDashboardPreferencesAction,
  DashboardPreferencesActionTypes
} from '../actions/dashboard-preferences.actions';
import {
  AddDashboardsAction,
  DashboardActionTypes,
  LoadDashboardsAction,
  LoadDashboardsFailAction,
  SetCurrentDashboardAction
} from '../actions/dashboard.actions';
import { State } from '../reducers';
import { getRouteUrl, getCurrentUser } from '../selectors';
import { InitializeDashboardItemsAction } from '../actions/dashboard-item.actions';
import { Go } from '../actions';

@Injectable()
export class DashboardEffects {
  @Effect()
  addDashboardPreferences$: Observable<any> = this.actions$.pipe(
    ofType(DashboardPreferencesActionTypes.AddDashboardPreferences),
    map(
      (action: AddDashboardPreferencesAction) =>
        new LoadDashboardsAction(
          action.dashboardPreferences,
          action.currentUser
        )
    )
  );
  @Effect()
  loadAllDashboards$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.LoadDashboards),
    withLatestFrom(this.store.select(getRouteUrl)),
    switchMap(([action, routeUrl]: [LoadDashboardsAction, string]) =>
      this.dashboardService.getDashboards(action.dashboardPreferences).pipe(
        switchMap((dashboards: any[]) => {
          const standardizedDashboards = getStandardizedDashboards(
            dashboards,
            action.currentUser
          );

          const currentDashboard = _.find(standardizedDashboards, [
            'id',
            getCurrentDashboardId(routeUrl, dashboards, action.currentUser)
          ]);

          return [
            new AddDashboardsAction(standardizedDashboards),
            new SetCurrentDashboardAction(currentDashboard)
          ];
        }),
        catchError((error: any) => of(new LoadDashboardsFailAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  setCurrentDashboard$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.SetCurrentDashboard),
    withLatestFrom(this.store.select(getCurrentUser)),
    tap(([action, currentUser]: [SetCurrentDashboardAction, User]) => {
      // Set current dashboard id into local storage
      if (
        currentUser &&
        currentUser.userCredentials &&
        currentUser.userCredentials.username &&
        action.dashboard &&
        action.dashboard.id
      ) {
        localStorage.setItem(
          'dhis2.dashboard.current.' + currentUser.userCredentials.username,
          action.dashboard.id
        );
      }

      if (action.dashboard && action.dashboard.dashboardItems) {
        // Navigate to the respective dashboard
        this.store.dispatch(
          new Go({ path: [`/dashboards/${action.dashboard.id}`] })
        );

        // Load dashboard items for the current dashboard
        this.store.dispatch(
          new InitializeDashboardItemsAction(action.dashboard.dashboardItems)
        );
      }
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dashboardService: DashboardService
  ) {}
}
