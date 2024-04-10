import { createContext, useEffect } from 'react';
import { useIsAuthenticatedQuery } from '../../api/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../paths';
import { CircularProgress } from '@mui/material';

export const AuthContext = createContext<string | undefined>('');

export const Auth: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data: user, isFetching, isError } = useIsAuthenticatedQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate(paths.login);
    }
  }, [isError]);

  const isLoading = isFetching || isError;

  // TODO: add proper spinner for loading state (with background and properly centered)
  return (
    <AuthContext.Provider value={user}>
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};
