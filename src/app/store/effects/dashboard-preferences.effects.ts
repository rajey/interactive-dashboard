import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { State } from '../reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class DashboardPreferencesEffects {
  constructor(private actions$: Actions, private store: Store<State>) {}
}
