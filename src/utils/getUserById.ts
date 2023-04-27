import { findUser } from "../services/user";
import { IUserDocument } from "../types/user";

export default async (_id: string): Promise<IUserDocument> => {
  const dbUser = await findUser({ _id }, "-password -__v").catch((err: any) => {
    console.error("This error from getUserById utility function.");

    throw new Error(err.message);
  });

  return dbUser;
};
