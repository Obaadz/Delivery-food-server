import { updateUser } from "../services/user";
import { ERROR_MESSAGES } from "../types/enums";
import { UpdateUserData } from "../types/user";

export default async (
  _id: string,
  newProfileImage: UpdateUserData["profile_image"]
): Promise<void> => {
  if (!newProfileImage) throw new Error(ERROR_MESSAGES.INVALID_USER_DATA);

  await updateUser({ _id }, { profile_image: newProfileImage }).catch((err: any) => {
    console.error("This error from updateUserProfileImage utility function.");

    throw new Error(err.message);
  });
};
