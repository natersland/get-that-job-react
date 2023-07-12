import { Router } from "express";
import {
  createApplication,
  deleteApplication,
  getAllApplications,
  changeApplicationStatus,
  updateAppStatus,
} from "../controllers/applicationsControllers.js";
// middleware -----------------------------
import protectApi from "../middlewares/protectApi.js";
// Controller  -----------------------------
const applicationsRouter = Router();
/* applicationsRouter.use(protect);
 */
applicationsRouter
  // สร้างใบสมัครใหม่ -> http://localhost:4000/applications/create
  .post("/create", protectApi, createApplication)
  // เปลี่ยนสถานะใบสมัครงาน -> http://localhost:4000/applications/:id
  .patch("/:id", protectApi, changeApplicationStatus)
  //update app Status  http://localhost:4000/applications/status/:id
  .put("/status//:id", protectApi, updateAppStatus)
  // ดึงข้อมูลใบสมัครทั้งหมด -> http://localhost:4000/applications
  .get("/", protectApi, getAllApplications)
  // ดึงข้อมูลใบสมัคร 1 ใบ -> http://localhost:4000/applications/:id
  .get("/:id", protectApi)
  // ลบใบสมัคร -> http://localhost:4000/applications/:id */
  .delete("/:id", protectApi, deleteApplication);

export default applicationsRouter;
