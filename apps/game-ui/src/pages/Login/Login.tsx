import {
  Background,
  SubmitButton,
  TextFormField,
} from '@eurovision-game-monorepo/core-ui';
import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './Login.styles';
import * as Yup from 'yup';
import { LoginRequestBody } from '@eurovision-game-monorepo/types';
import { useEffect, useRef } from 'react';
import { useLoginMutation } from '../../api/auth/authApi';
import { paths } from '../../paths';

const initialValues: LoginRequestBody = {
  username: '',
  password: '',
};

const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export const Login = () => {
  const navigate = useNavigate();
  const [login, { isSuccess, isLoading }] = useLoginMutation();
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (isSuccess) {
      navigate(paths.home);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const handleSubmit = async (values: LoginRequestBody) => {
    await login(values);
  };

  return (
    <Background variant="gradient1">
      <Box sx={styles.contentWrapper}>
        <Typography variant="h1" sx={styles.title}>
          Login
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
              <TextFormField name="username" label="Nickname" inputRef={ref} />
              <TextFormField name="password" type="password" label="Password" />
              <SubmitButton
                isLoading={isLoading}
                isDisabled={!password || !username}
              >
                Login
              </SubmitButton>
            </Box>
          )}
        </Formik>
      </Box>
    </Background>
  );
};

export default Login;
