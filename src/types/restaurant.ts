import type { Document } from "mongoose";

export type Restaurant = {
  name: string;
  time: string;
  small_image_url: { light: string; dark: string };
  restaurant: Partial<Restaurant>;
};

export interface IRestaurantDocument extends Document, Restaurant {}
