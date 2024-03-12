import { Box, Button, TextField } from '@mui/material';
import { SignUp } from '../actions/signUp';

const SignUpPage = async () => (
  <Box>
    <Box component="form" action={SignUp}>
      <TextField name="username" placeholder="Enter username" />
      <TextField name="password" placeholder="Enter password" type="password" />
      <TextField
        name="repeatPassword"
        placeholder="Repeat password"
        type="password"
      />
      <Button type="submit">Sign in</Button>
    </Box>
  </Box>
);

export default SignUpPage;
