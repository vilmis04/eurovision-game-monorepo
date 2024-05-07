import { flagStyle } from '../CountryRow/CountryRow.styles';

export const styles = {
  container: {
    backgroundColor: 'primary.dark',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.5rem 1rem 1.5rem',
    borderBottom: '1px solid',
    borderColor: 'divider',
    marginBottom: '1.5rem',
  },
  flag: {
    ...flagStyle,
  },
  countryInfoWrapper: {
    paddingLeft: '1rem',
  },
  countryName: {
    fontSize: '1.25rem',
    fontWeight: 'medium',
  },
  label: {
    fontWeight: 'light',
  },
  voteGrid: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    paddingX: '1rem',
  },
  textVariant: {
    color: 'common.white',
  },
  cancelButton: {
    padding: '0.5rem 1.25rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 1rem 1.5rem',
  },
  selected: {
    '&&': {
      backgroundColor: 'common.white',
      borderRadius: 0,
    },
  },
  isOccupied: {
    borderRadius: 0,
  },
};
