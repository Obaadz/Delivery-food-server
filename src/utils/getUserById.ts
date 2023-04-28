import { findUser } from "../services/user";
import { ERROR_MESSAGES } from "../types/enums";
import { IUserDocument } from "../types/user";

export default async (_id?: string, selectedItems?: string): Promise<IUserDocument> => {
  if (!_id) throw new Error(ERROR_MESSAGES.EMPTY_USER_ID);

  const dbUser = await findUser(
    { _id },
    selectedItems ? selectedItems : "-password -__v -profile_image_base64"
  ).catch((err: any) => {
    console.error("This error from getUserById utility function.");

    throw new Error(err.message);
  });

  return dbUser;
};
