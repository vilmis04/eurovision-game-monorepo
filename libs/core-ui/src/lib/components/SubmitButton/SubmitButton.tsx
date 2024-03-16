import { Button, CircularProgress, Typography } from '@mui/material';
import { styles } from './SubmitButton.styles';

interface SubmitButtonProps {
  isLoading: boolean;
  isDisabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  isDisabled,
}) => (
  <Button type="submit" variant="contained" disabled={isDisabled}>
    {isLoading ? (
      <CircularProgress size={24} sx={styles.spinner} />
    ) : (
      <Typography variant="body1">Sign Up</Typography>
    )}
  </Button>
);
