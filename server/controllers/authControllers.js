import { db } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import multer from "multer";
import { cloudinaryUploadCV, cloudinaryUploadLogo } from "../utils/upload.js";
// Schema Medels ---------------------
import RecruiterModel from "../models/RecruiterModel.js";
import ProfessionalModel from "../models/ProfessionalModel.js";

const multerUpload = multer({ dest: "upload/" });
export const uploadFile = multerUpload.fields([
  { name: "cvFile", maxCount: 1 },
  { name: "logoFile", maxCount: 1 },
]);
export const checkEmail = async (req, res) => {
  const email = req.body.email;
  const emailExists = await User.findOne({ email: email }).exec();
  if (emailExists) {
    return res.status(409).send({
      message: "Email exists",
    });
  }
};
// POST - register ----------------------------------------------------------------
export const register = async (req, res, next) => {
  try {
    const userRole = req.body.role;

    function checkUserRole(role) {
      if (String(role) === "professional") {
        // ถ้า professional ไม่ใส่อะไรมาในช่อง ที่ไม่ได้ required ตอนสมัคร ให้เซ็ทค่า default เป็น "-"
        req.body.name === "" ? (req.body.name = "-") : null;
        req.body.phone === "" ? (req.body.phone = "-") : null;
        req.body.linkedin === "" ? (req.body.linkedin = "-") : null;
        req.body.title === "" ? (req.body.title = "-") : null;
        req.body.experience === "" ? (req.body.experience = "-") : null;
        req.body.education === "" ? (req.body.education = "-") : null;
        const user = new ProfessionalModel(req.body);
        return user;
      } else if (String(role) === "recruiter") {
        // ถ้า recruiter ไม่ใส่อะไรมาในช่อง ที่ไม่ได้ required ตอนสมัคร ให้เซ็ทค่า default เป็น "-"
        req.body.companyName === "" ? (req.body.companyName = "-") : null;
        req.body.about === "" ? (req.body.about = "-") : null;
        const user = new RecruiterModel(req.body);
        return user;
      } else {
        console.log(`Wrong role please check again Role is: ${role}`);
      }
    }
    const user = checkUserRole(userRole);

    if (String(userRole) === "professional") {
      // if professional: Upload Files: cv file
      const cvFileUrl = await cloudinaryUploadCV(req.files);
      user["cvFiles"] = cvFileUrl;
    } else if (String(userRole) === "recruiter") {
      // if recruiter: Upload Files ----------------------------------------
      console.log("hi", req.files);

      const logoFileUrl = await cloudinaryUploadLogo(req.files);
      user["companyLogo"] = logoFileUrl;
    }
    // hashing password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await db.collection("users").insertOne(user);
    console.log(user);
    res.status(200).json(`User has been created successfully`);

    /* await db
      .collection("users")
      .aggregate([{ $addFields: { userId: { $toString: "$_id" } } }])
      .insertOne(user); */
  } catch (error) {
    next(error);
  }
};
// POST - login ----------------------------------------------------------------
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
        expiresIn: "24h",
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
