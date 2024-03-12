import { NextResponse } from 'next/server';

const BASE_URL = process.env.BASE_SERVICE_URL || 'http://localhost:4300';

export async function GET(request: Request, response: NextResponse) {
  console.log(request.headers.get('cookie'));

  const data = await fetch(`${BASE_URL}/api/auth/is-authorised`, {
    credentials: 'include',
  });

  return await data.json();
}
