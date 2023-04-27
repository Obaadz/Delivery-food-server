import { expressjwt, Request as JwtAuthExpressRequest } from "express-jwt";
import { Socket } from "socket.io";
import jwt, { Secret } from "jsonwebtoken";
import { UserFromToken } from "../types/user";
import "dotenv/config";

const secret = process.env.SECRET as Secret;

export const jwtAuthExpress = expressjwt({
  secret,
  algorithms: ["HS256"],
});

export type { JwtAuthExpressRequest };

/**
 * Authenticates the JWT token for the socket before starting the connection.
 *
 * @param {socket.io.Socket} socket - The socket instance being used.
 * @param {Function} next - The callback function to continue the middleware execution.
 * @throws {Error} If the token is invalid or does not include the necessary `id` property.
 */
export const jwtAuthSocket = (
  socket: Socket,
  next: (err?: Error | undefined) => void
) => {
  try {
    const token: string = socket.handshake.auth.token.split(" ");
    if (!token && token[0] !== "Bearer")
      throw new Error(
        "The token provided is invalid or does not include the necessary 'id' property"
      );

    const user = jwt.verify(token[1], secret) as UserFromToken;

    // if (Number(socket.handshake.query?.user_id) !== Number(user.id))
    //   throw new Error(
    //     "The token provided is invalid or does not include the necessary 'id' property"
    //   );

    next();
  } catch (err: any) {
    next(err);
  }
};
