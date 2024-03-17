import { Button, CircularProgress, Typography } from '@mui/material';
import { styles } from './SubmitButton.styles';

interface SubmitButtonProps extends React.PropsWithChildren {
  isLoading: boolean;
  isDisabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  isDisabled,
  children,
}) => (
  <Button type="submit" variant="contained" disabled={isDisabled}>
    {isLoading ? (
      <CircularProgress size={24} sx={styles.spinner} />
    ) : (
      <Typography variant="body1">{children}</Typography>
    )}
  </Button>
);
