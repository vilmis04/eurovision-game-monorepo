'use client';

import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '../api/auth/authApi.client';
import { Form, Formik } from 'formik';
import { paths } from '../../paths';
import { FormTextField } from '../ui/FormTextField/FormTextField';

const initialValues = { username: '', password: '' };
interface ILoginFormValues {
  username: string | '';
  password: string | '';
}

export const SignUp: React.FC = () => {
  const [login, { isSuccess, isError }] = useLoginMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push(paths.home);
    }
  }, [isSuccess]);

  const handleSubmit = async ({ password, username }: ILoginFormValues) => {
    await login({ password, username });
  };

  const handleSignUp = () => {
    router.push(paths.signUp);
  };

  return (
    <Box className="container mx-auto max-w-md p-4">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Box component={Form} className="flex flex-col items-center gap-4">
          <Typography variant="h1" className="text-3xl text-center">
            Vote For The Winners
          </Typography>
          {/* TODO: improve error handling and display */}
          {isError && (
            <Box className="w-full border border-red-900 bg-red-500 p-3 rounded-lg">
              <Typography>Incorrect username or password</Typography>
            </Box>
          )}
          <FormTextField name="username" placeholder="Enter username" />
          <FormTextField
            name="password"
            type="password"
            placeholder="Enter password"
          />
          <Button variant="outlined" className="w-full" type="submit">
            Login
          </Button>
          <Button variant="text" className="w-full" onClick={handleSignUp}>
            Sign up
          </Button>
        </Box>
      </Formik>
    </Box>
  );
};

export default SignUp;
