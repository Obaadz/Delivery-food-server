import express from "express";
const v1Routes = express.Router();

v1Routes.get("/v1/", async (req, res) => {
  res.send("API works fine!");
});

// v1Routes.use("/v1", chatsRouters);

export default v1Routes;
