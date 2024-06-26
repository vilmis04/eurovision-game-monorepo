import { GameType } from '../../types';

export type CountryQueryParams = {
  gameType?: GameType;
  name?: string;
  year: number;
};

export interface CountryResponse {
  name: string;
  code: string;
  artist: string;
  song: string;
  orderSemi: number;
  orderFinal: number;
}
