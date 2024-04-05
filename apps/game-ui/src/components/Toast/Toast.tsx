import { Snackbar, Alert, Typography } from '@mui/material';
import { useContext } from 'react';
import { SnackbarContext } from '../SnackbarContext/SnackbarContext';
import { styles } from './Toast.styles';
import { CheckCircle } from '@mui/icons-material';

export const Toast = () => {
  const { isOpen, variant, message, onClose } = useContext(SnackbarContext);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      onClose={onClose}
      sx={styles.toast}
    >
      {/* TODO: add error icon */}
      <Alert severity={variant} sx={styles.alert} icon={<CheckCircle />}>
        <Typography
          variant="body1"
          sx={{ color: 'black', fontSize: '0.75rem' }}
        >
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
};
