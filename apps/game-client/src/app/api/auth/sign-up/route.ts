import { NextResponse } from 'next/server';

const BASE_URL = process.env.BASE_SERVICE_URL || 'http://localhost:4300';

export async function POST(request: Request, response: NextResponse) {
  console.log('----- START OF API -----');
  console.log('----- COOKIE -----');
  console.log(request.headers.get('cookie'));

  const data = await fetch(`${BASE_URL}/api/auth/sign-up`, {
    body: request.body,
    credentials: 'include',
  });

  console.log('----- DATA -----');
  console.log(data);
  console.log('----- END OF API -----');

  return NextResponse.json({ hello: 'world' });
}
