import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../../environments/environment';
import * as fromDashboardItem from '../reducers/dashboard-item.reducer';
import * as fromDashboardPreferences from '../reducers/dashboard-preferences.reducer';
import * as fromDashboard from '../reducers/dashboard.reducer';
import * as fromSystemInfo from '../reducers/system-info.reducer';
import * as fromUser from '../reducers/user.reducer';
import * as fromFavorite from './favorite.reducer';

export interface State {
  /**
   * User state
   */
  user: fromUser.State;

  /**
   * System info state
   */
  systemInfo: fromSystemInfo.State;

  /**
   * Router state
   */
  route: RouterReducerState;

  /**
   * Dashboard preferences
   */
  dashboardPreferences: fromDashboardPreferences.State;

  /**
   * Dashboards
   */
  dashboard: fromDashboard.State;

  /**
   * Dashoard Items
   */
  dashboardItem: fromDashboardItem.State;

  /**
   * Favorite
   */
  favorite: fromFavorite.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  systemInfo: fromSystemInfo.reducer,
  route: routerReducer,
  dashboardPreferences: fromDashboardPreferences.reducer,
  dashboard: fromDashboard.reducer,
  dashboardItem: fromDashboardItem.reducer,
  favorite: fromFavorite.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

/**
 * Root state selector
 */
export const getRootState = (state: State) => state;
