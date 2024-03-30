import { Snackbar, Alert } from '@mui/material';
import { useContext } from 'react';
import { SnackbarContext } from '../SnackbarContext/SnackbarContext';
import { styles } from './Toast.styles';

export const Toast = () => {
  const { isOpen, variant, message, onClose } = useContext(SnackbarContext);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      onClose={onClose}
      sx={styles.toast}
    >
      <Alert onClose={onClose} severity={variant} sx={styles.alert}>
        {message}
      </Alert>
    </Snackbar>
  );
};
