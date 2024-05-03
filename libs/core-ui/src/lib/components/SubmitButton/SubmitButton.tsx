import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  Typography,
} from '@mui/material';
import { styles } from './SubmitButton.styles';
import { ErrorOutline } from '@mui/icons-material';

interface SubmitButtonProps extends React.PropsWithChildren, ButtonProps {
  isLoading: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  isDisabled,
  children,
  variant = 'contained',
  isError,
  errorMessage = '',
  ...props
}) => (
  <Box sx={styles.container}>
    <Box component="span" sx={styles.errorContainer}>
      {isError && errorMessage && (
        <>
          <ErrorOutline sx={styles.icon} />
          {errorMessage}
        </>
      )}
    </Box>
    <Button
      {...props}
      type="submit"
      variant={variant}
      disabled={isDisabled}
      fullWidth
    >
      {isLoading ? (
        <CircularProgress size={24} sx={styles.spinner} />
      ) : (
        <Typography variant="body1" sx={{ color: 'white' }}>
          {children}
        </Typography>
      )}
    </Button>
  </Box>
);
