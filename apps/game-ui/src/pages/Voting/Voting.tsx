import { GradientType } from '@eurovision-game-monorepo/core-ui';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { BackgroundContext } from '../../components/Layout/Layout';
import { useGetGeneralInfoQuery } from '../../api/generalInfo/generalInfoApi';
import { useGetCountriesQuery } from '../../api/country/countryApi';
import { Topbar } from './Topbar/Topbar';
import { CountryRow } from './CountryRow/CountryRow';
import { styles } from './Voting.styles';

export const Voting: React.FC = () => {
  const selectGradient = useContext(BackgroundContext);
  const { data: generalInfo, isFetching: isFetchingGeneralInfo } =
    useGetGeneralInfoQuery();
  const { data: countryList, isFetching: isFetchingCountries } =
    useGetCountriesQuery(
      { year: Number(generalInfo?.year), gameType: generalInfo?.gameType },
      { skip: !generalInfo }
    );

  const isFetching = isFetchingCountries || isFetchingGeneralInfo;

  useEffect(() => {
    selectGradient(GradientType.GRADIENT2);
  }, []);

  return isFetching ? (
    // TODO: add proper spinner
    <CircularProgress />
  ) : (
    <Box>
      <Topbar gameType={generalInfo?.gameType} />
      <Box>
        {(countryList || []).map(({ name, code, artist, song }) => (
          <CountryRow
            key={name}
            name={name}
            code={code}
            artist={artist}
            song={song}
          />
        ))}
        <Typography variant="body1" sx={styles.notice}>
          Your votes are saved automatically
        </Typography>
      </Box>
    </Box>
  );
};
