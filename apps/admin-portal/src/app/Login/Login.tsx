import { Box, Button, TextField, Typography } from '@mui/material';
import { submitForm } from '../lib/serverActions/login';

export const Login: React.FC = () => (
  <Box className="container mx-auto max-w-md p-4">
    <Box
      component="form"
      action={submitForm}
      className="flex flex-col items-center gap-4"
    >
      <Typography variant="h1" className="text-3xl text-center">
        Vote For The Winners
        <Box component="br" />
        Admin Portal
      </Typography>
      <TextField
        name="username"
        className="w-full"
        placeholder="Entrer username"
      />
      <TextField
        name="password"
        type="password"
        className="w-full"
        placeholder="Entrer password"
      />
      <Button variant="outlined" className="w-full" type="submit">
        Login
      </Button>
    </Box>
  </Box>
);

export default Login;
