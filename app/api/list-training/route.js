import mongoose from 'mongoose';
import TrainingType from '@/app/models/trainingtype';

const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export async function GET(req) {
  try {
    await connectToDatabase();

    const trainingTypes = await TrainingType.find({});

    const data = trainingTypes.map((type) => ({
      id: type._id,
      type: type.type,
    }));

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching training types:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
