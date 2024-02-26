'use client';

import { Box, Button, TextField, Typography } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { useLoginMutation } from '../api/auth/authApi.client';
import { useRouter } from 'next/navigation';

const BASE_URL = process.env.BASE_SERVICE_URL;
const AUTH_PREFIX = 'auth';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mutate, { isSuccess }] = useLoginMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    mutate({ password, username });
  };

  return (
    <Box className="container mx-auto max-w-md p-4">
      <Box
        component="form"
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit}
      >
        <Typography variant="h1" className="text-3xl text-center">
          Vote For The Winners
          <Box component="br" />
          Admin Portal
        </Typography>
        <TextField
          name="username"
          className="w-full"
          placeholder="Entrer username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          name="password"
          type="password"
          className="w-full"
          placeholder="Entrer password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outlined" className="w-full" type="submit">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
