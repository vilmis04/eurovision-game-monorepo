export const styles = {
  dialog: {
    '& .MuiPaper-root': {
      backgroundColor: '#F2F2F2',
      borderRadius: '0.25rem',
      marginX: '2.25rem',
      padding: '1rem',
    },
  },
  text: {
    color: 'primary.contrastText',
  },
  title: {
    fontWeight: 'medium',
    fontSize: '1.25rem',
  },
  mainText: {
    fontSize: '1rem',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
    paddingTop: '0.75rem',
    gap: '0.75rem',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    backgroundColor: 'secondary.main',
    '& .MuiTypography-root': { color: 'common.white' },
  },
};
