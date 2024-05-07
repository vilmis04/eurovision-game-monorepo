export const flagStyle = {
  border: '1px solid white',
  objectFit: 'cover',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
};

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    padding: '0.75rem 1.5rem',
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  selected: {
    background:
      'linear-gradient(90deg, rgba(103, 0, 181, 0.3744) 0%, rgba(103, 0, 181, 0.3328) 49%, rgba(103, 0, 181, 0) 100%)',
  },
  flag: {
    ...flagStyle,
  },
  textWrapper: {
    width: '100%',
    padding: '0 1.25rem',
  },
  name: {
    fontSize: '1rem',
    fontWeight: 'medium',
  },
  artist: {
    fontSize: '0.75rem',
    fontWeight: 'medium',
    color: 'primary.light',
  },
  song: {
    fontSize: '0.75rem',
    fontWeight: 'light',
    color: 'primary.light',
  },
  countryInfo: {
    display: 'flex',
    alignItems: 'center',
  },
};
