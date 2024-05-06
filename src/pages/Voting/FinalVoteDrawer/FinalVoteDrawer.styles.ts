import { flagStyle } from '../CountryRow/CountryRow.styles';

export const styles = {
  container: {
    backgroundColor: 'primary.dark',
    padding: '1.5rem 1rem',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '1.25rem',
  },
  flag: {
    ...flagStyle,
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
