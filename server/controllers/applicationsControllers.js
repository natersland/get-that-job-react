import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";

// Schema Medels ---------------------

import ApplicationModel from "../models/ApplicationModel.js";

import RecruiterModel from "../models/RecruiterModel.js";
import ProfessionalModel from "../models/ProfessionalModel.js";
// Database ---------------------------
const appCollection = db.collection("applications");
const jobsCollection = db.collection("jobs");
const usersCollection = db.collection("users");

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

export const getAllApplication = async (req, res, next) => {
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

export const declineApplication = async (req, res) => {
  const declinedApp = {
    applicationStatus: req.body.applicationStatus,
    declinedDate: req.body.declinedDate,
  };

  const appId = ObjectId(req.params.id);
  await appCollection.updateOne({ _id: appId }, { $set: declinedApp });
  res.status(200).json(`Application ${appId} has been declined successful`);
  console.log(`Application ${appId} has been declined successful`);
};
