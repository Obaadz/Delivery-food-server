import { findUser } from "../services/user";
import { ERROR_MESSAGES } from "../types/enums";
import { IUserDocument, User } from "../types/user";

export default async (user: Pick<User, "email" | "password">): Promise<IUserDocument> => {
  if (!(user && user.email && user.password))
    throw new Error(ERROR_MESSAGES.INCORRECT_EMAIL_OR_PASSWORD);

  const dbUser = await findUser({
    email: user.email,
    password: user.password,
  }).catch((err: any) => {
    console.error("This error from loginUser utility function.");

    throw new Error(ERROR_MESSAGES.INCORRECT_EMAIL_OR_PASSWORD);
  });

  return dbUser;
};
