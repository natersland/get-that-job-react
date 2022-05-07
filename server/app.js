// packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// cloud and database
import cloudinary from "cloudinary";
import { client } from "./utils/db.js";

// router
import authRouter from "./apps/auth.js";
import postRouter from "./apps/posts.js";

async function init() {
  // cloudinary for upload files feature -----------------
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });

  // initialize server and setting -----------------
  const app = express();
  const port = process.env.PORT || 4000;
  dotenv.config();
  await client.connect();

  // middleware -----------------
  app.use(cors());
  app.use(bodyParser.json());

  // app routers -----------------
  app.use("/auth", authRouter);
  app.use("/posts", postRouter);

  // response from server -----------------
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
