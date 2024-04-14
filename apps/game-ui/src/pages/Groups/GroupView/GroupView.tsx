import { GradientType } from '@eurovision-game-monorepo/core-ui';
import {
  useCreateInvitationLinkMutation,
  useDeleteGroupMutation,
  useGetGroupQuery,
} from '../../../api/group/groupApi';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styles } from './GroupView.styles';
import { paths } from '../../../paths';
import { SnackbarContext } from '../../../components/SnackbarContext/SnackbarContext';
import { useContext, useEffect, useState } from 'react';
import { BackgroundContext } from '../../../components/Layout/Layout';
import { ContextMenu } from './ContextMenu/ContextMenu';
import { DeleteDialog } from './DeleteDialog/DeleteDialog';
import { AuthContext } from '../../../components/Auth/Auth';
import { InviteButton } from './InviteButton/InviteButton';
import { Navbar } from './Navbar/Navbar';
import { useIntersectionObserver } from '../../../utils/useIntersectionObserver/useIntersectionObserver';

export const GroupView = () => {
  const { id: idString } = useParams();
  const id = Number(idString);
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get('isNew');
  const joined = searchParams.get('joined');

  const navigate = useNavigate();
  const { openSnackbar } = useContext(SnackbarContext);
  const selectGradient = useContext(BackgroundContext);
  const username = useContext(AuthContext);

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
  const [showNavbarTitle, setShouldShowNavbarTitle] = useState(0);

  const { data: groupList, isFetching } = useGetGroupQuery(
    { id },
    { skip: !id }
  );

  // TODO: add error handling / displaying
  const [deleteGroup, { isSuccess: isDeleteGroupSuccess }] =
    useDeleteGroupMutation();
  // TODO: add error handling / displaying
  const [createInviteLink] = useCreateInvitationLinkMutation();

  useIntersectionObserver({
    action: (entry) => {
      setShouldShowNavbarTitle(1 - (entry.intersectionRatio - 0.4) / 0.2);
    },
    domStatus: Boolean(groupList?.length),
    getObservables: () => {
      const element = document.querySelector('[data-ref="observerRef"]');

      return element ? [element] : null;
    },
    options: { threshold: { max: 0.6, min: 0.4 } },
  });

  useEffect(() => {
    if (isDeleteGroupSuccess) {
      openSnackbar(`Group "${group.name}" deleted.`);
      navigate(paths.groups);
    }
  }, [isDeleteGroupSuccess]);

  useEffect(() => {
    selectGradient(GradientType.GRADIENT2);
  }, []);

  useEffect(() => {
    joined && openSnackbar("You've joined the group.");
  }, [joined]);

  useEffect(() => {
    isNew && openSnackbar('Group created.');
  }, [isNew]);

  if (!groupList?.length) {
    return <CircularProgress />;
  }
  const [group] = groupList ?? [];
  const isOwner = username === group.owner;

  const toggleContextMenu = () => setIsContextMenuOpen((isOpen) => !isOpen);
  const toggleDeleteDialog = () => setIsDeleteDialogOpen((isOpen) => !isOpen);

  const handleDelete = () => {
    deleteGroup({ id });
  };
  const handleBack = () => navigate(paths.groups);
  const handleMore = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
    toggleContextMenu();
  };
  const copyLink = async () => {
    const response = await createInviteLink({ id });
    // TODO: add better response handling
    const linkCode = 'data' in response ? response.data : '';
    const { origin } = window.location;
    const inviteLink = `${origin}/groups/join/${linkCode}`;

    navigator.clipboard.writeText(inviteLink);

    openSnackbar(`Invite link copied.`);
  };

  return groupList?.length ? (
    <>
      <Box sx={styles.container}>
        <Navbar
          handleBack={handleBack}
          handleMore={handleMore}
          groupName={group.name}
          titleOpacity={showNavbarTitle}
        />
        <Box sx={styles.groupMembers}>
          {isFetching ? (
            <CircularProgress />
          ) : (
            <Box>
              <Typography
                variant="h1"
                sx={[styles.title]}
                data-ref="observerRef"
              >
                {group.name}
              </Typography>
              {(group.members ?? []).map((member) => (
                <Box key={member} sx={styles.nicknameWrapper}>
                  <Typography variant="body1" sx={styles.nickname}>
                    {member}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <InviteButton copyLink={copyLink} shouldShow={isOwner} />
      </Box>
      <ContextMenu
        isOwner={isOwner}
        copyLink={copyLink}
        deleteGroup={toggleDeleteDialog}
        open={isContextMenuOpen}
        onClose={toggleContextMenu}
        anchorEl={anchorEl as Element}
      />
      <DeleteDialog
        open={isDeleteDialogOpen}
        deleteGroup={handleDelete}
        handleClose={toggleDeleteDialog}
      />
    </>
  ) : (
    <CircularProgress />
  );
};
