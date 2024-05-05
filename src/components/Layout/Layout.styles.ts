import { Theme } from '@mui/material';

export const styles = {
  navbar: {
    width: '100vw',
    background: 'transparent',
    borderTop: '1px solid',
    borderTopColor: 'divider',
  },
  outlet: ({ breakpoints }: Theme) => ({
    overflow: 'scroll',
    height: '100%',
    scrollbarWidth: 'thin',
    overflowX: 'hidden',
    scrollbarColor: 'rgba(150,150,150,0.25) transparent',
    [breakpoints.up('sm')]: {
      marginX: 'auto',
      width: '100%',
      maxWidth: '500px',
    },
  }),
  default: {
    color: 'white',
  },
  active: {
    color: 'primary.main',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
};
