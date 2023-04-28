import { findUserAndUpdate } from "../services/user";
import { ERROR_MESSAGES } from "../types/enums";
import { IUserDocument, UpdateUserData } from "../types/user";

export default async (_id: string, user: UpdateUserData): Promise<IUserDocument> => {
  if (!(user && (user.first_name || user.last_name || user.phone_number || user.address)))
    throw new Error(ERROR_MESSAGES.INVALID_USER_DATA);

  const dbUser = await findUserAndUpdate(
    { _id },
    {
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      address: user.address,
    }
  ).catch((err: any) => {
    console.error("This error from updateUserData utility function.");

    throw new Error(err.message);
  });

  return dbUser;
};
