import { updateUser } from "../services/user";
import { ERROR_MESSAGES } from "../types/enums";
import { UpdateUserData } from "../types/user";
import convertImageToWebpBase64 from "./convertImageToWebpBase64";

export default async (
  _id: string,
  image_base64: UpdateUserData["profile_image_base64"]
): Promise<void> => {
  if (!image_base64) throw new Error(ERROR_MESSAGES.INVALID_USER_DATA);

  const webp_base64 = await convertImageToWebpBase64(image_base64);

  await updateUser({ _id }, { profile_image_base64: webp_base64 }).catch((err: any) => {
    console.error("This error from updateUserProfileImage utility function.");

    throw new Error(err.message);
  });
};
