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

export type UserFromToken = JwtPayload & Pick<Partial<User>, "email">;

export interface IUserDocument extends Document, User {}
