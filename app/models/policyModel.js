import mongoose from 'mongoose';

const policySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Designation', required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Policy = mongoose.models.Policy || mongoose.model('Policy', policySchema);

export default Policy;
