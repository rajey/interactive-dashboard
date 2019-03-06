import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, defer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService, User } from '../../core';

import { Action } from '@ngrx/store';
import {
  UserActionTypes,
  LoadCurrentUser,
  AddCurrentUser,
  LoadCurrentUserFail
} from '../actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  @Effect()
  loadCurrentUser$: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.LoadCurrentUser),
    switchMap(() =>
      this.userService.loadCurrentUser().pipe(
        map((user: User) => new AddCurrentUser(user)),
        catchError((error: any) => of(new LoadCurrentUserFail(error)))
      )
    )
  );

  @Effect()
  init$: Observable<Action> = defer(() => of(new LoadCurrentUser()));
}
