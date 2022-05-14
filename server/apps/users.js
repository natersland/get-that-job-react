import { ObjectId } from "mongodb";
import { Router } from "express";
import { db } from "../utils/db.js";

const usersRouter = Router();

// Get Users Data -----------------------------------------
usersRouter.get("/", async (req, res) => {
  const collection = db.collection("users");
  const user = await collection.find().toArray();

  return res.json({
    data: user,
  });
});

usersRouter.get("/:id", async (req, res) => {
  const userId = ObjectId(req.params.id);
  const collection = db.collection("users");
  const user = await collection.find({ _id: userId }).toArray();
  return res.json({
    data: user[0],
  });
});

export default usersRouter;
