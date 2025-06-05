import mongoose from 'mongoose';

const traineeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    trainingType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrainingType',
        required: true
    },
    status: { type: String, enum: ['Active', 'Inactive'], required: true },
    password: { type: String, default: null, required: true },
    verified: { type: Boolean, default: null },
    verificationToken: { type: String, default: null },
    profileImage: { type: String, default: null },
    joiningDate: { type: Date, required: true, default: null }

}, { timestamps: true });

export default mongoose.models.Trainee || mongoose.model('Trainee', traineeSchema);
