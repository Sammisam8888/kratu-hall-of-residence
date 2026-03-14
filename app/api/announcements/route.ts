import { NextResponse } from 'next/server';
import { getAnnouncements, createAnnouncement, initializeSheet } from '../../utils/googleSheets';

export async function GET() {
  try {
    const announcements = await getAnnouncements();
    return NextResponse.json({ success: true, announcements });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get('cookie')?.includes('admin_session');
    if (!token) {
       return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, date, description, photoUrl, attachmentUrl, link } = body;

    if (!title || !date || !description) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    await initializeSheet();

    await createAnnouncement({ 
      title, 
      date, 
      description, 
      photoUrl: photoUrl || "",
      attachmentUrl: attachmentUrl || "",
      link: link || ""
    });

    return NextResponse.json({ success: true, message: "Announcement created successfully." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
