import mongoose, { Schema } from "mongoose";
import { IUserDocument } from "../types/user";

export const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  phone_number: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_image_base64: { type: String, required: false },
});

userSchema.virtual("profile_image_url").get(function () {
  return `${
    process.env.BACKEND_URL || "http://chat-test.ddns.net:5000"
  }/v1/users/${this._id}/profile_image.webp`;
});

const UserModel =
  mongoose.models.users || mongoose.model<IUserDocument>("users", userSchema);

export default UserModel;
