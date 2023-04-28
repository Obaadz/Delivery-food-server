import express from "express";
import { ItemController } from "../../controllers/itemController";

const itemRoutes = express.Router();

itemRoutes.post("/items", ItemController.create);

export { itemRoutes };
