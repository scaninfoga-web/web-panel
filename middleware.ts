'use server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;
  const nonProtectedRoutes = [
    '/',
    '/auth',
    '/aboutUs',
    '/pricing',
    '/tools',
    '/contact',
    '/api/ip',
  ];

  const isNonProtected =
    nonProtectedRoutes.includes(pathname) || pathname.startsWith('/services');

  if (!accessToken) {
    if (isNonProtected) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon\\.ico).*)'],
};
