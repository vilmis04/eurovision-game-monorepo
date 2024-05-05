import { Theme } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';

export const styles = {
  navbar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: zIndex.drawer + 1,
    background: 'transparent',
    borderTop: '1px solid',
    borderTopColor: 'divider',
  },
  outlet: ({ breakpoints }: Theme) => ({
    position: 'fixed',
    bottom: 56,
    top: 0,
    left: 0,
    right: 0,
    overflow: 'scroll',
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
};
