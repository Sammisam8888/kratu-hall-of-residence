import { NextRequest, NextResponse } from 'next/server';
import { updateAnnouncement, deleteAnnouncement } from '../../../utils/googleSheets';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const token = request.headers.get('cookie')?.includes('admin_session');
        if (!token) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

        const resolvedParams = await params;
        const id = resolvedParams.id;
        const body = await request.json();

        const success = await updateAnnouncement(id, body);

        if (success) {
            return NextResponse.json({ success: true, message: "Announcement updated." });
        } else {
            return NextResponse.json({ success: false, error: "Announcement not found" }, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const token = request.headers.get('cookie')?.includes('admin_session');
        if (!token) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

        const resolvedParams = await params;
        const id = resolvedParams.id;
        const success = await deleteAnnouncement(id);

        if (success) {
            return NextResponse.json({ success: true, message: "Announcement deleted." });
        } else {
            return NextResponse.json({ success: false, error: "Announcement not found" }, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
