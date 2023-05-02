import express from "express";
import nodemailer from "nodemailer";
import { createServer } from "http";
import cors from "cors";
import mongoose from "mongoose";
import v1Routes from "./routes/v1/index";
import SocketServer from "./socket";
import errorHandler from "./middleware/errorHandler";
import "dotenv/config";
import { sendForgetEmail } from "./services/email";

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

app.use("/images", express.static("public/images"));

app.use(v1Routes);

app.use(errorHandler);

httpServer.listen(PORT, async () => {
  console.log(`Listening on port: ${PORT}`);

  mongoose.set("strictQuery", false);
  await mongoose.connect(DB_URI);
});

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});
