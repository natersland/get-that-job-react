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
usersRouter
  .post("/create/professional", createProfessional) // สร้าง professional ใหม่ -> http://localhost:4000/users/create/professional
  .post("/create/recruiter", createRecuiter); // สร้าง recruiter ใหม่ ->  http://localhost:4000/users/create/recruiter
// อัพเดต User 1 คน ----------------------------
usersRouter.put("/:id", uploadFile, async (req, res, next) => {
  // http://localhost:4000/users/:id
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

usersRouter
  // อัพเดต 1 professional only ตอนกด apply job แล้วไม่มีข้อมูล -> http://localhost:4000/users/:id
  .put("/:id")
  // เปลี่ยนรหัส user *ไว้ใช้ตอนลืมพาส รหัสจะเข้า jwt เหมือนเดิม *ยิงจาก postman เท่านั้น - ใน body ใส่แค่ password
  .patch("/changepass/:id", changeUserPassWord)
  // ลบข้อมูล user -> http://localhost:4000/users/:id
  .delete("/:id", deleteUser)
  // ดึงข้อมูล User 1 คน -> // http://localhost:4000/users/:id
  .get("/:id", getOneUserData)
  // ดึงข้อมูล User ทั้งหมด -> http://localhost:4000/users
  .get("/", getAllUserData);

export default usersRouter;
