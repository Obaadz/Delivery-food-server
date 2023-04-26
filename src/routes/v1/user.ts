import express from "express";
import { UserController } from "../../controllers/userController";

const userRoutes = express.Router();

userRoutes.post("/users/register", UserController.register);
userRoutes.post("/users/login", UserController.login);

export { userRoutes };
