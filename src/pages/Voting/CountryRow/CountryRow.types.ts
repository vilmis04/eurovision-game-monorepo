import { GameType, UpdateScoreRequestBody } from '../../../types';

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
  isVotingActive: boolean;
}

export interface SemiVoteProps {
  inFinal: boolean | undefined;
  isDisabled: boolean;
  updateScore: CountryRowProps['updateScore'];
  isVotingActive: boolean;
}

export interface FinalVoteProps {
  position: number | undefined;
  openModal: () => void;
  isVotingActive: boolean;
}
