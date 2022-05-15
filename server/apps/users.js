import { ObjectId } from "mongodb";
import { Router } from "express";
import { db } from "../utils/db.js";
// Schema Medels ---------------------
import UsersProfessional from "../models/UsersProfessional.js";
import UsersRecruiter from "../models/UsersRecruiter.js";
// -----------------------------------

const usersRouter = Router();
const collection = db.collection("users");

// CREATE User Data ----------------------------
usersRouter.post("/create/professional", async (req, res) => {
  try {
    const newProfessional = new UserProfessional(req.body);
    await db.collection("users").insertOne(newProfessional);
    res.status(200).json(`New professional has been created successful!`);
    console.log(newProfessional);
  } catch (error) {
    console.log(error);
  }
});
usersRouter.post("/create/recruiter", async (req, res) => {
  try {
    const newRecruiter = new UserRecruiter(req.body);
    await db.collection("users").insertOne(newRecruiter);
    res.status(200).json(`New recruiter has been created successful!`);
    console.log(newRecruiter);
  } catch (error) {
    console.log(error);
  }
});
// UPDATE User Data ----------------------------
usersRouter.put("/:id", async (req, res) => {
  try {
    const userId = ObjectId(req.params.id);
    const updateUserData = {
      ...req.body,
    };
    await collection.updateOne({ _id: userId }, { $set: updateUserData });
    res.status(200).json(`User ${userId} has been updated successful`);
    console.log(`Updated user data id:${userId} successful!`);
  } catch (error) {
    console.log(error);
  }
});
// DELETE User Data ----------------------------
usersRouter.delete("/:id", async (req, res) => {
  try {
    const userId = ObjectId(req.params.id);
    await collection.deleteOne({ _id: userId });
    res.status(200).json("User is has been deleted successful");
    console.log(`User ${userId} has been deleted successful`);
  } catch (error) {
    console.log(error);
  }
});
// GET One User Data ----------------------------
usersRouter.get("/:id", async (req, res) => {
  try {
    const userId = ObjectId(req.params.id);
    const user = await collection.find({ _id: userId }).toArray();
    res.status(200).json(user[0]);
    console.log(job[0]);
  } catch (error) {
    console.log(error);
  }
});
// GET All User Data ----------------------------
usersRouter.get("/", async (req, res) => {
  try {
    const users = await collection.find().toArray();
    res.status(200).json(users);
    console.log(`Get all job data has been successful!`);
  } catch (error) {
    console.log(error);
  }
});

export default usersRouter;
