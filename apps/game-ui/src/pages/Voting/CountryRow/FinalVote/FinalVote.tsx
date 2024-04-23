import { Box, Button, Typography } from '@mui/material';
import { FinalVoteProps } from '../CountryRow.types';
import { ExpandMore } from '@mui/icons-material';

export const FinalVote: React.FC<FinalVoteProps> = ({
  position,
  openModal,
}) => {
  return (
    <Box>
      <Typography
        variant="body1"
        sx={{ fontSize: '0.75rem', textWrap: 'nowrap' }}
      >
        Select place
      </Typography>
      <Button
        variant="contained"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0.25rem 0.5rem',
        }}
        onClick={openModal}
      >
        <Typography variant="body1">{position || ''}</Typography>
        <ExpandMore />
      </Button>
    </Box>
  );
};
