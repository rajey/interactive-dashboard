import * as _ from 'lodash';
import { getDimensionItemType } from './get-dimension-item-type.helper';
import { generateUid } from './generate-uid.helper';

export function getSanitizedDimensionItems(dimensionObject: any) {
  return _.filter(
    _.map(dimensionObject.items || [], (item: any) => {
      if (!item) {
        return null;
      }
      return {
        id: item.dimensionItem || item.id || generateUid(),
        name: item.displayName || item.name,
        legendSet: item.legendSet,
        type: getDimensionItemType(dimensionObject.dimension, item)
      };
    }),
    (item: any) => item !== null
  );
}
