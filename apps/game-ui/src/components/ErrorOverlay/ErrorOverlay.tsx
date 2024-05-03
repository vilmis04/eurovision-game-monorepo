import { Background, GradientType } from '@eurovision-game-monorepo/core-ui';
import { Button, Dialog, Typography } from '@mui/material';
import { styles } from './ErrorOverlay.styles';
import { useContext } from 'react';
import { ErrorContext } from './ErrorContext';

export const ErrorOverlay = () => {
  const { errorMessage } = useContext(ErrorContext);
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <Dialog open={Boolean(errorMessage)} fullWidth>
      <Background variant={GradientType.SOLID1} sx={styles.container}>
        <Typography variant="h1" sx={styles.title}>
          Something went wrong...
        </Typography>
        <Typography variant="body1" sx={styles.infoText}>
          ...{errorMessage}
        </Typography>
        <Button variant="contained" onClick={handleClick} sx={styles.button}>
          Retry
        </Button>
      </Background>
    </Dialog>
  );
};
