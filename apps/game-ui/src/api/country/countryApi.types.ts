import { GameType } from '@eurovision-game-monorepo/types';

export type CountryQueryParams = {
  gameType?: GameType;
  name?: string;
  year: number;
};

export interface Country {
  name: string;
  code: string;
  year: number;
  gameType: GameType;
  score: number;
  isInFinal: boolean;
  artist: string;
  song: string;
  orderSemi: number;
  orderFinal: number;
}
