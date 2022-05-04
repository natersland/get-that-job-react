import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import authRouter from "./apps/auth.js";
import { client } from "./utils/db.js";

async function init() {
  dotenv.config();
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });

  const app = express();
  const port = 4000;

  await client.connect();

  app.use(cors());
  app.use(bodyParser.json());

  app.use("/auth", authRouter);

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
