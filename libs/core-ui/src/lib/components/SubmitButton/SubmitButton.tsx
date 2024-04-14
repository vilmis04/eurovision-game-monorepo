import {
  Button,
  ButtonProps,
  CircularProgress,
  Typography,
} from '@mui/material';
import { styles } from './SubmitButton.styles';

interface SubmitButtonProps extends React.PropsWithChildren, ButtonProps {
  isLoading: boolean;
  isDisabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  isDisabled,
  children,
  variant = 'contained',
  ...props
}) => (
  <Button {...props} type="submit" variant={variant} disabled={isDisabled}>
    {isLoading ? (
      <CircularProgress size={24} sx={styles.spinner} />
    ) : (
      <Typography variant="body1" sx={{ color: 'white' }}>
        {children}
      </Typography>
    )}
  </Button>
);
