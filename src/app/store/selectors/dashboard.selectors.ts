import {
  adapter,
  State as DashboardState
} from '../reducers/dashboard.reducer';
import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { Dashboard } from 'src/app/core';

const getDashboardState = createSelector(
  getRootState,
  (state: State) => state.dashboard
);

export const {
  selectEntities: getDashboardEntities,
  selectAll: getAllDashboards
} = adapter.getSelectors(getDashboardState);

export const getCurrentDashboardId = createSelector(
  getDashboardState,
  (dashboardState: DashboardState) => dashboardState.currentDashboard
);

export const getCurrentDashboard = createSelector(
  getDashboardEntities,
  getCurrentDashboardId,
  (dashboardEntities: any, currentDashboardId: string) =>
    dashboardEntities ? dashboardEntities[currentDashboardId] : null
);

export const getDashboardById = dashboardId =>
  createSelector(
    getDashboardEntities,
    (dashboardEntities: any) =>
      dashboardEntities ? dashboardEntities[dashboardId] : null
  );

export const getDashboardMenuList = createSelector(
  getAllDashboards,
  (dashboards: Dashboard[]) =>
    (dashboards || []).map((dashboard: Dashboard) => {
      return {
        id: dashboard.id,
        name: dashboard.name
      };
    })
);
