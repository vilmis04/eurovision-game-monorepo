export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'space-between',
  },
  topBar: {
    padding: '1.5rem',
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
  },
  groupSelectionButton: {
    '& .MuiTypography-root': {
      color: 'common.white',
    },
    color: 'common.white',
  },
  buttonText: {
    paddingRight: '0.5rem',
  },
  memberList: {
    padding: '0.75rem 1.5rem',
    height: '100%',
    overflow: 'scroll',
  },
  playerNameBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  positionNumber: {
    fontWeight: 'medium',
    minWidth: '1.5rem',
  },
  playerTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '1rem',
  },
  playerName: {
    fontWeight: 'medium',
  },
  playerScore: {
    fontWeight: 'light',
  },
  ranking: {
    '& svg': {
      width: '2.5rem',
      height: '2.5rem',
    },
  },
};
