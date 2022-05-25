import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";
import mongoose from "mongoose";
// Schema Models ---------------------
import JobModel from "../models/JobModel.js";
import RecruiterModel from "../models/RecruiterModel.js";
// Database ---------------------------
const appCollection = db.collection("applications");
const jobsCollection = db.collection("jobs");
const usersCollection = db.collection("users");

export const createJob = async (req, res, next) => {
  // ถ้า recruiter ไม่ใส่อะไรมาในช่อง aboutJob, mandatoryReq, optionalReq ให้ค่าเริ่มต้นเป็น "-"
  req.body.aboutJob === "" ? (req.body.aboutJob = "-") : null;
  req.body.mandatoryReq === "" ? (req.body.mandatoryReq = "-") : null;
  req.body.optionalReq === "" ? (req.body.optionalReq = "-") : null;
  // ------------------------------------------------------------------------------
  const filterComma = (salary) => {
    let result = salary.replace(/[^\w\s]/gi, "");
    return Number(result);
  };

  try {
    const newJob = new JobModel({
      recruiterId: req.body.recruiterId,
      jobTitle: req.body.jobTitle,
      jobCategory: req.body.jobCategory,
      jobType: req.body.jobType,
      minSalary: filterComma(req.body.minSalary),
      maxSalary: filterComma(req.body.maxSalary),
      aboutJob: req.body.aboutJob,
      mandatoryReq: req.body.mandatoryReq,
      optionalReq: req.body.optionalReq,
      createdJobDate: req.body.createdJobDate,
    });
    await jobsCollection.insertOne(newJob);
    res.status(200).json(`New job has been created successful`);
    console.log(newJob);
  } catch (error) {
    next(error);
  }
};
export const getOneJob = async (req, res) => {
  const jobId = ObjectId(req.params.id);
  const job = await jobsCollection.find({ _id: jobId }).toArray();
  return res.json({ data: job[0] });
};

/* const filterText = jobData.filter((item) => {
  return (
    item.jobTitle.toLowerCase().match(text) ||
    item.company[0].companyName.toLowerCase().match(text)
  );
}); */

/* let result = jobData
  .filter((searchtext) => {
    return (
      searchtext.jobTitle.toLowerCase().match(text) ||
      searchtext.company[0].companyName.toLowerCase().match(text)
    );
  })
  .filter((category) => {
    return category.category === category;
  })
  .filter((jobType) => {
    return jobType.jobType === type;
  });
setJobs(result);
 */
export const getAllJobsWithFilter = async (req, res, next) => {
  try {
    const keywords = req.query.keywords;
    /* const keywordName = req.query.keywordName; */
    const searchMinSalaryText = Number(req.query.searchMinSalaryText);
    const searchMaxSalaryText = Number(req.query.searchMaxSalaryText);
    const searchJobType = req.query.jobType;
    const searchJobCategory = req.query.searchJobCategory;

    const query = {};
    if (query) {
      query.$or = [
        {
          $and: [
            {
              jobTitle: {
                $regex: keywords.split(" ").join("|"),
                $options: "i",
              },
              jobCategory: { $regex: searchJobCategory },
              jobType: { $regex: searchJobType },
              minSalary: { $gte: searchMinSalaryText },
              maxSalary: { $gte: searchMaxSalaryText },
            },
          ],
        },
      ];
    }

    const jobs = await jobsCollection
      .aggregate([
        {
          $sort: {
            createdJobDate: -1,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "recruiterId",
            foreignField: "_id",
            as: "company",
          },
        },
        { $match: query },
      ])
      .toArray();

    return res.json({ data: jobs });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const jobId = ObjectId(req.params.id);
    const updateJobData = {
      ...req.body,
    };
    await jobsCollection.updateOne({ _id: jobId }, { $set: updateJobData });
    res.status(200).json(`Job ${jobId} has been updated successful`);
    console.log(`Updated job data id:${jobId} successful!`);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const userId = ObjectId(req.params.id);
    const jobId = ObjectId(req.params.id);
    try {
      await usersCollection.findOneAndUpdate(
        { _id: userId },
        { $pull: { job: req.params.id } }
      );
    } catch (error) {
      res.status(500).json(error);
    }
    await jobsCollection.deleteOne({ _id: jobId });
    res.status(200).json(`Job ${jobId} has been deleted successful`);
    console.log(`Job ${jobId} has been deleted successful`);
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const query = {};

    const jobs = await jobsCollection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "recruiterId",
            foreignField: "_id",
            as: "company",
          },
        },
        { $match: query },
      ])
      .toArray();

    return res.json({ data: jobs });
  } catch (error) {
    next(error);
  }
};

// โค้ด Create Job อันเก่า --------------------------------
export const createJobV1 = async (req, res, next) => {
  try {
    const filterComma = (salary) => {
      let result = salary.replace(/[^\w\s]/gi, "");
      return Number(result);
    };

    const job = {
      jobTitle: req.body.jobTitle,
      jobCategory: req.body.jobCategory,
      jobType: req.body.jobType,
      minSalary: filterComma(req.body.minSalary),
      maxSalary: filterComma(req.body.maxSalary),
      aboutJob: req.body.aboutJob,
      mandatoryReq: req.body.mandatoryReq,
      optionalReq: req.body.optionalReq,
      createdJobDate: req.body.createdJobDate,
      totalCandidates: req.body.totalCandidates,
      candidatesOnTrack: req.body.candidatesOnTrack,
      jobsStatus: req.body.jobsStatus,
    };

    await db.jobsCollection("jobs").insertOne(job);

    return res.json({
      Message: "Create new job has been created successfully",
    });
  } catch (error) {
    next(error);
  }
};
