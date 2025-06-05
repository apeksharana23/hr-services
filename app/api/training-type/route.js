import { NextResponse } from 'next/server';
import dbConnect from '@/app/config/dbConfig';
import TrainingType from '@/app/models/trainingtype';
import path from 'path';
import fs from 'fs/promises';

export const runtime = 'nodejs'; 


export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    const types = await TrainingType.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await TrainingType.countDocuments();
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: types,
      total,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching training types:", error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const type = formData.get('type')?.toString().trim();
    const description = formData.get('description')?.toString().trim();
    const status = formData.get('status')?.toString().trim();
    const cost = parseFloat(formData.get('cost'));
    const file = formData.get('image');

    if (!type || !description || !status || isNaN(cost) || !file || !file.size) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    const existingType = await TrainingType.findOne({ type });
    if (existingType) {
      return NextResponse.json({ success: false, message: 'Training type already exists' }, { status: 400 });
    }

    const fileName = `${Date.now()}${path.extname(file.name)}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, fileName), Buffer.from(await file.arrayBuffer()));

    const newType = await TrainingType.create({
      type,
      description,
      status,
      cost,
      image: `/uploads/${fileName}`,
    });

    return NextResponse.json({ success: true, message: 'Training type added', data: newType }, { status: 201 });
  } catch (error) {
    console.error('Error adding training type:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function PUT(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const formData = await req.formData();
    const type = formData.get('type')?.toString().trim();
    const description = formData.get('description')?.toString().trim();
    const status = formData.get('status')?.toString().trim();
    const cost = parseFloat(formData.get('cost'));
    const file = formData.get('image');

    const updateData = { type, description, status, cost };

    if (file && file.size > 0) {
      const fileName = `${Date.now()}${path.extname(file.name)}`;
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, fileName), Buffer.from(await file.arrayBuffer()));
      updateData.image = `/uploads/${fileName}`;
    }

    const updatedType = await TrainingType.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedType) {
      return NextResponse.json({ success: false, message: 'Training type not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Training type updated', data: updatedType });
  } catch (error) {
    console.error('Error updating training type:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const deletedType = await TrainingType.findByIdAndDelete(id);

    if (!deletedType) {
      return NextResponse.json({ success: false, message: 'Training type not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Training type deleted' });
  } catch (error) {
    console.error('Error deleting training type:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
