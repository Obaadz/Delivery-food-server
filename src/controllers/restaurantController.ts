import { Request, Response } from "express";
import { ERROR_MESSAGES, RESPONSE_MESSAGES } from "../types/enums";
import { Restaurant } from "../types/restaurant";
import createRestaurant from "../utils/createRestaurant";

export class RestaurantController {
  static async create(req: Request, res: Response) {
    const restaurant: Restaurant = req.body;

    try {
      await createRestaurant(restaurant);

      res.status(201).send({ message: RESPONSE_MESSAGES.RESTAURANT_CREATED });
    } catch (err: any) {
      console.error("Error on create restaurant controller:", err.message);

      res.status(400).send({ message: err.message || ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
