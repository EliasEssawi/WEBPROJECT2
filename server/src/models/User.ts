import mongoose, { Schema, Document } from "mongoose";

interface Profile {
  profileName: string,
	pin: string,
	progress: Record<string, any>,
	points : Number
}
// TYPES
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  pin: string;
  dateOfBirth: Date;
  createdAt: Date;
  profiles: Profile[];
  resetCode?: string | undefined;
  resetCodeExpiresAt?: Date | undefined;
}

const ProfileSchema = new mongoose.Schema<Profile>({
  profileName: String,
  pin: String,
  progress: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  points: {
    type: Number,
    default: 0
  }
});

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

  profiles: {
    type: [ProfileSchema],
    default: [],      // important!
    required: true
  },

  resetCode: {
    type: String,
    default: undefined,
    required: false
  },

  resetCodeExpiresAt: {
    type: Date,
    default: undefined,
    required: false
  },
});

export const User = mongoose.model<IUser>("User", UserSchema);