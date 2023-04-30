import { Request, Response } from "express";
import { JwtAuthExpressRequest } from "../middleware/jwtAuth";
import { sendForgetEmail } from "../services/email";
import { ERROR_MESSAGES, RESPONSE_MESSAGES } from "../types/enums";
import { UpdateUserData, User, UserFromToken } from "../types/user";
import checkIfUserExistsByEmail from "../utils/checkIfUserExistsByEmail";
import createUser from "../utils/createUser";
import generateRandomCodeFrom6Digits from "../utils/generateRandomCodeFrom6Digits";
import generateToken from "../utils/generateToken";
import getUserById from "../utils/getUserById";
import loginUser from "../utils/loginUser";
import updateUserData from "../utils/updateUserData";
import updateUserForgetCode from "../utils/updateUserForgetCode";
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
      if (user.profile_image_base64) {
        await updateUserProfileImage(authUser._id, user.profile_image_base64);
      }

      if (user.first_name || user.last_name || user.phone_number || user.address)
        await updateUserData(authUser._id, user);

      const authHeader = req.headers.authorization as string;

      const token =
        authHeader.replace("Bearer ", "") ||
        generateToken({ _id: authUser._id, email: authUser.email });

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
      const dbUser = await getUserById(authUser._id),
        leanUser = dbUser.toObject({ virtuals: ["profile_image_url"] });

      res.status(200).send({
        user: leanUser,
        message: RESPONSE_MESSAGES.USER_DATA_RECEIVED,
      });
    } catch (err: any) {
      console.error("Error on getData user controller:", err.message);

      res
        .status(401)
        .send({ user: "null", message: err.message || ERROR_MESSAGES.SERVER_ERROR });
    }
  }

  static async getProfileImage(req: Request, res: Response) {
    const _id = req.params.id;

    try {
      const dbUser = await getUserById(_id, "profile_image_base64");

      const base64Image = dbUser.profile_image_base64;

      if (!base64Image)
        return res.status(404).send(ERROR_MESSAGES.PROFILE_IMAGE_NOT_FOUND);

      const buffer = Buffer.from(base64Image, "base64");

      res.set("Content-Type", "image/webp");
      res.send(buffer);
    } catch (err: any) {
      console.error("Error on getProfileImage user controller:", err.message);

      res.status(500).send(ERROR_MESSAGES.SERVER_ERROR);
    }
  }

  static async generateForgetCode(req: Request, res: Response) {
    const user: Pick<User, "email"> = req.body;

    try {
      // if(!(await checkIfUserExistsByEmail(user.email))) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND)

      const forget_code = generateRandomCodeFrom6Digits();

      await updateUserForgetCode(user.email, forget_code);

      sendForgetEmail(user.email, forget_code);

      res.status(201).send({
        forget_code,
        message: RESPONSE_MESSAGES.SUCCESS,
      });
    } catch (err: any) {
      console.error("Error on generateForgetCode user controller:", err.message);

      res.status(404).send({
        forget_code: "null",
        message: err.message || ERROR_MESSAGES.SERVER_ERROR,
      });
    }
  }
}
