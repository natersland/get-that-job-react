import { Router } from "express";
import { login } from "../controllers/auth.js";
import multer from "multer";
import { cloudinaryUploadCV, cloudinaryUploadLogo } from "../utils/upload.js";
import { db } from "../utils/db.js";
import bcrypt from "bcrypt";
// Schema Medels ---------------------
import UsersProfessional from "../models/UsersProfessional.js";
import UsersRecruiter from "../models/UsersRecruiter.js";

const authRouter = Router();

const multerUpload = multer({ dest: "upload/" });
const uploadFile = multerUpload.fields([
  { name: "cvFile", maxCount: 1 },
  { name: "logoFile", maxCount: 1 },
]);
// Login User -------------------------------------------
authRouter.post("/login", login);
// Register User ------------------------------------------
authRouter.post("/register", uploadFile, async (req, res, next) => {
  try {
    const userRole = req.body.role;
    function checkUserRole(role) {
      if (String(role) === "professional") {
        const user = new UsersProfessional(req.body);
        return user;
      } else if (String(role) === "recruiter") {
        const user = new UsersRecruiter(req.body);
        return user;
      } else {
        console.log(`Wrong role please check again Role is: ${role}`);
      }
    }
    const user = checkUserRole(userRole);

    if (String(userRole) === "professional") {
      // if professional: Upload Files: cv file
      const uploadFileUrl = await cloudinaryUploadCV(req.files);
      user["uploadFiles"] = uploadFileUrl;
    } else if (String(userRole) === "recruiter") {
      // if recruiter: Upload Files ----------------------------------------
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
});

// register เส้นเก่า *ไม่ใช้แล้ว ---------------------------------------
authRouter.post("/registerV1", uploadFile, async (req, res) => {
  const role = req.body.role;

  console.log(typeof role);
  // Add Data to DB ----------------------------------------
  if (String(role) === "professional") {
    const user = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      name: req.body.name,
      phone: req.body.phone,
      birthDate: req.body.birthDate,
      linkedin: req.body.linkedin,
      title: req.body.title,
      experience: req.body.experience,
      education: req.body.education,
    };
    // Upload Files ----------------------------------------

    const uploadFileUrl = await cloudinaryUploadCV(req.files);
    user["uploadFiles"] = uploadFileUrl;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await db.collection("users").insertOne(user);
    console.log(user);
  } else if (String(role) === "recruiter") {
    // Add Data to DB ----------------------------------------
    const user = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      companyName: req.body.companyName,
      companyWebsite: req.body.companyWebsite,
      about: req.body.about,
    };
    // Upload Files ----------------------------------------
    const logoFileUrl = await cloudinaryUploadLogo(req.files);
    user["companyLogo"] = logoFileUrl;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await db.collection("users").insertOne(user);
    console.log(user);

    /* await db
      .collection("users")
      .aggregate([{ $addFields: { userId: { $toString: "$_id" } } }])
      .insertOne(user); */
  } else {
    console.log(`Wrong role please check again Role is: ${role}`);
  }

  return res.json({
    Message: "User has been created successfully",
  });
});
export default authRouter;
