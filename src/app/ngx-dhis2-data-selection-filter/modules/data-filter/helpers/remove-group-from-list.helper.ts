import * as _ from 'lodash';
import { DataGroup } from 'src/app/core/models/data-group.model';

export function removeGroupFromList(
  dataGroups: DataGroup[],
  groupToDelete: DataGroup
): DataGroup[] {
  const newDataGroups = dataGroups || [];
  const groupToDeleteIndex = newDataGroups.indexOf(
    _.find(dataGroups, ['id', groupToDelete ? groupToDelete.id : ''])
  );

  return groupToDeleteIndex > -1
    ? [
        ..._.slice(newDataGroups, 0, groupToDeleteIndex),
        ..._.slice(newDataGroups, groupToDeleteIndex + 1)
      ]
    : newDataGroups;
}
