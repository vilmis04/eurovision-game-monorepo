import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#C894FF',
      dark: '#480082',
      light: '#EFDBFF',
      contrastText: '#241434',
    },
    secondary: {
      main: '#241434',
      light: '#B9A3CC',
      dark: '#9D89B0',
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
        disableRipple: true,
        sx: {
          minHeight: '2.75rem',
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
            background: '#FFF7FF',
          },
        },
        text: {
          background: 'none',
          '& .MuiTypography-root': {
            color: '#241434',
          },
          '&:hover': {
            background: 'none',
          },
        },
      },
    },
  },
});
