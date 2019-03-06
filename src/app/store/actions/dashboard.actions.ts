import { Action } from '@ngrx/store';
import { Dashboard, ErrorMessage, DashboardPreferences } from 'src/app/core';

export enum DashboardActionTypes {
  LoadDashboards = '[Dashboard] Load Dashboards',
  LoadDashboardsFail = '[Dashboard] Load Dashboards fail',
  AddDashboards = '[Dashboard] Add Dashboards'
}

export class LoadDashboardsAction implements Action {
  readonly type = DashboardActionTypes.LoadDashboards;
  constructor(public dashboardPreferences: DashboardPreferences) {}
}

export class LoadDashboardsFailAction implements Action {
  readonly type = DashboardActionTypes.LoadDashboardsFail;
  constructor(public error: ErrorMessage) {}
}

export class AddDashboardsAction implements Action {
  readonly type = DashboardActionTypes.AddDashboards;
  constructor(public dashboards: Dashboard[]) {}
}

export type DashboardActions =
  | LoadDashboardsAction
  | LoadDashboardsFailAction
  | AddDashboardsAction;
