import { DashboardPreferences } from 'src/app/core';
import {
  DashboardPreferencesActions,
  DashboardPreferencesActionTypes
} from '../actions/dashboard-preferences.actions';

export interface State {
  loading: boolean;
  loaded: boolean;
  dashboardPreferences: DashboardPreferences;
}

const initialState: State = {
  loaded: false,
  loading: false,
  dashboardPreferences: null
};
export function reducer(
  state: State = initialState,
  action: DashboardPreferencesActions
): State {
  switch (action.type) {
    case DashboardPreferencesActionTypes.LoadDashboardPreferences: {
      return { ...state, loading: true, loaded: false };
    }

    case DashboardPreferencesActionTypes.AddDashboardPreferences: {
      return {
        ...state,
        loading: false,
        loaded: true,
        dashboardPreferences: action.dashboardPreferences
      };
    }

    default:
      return state;
  }
}
