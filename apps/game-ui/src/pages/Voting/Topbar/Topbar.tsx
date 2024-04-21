import { GameType } from '@eurovision-game-monorepo/types';
import { ArrowDownward } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { styles } from './Topbar.styles';

interface TopbarProps {
  gameType: GameType | undefined;
  selected: number | undefined;
}

const SEMI_LIMIT = 10;
const FINAL_LIMIT = 25;

export const Topbar: React.FC<TopbarProps> = ({ gameType, selected = 0 }) => {
  const gameTypeMessage =
    (gameType &&
      {
        [GameType.SEMI1]: '1st semi-final',
        [GameType.SEMI2]: '2nd semi-final',
        [GameType.FINAL]: 'Final',
      }[gameType]) ||
    '';

  const selectionLimit = gameType === GameType.FINAL ? FINAL_LIMIT : SEMI_LIMIT;

  return (
    <Box>
      <Box sx={styles.topRow}>
        <Typography variant="body1" sx={styles.mediumText}>
          {gameTypeMessage}
        </Typography>
        <Typography variant="body1">
          {'Voting stops in '}
          <Typography component="span" variant="body1" sx={styles.mediumText}>
            05:21
          </Typography>
        </Typography>
      </Box>
      <Box sx={styles.bottomRow}>
        <Typography variant="body1" sx={styles.lightText}>
          {`${selected} / ${selectionLimit} selected`}
        </Typography>
        {/* TODO: update new order rules */}
        <Button variant="text" sx={styles.button}>
          <ArrowDownward />
          Order
        </Button>
      </Box>
    </Box>
  );
};
