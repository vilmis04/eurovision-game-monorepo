import { GameType, GetScoresResponse } from '@eurovision-game-monorepo/types';
import { CountryResponse } from '../../api/country/countryApi.types';
import { OrderBy } from './Voting.types';
import dayjs from 'dayjs';

const orderFinalists =
  (scores: GetScoresResponse[]) => (a: CountryResponse, b: CountryResponse) => {
    const aPosition = scores.find(
      ({ country }) => country === a.name
    )?.position;
    const bPosition = scores.find(
      ({ country }) => country === b.name
    )?.position;

    return Number(aPosition) - Number(bPosition);
  };

const orderByPerformance =
  (performanceOrder: 'orderSemi' | 'orderFinal') =>
  (a: CountryResponse, b: CountryResponse) =>
    a[performanceOrder] - b[performanceOrder];

export const orderCountries = (
  countries: CountryResponse[] = [],
  orderBy: OrderBy,
  gameType: GameType | undefined,
  scores: GetScoresResponse[] = []
) => {
  const performanceOrder =
    gameType === GameType.FINAL ? 'orderFinal' : 'orderSemi';
  const isFinal = gameType === GameType.FINAL;

  const votedCountries = countries.filter(
    ({ name }) => scores.find(({ country }) => country === name)?.inFinal
  );
  const restCountries = countries.filter(
    ({ name }) => !votedCountries.find((voted) => voted.name === name)
  );

  switch (orderBy) {
    case OrderBy.VOTING:
      return [
        ...votedCountries,
        ...restCountries.sort(
          isFinal
            ? orderFinalists(scores)
            : orderByPerformance(performanceOrder)
        ),
      ];
    case OrderBy.PERFORMANCE:
      return countries.sort(orderByPerformance(performanceOrder));
    case OrderBy.ALPHABETICAL:
      return countries.sort((a, b) => {
        if (a.name === b.name) return 0;
        return a.name < b.name ? -1 : 1;
      });
  }
};

export const calculateRemainingTime = (endTime: Date | undefined) => {
  const remainingTime = dayjs(endTime).diff(dayjs(), 'seconds');
  const remainingMinutes = Math.floor(remainingTime / 60);
  const remainingSeconds = remainingTime % 60;
  const formatTime = (time: number) => `${time < 10 ? '0' : ''}${time}`;

  return remainingTime >= 0
    ? `${formatTime(remainingMinutes)}:${formatTime(remainingSeconds)}`
    : '';
};
