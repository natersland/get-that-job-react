import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import {client} from "./utils/db.js"
import authRouter from "./apps/auth.js";


async function init() {
  dotenv.config();
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });

  const app = express();
  const PORT = 4000;
  

  await client.connect();

  app.use(cors());
  app.use(bodyParser.json());

  app.use("/auth", authRouter);

  app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
  });
}

init();
