import { Box, Typography } from '@mui/material';
import { styles } from './CountryRow.styles';
import {
  GameType,
  UpdateScoreRequestBody,
} from '@eurovision-game-monorepo/types';
import { FinalVote } from './FinalVote/FinalVote';
import { SemiVote } from './SemiVote/SemiVote';
import { CountryRowProps } from './CountryRow.types';
import React, { memo } from 'react';

export const CountryRow: React.FC<CountryRowProps> = memo(
  ({
    artist,
    code,
    name,
    song,
    gameType,
    score,
    updateScore,
    isSemiSpotAvailable,
  }) => {
    const isFinal = gameType === GameType.FINAL;

    const handleUpdateScore = (body: Partial<UpdateScoreRequestBody>) => {
      updateScore({ ...score, ...body });
    };

    const voteInput = isFinal ? (
      <FinalVote position={score?.position} />
    ) : (
      <SemiVote
        inFinal={score?.inFinal}
        updateScore={handleUpdateScore}
        isDisabled={!isSemiSpotAvailable}
      />
    );

    return (
      <Box sx={styles.container} key={name}>
        <Box>
          <Box component="img" src={`flags/${code}.svg`} sx={styles.flag} />
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
        {voteInput}
      </Box>
    );
  }
);
