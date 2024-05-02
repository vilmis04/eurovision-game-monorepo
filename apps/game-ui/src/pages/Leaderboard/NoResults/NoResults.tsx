import { Box, Typography } from '@mui/material';
import { styles } from './NoResults.styles';

export const NoResults = () => (
  <Box sx={styles.noResults}>
    <Typography variant="body1" sx={styles.label}>
      No results yet
    </Typography>
    <Typography variant="body1">
      Leaderboard will appear here ince the results are in.
    </Typography>
  </Box>
);
