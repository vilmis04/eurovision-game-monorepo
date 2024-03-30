import { createContext } from 'react';

type SnackbarVariant = 'success' | 'error';

type InitialValues = {
  isOpen: boolean;
  toggleOpen?: () => void;
  changeMessage?: (newMessage: string) => void;
  variant: SnackbarVariant;
  changeVariant?: (newVariant: SnackbarVariant) => void;
  message: string;
};

const initialValues: InitialValues = {
  isOpen: false,
  variant: 'success',
  message: '',
};

export const SnackbarContext = createContext(initialValues);
