import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable, of, defer } from 'rxjs';
import {
  catchError,
  first,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { DashboardPreferences } from 'src/app/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';

import {
  AddDashboardsAction,
  DashboardActionTypes,
  LoadDashboardsAction,
  LoadDashboardsFailAction
} from '../actions/dashboard.actions';
import { State } from '../reducers';
import { getDashboardPreferences } from '../selectors';
import {
  DashboardPreferencesActionTypes,
  AddDashboardPreferencesAction
} from '../actions/dashboard-preferences.actions';

@Injectable()
export class DashboardEffects {
  @Effect()
  addDashboardPreferences$: Observable<any> = this.actions$.pipe(
    ofType(DashboardPreferencesActionTypes.AddDashboardPreferences),
    map(
      (action: AddDashboardPreferencesAction) =>
        new LoadDashboardsAction(action.dashboardPreferences)
    )
  );
  @Effect()
  loadAllDashboards$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.LoadDashboards),
    switchMap((action: LoadDashboardsAction) =>
      this.dashboardService.getDashboards(action.dashboardPreferences).pipe(
        map(
          (dashboardResponse: any) => new AddDashboardsAction(dashboardResponse)
        ),
        catchError((error: any) => of(new LoadDashboardsFailAction(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dashboardService: DashboardService
  ) {}
}
