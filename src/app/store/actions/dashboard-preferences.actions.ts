import { Action } from '@ngrx/store';
import { DashboardPreferences } from 'src/app/core';

export enum DashboardPreferencesActionTypes {
  LoadDashboardPreferences = '[DashboardPreference] Load dashboard preferences',
  AddDashboardPreferences = '[DashboardPreference] Add dashboard preferences',
  LoadDashboardPreferencesFail = '[DashboardPreference] Load dashboard preferences fails'
}

export class LoadDashboardPreferencesAction implements Action {
  readonly type = DashboardPreferencesActionTypes.LoadDashboardPreferences;
}
export class AddDashboardPreferencesAction implements Action {
  readonly type = DashboardPreferencesActionTypes.AddDashboardPreferences;
  constructor(public dashboardPreferences: DashboardPreferences) {}
}
export class LoadDashboardPreferencesFailAction implements Action {
  readonly type = DashboardPreferencesActionTypes.LoadDashboardPreferencesFail;
  constructor(public error: any) {}
}

export type DashboardPreferencesActions =
  | LoadDashboardPreferencesAction
  | LoadDashboardPreferencesFailAction
  | AddDashboardPreferencesAction;
