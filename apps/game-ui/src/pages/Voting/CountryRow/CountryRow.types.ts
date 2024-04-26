import {
  GameType,
  UpdateScoreRequestBody,
} from '@eurovision-game-monorepo/types';

export interface CountryRowProps {
  name: string;
  code: string;
  artist: string;
  song: string;
  gameType: GameType | undefined;
  inFinal: boolean | undefined;
  position: number | undefined;
  updateScore: (body: UpdateScoreRequestBody) => void;
  isSemiSpotAvailable: boolean;
  openVotingModal: (code: string) => void;
}

export interface SemiVoteProps {
  inFinal: boolean | undefined;
  isDisabled: boolean;
  updateScore: CountryRowProps['updateScore'];
}

export interface FinalVoteProps {
  position: number | undefined;
  openModal: () => void;
}
