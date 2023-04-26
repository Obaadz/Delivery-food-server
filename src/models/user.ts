import mongoose, { Schema } from "mongoose";
import { IUserDocument } from "../types/user";

export const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  phone_number: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_image: { type: String, required: false },
});

const UserModel =
  mongoose.models.users || mongoose.model<IUserDocument>("users", userSchema);

export default UserModel;
