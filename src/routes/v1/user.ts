import express from "express";
import { UserController } from "../../controllers/userController";
import { jwtAuthExpress } from "../../middleware/jwtAuth";

const userRoutes = express.Router();

userRoutes.post("/users/register", UserController.register);
userRoutes.post("/users/login", UserController.login);
userRoutes.post("/users/update/me", jwtAuthExpress, UserController.update);
userRoutes.post("/users/update/password", UserController.updatePassword);
userRoutes.get("/users/me", jwtAuthExpress, UserController.getData);
userRoutes.get("/users/:id/profile_image.webp", UserController.getProfileImage);
userRoutes.post("/users/forget", UserController.generateForgetCode);

export { userRoutes };
