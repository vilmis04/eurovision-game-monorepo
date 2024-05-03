import { createContext } from 'react';

interface ErrorContextParams {
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  closeErrorOverlay: () => void;
}

export const ErrorContext = createContext<ErrorContextParams>({
  errorMessage: '',
  setErrorMessage: () => {},
  closeErrorOverlay: () => {},
});
