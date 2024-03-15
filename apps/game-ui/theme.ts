import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#C894FF',
      contrastText: '#241434',
      '700': '#C894FF',
    },
    secondary: {
      main: '#241434',
      '100': '#241434',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        sx: { textTransform: 'inherit !important' },
      },
    },
  },
});
