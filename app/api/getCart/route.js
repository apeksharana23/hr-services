// app/api/getCart/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/app/config/dbConfig';
import Cart from '@/app/models/cart';

export async function GET(req) {
    await dbConnect();

    try {
        const { searchParams } = new URL(req.url);
        const traineeId = searchParams.get('traineeId');

        if (!traineeId) {
            return NextResponse.json({ message: 'traineeId is required' }, { status: 400 });
        }

        const cartItems = await Cart.find({ traineeId })
            .sort({ createdAt: -1 })
            .populate('courseId')
            .lean();
            
        const formattedItems = cartItems.map(item => ({
            _id: item._id,
            traineeId: item.traineeId,
            courseId: {
                _id: item.courseId?._id || item.courseId,
                title: item.courseType || item.courseId?.type || 'Unknown Course',
                cost: item.courseCost || item.courseId?.cost || 0,
                image: item.courseImage || item.courseId?.image || '/default-image.jpg',
            },
        }));

        return NextResponse.json({ data: formattedItems }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}