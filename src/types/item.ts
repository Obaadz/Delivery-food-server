import type { Document } from "mongoose";
import { Restaurant } from "./restaurant";

export type Item = {
  name: string;
  small_image_url: { light: string; dark: string };
  restaurant: Partial<Restaurant>;
  price: string;
  isPopular: boolean;
};

export interface IItemDocument extends Document, Item {}
