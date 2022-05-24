import { Router } from "express";
import multer from "multer";
import { ObjectId } from "mongodb";
import { cloudinaryUploadCV, cloudinaryUploadLogo } from "../utils/upload.js";
import { db } from "../utils/db.js";
// middleware -----------------------------
import protect from "../middlewares/protect.js";
// Controller  -----------------------------
import {
  changeUserPassWord,
  createProfessional,
  createRecuiter,
  deleteUser,
  getAllUserData,
  getOneUserData,
} from "../controllers/users.js";

const usersRouter = Router();
/* usersRouter.use(protect);
 */
// Multer & collection for update user data -----------------------------
const multerUpload = multer({ dest: "upload/" });
const uploadFile = multerUpload.fields([{ name: "logoFile", maxCount: 1 }]);
const collection = db.collection("users");
// CREATE User  ----------------------------
usersRouter.post("/create/professional", createProfessional);
usersRouter.post("/create/recruiter", createRecuiter);
// เปลี่ยนรหัส user *ไว้ใช้ตอนลืมพาส รหัสจะเข้า jwt เหมือนเดิม ----------------------------
usersRouter.patch("/changepass/:id", changeUserPassWord); // ยิงจาก postman เท่านั้น - ใน body ใส่แค่ password
// อัพเดต User 1 คน ----------------------------
usersRouter.put("/:id", uploadFile, async (req, res, next) => {
  try {
    const userId = ObjectId(req.params.id);
    const updateUserData = {
      ...req.body,
    };
    /*     const logoFileUrl = await cloudinaryUploadLogo(req.files);
    user["companyLogo"] = logoFileUrl; */

    await collection.updateOne({ _id: userId }, { $set: updateUserData });
    res.status(200).json(`User ${userId} has been updated successful`);
    console.log(`Updated user data id:${userId} successful!`);
  } catch (error) {
    next(error);
  }
});
// DELETE User Data ----------------------------
usersRouter.delete("/:id", deleteUser);
// ดึงข้อมูล User 1 คน ----------------------------
usersRouter.get("/:id", getOneUserData);
// ดึงข้อมูล User ทั้งหมด ----------------------------
usersRouter.get("/", getAllUserData);

export default usersRouter;
