import { Item } from "./item";
import { Restaurant } from "./restaurant";

export type HomeData = {
  banners: string[];
  nearestRestaurant: Restaurant[];
  popularMenu: Item[];
};
