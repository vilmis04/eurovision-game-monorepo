export const styles = {
  dialog: {
    '& .MuiPaper-root': {
      backgroundColor: 'primary.dark',
      borderRadius: '0.25rem',
      marginX: '2.25rem',
      padding: '1rem',
    },
  },
  text: {
    color: 'common.white',
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
  cancelButton: {
    '& .MuiTypography-root': { color: 'common.white' },
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    backgroundColor: 'primary.main',
    '& .MuiTypography-root': { color: 'primary.contrastText' },
  },
};
