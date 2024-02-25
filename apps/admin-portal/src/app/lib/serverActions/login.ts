'use server';

import { revalidatePath } from 'next/cache';
import { login } from '../../api/auth/authApi';

export const submitForm = async (formData: FormData) => {
  const body = {
    username: `${formData.get('username')}`,
    password: `${formData.get('password')}`,
  };

  await login(body);
  revalidatePath('/');
};
