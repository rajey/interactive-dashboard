import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { adapter } from '../reducers/favorite.reducer';

const getFavoriteState = createSelector(
  getRootState,
  (state: State) => state.favorite
);

export const {
  selectEntities: getFavoriteEntities,
  selectAll: getAllFavorites
} = adapter.getSelectors(getFavoriteState);
