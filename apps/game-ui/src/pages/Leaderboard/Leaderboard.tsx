import { Box, Button, Drawer, MenuItem, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { BackgroundContext } from '../../components/Layout/Layout';
import { GradientType } from '@eurovision-game-monorepo/core-ui';
import { ExpandMore } from '@mui/icons-material';
import { styles } from './Leaderboard.styles';

export const Leaderboard = () => {
  const setBackground = useContext(BackgroundContext);
  useEffect(() => {
    setBackground(GradientType.GRADIENT2);
  }, []);

  const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false);
  const toggleGroupMenu = () => setIsGroupMenuOpen((isOpen) => !isOpen);

  return (
    <>
      <Box sx={styles.container}>
        <Box sx={styles.topBar}>
          <Button
            variant="text"
            sx={styles.groupSelectionButton}
            onClick={toggleGroupMenu}
          >
            <Typography variant="body1" sx={styles.buttonText}>
              All
            </Typography>
            <ExpandMore />
          </Button>
        </Box>
        <Box sx={styles.memberList}>Member List</Box>
      </Box>
      <Drawer
        anchor="bottom"
        open={isGroupMenuOpen}
        onClick={toggleGroupMenu}
        PaperProps={{
          sx: styles.groupMenu,
        }}
      >
        <Typography variant="body1" sx={styles.groupMenuInstruction}>
          Choose group
        </Typography>
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <MenuItem key={index} sx={styles.groupMenuItem}>
              Group {index + 1}
            </MenuItem>
          ))}
      </Drawer>
    </>
  );
};
