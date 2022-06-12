import { Router } from "express";
import { login, register, uploadFile } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter
  // Register User -> http://localhost:4000/auth/register
  .post("/register", uploadFile, register)
  // Login User -> http://localhost:4000/auth/login
  .post("/login", login);

export default authRouter;
