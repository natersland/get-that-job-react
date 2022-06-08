import { Router } from "express";
// middleware -----------------------------
import protect from "../middlewares/protect.js";
// Controller  -----------------------------
import {
  createJob,
  getAllJobs,
  getAllJobsWithFilter,
  getOneJob,
  updateJob,
  updateJobStatus,
} from "../controllers/jobsControllers.js";
const jobRouter = Router();
/* jobRouter.use(protect); */

jobRouter
  // ดึงข้อมูล JOBS ทั้งหมด (แบบมีฟีลเตอร์ + lookup) -> http://localhost:4000/jobs
  .get("/", getAllJobsWithFilter)
  // ดึงข้อมูล JOBS ทั้งหมด (ไม่มีฟีลเตอร์ & no lookup) -> http://localhost:4000/jobs/data
  .get("/data", getAllJobs)
  // ดึงข้อมูล JOB 1 งาน -> http://localhost:4000/jobs/:id
  .get("/:id", getOneJob)
  // สร้างงานใหม่  -> http://localhost:4000/jobs/create
  .post("/create", createJob)
  // อัพเดตงาน 1 งาน-> http://localhost:4000/jobs/:id
  .put("/:id", updateJob)
  //อัพเดต status by jobId -> http://localhost:4000/jobs/status/:id
  .put("/status/:id", updateJobStatus);

export default jobRouter;