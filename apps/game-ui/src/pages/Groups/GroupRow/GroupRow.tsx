import { Box, Typography } from '@mui/material';
import { styles } from './GroupRow.styles';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../paths';

interface GroupRowProps {
  name: string;
  members: string[];
}

export const GroupRow = ({ name, members }: GroupRowProps) => {
  const navigate = useNavigate();
  const numberOfMembers = members.length;
  const membersMessage = `${numberOfMembers} ${
    numberOfMembers > 1 ? 'members' : 'member'
  }`;

  const handleClick = () => {
    navigate(paths.group.build(name));
  };

  return (
    <Box sx={styles.container} onClick={handleClick}>
      <Typography variant="h3" sx={styles.title}>
        {name}
      </Typography>
      <Typography variant="body1" sx={styles.subtitile}>
        {membersMessage}
      </Typography>
    </Box>
  );
};
