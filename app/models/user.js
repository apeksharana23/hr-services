import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    role: {
      type: String,
      enum: ['admin', 'hr', 'employee', 'trainee'],
      required: true,
      default: 'employee',
    },
  },
  { timestamps: true } 
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
