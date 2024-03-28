import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styles } from './Groups.styles';
import { useGetGroupsQuery } from '../../api/group/groupApi';
import { GroupRow } from './GroupRow/GroupRow';
import { CreateGroupDialog } from './CreateGroupDialog/CreateGroupDialog';
import { useState } from 'react';

export const Groups = () => {
  const { data: groups } = useGetGroupsQuery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => setIsDialogOpen((isOpen) => !isOpen);

  const subheading = groups?.length
    ? 'Create and manage groups'
    : 'Create your first group to get the party started!';

  return (
    <>
      <Box sx={styles.container}>
        <Typography variant="h1" sx={styles.title}>
          Your Groups
        </Typography>
        <Typography variant="h2" sx={styles.subtitle}>
          {subheading}
        </Typography>
        {(groups || []).map(({ members, name }) => (
          <GroupRow key={`${name}-${members}`} name={name} members={members} />
        ))}
        <Button
          fullWidth
          startIcon={<AddIcon />}
          sx={styles.addButton}
          onClick={toggleDialog}
        >
          Create a Group
        </Button>
      </Box>
      <CreateGroupDialog isOpen={isDialogOpen} toggleDialog={toggleDialog} />
    </>
  );
};
