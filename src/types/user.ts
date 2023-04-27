import type { Document } from "mongoose";
import type { JwtPayload } from "jsonwebtoken";

export type User = {
  username: string;
  email: string;
  password: string;
  last_name?: string;
  first_name?: string;
  phone_number?: string;
  image?: string;
};

export type UserFromToken = JwtPayload & Partial<User> & { _id: string; isNew?: boolean };

export interface IUserDocument extends Document, User {}

export type UpdateRegisterUser = Pick<User, "first_name" | "last_name" | "phone_number">;
