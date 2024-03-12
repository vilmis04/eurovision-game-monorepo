'use server';

export async function SignUp(formData: FormData) {
  const body = {
    username: formData.get('username'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword'),
  };
  // TODO: move base url to env
  const response = await fetch('http://localhost:3000/api/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  // TODO: remove console.log
  console.log({ serverAction: response });
}
