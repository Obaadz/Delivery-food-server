import mongoose, { Schema } from "mongoose";
import { IItemDocument } from "../types/item";

export const itemSchema = new Schema({
  name: { type: String, required: true, unique: true },
  small_image_url: { type: { _id: false, light: String, dark: String }, required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: "resturants", required: true },
  price: { type: String, required: true },
  isPopular: { type: Boolean, default: false },
});

const ItemModel =
  mongoose.models.items || mongoose.model<IItemDocument>("items", itemSchema);

export default ItemModel;
