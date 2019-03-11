import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromFunctionActions from '../actions/function.actions';
import * as fromFunctionRuleActions from '../actions/function-rule.actions';

@Injectable()
export class FunctionRuleEffects {
  @Effect()
  addFunctions$: Observable<any> = this.actions$.pipe(
    ofType(fromFunctionActions.FunctionActionTypes.AddFunctions),
    map(
      (action: fromFunctionActions.AddFunctions) =>
        new fromFunctionRuleActions.AddFunctionRules(action.functionRules)
    )
  );
  constructor(private actions$: Actions) {}
}
