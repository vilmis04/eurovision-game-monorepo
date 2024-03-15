import { TextFormField } from '@eurovision-game-monorepo/core-ui';
import { Box, Button, Typography } from '@mui/material';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';

const initialValues = {
  username: '',
  password: '',
  repeatPassword: '',
};

export const SignUp = () => {
  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        background:
          'linear-gradient(20deg, rgba(53,0,102,1) 25%, rgba(106,0,48,1) 110%)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: '76px 24px 24px',
        }}
      >
        <Typography variant="h1">Sign Up</Typography>
        <Typography variant="body1">
          {'Already a user? '}
          <Box component={Link} to="/login" sx={{ color: 'white' }}>
            Sign in
          </Box>
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextFormField name="username" label="Nickname" />
            <TextFormField name="password" type="password" label="Password" />
            <TextFormField
              name="repeatPassword"
              type="password"
              label="Repeat password"
            />
            <Button type="submit" variant="contained">
              <Typography variant="body1">Sign Up</Typography>
            </Button>
          </Box>
        </Formik>
      </Box>
    </Box>
  );
};

export default SignUp;
