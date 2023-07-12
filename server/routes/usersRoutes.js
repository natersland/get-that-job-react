import { Router } from "express";
// middleware -----------------------------
import protectApi from "../middlewares/protectApi.js";
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
/* usersRouter.use(protect); */

usersRouter
  // ดึงข้อมูล User 1 คน -> // http://localhost:4000/users/:id
  .get("/:id", protectApi, getOneUserData)
  // ดึงข้อมูล User ทั้งหมด -> http://localhost:4000/users
  .get("/", protectApi, getAllUserData)
  // อัพเดต User 1 คน -> // http://localhost:4000/users/:id
  .put("/:id", protectApi, uploadFile, updateOneUser)
  // อัพเดต following job
  .patch("/followjob/:id", protectApi, followingJobUpdate) // http://localhost:4000/users/followjob/:id
  // เปลี่ยนรหัส user *ไว้ใช้ตอนลืมพาส รหัสจะเข้า jwt เหมือนเดิม *ยิงจาก postman เท่านั้น - ใน body ใส่แค่ password
  .patch("/changepass/:id", protectApi, changeUserPassWord);

export default usersRouter;
