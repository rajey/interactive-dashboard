import { Action } from '@ngrx/store';
import { User, SystemInfo, ErrorMessage } from 'src/app/core';

export enum DashboardActionTypes {
  LoadDashboards = '[Dashboard] Load Dashboards',
  LoadDashboardsFail = '[Dashboard] Load Dashboards fail',
  LoadDashboardsSuccess = '[Dashboard] Load Dashboards success'
}

export class LoadDashboardsAction implements Action {
  readonly type = DashboardActionTypes.LoadDashboards;

  constructor(public currentUser: User, public systemInfo: SystemInfo) {}
}

export class LoadDashboardsFailAction implements Action {
  readonly type = DashboardActionTypes.LoadDashboardsFail;
  constructor(public error: ErrorMessage) {}
}

export class LoadDashboardsSuccessAction implements Action {
  readonly type = DashboardActionTypes.LoadDashboardsSuccess;
  constructor(public dashboards: any[], public currentUser: User) {}
}

export type DashboardActions =
  | LoadDashboardsAction
  | LoadDashboardsFailAction
  | LoadDashboardsSuccessAction;
