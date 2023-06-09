import { ERROR_MESSAGES } from "../types/enums";
import type { IUserDocument, User } from "../types/user";
import UserModel from "../models/user";
import { FilterQuery, PopulateOption, UpdateQuery } from "mongoose";

export async function findUser(
  query: FilterQuery<IUserDocument>,
  selectedItems?: string | string[],
  populateOptions?: PopulateOption["populate"]
) {
  const dbUser = (await UserModel.findOne(query)
    .select(selectedItems ? selectedItems : undefined)
    .populate(populateOptions || ("" as any))) as IUserDocument;

  if (!dbUser) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);

  return dbUser;
}

export async function insertUser(user: User) {
  const dbUser: IUserDocument = new UserModel<User>({
    ...user,
  });

  await dbUser.save();

  return findUser({ email: dbUser.email }, ["email"]);
}

export async function findUserAndUpdate(
  query: FilterQuery<IUserDocument>,
  update: UpdateQuery<IUserDocument>,
  selectedItems?: string | string[]
) {
  const dbUser = await UserModel.findOneAndUpdate(query, update).select(
    selectedItems ? selectedItems : undefined
  );

  if (!dbUser) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);

  return dbUser as IUserDocument;
}

export async function updateUser(
  query: FilterQuery<IUserDocument>,
  update: UpdateQuery<IUserDocument>,
  selectedItems?: string | string[]
) {
  await UserModel.updateOne(query, update).select(
    selectedItems ? selectedItems : undefined
  );
}

export async function deleteUser(user: Pick<User, "email">) {
  await UserModel.updateOne({ email: user.email }, { $unset: { email: 1 } });
}
