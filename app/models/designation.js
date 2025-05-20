import mongoose from 'mongoose';

const designationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    required: true,
  },
});

export default mongoose.models.Designation || mongoose.model('Designation', designationSchema);
