export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  title: {
    fontSize: '1.5rem',
    padding: '2.5rem 0',
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  nicknameWrapper: {
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
  },
  nickname: {
    fontSize: '1rem',
    padding: '1rem 0',
  },
  groupMembers: {
    overflow: 'scroll',
    height: '100%',
    padding: '0rem 1.5rem',
  },
};
