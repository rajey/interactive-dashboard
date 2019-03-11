import { DataGroup } from 'src/app/core/models/data-group.model';

export function removeMemberFromGroup(group: DataGroup, member: any) {
  if (!group) {
    return null;
  }

  return {
    ...group,
    members: (group.members || []).filter(
      (memberItem: any) => memberItem.id !== member.id
    )
  };
}
