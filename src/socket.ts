import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

const MAX_BUFFER_SIZE = 5e6; // 5MB

export default class SocketServer {
  private static io: Server;

  static async initalize(httpServer: HttpServer) {
    SocketServer.io = new Server(httpServer, {
      maxHttpBufferSize: MAX_BUFFER_SIZE,
      cors: {
        origin: "*",
        credentials: false,
      },
    });

    SocketServer.io.on("connect", this.startListeners);
  }

  private static async startListeners(socket: Socket) {
    console.log("SOCKET ID CONNECTED: " + socket.id);
  }
}
