import { ArrowBack, MoreVert } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { styles } from './Navbar.styles';

interface INavbarProps {
  handleBack: () => void;
  handleMore: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  groupName: string;
}

export const Navbar: React.FC<INavbarProps> = ({
  handleBack,
  handleMore,
  groupName,
}) => (
  <Box sx={styles.nav}>
    <ArrowBack sx={styles.icon} onClick={handleBack} />
    <Typography sx={styles.groupName} variant="body1">
      {groupName}
    </Typography>
    <MoreVert sx={styles.icon} onClick={handleMore} />
  </Box>
);