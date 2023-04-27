import { ERROR_MESSAGES } from "../types/enums";
import jwt, { JwtPayload } from "jsonwebtoken";

export default (payload: JwtPayload): string => {
  const SECRET = process.env.SECRET;

  if (!SECRET) throw new Error(ERROR_MESSAGES.NO_SECRET_KEY_DEFINED);

  return jwt.sign(payload, SECRET);
};
