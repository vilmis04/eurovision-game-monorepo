import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styles } from './Groups.styles';
import { useGetGroupsQuery } from '../../api/group/groupApi';

export const Groups = () => {
  const { data: groups } = useGetGroupsQuery();
  console.log(groups);

  return (
    <Box sx={styles.container}>
      <Typography variant="h1" sx={styles.title}>
        Your Groups
      </Typography>
      <Typography variant="body2" sx={styles.subtitle}>
        Create your first group to get the party started!
      </Typography>
      <Button fullWidth startIcon={<AddIcon />} sx={styles.addButton}>
        Create a Group
      </Button>
    </Box>
  );
};
