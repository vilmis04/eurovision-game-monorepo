import { createContext, useEffect } from 'react';
import { useIsAuthenticatedQuery } from '../../api/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../paths';
import { Spinner } from '../Spinner/Spinner';

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
      <Spinner isLoading={isLoading} color="secondary">
        {children}
      </Spinner>
    </AuthContext.Provider>
  );
};
