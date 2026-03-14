import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'kratu-super-secret-key-2025');

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value;

  // Protect the dashboard routes
  if (request.nextUrl.pathname.startsWith('/secret-admin/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/secret-admin', request.url));
    }
    
    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch (err) {
      // Invalid or expired token
      return NextResponse.redirect(new URL('/secret-admin', request.url));
    }
  }

  // Prevent logged in users from seeing the login page again
  if (request.nextUrl.pathname === '/secret-admin') {
     if (token) {
        try {
          await jwtVerify(token, SECRET_KEY);
          return NextResponse.redirect(new URL('/secret-admin/dashboard', request.url));
        } catch(err) {
          // Token invalid, allow them to see login page
          return NextResponse.next();
        }
     }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/secret-admin/:path*'],
};
