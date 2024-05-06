import { Box, CircularProgress, CircularProgressProps } from '@mui/material';
import { styles } from './Spinner.styles';

interface SpinnerProps
  extends React.PropsWithChildren,
    Partial<CircularProgressProps> {
  isLoading: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({
  isLoading,
  children,
  ...props
}) =>
  isLoading ? (
    <Box sx={styles.spinner}>
      <CircularProgress {...props} />
    </Box>
  ) : (
    children
  );
