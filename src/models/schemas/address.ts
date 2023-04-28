import { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    lat: { type: String },
    lon: { type: String },
    house_number: { type: String },
    road: { type: String },
    neighbourhood: { type: String },
    suburb: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
  },
  { _id: false }
);

export default addressSchema;
