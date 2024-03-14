'use server';

import { revalidatePath } from 'next/cache';
import { paths } from '../../paths';

export async function SignUp(formData: FormData) {
  console.log('----- START OF SERVER ACTION -----');
  const body = {
    username: formData.get('username'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword'),
  };
  // TODO: move base url to env
  const response = await fetch('http://localhost:3000/api/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify(body),
    credentials: 'include',
  });

  // TODO: remove console.log
  console.log({ serverAction: response });
  console.log('----- END OF SERVER ACTION -----');
  revalidatePath(paths.signUp);
}
