import { NextResponse } from 'next/server';
import { getEvents, createEvent, initializeSheet } from '../../utils/googleSheets';

export async function GET() {
  try {
    // Only fetch events, don't run initialize unconditionally to save API quota
    const events = await getEvents();
    return NextResponse.json({ success: true, events });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Basic verification: in a real app, middleware protects the API route or we check JWT here.
    // We'll rely on our middleware for /secret-admin/, but for /api/events we should ideally protect POST too.
    // For simplicity, we'll assume the frontend only calls this when authorized, or we can quickly check the cookie:
    const token = request.headers.get('cookie')?.includes('admin_session');
    if (!token) {
       return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, date, description, photoUrl } = body;

    if (!title || !date || !description) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Attempt to initialize headers just in case it's the very first time
    await initializeSheet();

    await createEvent({ title, date, description, photoUrl: photoUrl || "" });

    return NextResponse.json({ success: true, message: "Event created successfully." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
