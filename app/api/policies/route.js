import { NextResponse } from 'next/server';
import dbConnect from '@/app/config/dbConfig';
import Policy from '@/app/models/policyModel';

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit;

  try {
    const policies = await Policy.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Policy.countDocuments();
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: policies,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching policies:", error);
    return NextResponse.json({ success: false, message: 'Error fetching policies' }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { name, designationId, description } = body;



    // Check if any field is missing
    if (!name || !designationId || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newPolicy = await Policy.create({
      name,
      designationId,
      description,
    });

    return NextResponse.json({ message: 'Policy added', data: newPolicy }, { status: 201 });
  } catch (error) {
    console.error("Error creating policy:", error);
    return NextResponse.json({ error: 'Error creating policy' }, { status: 500 });
  }
}
export async function DELETE(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing policy ID' }, { status: 400 });
    }

    const deleted = await Policy.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Policy not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Policy deleted successfully' });
  } catch (error) {
    console.error("Error deleting policy:", error);
    return NextResponse.json({ error: 'Error deleting policy' }, { status: 500 });
  }
}

export async function PUT(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { id, name, designationId, description } = body;

    if (!id || !name || !designationId || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updated = await Policy.findByIdAndUpdate(id, {
      name,
      designationId,
      description,
    }, { new: true });

    if (!updated) {
      return NextResponse.json({ error: 'Policy not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Policy updated successfully', data: updated });
  } catch (error) {
    console.error("Error updating policy:", error);
    return NextResponse.json({ error: 'Error updating policy' }, { status: 500 });
  }
}


