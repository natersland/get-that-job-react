import { db } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import multer from "multer";

export const login = async (req, res, next) => {
  try {
    const user = await db.collection("users").findOne({
      email: req.body.email,
    });

    if (!user) {
      return next(createError(400, "User not found"));
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return next(createError(400, "Password is not valid"));
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1m",
      }
    );

    res.status(200).json({
      message: `Login Successful! Welcome ${user.email}`,
      user_id: user._id,
      token,
    });
  } catch (error) {
    next(error);
  }
};
