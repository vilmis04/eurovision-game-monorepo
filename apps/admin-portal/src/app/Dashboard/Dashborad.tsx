'use client';

import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

export const Dashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box>
      <Typography variant="h1">Config</Typography>
      <Tabs value={tabIndex} onChange={(e, tab: number) => setTabIndex(tab)}>
        {/* TODO: add a11y attributes */}
        <Tab label="General" />
        <Tab label="Countries" />
      </Tabs>
      <Box>
        {
          [
            <Typography variant="body1">
              General settings, such as year, gametype, etc.
            </Typography>,
            <Typography variant="body1">
              Country creation and scores
            </Typography>,
          ][tabIndex]
        }
      </Box>
    </Box>
  );
};
