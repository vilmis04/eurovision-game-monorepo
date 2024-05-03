import { Box, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';
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
import { OrderDrawer } from './OrderDrawer/OrderDrawer';
import { OrderBy } from './Voting.types';
import { orderCountries } from './Voting.utils';
import { useErrorHandler } from '../../components/ErrorOverlay/useErrorHandler';
import { GradientType } from '../../components/Background/Background';
import { Spinner } from '../../components/Spinner/Spinner';

export const Voting: React.FC = () => {
  const selectGradient = useContext(BackgroundContext);
  useEffect(() => {
    selectGradient(GradientType.GRADIENT2);
  }, []);

  const {
    data: generalInfo,
    isFetching: isFetchingGeneralInfo,
    isError: isGetGeneralInfoError,
    error: getGeneralInfoError,
  } = useGetGeneralInfoQuery();
  const {
    data: countryList,
    isFetching: isFetchingCountries,
    isError: isGetCountriesError,
    error: getCountriesError,
  } = useGetCountriesQuery(
    { year: Number(generalInfo?.year), gameType: generalInfo?.gameType },
    { skip: !generalInfo }
  );
  const {
    data: scoreList,
    isError: isGetScoreListError,
    error: getScoreListError,
  } = useGetScoresQuery();
  const [
    updateScore,
    { isError: isUpdateScoreError, error: updateScoreError },
  ] = useUpdateScoreMutation();

  const isError =
    isUpdateScoreError ||
    isGetScoreListError ||
    isGetCountriesError ||
    isGetGeneralInfoError;
  const error =
    updateScoreError ||
    getScoreListError ||
    getCountriesError ||
    getGeneralInfoError;
  useErrorHandler({ error, isError });

  const isFetching = isFetchingCountries || isFetchingGeneralInfo;
  const isVotingActive = Boolean(generalInfo?.isVotingActive);

  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [orderBy, setOrderBy] = useState(OrderBy.VOTING);

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

  const toggleOrderDrawer = () => setIsOrderDrawerOpen((isOpen) => !isOpen);

  const handleOrderByChange = (newOrder: OrderBy) => {
    setOrderBy(newOrder);
    toggleOrderDrawer();
  };

  const openVotingModal = useCallback((code: string) => {
    setCountryCode(code);
  }, []);

  const orderedCountryList = orderCountries(
    [...(countryList || [])],
    orderBy,
    generalInfo?.gameType,
    scoreList
  );

  return (
    <Spinner isLoading={isFetching}>
      <>
        <Box sx={styles.container}>
          <Topbar
            gameType={generalInfo?.gameType}
            selected={scoredCountries}
            endTime={generalInfo?.votingEnd}
            toggleOrderDrawer={toggleOrderDrawer}
          />
          <Box sx={styles.countries}>
            {orderedCountryList.map(({ name, code, artist, song }) => {
              const { inFinal, position } =
                scoreList?.find(({ country }) => country === name) || {};

              return (
                <CountryRow
                  key={name}
                  name={name}
                  code={code}
                  artist={artist}
                  song={song}
                  gameType={generalInfo?.gameType}
                  inFinal={inFinal}
                  position={position}
                  updateScore={updateScore}
                  isSemiSpotAvailable={isSemiSpotAvailable}
                  openVotingModal={openVotingModal}
                  isVotingActive={isVotingActive}
                />
              );
            })}
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
        <OrderDrawer
          isOpen={isOrderDrawerOpen}
          handleClose={toggleOrderDrawer}
          orderBy={orderBy}
          handleChange={handleOrderByChange}
        />
      </>
    </Spinner>
  );
};
