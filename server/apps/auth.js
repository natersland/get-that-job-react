import { Router } from "express";
import { db } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import { cloudinaryUpload } from "../utils/upload.js";

const authRouter = Router();

const multerUpload = multer({ dest: "uploadResumes/" });
const resumeUpload = multerUpload.fields([{ name: "uploadFile", maxCount: 1 }]);

authRouter.post("/register", resumeUpload, async (req, res) => {
  console.log(req.files.uploadFile);

  const user = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    birthDate: req.body.birthDate,
    linkedin: req.body.linkedin,
    title: req.body.title,
    experience: req.body.experience,
    education: req.body.education,
    companyName: req.body.companyName,
    companyWebsite: req.body.companyWebsite,
    about: req.body.about,
  };

  const uplaodFileUrl = await cloudinaryUpload(req.files);
  user["uploadFiles"] = uplaodFileUrl;

  console.log(user);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  return res.json({
    Message: "User has been created successfully",
  });
});

// Register Zone -------------------------------------------
authRouter.post("/register", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const collection = db.collection("users");
  await collection.insertOne(user);

  return res.json({
    message: "User has been created successfully",
  });
});
// ------------------------------------------------------

// Login Zone -------------------------------------------
authRouter.post("/login", async (req, res) => {
  const user = await db.collection("users").findOne({
    email: req.body.email,
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
    { id: user._id, email: user.email, role: user.role },
    process.env.SECRET_KEY,
    {
      expiresIn: "900000",
    }
  );

  return res.json({
    message: "login succesfully",
    token,
  });
});
// ------------------------------------------------------

export default authRouter;
