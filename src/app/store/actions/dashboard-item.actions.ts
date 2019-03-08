import { Action } from '@ngrx/store';
import { DashboardItem, ErrorMessage } from 'src/app/core';

export enum DashboardItemActionTypes {
  AddDashboardItems = '[DashboardItem] Add dashboard items',
  LoadDashboardItem = '[DashboardItem] Load dashboard item',
  InitializeDashboardItems = '[DashboardItem] Initialize dashboard items',
  LoadDashboardItemFail = '[DashboardItem] Load dashboard item fail',
  UpdateDashboardItem = '[DashboardItem] Add or Update dashboard item',
  AddDashboardItem = '[DashboardItem] Add dashboard Item',
  RemoveDashboardItemItem = '[DashboardItem] Remove dashboard item'
}

export class InitializeDashboardItemsAction implements Action {
  readonly type = DashboardItemActionTypes.InitializeDashboardItems;
  constructor(public dashboardItems: Array<DashboardItem>) {}
}

export class LoadDashboardItemAction implements Action {
  readonly type = DashboardItemActionTypes.LoadDashboardItem;
  constructor(public dashboardItem: DashboardItem) {}
}

export class AddDashboardItemsAction implements Action {
  readonly type = DashboardItemActionTypes.AddDashboardItems;
  constructor(public dashboardItems: DashboardItem[]) {}
}

export class AddDashboardItemAction implements Action {
  readonly type = DashboardItemActionTypes.AddDashboardItem;
  constructor(public dashboardItem: DashboardItem) {}
}

export class LoadDashboardItemFailAction implements Action {
  readonly type = DashboardItemActionTypes.LoadDashboardItemFail;
  constructor(public error: ErrorMessage, public dashboardItemId: string) {}
}

export class RemoveDashboardItemAction implements Action {
  readonly type = DashboardItemActionTypes.RemoveDashboardItemItem;
  constructor(public dashboardId: string, public dashboardItemId: string) {}
}

export class UpdateDashboardItemAction implements Action {
  readonly type = DashboardItemActionTypes.UpdateDashboardItem;
  constructor(public id: string, public changes: Partial<DashboardItem>) {}
}

export type DashboardItemActions =
  | AddDashboardItemsAction
  | AddDashboardItemAction
  | RemoveDashboardItemAction
  | UpdateDashboardItemAction
  | LoadDashboardItemAction
  | InitializeDashboardItemsAction
  | LoadDashboardItemFailAction;
