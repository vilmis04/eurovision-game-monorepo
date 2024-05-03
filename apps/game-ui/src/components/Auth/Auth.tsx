import { createContext, useEffect } from 'react';
import { useIsAuthenticatedQuery } from '../../api/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../paths';
import { Spinner } from '../Spinner/Spinner';
import { Box } from '@mui/material';

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

  return (
    <AuthContext.Provider value={user}>
      <Box sx={{ height: '100vh', width: '100vw' }}>
        <Spinner isLoading={isLoading} color="secondary">
          {children}
        </Spinner>
      </Box>
    </AuthContext.Provider>
  );
};
