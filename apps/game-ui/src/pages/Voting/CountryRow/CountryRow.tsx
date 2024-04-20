import { Box, Typography } from '@mui/material';
import { styles } from './CountryRow.styles';
import { GameType } from '@eurovision-game-monorepo/types';
import { FinalVote } from './FinalVote/FinalVote';
import { SemiVote } from './SemiVote/SemiVote';
import { CountryRowProps } from './CountryRow.types';

export const CountryRow: React.FC<CountryRowProps> = ({
  artist,
  code,
  name,
  song,
  gameType,
  score,
  updateScore,
}) => {
  const isFinal = gameType === GameType.FINAL;
  const VoteInput = isFinal ? FinalVote : SemiVote;
  const voteInputProps = {
    inFinal: score?.inFinal,
    position: score?.position,
    updateScore,
  };

  return (
    <Box sx={styles.container} key={name}>
      <Box>
        <Box
          component="img"
          src={`public/flags/${code}.svg`}
          sx={styles.flag}
        />
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
      <VoteInput {...voteInputProps} />
    </Box>
  );
};
