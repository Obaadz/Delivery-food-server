import type { Document } from "mongoose";
import type { JwtPayload } from "jsonwebtoken";
import type { Address } from "./address";

export type User = {
  username: string;
  email: string;
  password: string;
  last_name?: string;
  first_name?: string;
  phone_number?: string;
  profile_image_base64?: string;
  address?: Address;
};

export type UserFromToken = JwtPayload &
  Partial<User> & { _id: string; is_new?: boolean };

export interface IUserDocument extends Document, User {}

export type UpdateUserData = Omit<User, "email"> & {
  confirm_password: string;
};
