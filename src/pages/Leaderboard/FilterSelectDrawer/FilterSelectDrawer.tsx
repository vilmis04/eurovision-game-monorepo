import { Drawer, MenuItem, Typography } from '@mui/material';
import { LeaderboardResponse } from '../../../api/group/responses';
import { styles } from './FilterSelectDrawer.styles';

interface FilterSelectDrawerProps {
  isOpen: boolean;
  toggleOpen: () => void;
  leaderboardData: LeaderboardResponse | undefined;
  filter: number;
  setFilter: (filter: number) => void;
}

const selectAllItem = [0, 'All'];

export const FilterSelectDrawer: React.FC<FilterSelectDrawerProps> = ({
  isOpen,
  toggleOpen,
  leaderboardData,
  filter,
  setFilter,
}) => (
  <Drawer
    anchor="bottom"
    open={isOpen}
    onClick={toggleOpen}
    PaperProps={{
      sx: styles.groupMenu,
    }}
  >
    <Typography variant="body1" sx={styles.groupMenuInstruction}>
      Choose group
    </Typography>
    {[selectAllItem, ...Object.entries(leaderboardData?.groups || {})].map(
      ([id, name]) => (
        <MenuItem
          key={id}
          sx={[
            styles.groupMenuItem,
            Number(id) === filter && styles.activeGroupMenuItem,
          ]}
          onClick={() => setFilter(Number(id))}
        >
          {name}
        </MenuItem>
      )
    )}
  </Drawer>
);
