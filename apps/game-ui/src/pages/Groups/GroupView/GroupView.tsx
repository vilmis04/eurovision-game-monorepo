import { Background } from '@eurovision-game-monorepo/core-ui';
import { useGetGroupQuery } from '../../../api/group/groupApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { ArrowBack, ContentCopy, MoreVert } from '@mui/icons-material';
import { styles } from './GroupView.styles';
import { paths } from '../../../paths';

export const GroupView = () => {
  const navigate = useNavigate();
  const { name = '' } = useParams();
  const { data, isFetching } = useGetGroupQuery({ name }, { skip: !name });
  const [group] = data ?? [];
  const handleBack = () => navigate(paths.groups);
  const handleMore = () => {
    // TODO: add context menu
    console.log('MORE!');
  };
  const copyLink = () => {
    console.log('LINK COPIED!');
  };

  return (
    <Background variant="gradient2" sx={styles.container}>
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
      <Box sx={styles.buttonContainer}>
        {/* TODO: fix buttons focused state */}
        <Button fullWidth sx={styles.invitationLinkButton} onClick={copyLink}>
          <ContentCopy sx={styles.copyIcon} />
          Copy invite link
        </Button>
        <Typography variant="body1" sx={styles.invitationLinkInstructions}>
          Copy invite link and share it with your friends so they can join this
          group.
        </Typography>
      </Box>
    </Background>
  );
};
