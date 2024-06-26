import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styles } from './Groups.styles';
import { useGetGroupsQuery } from '../../api/group/groupApi';
import { GroupRow } from './GroupRow/GroupRow';
import { CreateGroupDialog } from './CreateGroupDialog/CreateGroupDialog';
import { useContext, useEffect, useState } from 'react';
import { BackgroundContext } from '../../components/Layout/Layout';
import { useErrorHandler } from '../../components/ErrorOverlay/useErrorHandler';
import { GradientType } from '../../components/Background/Background';
import { Spinner } from '../../components/Spinner/Spinner';

const MINUTE = 60 * 1000;

export const Groups = () => {
  const {
    data: groups,
    isLoading,
    isError,
    error,
  } = useGetGroupsQuery(undefined, { pollingInterval: MINUTE }); // passing undefined because it takes void
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const selectGradient = useContext(BackgroundContext);

  useErrorHandler({ isError, error });

  useEffect(() => {
    selectGradient(GradientType.GRADIENT1);
  }, []);

  const toggleDialog = () => setIsDialogOpen((isOpen) => !isOpen);

  const subheading = groups?.length
    ? 'Create and manage groups'
    : 'Create your first group to get the party started!';

  return (
    <Spinner isLoading={isLoading}>
      <>
        <Box sx={styles.container}>
          <Typography variant="h1" sx={styles.title}>
            Your Groups
          </Typography>
          <Typography variant="h2" sx={styles.subtitle}>
            {subheading}
          </Typography>
          <Box component="fieldset" tabIndex={0} sx={styles.groupLinkWrapper}>
            <Box component="legend" sx={styles.srOnly}>
              Group list
            </Box>
            {(groups || []).map(({ members, name, id }) => (
              <GroupRow key={id} name={name} members={members} groupId={id} />
            ))}
          </Box>
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
    </Spinner>
  );
};
