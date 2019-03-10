import { createSelector } from '@ngrx/store';

import { getRootState, State } from '../reducers';
import { adapter } from '../reducers/favorite.reducer';
import { getSelectionDimensionsFromFavorite } from 'src/app/core';

const getFavoriteState = createSelector(
  getRootState,
  (state: State) => state.favorite
);

export const {
  selectEntities: getFavoriteEntities,
  selectAll: getAllFavorites
} = adapter.getSelectors(getFavoriteState);

export const getVisualizationLayersFromFavorite = favoriteId =>
  createSelector(
    getFavoriteEntities,
    (favoriteEntities: any) => {
      const favoriteObject = favoriteEntities[favoriteId];

      return (favoriteObject
        ? favoriteObject.mapViews || [favoriteObject]
        : []
      ).map(favoriteLayer => {
        return {
          id: favoriteLayer.id,
          dataSelections: getSelectionDimensionsFromFavorite(favoriteLayer),
          analytics: null,
          config: {
            ...favoriteLayer,
            type: favoriteLayer.type ? favoriteLayer.type : 'COLUMN'
          }
        };
      });
    }
  );
