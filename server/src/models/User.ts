import mongoose, { Schema, Document } from "mongoose";

// TYPES
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  pin: string;
  dateOfBirth: Date;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: { type: String, required: true },

  pin: { type: String, required: true },

  dateOfBirth: { type: Date, required: true },

  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>("User", UserSchema);