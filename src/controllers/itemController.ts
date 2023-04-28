import { Request, Response } from "express";
import { ERROR_MESSAGES, RESPONSE_MESSAGES } from "../types/enums";
import { Item } from "../types/item";
import createItem from "../utils/createItem";

export class ItemController {
  static async create(req: Request, res: Response) {
    const item: Item = req.body;

    try {
      await createItem(item);

      res.status(201).send({ message: RESPONSE_MESSAGES.ITEM_CREATED });
    } catch (err: any) {
      console.error("Error on create item controller:", err.message);

      res.status(400).send({ message: err.message || ERROR_MESSAGES.SERVER_ERROR });
    }
  }
}
