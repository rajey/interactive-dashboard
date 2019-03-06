import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User, ErrorMessage } from '../../core';
import { UserActions, UserActionTypes } from '../actions/user.actions';

export interface State {
  /**
   * User loading status
   */
  loading: boolean;

  /**
   * User information loaded status
   */
  loaded: boolean;

  /**
   * User information error status
   */
  hasError: boolean;

  /**
   * User loading error
   */
  error: ErrorMessage;

  /**
   * user details
   */
  currentUser: User;
}

export const initialState: State = {
  loading: false,
  loaded: false,
  hasError: false,
  error: null,
  currentUser: null
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.LoadCurrentUser: {
      return {
        ...state,
        loading: true,
        loaded: false,
        hasError: false,
        error: null
      };
    }

    case UserActionTypes.AddCurrentUser: {
      return {
        ...state,
        currentUser: action.currentUser,
        loading: false,
        loaded: true
      };
    }

    case UserActionTypes.LoadCurrentUserFail: {
      return { ...state, loading: false, hasError: true, error: action.error };
    }

    default: {
      return state;
    }
  }
}

// additional selectors
