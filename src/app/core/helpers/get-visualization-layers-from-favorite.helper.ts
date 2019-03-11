import { getSelectionDimensionsFromFavorite } from './get-selection-dimensions-from-favorite.helper';
import { getVisualizationLayout } from './get-visualization-layout.helper';

export function getVisualizationLayersFromFavorite(favorite: any) {
  return (favorite ? favorite.mapViews || [favorite] : []).map(
    favoriteLayer => {
      const dataSelections = getSelectionDimensionsFromFavorite(favoriteLayer);
      return {
        id: favoriteLayer.id,
        dataSelections,
        layout: getVisualizationLayout(dataSelections),
        analytics: null,
        config: {
          ...favoriteLayer,
          type: favoriteLayer.type ? favoriteLayer.type : 'COLUMN'
        }
      };
    }
  );
}
