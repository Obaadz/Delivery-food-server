import express from "express";
import { createServer } from "http";
import cors from "cors";
import mongoose from "mongoose";
import v1Routes from "./routes/v1/index";
import SocketServer from "./socket";
import "dotenv/config";

const PORT = process.env.PORT || 5000,
  DB_URI = process.env.DB_URI || "",
  PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

const app = express();
const bodyParser = {
  urlencoded: express.urlencoded({ limit: "5mb", extended: true }),
  json: express.json({ limit: "5mb" }),
};

const httpServer = createServer(app);

SocketServer.initalize(httpServer);

app.use(bodyParser.urlencoded);
app.use(bodyParser.json);
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(v1Routes);

httpServer.listen(5000, () => {
  console.log(`Listening on port: ${5000}`);

  mongoose.set("strictQuery", false);
  mongoose.connect(DB_URI);
});

export { PAGE_SIZE };
