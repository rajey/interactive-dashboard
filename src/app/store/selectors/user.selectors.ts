import { createSelector } from '@ngrx/store';

import { User } from '../../core';
import { getRootState, State } from '../reducers';
import { State as UserState } from '../reducers/user.reducer';

const getUserState = createSelector(
  getRootState,
  (state: State) => (state ? state.user : null)
);

export const getCurrentUser = createSelector(
  getUserState,
  (userState: UserState) => (userState ? userState.currentUser : null)
);

export const getCurrentUserManagementAuthoritiesStatus = createSelector(
  getCurrentUser,
  (currentUser: User) => {
    if (!currentUser) {
      return false;
    }

    return currentUser && currentUser.authorities
      ? currentUser.authorities.includes('ALL')
      : false;
  }
);
