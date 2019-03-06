import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State } from '../reducers';
import { Store, Action } from '@ngrx/store';
import { DashboardPreferencesService } from 'src/app/core';
import { Observable, of, defer } from 'rxjs';
import {
  DashboardPreferencesActionTypes,
  LoadDashboardPreferencesFailAction,
  AddDashboardPreferencesAction,
  LoadDashboardPreferencesAction
} from '../actions/dashboard-preferences.actions';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class DashboardPreferencesEffects {
  @Effect()
  loadDashboardSettings$: Observable<any> = this.actions$.pipe(
    ofType(DashboardPreferencesActionTypes.LoadDashboardPreferences),
    switchMap(() =>
      this.dashboardPreferencesService.getPreferences().pipe(
        map(
          (dashboardPreferences: any) =>
            new AddDashboardPreferencesAction(dashboardPreferences)
        ),
        catchError(error => of(new LoadDashboardPreferencesFailAction(error)))
      )
    )
  );

  @Effect()
  init$: Observable<Action> = defer(() =>
    of(new LoadDashboardPreferencesAction())
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dashboardPreferencesService: DashboardPreferencesService
  ) {}
}
