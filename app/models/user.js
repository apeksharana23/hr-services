import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    employeeId: { type: String, unique: true, sparse: true },
    joiningDate: { type: String },
    username: { type: String, unique: true, sparse: true },
    company: { type: String },
    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Designation',
      default: null,
    },
    profileImage: { type: String, default: null },
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
