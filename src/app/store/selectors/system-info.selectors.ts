import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { State as SystemInfoState } from '../reducers/system-info.reducer';

const getSystemInfoState = createSelector(
  getRootState,
  (state: State) => (state ? state.systemInfo : null)
);

export const getSystemInfo = createSelector(
  getSystemInfoState,
  (systemInfoState: SystemInfoState) =>
    systemInfoState ? systemInfoState.systemInfo : null
);
