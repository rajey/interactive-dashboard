import { Action } from '@ngrx/store';
import { ErrorMessage } from 'src/app/core';
import { Analytics } from 'src/app/analytics/models';

export enum AnalyticsActionTypes {
  AddAnalyticss = '[Analytics] Add Analytics',
  LoadAnalytics = '[Analytics] Load Analytics',
  LoadAnalyticsSuccess = '[Analytics] Load Analytics success',
  LoadAnalyticsFail = '[Analytics] Load Analytics fail',
  UpdateAnalytics = '[Analytics] Add or Update Analytics',
  AddAnalytics = '[Analytics] Add Analytics',
  RemoveAnalytics = '[Analytics] Remove Analytics'
}

export class LoadAnalyticsAction implements Action {
  readonly type = AnalyticsActionTypes.LoadAnalytics;
  constructor(
    public visualizationLayers: any[],
    public dashboardItemId: string
  ) {}
}

export class LoadAnalyticsSuccessAction implements Action {
  readonly type = AnalyticsActionTypes.LoadAnalyticsSuccess;
  constructor(
    public visualizationLayers: any[],
    public dashboardItemId: string
  ) {}
}

export class AddAnalyticssAction implements Action {
  readonly type = AnalyticsActionTypes.AddAnalyticss;
  constructor(public Analyticss: Analytics[]) {}
}

export class AddAnalyticsAction implements Action {
  readonly type = AnalyticsActionTypes.AddAnalytics;
  constructor(public analytics: Analytics) {}
}

export class LoadAnalyticsFailAction implements Action {
  readonly type = AnalyticsActionTypes.LoadAnalyticsFail;
  constructor(public error: ErrorMessage, public dashboardItemId: string) {}
}

export class RemoveAnalyticsAction implements Action {
  readonly type = AnalyticsActionTypes.RemoveAnalytics;
  constructor(public AnalyticsId: string) {}
}

export class UpdateAnalyticsAction implements Action {
  readonly type = AnalyticsActionTypes.UpdateAnalytics;
  constructor(public id: string, public changes: Partial<Analytics>) {}
}

export type AnalyticsActions =
  | AddAnalyticssAction
  | AddAnalyticsAction
  | RemoveAnalyticsAction
  | UpdateAnalyticsAction
  | LoadAnalyticsAction
  | LoadAnalyticsSuccessAction
  | LoadAnalyticsFailAction;
