import mongoose from 'mongoose';

const trainingSchema = new mongoose.Schema({
    trainingType: { type: String, required: true },
    trainer: { type: String, required: true },
    cost: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, {
    timestamps: true
});

export default mongoose.models.Training || mongoose.model('Training', trainingSchema);
