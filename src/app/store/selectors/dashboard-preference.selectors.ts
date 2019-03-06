import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { State as DashboardPreferenceState } from '../reducers/dashboard-preferences.reducer';

const getDashboardPreferenceState = createSelector(
  getRootState,
  (state: State) => (state ? state.dashboardPreferences : null)
);

export const getDashboardPreferences = createSelector(
  getDashboardPreferenceState,
  (dashboardPreferenceState: DashboardPreferenceState) =>
    dashboardPreferenceState
      ? dashboardPreferenceState.dashboardPreferences
      : null
);

export const getDashboardPreferencesLoading = createSelector(
  getDashboardPreferenceState,
  (dashboardPreferenceState: DashboardPreferenceState) =>
    dashboardPreferenceState ? dashboardPreferenceState.loading : false
);

export const getDashboardPreferencesLoaded = createSelector(
  getDashboardPreferenceState,
  (dashboardPreferenceState: DashboardPreferenceState) =>
    dashboardPreferenceState ? dashboardPreferenceState.loaded : false
);
