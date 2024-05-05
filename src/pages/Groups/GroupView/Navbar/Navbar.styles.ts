export const getStyles = (titleOpacity: number) => ({
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem 1.5rem',
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
