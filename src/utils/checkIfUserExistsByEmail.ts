import UserModel from "../models/user";
import { ERROR_MESSAGES } from "../types/enums";
import { User } from "../types/user";

export default async (email: User["email"]): Promise<Boolean> => {
  const dbUser = await UserModel.exists({ email });

  if (!dbUser) return false;

  return true;
};
