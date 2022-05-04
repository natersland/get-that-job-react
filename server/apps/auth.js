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

authRouter.post("/login", async (req, res) => {
  const user = await db.collection("users").findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    return res.status(400).json({
      message: "password not valid",
    });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.SECRET_KEY,
    {
      expiresIn: 900000,
    }
  );

  return res.json({
    message: "login succesfully",
    token,
  });
});

export default authRouter;
