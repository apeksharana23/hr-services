// models/cart.js
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    traineeId: {
        type: String,
        required: true,
        unique: false,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrainingType', // Reference TrainingType instead of Course
        required: true,
    },
    courseType: {
        type: String,
        required: false,
    },
    courseDescription: {
        type: String,
        required: false,
    },
    courseCost: {
        type: Number,
        required: false,
    },
    courseStatus: {
        type: String,
        required: false,
    },
    courseImage: {
        type: String,
        required: false,
    },
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);