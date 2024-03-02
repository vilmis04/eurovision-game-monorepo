'use client';

import { useRouter } from 'next/navigation';
import { useIsAuthorizedQuery } from './api/auth/authApi.client';
import { useEffect } from 'react';
import { paths } from '../paths';
import { Box } from '@mui/material';

export const Dashboard: React.FC = () => {
  const { isFetching, isError, isSuccess } = useIsAuthorizedQuery();
  const router = useRouter();

  useEffect(() => {
    console.log({ isError, isSuccess });
    if (isError) router.push(paths.login);
  }, [isError, isSuccess]);

  return isFetching ? <Box>Loading...</Box> : <Box>Vote for the winners</Box>;
};
