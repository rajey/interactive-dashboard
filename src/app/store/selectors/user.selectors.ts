import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import * as fromUser from '../reducers/user.reducer';
import { User } from '../../core';

const getUserState = createSelector(
  getRootState,
  (state: State) => state.user
);

export const getCurrentUser = createSelector(
  getUserState,
  (userState: fromUser.State) => userState.currentUser
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
