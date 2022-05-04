import { Router } from "express";
import { db } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import { cloudinaryUpload } from "../utils/uploads.js";


const authRouter = Router();

// Upload Function  -------------------------------------------

const multerUpload = multer({ dest: "uploads/" });
const logoUpload = multerUpload.fields([{ name: "logo", maxCount: 1 }]);

authRouter.post("/register", logoUpload, async (req,res) => {
    console.log(req.files.logo)
    const user = {
        companyName: req.body.companyName,
        email : req.body.email,
        password: req.body.password,
        companyWebsite:req.body.companyWebsite,
        about:req.body.about,
        /* uploadFile:req.body.uploadFile */
    }
    /* await cloudinaryUpload(req.files);  */ /*error*/

    const avatarUrl = await cloudinaryUpload(req.files);
    user["avatars"] = avatarUrl;
	

  /*   authRouter.post("/register", logoUpload, async (req, res) => {
	*/

    console.log(user)
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await db.collection("users").insertOne(user)

    return res.json({
        Message : "User has been created successfully"
    })
})

// Register Zone -------------------------------------------
// authRouter.post("/register", async (req, res) => {
//   const user = {
//     email: req.body.email,
//     password: req.body.password,
//     role: req.body.role,
//   };

//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);

//   const collection = db.collection("users");
//   await collection.insertOne(user);

//   return res.json({
//     message: "User has been created successfully",
//   });
// });
// ------------------------------------------------------

// Login Zone -------------------------------------------
authRouter.post("/login", async (req, res) => {
  const user = await db.collection("users").findOne({
    username: req.body.username,
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
