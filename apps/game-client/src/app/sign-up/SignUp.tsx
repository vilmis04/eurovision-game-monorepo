'use client';

import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUpMutation } from '../api/auth/authApi.client';
import { Form, Formik } from 'formik';
import { paths } from '../../paths';
import { FormTextField } from '../ui/FormTextField/FormTextField';

const initialValues = { username: '', password: '', repeatPassword: '' };
interface SignUpFormValues {
  username: string | '';
  password: string | '';
  repeatPassword: string | '';
}

export const SignUp: React.FC = () => {
  const [signUp, { isSuccess }] = useSignUpMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push(paths.home);
    }
  }, [isSuccess]);

  const handleSubmit = async (values: SignUpFormValues) => {
    await signUp(values);
  };

  // TODO: add error handling
  return (
    <Box className="container mx-auto max-w-md p-4">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Box component={Form} className="flex flex-col items-center gap-4">
          <Typography variant="h1" className="text-3xl text-center">
            Vote For The Winners
          </Typography>
          <FormTextField name="username" placeholder="Enter username" />
          <FormTextField
            name="password"
            type="password"
            placeholder="Enter password"
          />
          <FormTextField
            name="repeatPassword"
            type="password"
            placeholder="Repeat password"
          />
          <Button variant="outlined" className="w-full" type="submit">
            Sign up
          </Button>
        </Box>
      </Formik>
    </Box>
  );
};

export default SignUp;
