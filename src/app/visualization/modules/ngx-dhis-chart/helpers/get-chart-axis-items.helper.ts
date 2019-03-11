import * as _ from 'lodash';
export function getChartAxisItems(
  analyticsObject: any,
  axisType: any,
  isCategory: boolean = false
) {
  let items: any[] = [];
  const analyticsMetadata = analyticsObject ? analyticsObject.metaData : null;
  const metadataNames = analyticsMetadata ? analyticsMetadata.names : null;
  if (!isCategory) {
    const itemKeys = analyticsMetadata[axisType];

    if (itemKeys) {
      items = _.map(itemKeys, itemKey => {
        return {
          id: itemKey,
          name: metadataNames[itemKey]
        };
      });
    }
  } else {
    (axisType || []).forEach((axisTypeItem, axisIndex) => {
      const itemKeys = analyticsMetadata[axisTypeItem];
      if (itemKeys) {
        if (axisIndex > 0) {
          const availableItems = _.assign([], items);
          items = [];
          itemKeys.forEach(itemKey => {
            availableItems.forEach(item => {
              items.push({
                id: item.id + '_' + itemKey,
                name: item.name + '_' + metadataNames[itemKey].trim()
              });
            });
          });
        } else {
          items = _.map(itemKeys, itemKey => {
            return {
              id: itemKey,
              name: metadataNames[itemKey].trim()
            };
          });
        }
      }
    });
  }

  return items;
}
