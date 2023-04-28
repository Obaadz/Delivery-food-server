import express from "express";
import { userRoutes } from "./user";
import { restaurantRoutes } from "./restaurant";
import { itemRoutes } from "./item";
import { homeRoutes } from "./home";

const v1Routes = express.Router();

v1Routes.get("/v1/", async (req, res) => {
  res.send("API works fine!");
});

v1Routes.use("/v1", userRoutes, restaurantRoutes, itemRoutes, homeRoutes);

export default v1Routes;
