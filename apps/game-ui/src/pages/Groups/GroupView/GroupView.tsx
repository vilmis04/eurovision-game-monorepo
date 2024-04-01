import { GradientType } from '@eurovision-game-monorepo/core-ui';
import { useGetGroupQuery } from '../../../api/group/groupApi';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { ArrowBack, ContentCopy, MoreVert } from '@mui/icons-material';
import { styles } from './GroupView.styles';
import { paths } from '../../../paths';
import { SnackbarContext } from '../../../components/SnackbarContext/SnackbarContext';
import { useContext, useEffect, useState } from 'react';
import { BackgroundContext } from '../../../components/Layout/Layout';
import { ContextMenu } from './ContextMenu/ContextMenu';

export const GroupView = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useContext(SnackbarContext);
  const { name = '' } = useParams();
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get('isNew');
  const { data, isFetching } = useGetGroupQuery({ name }, { skip: !name });
  const selectGradient = useContext(BackgroundContext);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);

  useEffect(() => {
    selectGradient(GradientType.GRADIENT2);
  }, []);

  useEffect(() => {
    isNew && openSnackbar('Group created.');
  }, [isNew]);

  const toggleContextMenu = () => setIsContextMenuOpen((isOpen) => !isOpen);

  const [group] = data ?? [];
  const handleBack = () => navigate(paths.groups);
  const handleMore = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
    toggleContextMenu();
  };
  const copyLink = () => {
    // TODO: add link generation
    console.log('LINK COPIED!');
  };

  return (
    <>
      <Box sx={styles.container}>
        <Box>
          <Box sx={styles.nav}>
            <ArrowBack sx={styles.icon} onClick={handleBack} />
            <MoreVert sx={styles.icon} onClick={handleMore} />
          </Box>
          {isFetching ? (
            <CircularProgress />
          ) : (
            <>
              <Typography variant="h1" sx={styles.title}>
                {group.name}
              </Typography>
              {(group.members ?? []).map((member) => (
                <Box key={member} sx={styles.nicknameWrapper}>
                  <Typography variant="body1" sx={styles.nickname}>
                    {member}
                  </Typography>
                </Box>
              ))}
            </>
          )}
        </Box>
        <Box>
          <Button fullWidth sx={styles.invitationLinkButton} onClick={copyLink}>
            <ContentCopy sx={styles.copyIcon} />
            Copy invite link
          </Button>
          <Typography variant="body1" sx={styles.invitationLinkInstructions}>
            Copy invite link and share it with your friends so they can join
            this group.
          </Typography>
        </Box>
      </Box>
      <ContextMenu
        copyLink={copyLink}
        deleteGroup={() => {
          console.log(`Delete group: ${name}`);
        }}
        open={isContextMenuOpen}
        onClose={toggleContextMenu}
        anchorEl={anchorEl as Element}
      />
    </>
  );
};
