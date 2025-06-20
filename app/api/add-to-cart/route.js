// app/api/add-to-cart/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/app/config/dbConfig';
import Cart from '@/app/models/cart';
import TrainingType from '@/app/models/trainingtype';
import mongoose from 'mongoose';

export async function POST(req) {
    await dbConnect();

    try {
        const body = await req.json();
        const { courseId, traineeId } = body;
        let traineeCardId;

        const course = await TrainingType.findById(courseId);
        if (!course) {
            return NextResponse.json({ message: 'Course not found' }, { status: 404 });
        }

        traineeCardId = traineeId || new mongoose.Types.ObjectId().toString();

        const newEntry = new Cart({
            traineeId: traineeCardId,
            courseId: course._id,
            courseType: course.type,
            courseDescription: course.description,
            courseCost: course.cost,
            courseStatus: course.status,
            courseImage: course.image,
        });

        await newEntry.save();

        // Fetch all cart items for the trainee
        const cartItems = await Cart.find({ traineeId: traineeCardId })
            .populate('courseId')
            .lean();

        // Format items to match CheckoutPage expectations
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
            { message: 'Course added successfully', data: formattedItems, token: traineeCardId },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}