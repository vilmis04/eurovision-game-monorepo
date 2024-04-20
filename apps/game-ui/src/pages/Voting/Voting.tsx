import { GradientType } from '@eurovision-game-monorepo/core-ui';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { BackgroundContext } from '../../components/Layout/Layout';
import { useGetGeneralInfoQuery } from '../../api/generalInfo/generalInfoApi';
import { useGetCountriesQuery } from '../../api/country/countryApi';
import { Topbar } from './Topbar/Topbar';
import { CountryRow } from './CountryRow/CountryRow';
import { styles } from './Voting.styles';
import {
  useGetScoresQuery,
  useUpdateScoreMutation,
} from '../../api/score/scoreApi';
import { GameType } from '@eurovision-game-monorepo/types';

export const Voting: React.FC = () => {
  const selectGradient = useContext(BackgroundContext);
  const { data: generalInfo, isFetching: isFetchingGeneralInfo } =
    useGetGeneralInfoQuery();
  const { data: countryList, isFetching: isFetchingCountries } =
    useGetCountriesQuery(
      { year: Number(generalInfo?.year), gameType: generalInfo?.gameType },
      { skip: !generalInfo }
    );
  const { data: scoreList, isFetching: isFetchingScoreList } =
    useGetScoresQuery();

  const [updateScore] = useUpdateScoreMutation();

  const isFetching =
    isFetchingCountries || isFetchingGeneralInfo || isFetchingScoreList;

  useEffect(() => {
    selectGradient(GradientType.GRADIENT2);
  }, []);

  const scoredCountries = scoreList?.filter(({ inFinal, position }) =>
    generalInfo?.gameType === GameType.FINAL ? inFinal : position
  ).length;

  return isFetching ? (
    // TODO: add proper spinner
    <CircularProgress />
  ) : (
    <Box sx={styles.container}>
      <Topbar gameType={generalInfo?.gameType} selected={scoredCountries} />
      <Box sx={styles.countries}>
        {(countryList || []).map(({ name, code, artist, song }) => (
          <CountryRow
            key={name}
            name={name}
            code={code}
            artist={artist}
            song={song}
            gameType={generalInfo?.gameType}
            score={scoreList?.find(({ country }) => country === name)}
            updateScore={updateScore}
          />
        ))}
        <Typography variant="body1" sx={styles.notice}>
          Your votes are saved automatically
        </Typography>
      </Box>
    </Box>
  );
};
