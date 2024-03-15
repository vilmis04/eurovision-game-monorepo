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
      '700': '#B9A3CC',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          textTransform: 'inherit !important',
        },
      },
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            background: '#B9A3CC',
            color: '#241434',
            textTransform: 'inherit !important',
          },
        },
      },
    },
  },
});
