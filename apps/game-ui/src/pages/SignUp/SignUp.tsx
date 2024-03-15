import { TextFormField } from '@eurovision-game-monorepo/core-ui';
import { Box, Button, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { styles } from './SignUp.styles';

const initialValues = {
  username: '',
  password: '',
  repeatPassword: '',
};

export const SignUp = () => {
  const handleSubmit = (values: typeof initialValues) => {
    // TODO: add submit logic
    console.log(values);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.contentWrapper}>
        <Typography variant="h1" sx={styles.title}>
          Sign Up
        </Typography>
        <Typography variant="body1" sx={styles.linkWrapper}>
          {'Already a user? '}
          <Box component={Link} to="/login" sx={styles.link}>
            Sign in
          </Box>
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values: { password, repeatPassword, username } }) => (
            <Box component={Form} sx={styles.form}>
              <TextFormField name="username" label="Nickname" />
              <TextFormField name="password" type="password" label="Password" />
              <TextFormField
                name="repeatPassword"
                type="password"
                label="Repeat password"
              />
              <Button
                type="submit"
                variant="contained"
                disabled={!password || !repeatPassword || !username}
              >
                <Typography variant="body1">Sign Up</Typography>
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignUp;
