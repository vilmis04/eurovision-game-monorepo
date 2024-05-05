import { Button, Dialog, Typography } from '@mui/material';
import { styles } from './ErrorOverlay.styles';
import { useContext } from 'react';
import { ErrorContext } from './ErrorContext';
import { Background, GradientType } from '../Background/Background';

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
          {errorMessage && errorMessage !== 'null' ? `...${errorMessage}` : ''}
        </Typography>
        <Button variant="contained" onClick={handleClick} sx={styles.button}>
          Refresh
        </Button>
      </Background>
    </Dialog>
  );
};
