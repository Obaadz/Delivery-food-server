import type { Document } from "mongoose";
import type { JwtPayload } from "jsonwebtoken";

export type User = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
};

export type UserFromToken = JwtPayload & Pick<Partial<User>, "email">;

export interface IUserDocument extends Document, User {}
