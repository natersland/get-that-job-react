import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";
import mongoose from "mongoose";
// Schema Models ---------------------
import Jobs from "../models/Jobs.js";
import UsersRecruiter from "../models/UsersRecruiter.js";
//------------------------------------

const collection = db.collection("jobs");
const collection2 = db.collection("users");

export const createJob = async (req, res, next) => {
  const filterComma = (salary) => {
    let result = salary.replace(/[^\w\s]/gi, "");
    return Number(result);
  };
  try {
    const newJob = new Jobs({
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
      createdJobDate: req.body.createdJobDate,
    });
    await db.collection("jobs").insertOne(newJob);
    res.status(200).json(`New job has been created successful`);
    console.log(newJob);
  } catch (error) {
    next(error);
  }
};
/* export const getOneJob = async (req, res) => {
  const jobId = ObjectId(req.params.id);
  const job = await collection.find({ _id: jobId }).toArray();
  return res.json({ data: job[0] });
}; */

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
    /*     const searchJobText = req.query.searchJobText; */
    const keywords = req.query.keywords;
    /* const keywordName = req.query.keywordName; */
    const searchMinSalaryText = Number(req.query.searchMinSalaryText);
    const searchMaxSalaryText = Number(req.query.searchMaxSalaryText);
    const query = {};
    if (keywords || searchMinSalaryText || searchMaxSalaryText) {
      query.$or = [
        { jobTitle: { $regex: keywords, $options: "i" } },
        { minSalary: searchMinSalaryText },
        { maxSalary: searchMaxSalaryText },
      ];
    }
    /*  if (searchJobText) {
      query.jobTitle = searchJobText;
    } else if (searchJobText) {
      query.company.companyName = searchJobText;
    } else if (searchMinSalaryText) {
      query.minSalary = searchMinSalaryText;
    } else if (searchMaxSalaryText) {
      query.maxSalary = searchMaxSalaryText;
    } else if (keywords) {
      query.jobTitle = new RegExp(`${keywords}`, "i");
    } */
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
        { $match: query },
      ])
      .toArray();

    return res.json({ data: jobs });
  } catch (error) {
    next(error);
  }
};
export const testGetAllJobsWithFilterV2 = async (req, res, next) => {
  try {
    const searchJobText = req.query.searchJobText;
    const keywords = req.query.keywords;
    const keywordName = req.query.keywordName;
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
        { $match: query },
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
    } else if (keywordName) {
      query.company[0].companyName = new RegExp(`${keywordName}`, "i");
    }
    return res.json({ data: jobs });
  } catch (error) {
    next(error);
  }
};

export const getOneJob = async (req, res) => {
  const jobId = mongoose.Types.ObjectId(req.params.id.trim());
  const job = await collection
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "recruiterId",
          foreignField: "_id",
          as: "company",
        },
      },
      { $match: { _id: jobId } },
    ])
    .toArray();
  return res.json({ data: job[0] });
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
        { $match: query },
      ])
      .toArray();

    return res.json({ data: jobs });
  } catch (error) {
    next(error);
  }
};
export const getJobs = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const jobs = await collection.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    });
    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
};
export const countCategoty = async (req, res, next) => {
  const categories = req.query.categories.split(",");
  try {
    const list = await Promise.all(
      categories.map((category) => {
        return collection.countDocuments({ jobCategory: category });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countType = async (req, res, next) => {
  try {
    const fullTimeCount = await collection.countDocuments({
      jobType: "Full Time",
    });
    const partTimeCount = await collection.countDocuments({
      jobType: "Part Time",
    });

    res.status(200).json([
      { jobType: "Full Time", count: fullTimeCount },
      { jobType: "Part Time", count: partTimeCount },
    ]);
  } catch (err) {
    next(err);
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
