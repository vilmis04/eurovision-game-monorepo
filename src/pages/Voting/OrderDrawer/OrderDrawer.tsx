import { Drawer, Typography, MenuItem } from '@mui/material';
import { OrderBy } from '../Voting.types';
import { styles } from './OrderDrawer.styles';

interface OrderDrawerProps {
  isOpen: boolean;
  handleClose: () => void;
  orderBy: string;
  handleChange: (newOrder: OrderBy) => void;
}

const orderByOptions = [
  {
    value: OrderBy.VOTING,
    label: 'By voting',
  },
  {
    value: OrderBy.PERFORMANCE,
    label: 'By performance number',
  },
  {
    value: OrderBy.ALPHABETICAL,
    label: 'Alphabetical',
  },
];

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  handleClose,
  orderBy,
  handleChange,
}) => (
  <Drawer
    open={isOpen}
    onClose={handleClose}
    PaperProps={{ sx: styles.container }}
    anchor="bottom"
  >
    <Typography variant="body1" sx={styles.message}>
      Select order
    </Typography>
    {orderByOptions.map(({ value, label }) => (
      <MenuItem
        key={value}
        sx={[styles.listItem, value === orderBy && styles.activeListItem]}
        onClick={() => handleChange(value)}
      >
        {label}
      </MenuItem>
    ))}
  </Drawer>
);
