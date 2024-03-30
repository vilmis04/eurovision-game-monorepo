import { createContext } from 'react';

type SnackbarVariant = 'success' | 'error';

type InitialValues = {
  isOpen: boolean;
  onClose: () => void;
  openSnackbar: (newMessage: string, newVariant?: SnackbarVariant) => void;
  variant: SnackbarVariant;
  message: string;
};

const initialValues: InitialValues = {
  isOpen: false,
  variant: 'success',
  message: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  openSnackbar: (newMessage: string) => {},
};

export const SnackbarContext = createContext(initialValues);
