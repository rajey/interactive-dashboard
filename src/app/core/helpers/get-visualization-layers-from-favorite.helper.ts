import { getSelectionDimensionsFromFavorite } from './get-selection-dimensions-from-favorite.helper';

export function getVisualizationLayersFromFavorite(favorite: any) {
  return (favorite ? favorite.mapViews || [favorite] : []).map(
    favoriteLayer => {
      return {
        id: favoriteLayer.id,
        dataSelections: getSelectionDimensionsFromFavorite(favoriteLayer),
        analytics: null,
        config: {
          ...favoriteLayer,
          type: favoriteLayer.type ? favoriteLayer.type : 'COLUMN'
        }
      };
    }
  );
}
