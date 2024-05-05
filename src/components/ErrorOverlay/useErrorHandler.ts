import { useContext, useEffect } from 'react';
import { ErrorContext } from './ErrorContext';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface ErrorHandlerProps {
  error: FetchBaseQueryError | SerializedError | undefined;
  isError: boolean;
}

export const useErrorHandler = ({ error, isError }: ErrorHandlerProps) => {
  const { setErrorMessage } = useContext(ErrorContext);

  useEffect(() => {
    if (isError) {
      error && 'data' in error && setErrorMessage(`${error.data}`);
    }
  }, [isError]);
};
