import { SubmitButton, TextFormField } from '@eurovision-game-monorepo/core-ui';
import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './SignUp.styles';
import * as Yup from 'yup';
import { SignUpRequestBody } from '@eurovision-game-monorepo/types';
import { useSignUpMutation } from '../../api/auth/authApi';
import { useEffect, useRef } from 'react';
import { paths } from '../../paths';

const initialValues: SignUpRequestBody = {
  username: '',
  password: '',
  repeatPassword: '',
};

const signUpValidationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Must include at least 8 symbols'),
  repeatPassword: Yup.string()
    .required('Repeated password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const SignUp = () => {
  const navigate = useNavigate();
  const [signUp, { isSuccess, isLoading }] = useSignUpMutation();
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

  const handleSubmit = async (values: SignUpRequestBody) => {
    console.log(values);
    await signUp(values);
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
            Login
          </Box>
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={signUpValidationSchema}
        >
          {({ values: { password, repeatPassword, username } }) => (
            <Box component={Form} sx={styles.form}>
              <TextFormField name="username" label="Nickname" inputRef={ref} />
              <TextFormField name="password" type="password" label="Password" />
              <TextFormField
                name="repeatPassword"
                type="password"
                label="Repeat password"
              />
              <SubmitButton
                isLoading={isLoading}
                isDisabled={!password || !username || !repeatPassword}
              >
                Sign Up
              </SubmitButton>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignUp;
