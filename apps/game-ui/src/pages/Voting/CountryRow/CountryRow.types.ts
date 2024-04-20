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
}

export interface VoteProps {
  inFinal: boolean | undefined;
  position: number | undefined;
  updateScore: CountryRowProps['updateScore'];
}
