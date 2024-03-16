import { TextFormField } from '@eurovision-game-monorepo/core-ui';
import { Box, Button, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { styles } from './Login.styles';
import * as Yup from 'yup';

const initialValues = {
  username: '',
  password: '',
};

const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export const Login = () => {
  const handleSubmit = (values: typeof initialValues) => {
    // TODO: add submit logic
    console.log(values);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.contentWrapper}>
        <Typography variant="h1" sx={styles.title}>
          Sign In
        </Typography>
        <Typography variant="body1" sx={styles.linkWrapper}>
          {'New user? '}
          <Box component={Link} to="/sign-up" sx={styles.link}>
            Sign up
          </Box>
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={loginValidationSchema}
        >
          {({ values: { password, username } }) => (
            <Box component={Form} sx={styles.form}>
              <TextFormField name="username" label="Nickname" />
              <TextFormField name="password" type="password" label="Password" />
              <Button
                type="submit"
                variant="contained"
                disabled={!password || !username}
              >
                <Typography variant="body1">Sign In</Typography>
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
