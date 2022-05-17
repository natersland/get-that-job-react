import { db } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
/* export const register = uploadFile(async (req, res, next) => {}); // ยังใช้ไม่ได้
 */
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
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "900000",
      }
    );

    return res.status(200).json({
      message: `Login succesfull! welcome ${user.email}`,
      token,
    });
  } catch (error) {
    next(error);
  }
};
