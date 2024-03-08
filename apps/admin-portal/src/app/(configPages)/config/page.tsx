import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@mui/material';
import { SubmitButton } from './SubmitButton/SubmitButton';
import { submitForm } from '../../api/serverAPIs/configApi';

export default async function ConfigPage() {
  return (
    <Box className="w-96 p-16 mx-auto">
      <Typography variant="h1" className="text-xl">
        Config
      </Typography>
      <Box component="form" action={submitForm}>
        <FormControl fullWidth>
          <InputLabel id="year-select">Select year</InputLabel>
          <Select labelId="year-select" label="Year">
            <MenuItem value={2024}>2024</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="game-type-select">Select game type</InputLabel>
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
}
