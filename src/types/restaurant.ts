import type { Document } from "mongoose";

export type Restaurant = {
  name: string;
  time: string;
  small_image_url: { light: string; dark: string };
};

export interface IRestaurantDocument extends Document, Restaurant {}
