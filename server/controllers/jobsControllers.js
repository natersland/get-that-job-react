import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";
import mongoose from "mongoose";
// Schema Models ---------------------
import JobModel from "../models/JobModel.js";
// Database ---------------------------
const jobsCollection = db.collection("jobs");

// ดึงข้อมูลงาน 1 งาน --------------------------------------------------
export const getOneJob = async (req, res) => {
  const jobId = mongoose.Types.ObjectId(req.params.id.trim());
  const job = await jobsCollection
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "recruiterId",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "jobId",
          as: "applications",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "applications.professionalId",
          foreignField: "_id",
          as: "candidate",
        },
      },
      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "jobId",
          as: "applications",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "applications.professionalId",
          foreignField: "_id",
          as: "candidate",
        },
      },
      { $match: { _id: jobId } },
    ])
    .sort({
      createdJobDate: -1,
    })
    .toArray();
  return res.json({ data: job[0] });
};

// ดึงข้อมูลงานทั้งหมด (มีฟีลเตอร์) --------------------------------------------------
export const getAllJobsWithFilter = async (req, res, next) => {
  try {
    const keywords = req.query.keywords;
    const searchMinSalaryText = Number(req.query.searchMinSalaryText);
    const searchMaxSalaryText = Number(req.query.searchMaxSalaryText);
    const searchJobType = req.query.jobType;
    const searchJobCategory = req.query.searchJobCategory;
    const page = req.query.page;

    const PAGE_SIZE = 12;
    const skip = PAGE_SIZE * (page - 1);

    const query = {
      $or: [
        {
          "company.companyName": {
            $regex: keywords.split(" ").join("|"),
            $options: "i",
          },
        },
        {
          jobTitle: {
            $regex: keywords.split(" ").join("|"),
            $options: "i",
          },
        },
      ],

      jobCategory: { $regex: searchJobCategory },
      jobType: { $regex: searchJobType },
      minSalary: { $gte: searchMinSalaryText },
      maxSalary: { $gte: searchMaxSalaryText },
    };

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
      .sort({
        createdJobDate: -1,
      })
      .skip(skip)
      .limit(12)
      .toArray();

    const totalJobs = await jobsCollection.countDocuments(query);
    const totalPages = Math.ceil(totalJobs / PAGE_SIZE);

    return res.json({
      data: jobs,
      total_jobs: totalJobs,

      total_pages: totalPages,
    });
  } catch (error) {
    next(error);
  }
};
// ดึงข้อมูลงานทั้งหมด (ไม่มีฟีลเตอร์) --------------------------------------------------
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

// POST - สร้างงานใหม่ --------------------------------------------------
export const createJob = async (req, res, next) => {
  // ถ้า recruiter ไม่ใส่อะไรมาในช่อง aboutJob, mandatoryReq, optionalReq ให้ค่าเริ่มต้นเป็น "-"
  req.body.aboutJob === "" ? (req.body.aboutJob = "-") : null;
  req.body.mandatoryReq === "" ? (req.body.mandatoryReq = "-") : null;
  req.body.optionalReq === "" ? (req.body.optionalReq = "-") : null;
  // fx กรอง comma ออกจากข้อมูลเงินเดือนที่ front-end ส่งมา
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

// อัพเดตงาน 1 งาน --------------------------------------------------
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
