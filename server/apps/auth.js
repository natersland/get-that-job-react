import { Router } from "express";
import { db } from "../utils/db.js";
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const collection = db.collection("users");
  await collection.insertOne(user);

  return res.json({
    message: "User has been created successfully",
  });
});

export default authRouter;
