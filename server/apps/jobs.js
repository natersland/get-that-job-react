import { Router } from "express";
import {
  createJob,
  createJobV1,
  deleteJob,
  getAllJobs,
  getAllJobsWithFilter,
  getOneJob,
  natTestCountByJobsCat,
  updateJob,
} from "../controllers/jobs.js";
const jobRouter = Router();

// Create Job V2 (ให้ใช้อันนี้) ----------------------------
jobRouter.post("/create", createJob);
// ดึงข้อมูล JOBS ทั้งหมด (แบบมีฟีลเตอร์ + lookup) ----------------------------
jobRouter.get("/", getAllJobsWithFilter);
// ดึงข้อมูล JOBS ทั้งหมด (ไม่มีฟีลเตอร์ & no lookup) ----------------------------
jobRouter.get("/data", getAllJobs);
// ดึงข้อมูล JOB 1 งาน----------------------------
jobRouter.get("/:id", getOneJob);
// UPDATE JOB ----------------------------
jobRouter.put("/:id", updateJob);
// DELETE JOB ----------------------------
jobRouter.delete("/:id", deleteJob);
// TEST ROUTES ----------------------------
jobRouter.get("/countByCat", natTestCountByJobsCat);

// Create Job (อันเก่า *ไม่ใช้แล้ว) -----------------------------
jobRouter.post("/createjob", createJobV1);

export default jobRouter;
