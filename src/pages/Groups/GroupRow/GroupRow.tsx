import { Button, Typography } from '@mui/material';
import { styles } from './GroupRow.styles';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../paths';

interface GroupRowProps {
  name: string;
  members: string[];
  groupId: number;
}

export const GroupRow = ({ name, members, groupId }: GroupRowProps) => {
  const navigate = useNavigate();
  const numberOfMembers = members.length;
  const membersMessage = `${numberOfMembers} ${
    numberOfMembers > 1 ? 'members' : 'member'
  }`;

  const handleClick = () => {
    navigate(paths.group.build(groupId));
  };

  return (
    <Button sx={styles.container} variant="contained" onClick={handleClick}>
      <Typography variant="h3" sx={styles.title}>
        {name}
      </Typography>
      <Typography variant="body1" sx={styles.subtitile}>
        {membersMessage}
      </Typography>
    </Button>
  );
};
