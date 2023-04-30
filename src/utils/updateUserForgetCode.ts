import { updateUser } from "../services/user";
import { ERROR_MESSAGES } from "../types/enums";
import { User } from "../types/user";

export default async (email: string, forget_code: User["forget_code"]): Promise<void> => {
  await updateUser({ email }, { forget_code }).catch((err: any) => {
    console.error("This error from updateUserForgetCode utility function.");

    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  });
};
