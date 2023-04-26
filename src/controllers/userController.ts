import { Request, Response } from "express";
import { findUser } from "../services/user";
import { ERROR_MESSAGES } from "../types/enums";
import { User } from "../types/user";
import createUser from "../utils/createUser";
import generateToken from "../utils/generateToken";
import loginUser from "../utils/loginUser";

export class UserController {
  static async register(req: Request, res: Response) {
    const user: User = req.body.user;

    try {
      const dbUser = await createUser(user);

      const token = generateToken(dbUser);

      res.status(201).send({ token, message: "Authenticated" });
    } catch (err: any) {
      console.error("Error on register user controller:", err.message);

      res
        .status(401)
        .send({ token: null, message: err.message || ERROR_MESSAGES.SERVER_ERROR });
    }
  }

  static async login(req: Request, res: Response) {
    const user: Pick<User, "email" | "password"> = req.body.user;

    try {
      const dbUser = await loginUser(user);

      const token = generateToken(dbUser);

      res.status(201).send({ token, message: "Authenticated" });
    } catch (err: any) {
      console.error("Error on login user controller:", err.message);

      res
        .status(401)
        .send({ token: null, message: err.message || ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
