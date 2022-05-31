import { Router } from "express";
// middleware -----------------------------
import protect from "../middlewares/protect.js";
// Controller  -----------------------------
import {
  changeUserPassWord,
  getAllUserData,
  getOneUserData,
  updateOneUser,
  uploadFile,
  followingJobUpdate,
} from "../controllers/usersControllers.js";

const usersRouter = Router();
/* usersRouter.use(protect);
 */

usersRouter
  // ดึงข้อมูล User 1 คน -> // http://localhost:4000/users/:id
  .get("/:id", getOneUserData)
  // ดึงข้อมูล User ทั้งหมด -> http://localhost:4000/users
  .get("/", getAllUserData)
  // อัพเดต User 1 คน -> // http://localhost:4000/users/:id
  .put("/:id", uploadFile, updateOneUser)
  // เปลี่ยนรหัส user *ไว้ใช้ตอนลืมพาส รหัสจะเข้า jwt เหมือนเดิม *ยิงจาก postman เท่านั้น - ใน body ใส่แค่ password
  .patch("/changepass/:id", changeUserPassWord)
  // อัพเดต following job
  .patch("/followjob/:id", followingJobUpdate);

export default usersRouter;
