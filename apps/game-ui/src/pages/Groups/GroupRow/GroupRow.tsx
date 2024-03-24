import { Box, Typography } from '@mui/material';

interface GroupRowProps {
  name: string;
  members: string[];
}

export const GroupRow = ({ name, members }: GroupRowProps) => {
  const numberOfMembers = members.length;
  const membersMessage = `${numberOfMembers} member${
    numberOfMembers > 1 ? 's' : ''
  }`;

  return (
    <Box>
      <Typography variant="h3">{name}</Typography>
      <Typography variant="body1">{membersMessage}</Typography>
    </Box>
  );
};
