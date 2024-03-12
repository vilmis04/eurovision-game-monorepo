import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Form } from 'formik';
import { paths } from '../../paths';

export const Login: React.FC = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push(paths.signUp);
  };

  return (
    <Box className="container mx-auto max-w-md p-4">
      <Box component={Form} className="flex flex-col items-center gap-4">
        <Typography variant="h1" className="text-3xl text-center">
          Vote For The Winners
        </Typography>
        <Button variant="outlined" className="w-full" type="submit">
          Login
        </Button>
        <Button variant="text" className="w-full" onClick={handleSignUp}>
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
