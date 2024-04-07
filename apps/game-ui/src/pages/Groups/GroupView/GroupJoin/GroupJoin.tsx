import { Background, GradientType } from '@eurovision-game-monorepo/core-ui';
import { Button, CircularProgress, Typography } from '@mui/material';
import { styles } from './GroupJoin.styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useLazyIsAuthenticatedQuery } from '../../../../api/auth/authApi';
import { useEffect } from 'react';
import { useJoinGroupMutation } from '../../../../api/group/groupApi';
import { paths } from '../../../../paths';

export const GroupJoin = () => {
  const { inviteCode = '' } = useParams();
  const inviteData = window.atob(inviteCode).split(':');
  const isInviteStructureValid = inviteData.length === 3;
  const [groupName] = inviteData;
  const navigate = useNavigate();

  const [getIsAuthenticated, { isFetching, isSuccess }] =
    useLazyIsAuthenticatedQuery();

  const [joinGroup, { isSuccess: isJoinGroupSuccess }] = useJoinGroupMutation();

  useEffect(() => {
    if (isSuccess) {
      joinGroup({ inviteCode });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isJoinGroupSuccess) {
      navigate(paths.group.build(groupName));
    }
  }, [isJoinGroupSuccess]);

  const handleClick = () => {
    getIsAuthenticated();
  };

  return (
    <Background variant={GradientType.GRADIENT1} sx={styles.container}>
      {isInviteStructureValid ? (
        <>
          <Typography variant="h1" sx={styles.title}>
            {`Join "${groupName}"?`}
          </Typography>
          <Typography variant="body1" sx={styles.infoText}>
            To compete with this group's members, join the group.
          </Typography>
          <Button onClick={handleClick} sx={styles.button}>
            {isFetching ? <CircularProgress /> : 'Join Group'}
          </Button>
        </>
      ) : (
        <Typography variant="h1" sx={styles.title}>
          Invalid invitation link
        </Typography>
      )}
    </Background>
  );
};
