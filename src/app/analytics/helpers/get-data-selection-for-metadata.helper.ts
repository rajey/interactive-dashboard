import * as _ from 'lodash';

export function getDataSelectionsForMetadata(dataSelections: any[]) {
  return _.filter(
    dataSelections,
    (dataSelection: any) => dataSelection.dimension !== 'dx'
  );
}
