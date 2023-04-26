import express from "express";
import { userRoutes } from "./user";

const v1Routes = express.Router();

v1Routes.get("/v1/", async (req, res) => {
  res.send("API works fine!");
});

v1Routes.use("/v1", userRoutes);

export default v1Routes;
