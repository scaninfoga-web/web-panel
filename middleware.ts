// 'use server';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//   const accessToken = request.cookies.get('accessToken')?.value;
//   const { pathname } = request.nextUrl;
//   const nonProtectedRoutes = [
//     '/',
//     '/auth',
//     '/aboutUs',
//     '/pricing',
//     '/tools',
//     '/contact',
//     '/api/ip',
//     '/auth/admin'
//   ];

//   const isNonProtected =
//     nonProtectedRoutes.includes(pathname) || pathname.startsWith('/services');

//   if (!accessToken) {
//     if (isNonProtected) {
//       return NextResponse.next();
//     }
//     return NextResponse.redirect(new URL('/auth', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!_next|favicon\\.ico).*)'],
// };

'use server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { publicRoutes, routeAccess } from './lib/routePermissions';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  // const user = request.cookies.get('user')?.value; // ← get role

  // const userType = user?.userType || null;

  const userCookie = request.cookies.get('user')?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;
  const userType = user?.userType || null;
  const { pathname } = request.nextUrl;

  const isPublic =
    publicRoutes.includes(pathname) || pathname.startsWith('/services');

  // Allow public route
  if (isPublic) {
    return NextResponse.next();
  }

  // // If not logged in → redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // Role-based routing: check access rules
  const allowedRoles = routeAccess[pathname];

  if (allowedRoles) {
    if (!userType || !allowedRoles.includes(userType)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();

  // return new NextResponse(
  //   JSON.stringify({
  //     pathname,
  //     allowedRoles: routeAccess[pathname],
  //     userType: userType,
  //   }),
  //   {
  //     status: 200,
  //     headers: { 'content-type': 'application/json' },
  //   }
  // );
}

export const config = {
  matcher: ['/((?!_next|favicon\\.ico).*)'],
};
