import { Request, Response } from "express";
import { JwtAuthExpressRequest } from "../middleware/jwtAuth";
import { findUser, updateUser } from "../services/user";
import { ERROR_MESSAGES } from "../types/enums";
import { IUserDocument, UpdateRegisterUser, User, UserFromToken } from "../types/user";
import createUser from "../utils/createUser";
import generateToken from "../utils/generateToken";
import loginUser from "../utils/loginUser";
import updateRegisterUser from "../utils/updateRegisterUser";

export class UserController {
  static async register(req: Request, res: Response) {
    const user: User = req.body.user;

    try {
      const dbUser = await createUser(user),
        leanUser = dbUser.toObject();

      leanUser.isNew = true;

      const token = generateToken(leanUser);

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
      const dbUser = await loginUser(user),
        leanUser = dbUser.toObject();

      const token = generateToken(leanUser);

      res.status(201).send({ token, message: "Authenticated" });
    } catch (err: any) {
      console.error("Error on login user controller:", err.message);

      res
        .status(401)
        .send({ token: null, message: err.message || ERROR_MESSAGES.SERVER_ERROR });
    }
  }

  static async updateRegister(req: JwtAuthExpressRequest<UserFromToken>, res: Response) {
    const user: UpdateRegisterUser = req.body.user,
      authUser = req.auth as UserFromToken;

    try {
      if (!authUser.isNew) throw new Error(ERROR_MESSAGES.INCORRECT_TOKEN);

      const dbUser = await updateRegisterUser(authUser._id, user),
        leanUser = dbUser.toObject();

      const token = generateToken(leanUser);

      res.status(201).send({ token, message: "Authenticated" });
    } catch (err: any) {
      console.error("Error on updateRegister user controller:", err.message);

      res
        .status(401)
        .send({ token: null, message: err.message || ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
