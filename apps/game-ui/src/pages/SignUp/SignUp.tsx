import {
  Background,
  GradientType,
  SubmitButton,
  TextFormField,
} from '@eurovision-game-monorepo/core-ui';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { styles } from './SignUp.styles';
import * as Yup from 'yup';
import { SignUpRequestBody } from '@eurovision-game-monorepo/types';
import {
  useIsAuthenticatedQuery,
  useSignUpMutation,
} from '../../api/auth/authApi';
import { useEffect, useRef } from 'react';
import { paths } from '../../paths';
import { decodeInvite } from '../../utils/decodeInvite';
import { useJoinGroupMutation } from '../../api/group/groupApi';

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
  const [queryParams] = useSearchParams();
  const inviteCode = queryParams.get('invite');
  const [signUp, { isSuccess: isSignUpSuccess, isLoading: isSignUpLoading }] =
    useSignUpMutation();
  const {
    isSuccess: isLoggedIn,
    isLoading: isCheckingAuthStatus,
    isUninitialized,
  } = useIsAuthenticatedQuery();
  const ref = useRef<HTMLElement>();

  const [joinGroup, { isSuccess: isJoinGroupSuccess }] = useJoinGroupMutation();

  useEffect(() => {
    if (isSignUpSuccess && inviteCode) {
      joinGroup({ inviteCode });
    }
  }, [isSignUpSuccess && inviteCode]);

  useEffect(() => {
    if (!inviteCode && (isSignUpSuccess || isLoggedIn)) {
      navigate(paths.home);
    }
  }, [isSignUpSuccess, isLoggedIn, inviteCode]);

  useEffect(() => {
    if (isJoinGroupSuccess) {
      const { id } = decodeInvite(inviteCode);
      navigate(`${paths.group.build(id)}?joined=true`);
    }
  }, [isJoinGroupSuccess]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [isCheckingAuthStatus || isUninitialized]);

  const handleSubmit = async (values: SignUpRequestBody) => {
    await signUp(values);
  };

  return isCheckingAuthStatus || isUninitialized ? (
    <CircularProgress />
  ) : (
    <Background variant={GradientType.GRADIENT1}>
      <Box sx={styles.contentWrapper}>
        <Typography variant="h1" sx={styles.title}>
          Sign Up
        </Typography>
        <Typography variant="body1" sx={styles.linkWrapper}>
          {'Already a user? '}
          <Box
            component={Link}
            to={`${paths.login}${inviteCode ? `?invite=${inviteCode}` : ''}`}
            sx={styles.link}
          >
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
                isLoading={isSignUpLoading}
                isDisabled={!password || !username || !repeatPassword}
              >
                Sign Up
              </SubmitButton>
            </Box>
          )}
        </Formik>
      </Box>
    </Background>
  );
};

export default SignUp;
