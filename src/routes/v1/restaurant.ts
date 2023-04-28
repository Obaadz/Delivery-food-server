import express from "express";
import { RestaurantController } from "../../controllers/restaurantController";

const restaurantRoutes = express.Router();

restaurantRoutes.post("/restaurants", RestaurantController.create);

export { restaurantRoutes };
