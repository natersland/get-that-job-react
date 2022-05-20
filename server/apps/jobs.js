import { Router } from "express";
import {
  countCategoty,
  countType,
  createJob,
  createJobV1,
  deleteJob,
  getAllJobs,
  getAllJobsWithFilter,
  getJobs,
  getOneJob,
  testGetAllJobsWithFilterV2,
  updateJob,
} from "../controllers/jobs.js";
const jobRouter = Router();

// Create Job V2 (ให้ใช้อันนี้) ----------------------------
jobRouter.post("/create", createJob);
// ดึงข้อมูล JOBS ทั้งหมด (แบบมีฟีลเตอร์ + lookup) ----------------------------
jobRouter.get("/", getAllJobsWithFilter);
// ดึงข้อมูล JOBS ทั้งหมด (ไม่มีฟีลเตอร์ & no lookup) ----------------------------
jobRouter.get("/data", testGetAllJobsWithFilterV2);
// filter Zone ----------------------------
jobRouter.get("/countCategory", countCategoty);
jobRouter.get("/countType", countType);
// ดึงข้อมูล JOB 1 งาน----------------------------
jobRouter.get("/:id", getOneJob);
// UPDATE JOB ----------------------------
jobRouter.put("/:id", updateJob);
// DELETE JOB ----------------------------
jobRouter.delete("/:id", deleteJob);

// Create Job (อันเก่า *ไม่ใช้แล้ว) -----------------------------
jobRouter.post("/createjob", createJobV1);

export default jobRouter;
