import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  roles: [String],
});

export interface User extends Document {
  username: string;
  password: string;
  roles: string[];
}
