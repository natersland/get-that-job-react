import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";
// Schema Models ---------------------
import Jobs from "../models/Jobs.js";
import UsersRecruiter from "../models/UsersRecruiter.js";
//------------------------------------

const collection = db.collection("jobs");
const collection2 = db.collection("users");

export const createJob = async (req, res, next) => {
  try {
    const newJob = new Jobs(req.body);
    await db.collection("jobs").insertOne(newJob);
    res.status(200).json(`New job has been created successful`);
    console.log(newJob);
  } catch (error) {
    next(error);
  }
};

/* jobRouter.post("/create", async (req, res) => {
  //create/:userId

  const userId = req.body.id;
  const newJob = new Jobs(req.body);
  await db.collection("jobs").insertOne(newJob, userId);

  const pipeline = [
    {
      $lookup: {
        from: "users",
        localField: "createdby",
        foreignField: "_id",
        as: "jobs",
      },
    },
  ];

  return res.status(200).json(`New job has been created successful`);
  console.log(newJob, userId);
}); */

// CREATE JOB ----------------------------
/* jobRouter.post("/create", async (req, res) => {
  try {
    const newJob = new Jobs(req.body);
    await db.collection("jobs").insertOne(newJob);
    res.status(200).json(`New job has been created successful`);
    console.log(newJob);
  } catch (error) {
    res.status(500).json(error);
  }
}); */
export const getAllJobsWithFilter = async (req, res, next) => {
  try {
    const searchJobText = req.query.searchJobText;
    const keywords = req.query.keywords;
    const searchMinSalaryText = Number(req.query.searchMinSalaryText);
    const searchMaxSalaryText = Number(req.query.searchMaxSalaryText);

    const query = {};
    const jobs = await collection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "recruiterId",
            foreignField: "_id",
            as: "company",
          },
        },
      ])
      .toArray();

    if (searchJobText) {
      query.jobTitle = searchJobText;
    } else if (searchMinSalaryText) {
      query.minSalary = searchMinSalaryText;
    } else if (searchMaxSalaryText) {
      query.maxSalary = searchMaxSalaryText;
    } else if (keywords) {
      query.jobTitle = new RegExp(`${keywords}`, "i");
    }
    const filter = await collection.find(query).toArray();

    return res.json({ data: jobs }), filter;
  } catch (error) {
    next(error);
  }
  // CREATE JOB V2 ----------------------------
  /* {
  "jobTitle": "sdvsdv",
  "jobIdNumber": [
      {
          "idNumber": 101
      }
  ]
} */
};

export const getOneJob = async (req, res, next) => {
  try {
    const jobId = ObjectId(req.params.id);
    const job = await collection.find({ _id: jobId }).toArray();
    res.status(200).json(job[0]);
    console.log(job[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const jobId = ObjectId(req.params.id);
    const updateJobData = {
      ...req.body,
    };
    await collection.updateOne({ _id: jobId }, { $set: updateJobData });
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
      await collection2.findOneAndUpdate(
        { _id: userId },
        { $pull: { job: req.params.id } }
      );
    } catch (error) {
      res.status(500).json(error);
    }
    await collection.deleteOne({ _id: jobId });
    res.status(200).json(`Job ${jobId} has been deleted successful`);
    console.log(`Job ${jobId} has been deleted successful`);
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await collection.find().toArray();
    res.status(200).json(jobs);
    console.log(`Get all job data has been successful!`);
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

    const user = {
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

    await db.collection("jobs").insertOne(user);

    return res.json({
      Message: "Create new job has been created successfully",
    });
  } catch (error) {
    next(error);
  }
};
