import { adapter } from '../reducers/dashboard.reducer';
import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { Dashboard } from 'src/app/core';

const getDashboardState = createSelector(
  getRootState,
  (state: State) => state.dashboard
);

const {
  selectEntities: getDashboardEntities,
  selectAll: getAllDashboards
} = adapter.getSelectors(getDashboardState);

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
