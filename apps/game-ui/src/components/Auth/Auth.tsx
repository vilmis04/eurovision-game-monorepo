import { useEffect } from 'react';
import { useIsAuthenticatedQuery } from '../../api/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../paths';
import { CircularProgress } from '@mui/material';

export const Auth: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isFetching, isError } = useIsAuthenticatedQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate(paths.login);
    }
  }, [isError]);

  const isLoading = isFetching || isError;

  // TODO: add proper spinner for loading state (with background and properly centered)
  return isLoading ? <CircularProgress /> : children;
};
