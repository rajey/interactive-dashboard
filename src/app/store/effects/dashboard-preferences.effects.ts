import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { State } from '../reducers';
import { Store, Action } from '@ngrx/store';
import { DashboardPreferencesService } from 'src/app/core';
import { Observable, of, defer } from 'rxjs';

import { switchMap, map, catchError } from 'rxjs/operators';
import {
  UserActionTypes,
  AddCurrentUser,
  DashboardPreferencesActionTypes,
  AddDashboardPreferencesAction,
  LoadDashboardPreferencesFailAction,
  LoadDashboardPreferencesAction
} from '../actions';

@Injectable()
export class DashboardPreferencesEffects {
  @Effect()
  addCurrentUser$: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.AddCurrentUser),
    map(
      (action: AddCurrentUser) =>
        new LoadDashboardPreferencesAction(action.currentUser)
    )
  );

  @Effect()
  loadDashboardSettings$: Observable<any> = this.actions$.pipe(
    ofType(DashboardPreferencesActionTypes.LoadDashboardPreferences),
    switchMap((action: LoadDashboardPreferencesAction) =>
      this.dashboardPreferencesService.getPreferences().pipe(
        map(
          (dashboardPreferences: any) =>
            new AddDashboardPreferencesAction(
              dashboardPreferences,
              action.currentUser
            )
        ),
        catchError(error => of(new LoadDashboardPreferencesFailAction(error)))
      )
    )
  );

  // @Effect()
  // init$: Observable<Action> = defer(() =>
  //   of(new LoadDashboardPreferencesAction())
  // );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dashboardPreferencesService: DashboardPreferencesService
  ) {}
}
