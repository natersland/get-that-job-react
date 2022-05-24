import { Router } from "express";
// middleware -----------------------------
import protect from "../middlewares/protect.js";
// Controller  -----------------------------

const applicationsRouter = Router();
/* jobRouter.use(protect);
 */
// สร้างใบสมัครใหม่ ----------------------------
applicationsRouter.post("/create");
// ดึงข้อมูลใบสมัครทั้งหมด ----------------------------
applicationsRouter.get("/");
// ดึงข้อมูลใบสมัคร 1 ใบ----------------------------
applicationsRouter.get("/:id");
// อัพเดตสถานะใบสมัคร ----------------------------
applicationsRouter.put("/:id");
// ลบใบสมัคร ----------------------------
applicationsRouter.delete("/:id");

export default applicationsRouter;
