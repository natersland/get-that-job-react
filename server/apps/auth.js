import { Router } from "express";
import { db } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import { cloudinaryUploadCV, cloudinaryUploadLogo } from "../utils/upload.js";

const authRouter = Router();

const multerUpload = multer({ dest: "upload/" });
const uploadFile = multerUpload.fields([
  { name: "cvFile", maxCount: 1 },
  { name: "logoFile", maxCount: 1 },
]);

/* const multerLogoUpload = multer({ dest: "uploadLogo/" });
const logo = multerLogoUpload.fields([{ name: "uploadLogo", maxCount: 1 }]);
 */
authRouter.post("/register", uploadFile, async (req, res) => {
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
      userAppiedJobs: req.body.userAppiedJobs,
      userFollowJobs: req.body.userFollowJobs,
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
  } else {
    console.log(`Wrong role please check again Role is: ${role}`);
  }

  return res.json({
    Message: "User has been created successfully",
  });
});

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

// Create Job Zone -------------------------------------------
authRouter.post("/createjob", async (req, res) => {
  const filterComma = (salary) => {
    let result = salary.replace(/[^\w\s]/gi, "");
    return Number(result);
  };

  const user = {
    jobTitle: req.body.jobTitle,
    jobCategory: req.body.jobCategory,
    jobType: req.body.jobType,
    minSalary: filterComma(req.body.minSalary),
    maxSalary: filterComma(req.body.maxSalary),
    aboutJob: req.body.aboutJob,
    mandatoryReq: req.body.mandatoryReq,
    optionalReq: req.body.optionalReq,
    createdJobDate: req.body.createdJobDate,
    totalCandidates: req.body.totalCandidates,
    candidatesOnTrack: req.body.candidatesOnTrack,
    jobsStatus: req.body.jobsStatus,
  };

  await db.collection("jobs").insertOne(user);

  return res.json({
    Message: "Create new job has been created successfully",
  });
});
export default authRouter;
