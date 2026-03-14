import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'kratu-super-secret-key-2025');

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Hardcoded credentials as requested by user
    const allowedEmails = [
      'samuelpriyatamxd@gmail.com', 
      'pknayak.kanha@gmail.com', 
      'admin@kratuhor.com'
    ];
    
    if (allowedEmails.includes(email) && password === 'Password@123!') {
      const token = await new SignJWT({ authorized: true })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(SECRET_KEY);

      const response = NextResponse.json({ success: true });
      
      response.cookies.set({
        name: 'admin_session',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });
      
      return response;
    }
    
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
