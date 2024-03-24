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
  ...props
}) => (
  <Button {...props} type="submit" disabled={isDisabled}>
    {isLoading ? (
      <CircularProgress size={24} sx={styles.spinner} />
    ) : (
      <Typography variant="body1">{children}</Typography>
    )}
  </Button>
);
