import { Background } from '@eurovision-game-monorepo/core-ui';
import { useGetGroupQuery } from '../../../api/group/groupApi';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ArrowBack, MoreVert } from '@mui/icons-material';
import { styles } from './GroupView.styles';

export const GroupView = () => {
  const { name = '' } = useParams();
  const { data: group, isFetching } = useGetGroupQuery(
    { name },
    { skip: !name }
  );

  return (
    <Background variant="gradient2" sx={styles.container}>
      <Box sx={styles.nav}>
        <ArrowBack
          sx={styles.icon}
          onClick={() => {
            console.log('BACK!');
          }}
        />
        <MoreVert
          sx={styles.icon}
          onClick={() => {
            console.log('MORE!');
          }}
        />
      </Box>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h1" sx={styles.title}>
            {group?.name}
          </Typography>
          {(group?.members ?? []).map((member) => (
            <Box sx={styles.nicknameWrapper}>
              <Typography variant="body1" sx={styles.nickname}>
                {member}
              </Typography>
            </Box>
          ))}
        </>
      )}
    </Background>
  );
};
