import { useState } from 'react';

export const useErrorOverlay = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const closeErrorOverlay = () => {
    setErrorMessage('');
  };

  return {
    errorMessage,
    setErrorMessage,
    closeErrorOverlay,
  };
};
