import { Methods } from '@eurovision-game-monorepo/types';
import { Box, Button, Typography } from '@mui/material';
import { FormEvent } from 'react';

const ConfigPageLayout = async () => {
  const BASE_URL = process.env.BASE_SERVICE_URL || 'http://localhost:4300';

  const configResponse = await (
    await fetch(`${BASE_URL}/api/admin`, {
      method: Methods.GET,
      credentials: 'include',
    })
  ).json();

  //   TODO: remove after testing
  console.log({ configResponse });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    //   TODO: remove after testing
    console.log({ formData });

    const response = await fetch(`${BASE_URL}/api/admin`, {
      method: Methods.PATCH,
      body: formData,
      credentials: 'include',
    });
  };

  return (
    <Box>
      <Typography variant="h1">Config</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        {/* TODO: add fields for config */}
        {/* TODO: make it into client component to display loading state (with useFormStatus from react-dom) */}
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  );
};

export default ConfigPageLayout;
