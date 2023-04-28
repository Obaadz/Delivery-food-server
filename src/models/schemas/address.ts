import { Schema } from "mongoose";

const addressSchema = new Schema({
  lat: { type: Number },
  lon: { type: Number },
  house_number: { type: String },
  road: { type: String },
  neighbourhood: { type: String },
  suburb: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
});

export default addressSchema;
