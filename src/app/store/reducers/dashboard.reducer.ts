import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Dashboard } from 'src/app/core';
import {
  DashboardActionTypes,
  DashboardActions
} from '../actions/dashboard.actions';

export interface State extends EntityState<Dashboard> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: any;
  currentDashboard: string;
  currentVisualization: string;
}

export const adapter: EntityAdapter<Dashboard> = createEntityAdapter<
  Dashboard
>();

const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: true,
  loaded: false,
  hasError: false,
  error: null,
  currentDashboard: '',
  currentVisualization: ''
});

export function reducer(state = initialState, action: DashboardActions): State {
  switch (action.type) {
    case DashboardActionTypes.LoadDashboards: {
      return {
        ...state,
        loading: true,
        loaded: false,
        hasError: false,
        error: null
      };
    }

    case DashboardActionTypes.AddDashboards: {
      return adapter.addMany(action.dashboards, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case DashboardActionTypes.LoadDashboardsFail: {
      return { ...state, loading: false, hasError: true, error: action.error };
    }

    case DashboardActionTypes.SetCurrentDashboard: {
      return action.dashboard
        ? { ...state, currentDashboard: action.dashboard.id }
        : state;
    }

    default:
      return state;
  }
}
