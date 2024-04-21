import {
  GameType,
  GetScoresResponse,
  UpdateScoreRequestBody,
} from '@eurovision-game-monorepo/types';

export interface CountryRowProps {
  name: string;
  code: string;
  artist: string;
  song: string;
  gameType: GameType | undefined;
  score: GetScoresResponse | undefined;
  updateScore: (body: UpdateScoreRequestBody) => void;
  isSemiSpotAvailable: boolean;
  notAvailableSpots: number[];
}

export interface SemiVoteProps {
  inFinal: boolean | undefined;
  isDisabled: boolean;
  updateScore: CountryRowProps['updateScore'];
}

export interface FinalVoteProps {
  position: number | undefined;
  notAvailableSpots: number[];
  updateScore: CountryRowProps['updateScore'];
}
