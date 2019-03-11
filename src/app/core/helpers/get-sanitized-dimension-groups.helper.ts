import * as _ from 'lodash';
import { generateUid } from './generate-uid.helper';

export function getSanitizedDimensionGroups(
  dimensionGroups: any[],
  dimensionItems: any[]
) {
  return _.map(dimensionGroups || [], (group: any) => {
    return {
      ...group,
      id: group.id || generateUid(),
      members: _.filter(
        _.map(group.members || [], (member: any) => {
          if (!member) {
            return null;
          }

          return (
            _.find(dimensionItems, ['id', member.id]) ||
            _.find(dimensionItems, ['name', member.name])
          );
        }),
        (groupMember: any) => groupMember
      )
    };
  });
}
