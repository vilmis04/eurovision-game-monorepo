import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.BASE_SERVICE_URL || 'http://localhost:4300';

export async function getIsAuthenticated(
  request: NextRequest,
  response: NextResponse
) {
  const getIsAuthenticatedResponse = await fetch(
    `${BASE_URL}/api/auth/getIsAuthorized`
  );
  console.log({ request, response, getIsAuthenticatedResponse });

  return getIsAuthenticatedResponse;
}
