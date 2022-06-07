import { Router } from "express";
import {
  createApplication,
  deleteApplication,
  getAllApplications,
  changeApplicationStatus,
  updateAppStatus,
} from "../controllers/applicationsControllers.js";
// middleware -----------------------------
import protect from "../middlewares/protect.js";
// Controller  -----------------------------
const applicationsRouter = Router();
/* jobRouter.use(protect);
 */

applicationsRouter
  // สร้างใบสมัครใหม่ -> http://localhost:4000/applications/create
  .post("/create", createApplication)
  // เปลี่ยนสถานะใบสมัครงาน -> http://localhost:4000/applications/:id
  .patch("/:id", changeApplicationStatus)
  //update app Status  http://localhost:4000/applications/status/:id
  .put("/status//:id", updateAppStatus)
  // ดึงข้อมูลใบสมัครทั้งหมด -> http://localhost:4000/applications
  .get("/", getAllApplications)
  // ดึงข้อมูลใบสมัคร 1 ใบ -> http://localhost:4000/applications/:id
  .get("/:id")
  // ลบใบสมัคร -> http://localhost:4000/applications/:id */
  .delete("/:id", deleteApplication);

export default applicationsRouter;
