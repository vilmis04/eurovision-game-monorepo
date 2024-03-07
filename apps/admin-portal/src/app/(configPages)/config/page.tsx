import { Methods } from '@eurovision-game-monorepo/types';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@mui/material';
import { FormEvent } from 'react';
import { SubmitButton } from './SubmitButton/SubmitButton';

const ConfigPage = async () => {
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
        <FormControl fullWidth>
          <InputLabel id="year-select">Select year</InputLabel>
          <Select labelId="year-select" label="Year">
            <MenuItem value={2024}>2024</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="game-type-select">Select year</InputLabel>
          <Select labelId="game-type-select" label="Game Type">
            <MenuItem value={'semi1'}>Semi 1</MenuItem>
            <MenuItem value={'semi2'}>Semi 2</MenuItem>
            <MenuItem value={'final'}>Final</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Switch />}
          label="Voting enabled:"
          labelPlacement="start"
        />
        <SubmitButton />
      </Box>
    </Box>
  );
};

export default ConfigPage;
