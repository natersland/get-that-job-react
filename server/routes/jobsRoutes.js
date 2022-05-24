import { Router } from "express";
import express from "express";
// middleware -----------------------------
import protect from "../middlewares/protect.js";
// Controller  -----------------------------
import {
  createJob,
  createJobV1,
  deleteJob,
  getAllJobs,
  getAllJobsWithFilter,
  getOneJob,
  updateJob,
} from "../controllers/jobs.js";
const jobRouter = Router();
const router = express.Router();

/* jobRouter.use(protect);
 */

/* router.param("id"); */

jobRouter
  // สร้างงานใหม่ V2 (ให้ใช้อันนี้) -> http://localhost:4000/jobs/create
  .post("/create", createJob)
  // ดึงข้อมูล JOBS ทั้งหมด (แบบมีฟีลเตอร์ + lookup) -> http://localhost:4000/jobs
  .get("/", getAllJobsWithFilter)
  // ดึงข้อมูล JOBS ทั้งหมด (ไม่มีฟีลเตอร์ & no lookup) -> http://localhost:4000/jobs/data
  .get("/data", getAllJobs)
  // ดึงข้อมูล JOB 1 งาน -> http://localhost:4000/jobs/:id
  .get("/:id", getOneJob)
  // UPDATE JOB -> http://localhost:4000/jobs/:id
  .put("/:id", updateJob)
  // DELETE JOB -> http://localhost:4000/jobs/:id
  .delete("/:id", deleteJob)
  // สร้างงานใหม่ V1 (อันเก่า *ไม่ใช้แล้ว เอาไว้สำรอง) -> http://localhost:4000/createjob
  .post("/createjob", createJobV1);

export default jobRouter;
