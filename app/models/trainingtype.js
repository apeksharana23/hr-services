import mongoose from 'mongoose';

const trainingTypeSchema = new mongoose.Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

export default mongoose.models.TrainingType || mongoose.model('TrainingType', trainingTypeSchema);
