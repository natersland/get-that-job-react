import { protect } from "../middlewares/protect.js";
import { Router } from "express";

const postRouter = Router();

postRouter.use(protect);

export default postRouter;
