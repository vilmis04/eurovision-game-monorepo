import { Box, Typography } from '@mui/material';
import { styles } from './CountryRow.styles';

interface CountryRowProps {
  name: string;
  code: string;
  artist: string;
  song: string;
}

export const CountryRow: React.FC<CountryRowProps> = ({
  artist,
  code,
  name,
  song,
}) => (
  <Box sx={styles.container} key={name}>
    <Box>
      <Box component="img" src={`public/flags/${code}.svg`} sx={styles.flag} />
    </Box>
    <Box sx={styles.textWrapper}>
      <Typography variant="body1" sx={styles.name}>
        {name}
      </Typography>
      <Typography variant="body1" sx={styles.artist}>
        {artist}
      </Typography>
      <Typography variant="body1" sx={styles.song}>
        {song}
      </Typography>
    </Box>
    <Box>Vote here</Box>
  </Box>
);
