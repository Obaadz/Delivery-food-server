import { Request, Response } from "express";
import { JwtAuthExpressRequest } from "../middleware/jwtAuth";
import { ERROR_MESSAGES, RESPONSE_MESSAGES } from "../types/enums";
import { IUserDocument, UpdateUserData, User, UserFromToken } from "../types/user";
import createUser from "../utils/createUser";
import generateToken from "../utils/generateToken";
import getUserById from "../utils/getUserById";
import loginUser from "../utils/loginUser";
import updateUserData from "../utils/updateUserData";
import updateUserProfileImage from "../utils/updateUserProfileImage";

export class UserController {
  static async register(req: Request, res: Response) {
    const user: User = req.body;

    try {
      const dbUser = await createUser(user),
        leanUser = dbUser.toObject();

      leanUser.is_new = true;

      const token = generateToken({ _id: leanUser._id, email: leanUser.email });

      console.debug("Debug on register user controller:", leanUser);

      res.status(201).send({ token, message: RESPONSE_MESSAGES.AUTHENTICATED });
    } catch (err: any) {
      console.error("Error on register user controller:", err.message);

      res
        .status(409)
        .send({ token: "null", message: err.message || ERROR_MESSAGES.SERVER_ERROR });
    }
  }

  static async login(req: Request, res: Response) {
    const user: Pick<User, "email" | "password"> = req.body;

    console.debug("Debug on login user controller user req.body:", user);

    try {
      const dbUser = await loginUser(user),
        leanUser = dbUser.toObject();

      if (!(leanUser.first_name && leanUser.last_name && leanUser.phone_number))
        leanUser.is_new = true;

      const token = generateToken({ _id: leanUser._id, email: leanUser.email });

      console.debug("Debug on login user controller:", leanUser);

      res.status(201).send({ token, message: RESPONSE_MESSAGES.AUTHENTICATED });
    } catch (err: any) {
      console.error("Error on login user controller:", err.message);

      res
        .status(401)
        .send({ token: "null", message: err.message || ERROR_MESSAGES.SERVER_ERROR });
    }
  }

  static async update(req: JwtAuthExpressRequest<UserFromToken>, res: Response) {
    const user: UpdateUserData = req.body,
      authUser = req.auth as UserFromToken;

    try {
      if (user.profile_image)
        await updateUserProfileImage(authUser._id, user.profile_image);

      const dbUser = await updateUserData(authUser._id, user),
        leanUser = dbUser.toObject();

      const token = generateToken({ _id: leanUser._id, email: leanUser.email });

      console.debug("Debug on update user controller:", leanUser);

      res.status(201).send({ token, message: RESPONSE_MESSAGES.USER_DATA_UPDATED });
    } catch (err: any) {
      console.error("Error on update user controller:", err.message);

      res
        .status(401)
        .send({ token: "null", message: err.message || ERROR_MESSAGES.SERVER_ERROR });
    }
  }

  static async getData(req: JwtAuthExpressRequest<UserFromToken>, res: Response) {
    const authUser = req.auth as UserFromToken;

    try {
      const dbUser = await getUserById(authUser._id);

      res.status(200).send({
        user: dbUser.toObject(),
        message: RESPONSE_MESSAGES.USER_DATA_RECEIVED,
      });
    } catch (err: any) {
      console.error("Error on getData user controller:", err.message);

      res
        .status(401)
        .send({ user: "null", message: err.message || ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
