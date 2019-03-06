import { ErrorMessage, SystemInfo } from '../../core';
import { SystemInfoActions, SystemInfoActionTypes } from '../actions';

export interface State {
  /**
   * SystemInfo loading status
   */
  loading: boolean;

  /**
   * SystemInfo information loaded status
   */
  loaded: boolean;

  /**
   * SystemInfo information error status
   */
  hasError: boolean;

  /**
   * SystemInfo loading error
   */
  error: ErrorMessage;

  /**
   * System info
   */
  systemInfo: SystemInfo;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  hasError: false,
  error: null,
  systemInfo: null
};

export function reducer(
  state = initialState,
  action: SystemInfoActions
): State {
  switch (action.type) {
    case SystemInfoActionTypes.LoadSystemInfo: {
      return {
        ...state,
        loading: true,
        loaded: false,
        hasError: false,
        error: null
      };
    }

    case SystemInfoActionTypes.AddSystemInfo: {
      return {
        ...state,
        loading: false,
        loaded: true,
        systemInfo: action.systemInfo
      };
    }

    case SystemInfoActionTypes.LoadSystemInfoFail: {
      return { ...state, loading: false, hasError: true, error: action.error };
    }

    default: {
      return state;
    }
  }
}
