import { Router } from "express";
import {
  createProfessional,
  createRecuiter,
  deleteUser,
  getAllUserData,
  getOneUserData,
  updateUserData,
} from "../controllers/users.js";

const usersRouter = Router();

// CREATE User  ----------------------------
usersRouter.post("/create/professional", createProfessional);
usersRouter.post("/create/recruiter", createRecuiter);
// UPDATE User Data ----------------------------
usersRouter.put("/:id", updateUserData);
// DELETE User Data ----------------------------
usersRouter.delete("/:id", deleteUser);
// ดึงข้อมูล User 1 คน ----------------------------
usersRouter.get("/:id", getOneUserData);
// ดึงข้อมูล User ทั้งหมด ----------------------------
usersRouter.get("/", getAllUserData);

export default usersRouter;
