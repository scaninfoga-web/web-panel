'use server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // if (!accessToken) {
  //   if (!pathname.startsWith('/auth') && pathname !== '/') {
  //     return NextResponse.redirect(new URL('/auth', request.url));
  //   }
  //   return NextResponse.next();
  // }

  // if (pathname === '/' || pathname.startsWith('/auth')) {
  //   return NextResponse.redirect(new URL('/combinedDash', request.url));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
