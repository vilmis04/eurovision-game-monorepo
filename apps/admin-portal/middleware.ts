import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { paths } from './src/paths';

export async function middleware(request: NextRequest) {
  // const authorisedResponse = await fetch(
  //   'http://localhost:4300/api/auth/is-authorised',
  //   {
  //     credentials: 'include',
  //   }
  // );

  // const isUnauthenticated = authorisedResponse.status === 401;
  // if (isUnauthenticated) {
  //   NextResponse.redirect(new URL(paths.login, request.url));
  // }

  NextResponse.next();
}
