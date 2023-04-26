import mongoose, { Schema } from "mongoose";
import { IUserDocument } from "../types/user";

export const userSchema = new Schema({
  username: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel =
  mongoose.models.users || mongoose.model<IUserDocument>("users", userSchema);

export default UserModel;
