import { Box, Button, TextField } from '@mui/material';
import { SignUp } from '../actions/signUp';

const SignUpPage = async () => (
  <Box>
    <Box
      component="form"
      action={SignUp}
      className="container mx-auto flex flex-col max-w-md gap-3 pt-2"
    >
      <TextField name="username" placeholder="Enter username" required />
      <TextField
        name="password"
        placeholder="Enter password"
        type="password"
        required
      />
      <TextField
        name="repeatPassword"
        placeholder="Repeat password"
        type="password"
        required
      />
      <Button variant="outlined" type="submit">
        Sign up
      </Button>
    </Box>
  </Box>
);

export default SignUpPage;
