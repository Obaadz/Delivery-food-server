import { ERROR_MESSAGES } from "../types/enums";
import { IUserDocument } from "../types/user";
import jwt from "jsonwebtoken";

export default (user: IUserDocument): string => {
  const SECRET = process.env.SECRET;
  if (!SECRET) throw new Error(ERROR_MESSAGES.NO_SECRET_KEY_DEFINED);
  return jwt.sign(user.toObject(), SECRET);
};
