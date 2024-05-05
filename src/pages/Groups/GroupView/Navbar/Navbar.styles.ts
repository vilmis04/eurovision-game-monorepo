export const getStyles = (titleOpacity: number) => ({
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingX: '1.5rem',
    height: '4.5rem',
    minHeight: '4.5rem',
  },
  navDivider: {
    borderBottom: '1px solid',
    borderBottomColor: 'divider',
  },
  icon: {
    color: 'common.white',
  },
  groupName: {
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    opacity: titleOpacity,
    transform: `translateY(${15 * (1 - titleOpacity)}%)`,
    padding: '0 1em',
  },
});
