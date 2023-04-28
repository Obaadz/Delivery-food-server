import express from "express";
import { HomeController } from "../../controllers/homeController";

const homeRoutes = express.Router();

homeRoutes.get("/home", HomeController.getData);

export { homeRoutes };
