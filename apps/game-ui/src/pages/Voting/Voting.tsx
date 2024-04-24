import { GradientType } from '@eurovision-game-monorepo/core-ui';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
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
import { FinalVoteDrawer } from './FinalVoteDrawer/FinalVoteDrawer';

export const Voting: React.FC = () => {
  const selectGradient = useContext(BackgroundContext);
  useEffect(() => {
    selectGradient(GradientType.GRADIENT2);
  }, []);

  // TODO: error handling
  const { data: generalInfo, isFetching: isFetchingGeneralInfo } =
    useGetGeneralInfoQuery();
  const { data: countryList, isFetching: isFetchingCountries } =
    useGetCountriesQuery(
      { year: Number(generalInfo?.year), gameType: generalInfo?.gameType },
      { skip: !generalInfo }
    );
  const { data: scoreList } = useGetScoresQuery();
  const [updateScore] = useUpdateScoreMutation();

  const isFetching = isFetchingCountries || isFetchingGeneralInfo;

  const [countryCode, setCountryCode] = useState<string | null>(null);

  const openVotingModal = (code: string) => {
    setCountryCode(code);
  };

  const scoredCountries = scoreList?.filter(({ inFinal, position }) =>
    generalInfo?.gameType === GameType.FINAL ? position : inFinal
  ).length;
  const notAvailableSpots = (scoreList || [])
    .filter(({ position }) => position)
    .map(({ position }) => position);
  const isSemiSpotAvailable =
    (scoreList || []).filter(({ inFinal }) => inFinal).length < 10;
  const votingCountry = countryList?.find(({ code }) => code === countryCode);
  const handleClose = () => {
    setCountryCode(null);
  };

  const votingScore = scoreList?.find(
    ({ country }) => country === votingCountry?.name
  );

  return isFetching ? (
    // TODO: add proper spinner
    <CircularProgress />
  ) : (
    <>
      <Box sx={styles.container}>
        <Topbar
          gameType={generalInfo?.gameType}
          selected={scoredCountries}
          endTime={generalInfo?.votingEnd}
        />
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
              isSemiSpotAvailable={isSemiSpotAvailable}
              openVotingModal={openVotingModal}
            />
          ))}
          <Typography variant="body1" sx={styles.notice}>
            Your votes are saved automatically
          </Typography>
        </Box>
      </Box>
      <FinalVoteDrawer
        countryCode={countryCode}
        handleClose={handleClose}
        updateScore={updateScore}
        notAvailableSpots={notAvailableSpots}
        votingScore={votingScore}
        votingCountry={votingCountry}
      />
    </>
  );
};
