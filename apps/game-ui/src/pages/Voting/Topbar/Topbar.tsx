import { GameType } from '@eurovision-game-monorepo/types';
import { ExpandMore } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { styles } from './Topbar.styles';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

interface TopbarProps {
  gameType: GameType | undefined;
  selected: number | undefined;
  endTime: Date | undefined;
  toggleOrderDrawer: () => void;
}

const SEMI_LIMIT = 10;
const FINAL_LIMIT = 25;

const calculateRemainingTime = (endTime: Date | undefined) => {
  const remainingTime = dayjs(endTime).diff(dayjs(), 'seconds');
  const remainingMinutes = Math.floor(remainingTime / 60);
  const remainingSeconds = remainingTime % 60;
  const formatTime = (time: number) => `${time < 10 ? '0' : ''}${time}`;

  return remainingTime >= 0
    ? `${formatTime(remainingMinutes)}:${formatTime(remainingSeconds)}`
    : '';
};

export const Topbar: React.FC<TopbarProps> = ({
  gameType,
  selected = 0,
  endTime,
  toggleOrderDrawer,
}) => {
  const [timeLeft, setTimeLeft] = useState(calculateRemainingTime(endTime));
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (endTime) {
      timerRef.current = setInterval(() => {
        setTimeLeft(calculateRemainingTime(endTime));
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [endTime]);

  const gameTypeMessage =
    (gameType &&
      {
        [GameType.SEMI1]: '1st semi-final',
        [GameType.SEMI2]: '2nd semi-final',
        [GameType.FINAL]: 'Final',
      }[gameType]) ||
    '';

  const getEndTimeMessage = (endTime: Date | undefined) => {
    const timeString = timeLeft ? 'Voting stops in ' : 'Time ended';
    return endTime ? timeString : '';
  };

  const selectionLimit = gameType === GameType.FINAL ? FINAL_LIMIT : SEMI_LIMIT;

  return (
    <Box>
      <Box sx={styles.topRow}>
        <Typography variant="body1" sx={styles.mediumText}>
          {gameTypeMessage}
        </Typography>
        <Box sx={styles.timer}>
          <Typography variant="body1">{getEndTimeMessage(endTime)}</Typography>
          <Typography
            component="span"
            variant="body1"
            sx={[styles.mediumText, styles.time]}
          >
            {timeLeft.split('').map((char, index) => (
              <Box key={index} sx={[char !== ':' && styles.digit]}>
                {char}
              </Box>
            ))}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.bottomRow}>
        <Typography variant="body1" sx={styles.lightText}>
          {`${selected} / ${selectionLimit} selected`}
        </Typography>
        <Button variant="text" sx={styles.button} onClick={toggleOrderDrawer}>
          Order
          <ExpandMore />
        </Button>
      </Box>
    </Box>
  );
};
