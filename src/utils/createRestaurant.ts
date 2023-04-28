import { insertRestaurant } from "../services/restaurant";
import { ERROR_MESSAGES } from "../types/enums";
import { IRestaurantDocument, Restaurant } from "../types/restaurant";

export default async (restaurant: Restaurant): Promise<IRestaurantDocument> => {
  const dbRestaurant = await insertRestaurant(restaurant).catch((err: any) => {
    if (err?.code === 11000) throw new Error(ERROR_MESSAGES.DUPLICATE);

    throw new Error(ERROR_MESSAGES.INCORRECT_RESTAURANT_DATA);
  });

  return dbRestaurant;
};
