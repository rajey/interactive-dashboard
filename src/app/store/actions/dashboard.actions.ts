import { Action } from '@ngrx/store';
import {
  Dashboard,
  ErrorMessage,
  DashboardPreferences,
  User
} from 'src/app/core';

export enum DashboardActionTypes {
  LoadDashboards = '[Dashboard] Load Dashboards',
  LoadDashboardsFail = '[Dashboard] Load Dashboards fail',
  AddDashboards = '[Dashboard] Add Dashboards',
  SetCurrentDashboard = '[Dashboard] Set current dashboard'
}

export class LoadDashboardsAction implements Action {
  readonly type = DashboardActionTypes.LoadDashboards;
  constructor(
    public dashboardPreferences: DashboardPreferences,
    public currentUser: User
  ) {}
}

export class LoadDashboardsFailAction implements Action {
  readonly type = DashboardActionTypes.LoadDashboardsFail;
  constructor(public error: ErrorMessage) {}
}

export class AddDashboardsAction implements Action {
  readonly type = DashboardActionTypes.AddDashboards;
  constructor(public dashboards: Dashboard[]) {}
}

export class SetCurrentDashboardAction implements Action {
  readonly type = DashboardActionTypes.SetCurrentDashboard;
  constructor(public dashboard: Dashboard) {}
}

export type DashboardActions =
  | LoadDashboardsAction
  | LoadDashboardsFailAction
  | AddDashboardsAction
  | SetCurrentDashboardAction;
