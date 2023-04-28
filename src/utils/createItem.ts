import { insertItem } from "../services/item";
import { ERROR_MESSAGES } from "../types/enums";
import { IItemDocument, Item } from "../types/item";

export default async (item: Item): Promise<IItemDocument> => {
  const dbItem = await insertItem(item).catch((err: any) => {
    if (err?.code === 11000) throw new Error(ERROR_MESSAGES.DUPLICATE);

    throw new Error(ERROR_MESSAGES.INCORRECT_ITEM_DATA);
  });

  return dbItem;
};
