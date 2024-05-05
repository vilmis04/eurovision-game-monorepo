import { useState, useRef, useEffect } from 'react';
import { calculateRemainingTime } from './Voting.utils';

export const useTimeLeft = (endTime: Date | undefined) => {
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

  return timeLeft;
};
