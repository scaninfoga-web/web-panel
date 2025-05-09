import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookie = await cookies();
  cookie.set('accessToken', '12121');
  return NextResponse.json({ message: 'Cookie set!' });
}
