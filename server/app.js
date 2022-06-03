// packages -----------------------------
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
// cloud and database -------------------------
import cloudinary from "cloudinary";
import { client } from "./utils/db.js";

// router -----------------------------------
import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobsRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import applicationsRouter from "./routes/applicationsRoutes.js";

// --------------------------------------------------------

async function init() {
  dotenv.config();
  // cloudinary for upload files feature -----------------
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });

  // initialize server and setting -----------------
  const app = express();
  const port = 4000 || 8000;
  await client.connect();

  // middleware -----------------
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(morgan("dev")); // เอาไว้ logger ดู HTTP request ใน node terminal

  // custom middleware

  // app routers -----------------
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/jobs", jobRouter);
  app.use("/applications", applicationsRouter);

  app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });
  // response from server -----------------
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
