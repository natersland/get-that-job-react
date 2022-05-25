import { Router } from "express";
import {
  createApplication,
  getAllApplication,
} from "../controllers/applications.js";
// middleware -----------------------------
import protect from "../middlewares/protect.js";
// Controller  -----------------------------

const applicationsRouter = Router();
/* jobRouter.use(protect);
 */

applicationsRouter
  // สร้างใบสมัครใหม่ -> http://localhost:4000/applications/create
  .post("/create", createApplication)
  // ดึงข้อมูลใบสมัครทั้งหมด -> http://localhost:4000/applications
  .get("/", getAllApplication)
  // ดึงข้อมูลใบสมัคร 1 ใบ -> http://localhost:4000/applications/:id
  .get("/:id")
  // อัพเดตสถานะใบสมัคร -> http://localhost:4000/applications/:id
  .put("/:id")
  // ลบใบสมัคร -> http://localhost:4000/applications/:id
  .delete("/:id");

export default applicationsRouter;
