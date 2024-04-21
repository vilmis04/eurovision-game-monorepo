export interface UpdateScoreRequestBody {
  country?: string;
  inFinal?: boolean;
  position?: number;
}

export interface GetScoresResponse {
  country: string;
  inFinal: boolean;
  position: number;
}
