import { Background, GradientType } from '@eurovision-game-monorepo/core-ui';
import { Button, Typography } from '@mui/material';
import { styles } from './GroupJoin.styles';
import { useParams } from 'react-router-dom';

export const GroupJoin = () => {
  const { inviteCode = '' } = useParams();
  const inviteData = window.atob(inviteCode).split(':');
  const isInviteStructureValid = inviteData.length === 3;
  const [groupName] = inviteData;

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
          <Button sx={styles.button}>Join Group</Button>
        </>
      ) : (
        <Typography variant="h1" sx={styles.title}>
          Invalid invitation link
        </Typography>
      )}
    </Background>
  );
};
