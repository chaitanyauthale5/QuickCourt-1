import { Schema, model, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['user', 'facility_owner', 'admin'], default: 'user', required: true },
  avatar: { type: String },
  isVerified: { type: Boolean, default: false },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

export type User = InferSchemaType<typeof userSchema> & { _id: string };
export const UserModel = model('User', userSchema);
