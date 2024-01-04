import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    if (req.nextUrl.pathname.startsWith('/admin') && req.nextauth.token?.role !== 'admin') {
      console.log('redirecting to /denied');
      return NextResponse.rewrite(new URL('/denied', req.url));
    }

    if (req.nextUrl.pathname.startsWith('/client') && req.nextauth.token?.role !== 'client') {
      console.log('redirecting to /denied');
      return NextResponse.rewrite(new URL('/denied', req.url));
    }
  },
  {
    pages: { signIn: '/auth/signin', error: "/error" },

    callbacks: {
      authorized: ({ token }) => !!token
      },
    },
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/client/:path*'
  ],
};
