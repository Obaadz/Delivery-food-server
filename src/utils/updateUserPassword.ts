import { findUser, findUserAndUpdate, updateUser } from "../services/user";
import { ERROR_MESSAGES } from "../types/enums";
import { IUserDocument, UpdateUserData } from "../types/user";

export default async (
  email: string,
  user: Pick<UpdateUserData, "forget_code" | "password">
): Promise<IUserDocument> => {
  if (!(user && email && user.forget_code && user.password))
    throw new Error(ERROR_MESSAGES.INVALID_USER_DATA);

  const dbUser = await findUser({ email, forget_code: user.forget_code }).catch(
    (err: any) => {
      console.error("This error from updateUserForgetCode utility function.");

      throw new Error(ERROR_MESSAGES.INCORRECT_FORGET_CODE);
    }
  );
  if (dbUser.forget_code === user.forget_code)
    await dbUser.updateOne({ password: user.password, forget_code: "" });
  else throw new Error(ERROR_MESSAGES.INCORRECT_FORGET_CODE);

  return dbUser;
};
