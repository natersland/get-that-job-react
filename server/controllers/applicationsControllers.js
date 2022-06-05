import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";
// Schema Medels ---------------------
import ApplicationModel from "../models/ApplicationModel.js";
// Database ---------------------------
const appCollection = db.collection("applications");

// GET - ดึงข้อมูลใบสมัครทั้งหมด ---------------------------------
export const getAllApplications = async (req, res, next) => {
  try {
    const applyJob = await appCollection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "professionalId",
            foreignField: "_id",
            as: "candidate",
          },
        },
      ])
      .toArray();
    return res.json({ data: applyJob });
  } catch (error) {
    next(error);
  }
};

// POST - สร้างใบสมัครใหม่ ---------------------------------
export const createApplication = async (req, res, next) => {
  try {
    const newApplication = new ApplicationModel(req.body);
    await appCollection.insertOne(newApplication);
    res.status(200).json(`New application has been created successful`);
    console.log(newApplication);
  } catch (error) {
    next(error);
  }
};
// PATCH - เปลี่ยนสถานะใบสมัคร ---------------------------------
export const changeApplicationStatus = async (req, res) => {
  const statusData = {
    applicationStatus: req.body.applicationStatus,
    declinedDate: new Date(),
  };

  const appId = ObjectId(req.params.id);
  await appCollection.updateOne({ _id: appId }, { $set: statusData });
  res
    .status(200)
    .json(`Application id:${appId} has been changed status successful`);
  console.log(`Application id:${appId} has been changed status  successful`);
};

// DELETE - ลบใบสมัคร ---------------------------------
export const deleteApplication = async (req, res, next) => {
  try {
    const appId = ObjectId(req.params.id);

    await appCollection.deleteOne({ _id: appId });
    res.status(200).json(`Application ${appId} has been deleted successful`);
    console.log(`Application ${appId} has been deleted successful`);
  } catch (error) {
    next(error);
  }
};
