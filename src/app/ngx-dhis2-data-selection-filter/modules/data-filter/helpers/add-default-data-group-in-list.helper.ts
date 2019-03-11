import * as _ from 'lodash';
import { DataGroup } from 'src/app/core/models/data-group.model';

export function addDefaultDataGroupInList(
  dataGroups: DataGroup[],
  newGroupId: string
): DataGroup[] {
  return [
    ..._.map(dataGroups, (dataGroup: DataGroup) => {
      return { ...dataGroup, current: false };
    }),
    {
      id: newGroupId,
      name: 'Untitled',
      color: '#000000',
      members: []
    }
  ];
}
