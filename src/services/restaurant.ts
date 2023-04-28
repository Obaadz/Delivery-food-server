import { ERROR_MESSAGES } from "../types/enums";
import type { IRestaurantDocument, Restaurant } from "../types/restaurant";
import RestaurantModel from "../models/restaurant";
import { FilterQuery, PopulateOption, UpdateQuery } from "mongoose";

export async function findRestaurant(
  query: FilterQuery<IRestaurantDocument>,
  selectedItems?: string | string[],
  populateOptions?: PopulateOption["populate"]
) {
  const dbRestaurant = (await RestaurantModel.findOne(query)
    .select(selectedItems ? selectedItems : undefined)
    .populate(populateOptions || ("" as any))) as IRestaurantDocument;

  if (!dbRestaurant) throw new Error(ERROR_MESSAGES.RESTAURANT_NOT_FOUND);

  return dbRestaurant;
}

export async function findRestaurants(
  query: FilterQuery<IRestaurantDocument>,
  selectedItems?: string | string[],
  populateOptions?: PopulateOption["populate"]
) {
  const dbRestaurants = (await RestaurantModel.find(query)
    .select(selectedItems ? selectedItems : undefined)
    .populate(populateOptions || ("" as any))) as IRestaurantDocument[];

  if (!dbRestaurants) throw new Error(ERROR_MESSAGES.RESTAURANTS_NOT_FOUND);

  return dbRestaurants;
}

export async function insertRestaurant(restaurant: Restaurant) {
  const dbRestaurant: IRestaurantDocument = new RestaurantModel<Restaurant>({
    ...restaurant,
  });

  await dbRestaurant.save();

  return findRestaurant({ _id: dbRestaurant._id });
}

export async function updateRestaurant(
  query: FilterQuery<IRestaurantDocument>,
  update: UpdateQuery<IRestaurantDocument>,
  selectedItems?: string | string[]
) {
  await RestaurantModel.updateOne(query, update).select(
    selectedItems ? selectedItems : undefined
  );
}
