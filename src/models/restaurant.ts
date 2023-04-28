import mongoose, { Schema } from "mongoose";
import { IRestaurantDocument } from "../types/restaurant";

export const restaurantSchema = new Schema({
  name: { type: String, required: true, unique: true },
  time: { type: String, required: true },
  small_image_url: { type: { _id: false, light: String, dark: String }, required: true },
});

const RestaurantModel =
  mongoose.models.resturants ||
  mongoose.model<IRestaurantDocument>("resturants", restaurantSchema);

export default RestaurantModel;
