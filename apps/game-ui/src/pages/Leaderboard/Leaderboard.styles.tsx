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
  groupMenu: {
    backgroundColor: 'primary.dark',
    padding: '0.25rem 0 0.5rem',
  },
  groupMenuInstruction: {
    borderBottom: '1px solid',
    borderColor: 'divider',
    padding: '1rem 1.5rem',
  },
  groupMenuItem: {
    padding: '1rem 1.5rem',
  },
};
