import { findUser } from "../services/user";
import { ERROR_MESSAGES } from "../types/enums";
import type { HomeData } from "../types/homeData";
import "dotenv/config";
import { findRestaurants } from "../services/restaurant";
import { findItems } from "../services/item";

const BACKEND_URL = process.env.BACKEND_URL || "http://chat-test.ddns.net:5000";

const BANNERS = [
  `${BACKEND_URL}/images/bannder1.png`,
  `${BACKEND_URL}/images/bannder2.png`,
];

export default async (): Promise<HomeData> => {
  const banners = BANNERS,
    nearestRestaurant = await findRestaurants({}, "-_id -__v"),
    popularMenu = await findItems({}, "-_id -__v", {
      path: "restaurant",
      select: "-_id name",
    });

  if (!banners || !nearestRestaurant || !popularMenu)
    throw new Error(ERROR_MESSAGES.SERVER_ERROR);

  return { banners, nearestRestaurant, popularMenu };
};
