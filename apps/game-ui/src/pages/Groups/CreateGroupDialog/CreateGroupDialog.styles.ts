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
    padding: '24px',
  },
  title: {
    fontSize: '24px',
    color: 'white',
    paddingTop: '52px',
    paddingBottom: '40px',
  },
  field: {
    marginBottom: '48px',
    '& .MuiInputBase-root::before': {
      borderBottom: '1px solid #B9A3CC',
    },
  },
  adornment: {
    fontSize: '12px',
    color: 'secondary.light',
  },
};
