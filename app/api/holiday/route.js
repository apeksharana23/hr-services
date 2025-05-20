import { NextResponse } from 'next/server';
import dbConnect from '@/app/config/dbConfig';
import Holiday from '@/app/models/Holiday';

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    try {
        const holidays = await Holiday.find().skip(skip).limit(limit).sort({ date: -1 });
        const total = await Holiday.countDocuments();
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({ success: true, data: holidays, totalPages, currentPage: page });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error fetching holidays' }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();
    const { title, description, date } = await req.json();

    if (!title || !description || !date) {
        return NextResponse.json({ error: 'Title, description, and date are required' }, { status: 400 });
    }

    try {
        const newHoliday = await Holiday.create({ title, description, date });
        return NextResponse.json({ message: 'Holiday added', data: newHoliday }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error adding holiday' }, { status: 500 });
    }
}

export async function PUT(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const { title, description, date } = await req.json();

    try {
        const updated = await Holiday.findByIdAndUpdate(id, { title, description, date }, { new: true });
        if (!updated) {
            return NextResponse.json({ error: 'Holiday not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Holiday updated', data: updated });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating holiday' }, { status: 500 });
    }
}

export async function DELETE(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        const deleted = await Holiday.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ error: 'Holiday not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Holiday deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting holiday' }, { status: 500 });
    }
}
