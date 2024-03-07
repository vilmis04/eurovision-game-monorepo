'use client';

import { Button, CircularProgress } from '@mui/material';
import { useFormStatus } from 'react-dom';

export const SubmitButton = () => {
  'use client';

  const { pending } = useFormStatus();

  return (
    <Button type="submit">{pending ? <CircularProgress /> : 'Submit'}</Button>
  );
};
