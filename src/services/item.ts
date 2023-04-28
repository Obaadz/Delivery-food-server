import { ERROR_MESSAGES } from "../types/enums";
import type { IItemDocument, Item } from "../types/item";
import ItemModel from "../models/item";
import { FilterQuery, PopulateOption, UpdateQuery } from "mongoose";

export async function findItem(
  query: FilterQuery<IItemDocument>,
  selectedItems?: string | string[],
  populateOptions?: PopulateOption["populate"]
) {
  const dbItem = (await ItemModel.findOne(query)
    .select(selectedItems ? selectedItems : undefined)
    .populate(populateOptions || ("" as any))) as IItemDocument;

  if (!dbItem) throw new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);

  return dbItem;
}

export async function findItems(
  query: FilterQuery<IItemDocument>,
  selectedItems?: string | string[],
  populateOptions?: PopulateOption["populate"]
) {
  const dbItems = (await ItemModel.find(query)
    .select(selectedItems ? selectedItems : undefined)
    .populate(populateOptions || ("" as any))) as IItemDocument[];

  if (!dbItems) throw new Error(ERROR_MESSAGES.ITEMS_NOT_FOUND);

  return dbItems;
}

export async function insertItem(item: Item) {
  const dbItem: IItemDocument = new ItemModel<Item>({
    ...item,
  });

  await dbItem.save();

  return findItem({ _id: dbItem._id });
}

export async function updateItem(
  query: FilterQuery<IItemDocument>,
  update: UpdateQuery<IItemDocument>,
  selectedItems?: string | string[]
) {
  await ItemModel.updateOne(query, update).select(
    selectedItems ? selectedItems : undefined
  );
}
