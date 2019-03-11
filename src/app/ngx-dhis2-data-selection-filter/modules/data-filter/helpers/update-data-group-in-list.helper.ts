import * as _ from 'lodash';
import { DataGroup } from 'src/app/core/models/data-group.model';

export function updateDataGroupInList(
  dataGroups: DataGroup[],
  dataGroupToUpdate: DataGroup
): DataGroup[] {
  const dataGroupIndex = (dataGroups || []).indexOf(
    _.find(dataGroups, ['id', dataGroupToUpdate ? dataGroupToUpdate.id : ''])
  );

  return dataGroupIndex !== -1
    ? [
        ..._.slice(dataGroups, 0, dataGroupIndex),
        dataGroupToUpdate,
        ..._.slice(dataGroups, dataGroupIndex + 1)
      ]
    : dataGroups;
}
