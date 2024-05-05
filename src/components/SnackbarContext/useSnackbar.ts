import { useState } from 'react';

type SnackbarVariant = 'success' | 'error';

export const useSnackbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<SnackbarVariant>('success');
  const [message, setMessage] = useState('');
  const onClose = () => setIsOpen(false);
  const openSnackbar = (
    newMessage: string,
    newVariant: SnackbarVariant = 'success'
  ) => {
    setVariant(newVariant);
    setMessage(newMessage);
    setIsOpen(true);
  };

  return {
    isOpen,
    variant,
    message,
    onClose,
    openSnackbar,
  };
};
