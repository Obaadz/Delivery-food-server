import { insertUser } from "../services/user";
import { ERROR_MESSAGES } from "../types/enums";
import { IUserDocument, User } from "../types/user";

export default async (user: User): Promise<IUserDocument> => {
  const dbUser = await insertUser(user).catch((err: any) => {
    if (err?.code === 11000) throw new Error(ERROR_MESSAGES.DUPLICATE);

    throw new Error(ERROR_MESSAGES.INCORRECT_REGISTER_DATA);
  });

  return dbUser;
};
