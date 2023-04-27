import express from "express";
import { UserController } from "../../controllers/userController";
import { jwtAuthExpress } from "../../middleware/jwtAuth";

const userRoutes = express.Router();

userRoutes.post("/users/register", UserController.register);
userRoutes.post("/users/register/update", jwtAuthExpress, UserController.updateRegister);
userRoutes.post("/users/login", UserController.login);

export { userRoutes };
