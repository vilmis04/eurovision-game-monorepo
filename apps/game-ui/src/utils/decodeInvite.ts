const INVITE_INFO_LIST_LENGTH = 4;

export const decodeInvite = (invite: string | null) => {
  const inviteCode = invite ?? '';
  const inviteData = window.atob(inviteCode).split(':');
  const isInviteStructureValid = inviteData.length === INVITE_INFO_LIST_LENGTH;
  // TODO: edit prefix _ to allow unused
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [groupName, _, id] = inviteData;

  return {
    isInviteStructureValid,
    groupName,
    id: Number(id),
  };
};
