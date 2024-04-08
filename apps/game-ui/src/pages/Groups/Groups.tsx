import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styles } from './Groups.styles';
import { useGetGroupsQuery } from '../../api/group/groupApi';
import { GroupRow } from './GroupRow/GroupRow';
import { CreateGroupDialog } from './CreateGroupDialog/CreateGroupDialog';
import { useContext, useEffect, useState } from 'react';
import { GradientType } from '@eurovision-game-monorepo/core-ui';
import { BackgroundContext } from '../../components/Layout/Layout';

export const Groups = () => {
  // TODO: groups do not update after delete
  const { data: groups } = useGetGroupsQuery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const selectGradient = useContext(BackgroundContext);

  useEffect(() => {
    selectGradient(GradientType.GRADIENT1);
  }, []);

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
        {(groups || []).map(({ members, name, id }) => (
          <GroupRow key={id} name={name} members={members} groupId={id} />
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
