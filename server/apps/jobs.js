import { ObjectId } from "mongodb";
import { Router } from "express";
import { db } from "../utils/db.js";

const jobRouter = Router();

jobRouter.get("/", async (req, res) => {
  const jobTitle = req.query.jobTitle;
  const companyName = req.query.comapanyName;
  const jobType = req.body.jobType;
  const minSalary = req.body.minSalary;
  const maxSalary = req.body.minSalary;
  const keywords = req.query.keywords;

  const query = {};
  // Search Title
  if (jobTitle) {
    query.jobTitle = jobTitle;
  } else if (keywords) {
    query.jobTitle = new RegExp(`${keywords}`, "i");
  }
  // Search Company
  else if (companyName) {
    query.companyName = companyName;
  } else if (keywords) {
    query.companyName = new RegExp(`${keywords}`, "i");
  }
  // Search Job Type
  else if (jobType) {
    query.jobType = jobType;
  } else if (keywords) {
    query.jobType = new RegExp(`${keywords}`, "i");
  }
  // Search min salary
  else if (minSalary) {
    query.minSalary = minSalary;
  } else if (keywords) {
    query.minSalary = new RegExp(`${keywords}`, "i");
  }
  // Search max salary
  else if (maxSalary) {
    query.maxSalary = maxSalary;
  } else if (keywords) {
    query.maxSalary = new RegExp(`${keywords}`, "i");
  }

  const collection = db.collection("jobs");
  const jobs = await collection.find(query).toArray();

  return res.json({
    data: jobs,
  });
});
// Get Job Data -----------------------------------------

jobRouter.get("/:id", async (req, res) => {
  const jobId = ObjectId(req.params.id);
  const collection = db.collection("jobs");
  const job = await collection.find({ _id: jobId }).toArray();
  return res.json({
    data: job[0],
  });
});

// Create New Job Data -------------------------------------------
jobRouter.post("/createjob", async (req, res) => {
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
});

/* jobRouter.get("/", (req, res) => {
  const keywords = req.query.keywords;
  const regexKeywords = keywords.split(" ").join("|");
  const regex = new RegExp(regexKeywords, "ig");
  const results = jobs.filter(() => {
    return (
      .title.match(regex) ||
      .description.match(regex) ||
      .tags.filter((tag) => tag.match(regex)).length
    );
  });

  return res.json({
    data: results,
  });
}); */

export default jobRouter;
