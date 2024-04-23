import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#C894FF',
      A100: '#480082',
      contrastText: '#241434',
    },
    secondary: {
      main: '#241434',
      light: '#B9A3CC',
    },
    error: {
      main: '#FF897D',
      light: '#BA1A1A',
    },
    common: {
      white: '#FFF7FF',
    },
    divider: '#69577B',
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    allVariants: {
      color: '#FFF7FF',
    },
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
          background: '#C894FF',
          color: '#241434',
          textTransform: 'inherit',
          '&:hover': {
            background: '#B9A3CC',
          },
          '&.Mui-disabled': {
            background: '#B9A3CC',
            color: '#241434',
            '& .MuiTypography-root': {
              color: '#241434',
            },
            textTransform: 'inherit !important',
          },
        },
        outlined: {
          background: 'transparent',
          border: '1px solid #FFF7FF',
          padding: '12px',
          color: '#FFF7FF',
          '&:hover': {},
        },
        contained: {
          color: '#241434',
          '& .MuiTypography-root': {
            color: '#241434',
          },
          '&:hover': {
            background: '#C894FF',
          },
        },
        text: {
          background: 'none',
          '& .MuiTypography-root': {
            color: '#241434',
          },
        },
      },
    },
  },
});
