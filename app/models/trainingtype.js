import mongoose from 'mongoose';

const trainingTypeSchema = new mongoose.Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    cost: { type: Number, required: true, default: null },
    image: { type: String, default: null }


}, { timestamps: true });

export default mongoose.models.TrainingType || mongoose.model('TrainingType', trainingTypeSchema);
