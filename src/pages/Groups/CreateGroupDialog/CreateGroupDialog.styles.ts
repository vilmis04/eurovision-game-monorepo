export const styles = {
  topbar: {
    display: 'flex',
    justifyContent: 'end',
  },
  icon: {
    color: 'white',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem',
    maxWidth: '500px',
    marginX: 'auto',
  },
  title: {
    fontSize: '1.5rem',
    color: 'white',
    paddingTop: '3.25rem',
    paddingBottom: '2.5rem',
    fontWeight: 'medium',
  },
  field: {
    marginBottom: '0.5rem',
    '& .MuiInputBase-root::before': {
      borderBottom: '1px solid',
      borderColor: 'secondary.light',
    },
  },
  adornment: {
    fontSize: '0.75rem',
    color: 'secondary.light',
  },
};
