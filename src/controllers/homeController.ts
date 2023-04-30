import { Request, Response } from "express";
import { ERROR_MESSAGES, RESPONSE_MESSAGES } from "../types/enums";
import getHomeData from "../utils/getHomeData";

export class HomeController {
  static async getData(req: Request, res: Response) {
    try {
      const home = await getHomeData();

      console.debug("Debug on getData home controller:", home);

      res.status(200).send({ home, message: RESPONSE_MESSAGES.SUCCESS });
    } catch (err: any) {
      console.error("Error on getData home controller:", err.message);

      res.status(404).send({ message: err.message || ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
