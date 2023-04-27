import { updateUser } from "../services/user";
import { ERROR_MESSAGES } from "../types/enums";
import { IUserDocument, UpdateRegisterUser } from "../types/user";

export default async (_id: string, user: UpdateRegisterUser): Promise<IUserDocument> => {
  if (!(user && (user.first_name || user.last_name || user.phone_number)))
    throw new Error(ERROR_MESSAGES.INVALID_USER_DATA);

  const dbUser = await updateUser(
    { _id },
    {
      first_name: user.first_name || undefined,
      last_name: user.last_name || undefined,
      phone_number: user.phone_number || undefined,
    }
  ).catch((err: any) => {
    console.error("This error from updateRegisterUser utility function.");

    throw new Error(err.message);
  });

  return dbUser;
};
