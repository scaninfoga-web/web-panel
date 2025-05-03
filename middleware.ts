'use server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  console.log('Pathname:', pathname);

  const nonProtectedRoutes = [
    '/',
    '/auth',
    '/services',
    '/aboutUs',
    '/pricing',
    '/tools',
    '/contact',
  ];

  const isNonProtected = nonProtectedRoutes.includes(pathname);

  if (!accessToken) {
    if (isNonProtected) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // Authenticated users should not access public routes
  if (pathname === '/' || pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/combinedDash', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon\\.ico).*)'],
};
