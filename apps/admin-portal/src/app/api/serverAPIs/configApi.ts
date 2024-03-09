'use server';

import { Methods } from '@eurovision-game-monorepo/types';
import { NextResponse } from 'next/server';
import { FormEvent } from 'react';

const BASE_URL = process.env.BASE_SERVICE_URL || 'http://localhost:4300';

enum GameTypes {
  SEMI1 = 'semi1',
  SEMI2 = 'semi2',
  FINAL = 'final',
}

type Config = {
  year: number;
  gameType: GameTypes;
  isVotingActive: boolean;
};

// export async function getConfig(): Promise<Config> {
export async function getConfig(): Promise<any> {
  const response: Response = await fetch(`${BASE_URL}/api/admin`, {
    method: Methods.GET,
    credentials: 'include',
  });

  return response;
}

export async function submitForm(formData: FormData): Promise<Response> {
  //   TODO: remove after testing
  console.log({ formData });

  return await fetch(`${BASE_URL}/api/admin`, {
    method: Methods.PATCH,
    body: JSON.stringify({
      year: formData.get('year'),
      gameType: formData.get('gameType'),
      isVotingActive: formData.get('isVotingActive'),
    }),
    credentials: 'include',
  });
}
