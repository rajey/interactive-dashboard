import { DashboardItem } from 'src/app/core';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  DashboardItemActionTypes,
  DashboardItemActions
} from '../actions/dashboard-item.actions';

export interface State extends EntityState<DashboardItem> {}

export const adapter: EntityAdapter<DashboardItem> = createEntityAdapter<
  DashboardItem
>();

const initialState: State = adapter.getInitialState({});

export function reducer(
  state: State = initialState,
  action: DashboardItemActions
): State {
  switch (action.type) {
    case DashboardItemActionTypes.AddDashboardItems:
      return adapter.addAll(action.dashboardItems, state);

    case DashboardItemActionTypes.UpdateDashboardItem:
      return adapter.updateOne(
        { id: action.id, changes: action.changes },
        state
      );
    case DashboardItemActionTypes.AddDashboardItem: {
      return adapter.addOne(action.dashboardItem, state);
    }

    default:
      return state;
  }
}
