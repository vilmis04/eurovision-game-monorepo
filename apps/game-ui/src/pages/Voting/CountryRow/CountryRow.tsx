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
    inFinal,
    position,
    updateScore,
    isSemiSpotAvailable,
    openVotingModal,
    isVotingActive,
  }) => {
    const isFinal = gameType === GameType.FINAL;

    const handleUpdateScore = (body: Partial<UpdateScoreRequestBody>) => {
      updateScore({ country: name, inFinal, position, ...body });
    };

    const openModal = () => {
      openVotingModal(code);
    };

    const voteInput = isFinal ? (
      <FinalVote
        position={position}
        openModal={openModal}
        isVotingActive={isVotingActive}
      />
    ) : (
      <SemiVote
        inFinal={inFinal}
        updateScore={handleUpdateScore}
        isDisabled={!isSemiSpotAvailable}
        isVotingActive={isVotingActive}
      />
    );

    return (
      <Box sx={[styles.container, Boolean(inFinal) && styles.selected]}>
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
