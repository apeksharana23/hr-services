import { NextResponse } from 'next/server';
import dbConnect from '@/app/config/dbConfig';
import Cart from '@/app/models/cart';

export async function DELETE(req) {
    await dbConnect();

    try {
        const { searchParams } = new URL(req.url);
        const cartItemId = searchParams.get('cartItemId');
        const traineeId = searchParams.get('traineeId');

        if (!cartItemId || !traineeId) {
            return NextResponse.json({ message: 'cartItemId and traineeId are required' }, { status: 400 });
        }

        const cartItem = await Cart.findOneAndDelete({ _id: cartItemId, traineeId });
        if (!cartItem) {
            return NextResponse.json({ message: 'Cart item not found' }, { status: 404 });
        }

        // Fetch updated cart items
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

        return NextResponse.json(
            { message: 'Course removed successfully', data: formattedItems },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error removing cart item:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}