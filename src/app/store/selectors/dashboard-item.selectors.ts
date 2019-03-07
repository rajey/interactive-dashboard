import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { adapter } from '../reducers/dashboard-item.reducer';

const getDashboardItemState = createSelector(
  getRootState,
  (state: State) => state.dashboardItem
);

export const {
  selectEntities: getDashboardItemEntities,
  selectAll: getAllDashboardItems
} = adapter.getSelectors(getDashboardItemState);
