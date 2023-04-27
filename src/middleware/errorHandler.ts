import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "express-jwt";
import { ERROR_MESSAGES } from "../types/enums";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UnauthorizedError)
    res
      .status(401)
      .send({ token: null, message: err.message || ERROR_MESSAGES.INCORRECT_TOKEN });
};
