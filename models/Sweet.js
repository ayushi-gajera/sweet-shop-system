import mongoose from 'mongoose';
const { Schema } = mongoose;

const SweetSchema = new Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 }
}, { timestamps: true });

export default mongoose.models.Sweet || mongoose.model('Sweet', SweetSchema);
