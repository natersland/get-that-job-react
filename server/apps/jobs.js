import { ObjectId } from "mongodb";
import { Router } from "express";
import { db } from "../utils/db.js";
// Schema Medels ---------------------
import Jobs from "../models/Jobs.js";
//------------------------------------

const jobRouter = Router();
const collection = db.collection("jobs");

// SEARCH & FILTER ----------------------------
jobRouter.get("/", async (req, res) => {
  const searchJobText = req.query.searchJobText;
  const keywords = req.query.keywords;
  const searchMinSalaryText = Number(req.query.searchMinSalaryText);
  const searchMaxSalaryText = Number(req.query.searchMaxSalaryText);

  const query = {};
  console.log(`5555555555: ${keywords}`);
  if (searchJobText) {
    query.jobTitle = searchJobText;
  } else if (searchMinSalaryText) {
    query.minSalary = searchMinSalaryText;
  } else if (searchMaxSalaryText) {
    query.maxSalary = searchMaxSalaryText;
  } else if (keywords) {
    query.jobTitle = new RegExp(`${keywords}`, "i");
  }

  const jobs = await collection.find(query).toArray();

  return res.json({ data: jobs });
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
// CREATE JOB ----------------------------
jobRouter.post("/create", async (req, res) => {
  try {
    const newJob = new Jobs(req.body);
    await db.collection("jobs").insertOne(newJob);
    res.status(200).json(`New job has been created successful`);
    console.log(newJob);
  } catch (error) {
    res.status(500).json(error);
  }
});
// UPDATE JOB ----------------------------
jobRouter.put("/:id", async (req, res) => {
  try {
    const jobId = ObjectId(req.params.id);
    const updateJobData = {
      ...req.body,
    };
    await collection.updateOne({ _id: jobId }, { $set: updateJobData });
    res.status(200).json(`Hotel ${jobId} has been updated successful`);
    console.log(`Updated job data id:${jobId} successful!`);
  } catch (error) {
    console.log(error);
  }
});
// DELETE JOB ----------------------------
jobRouter.delete("/:id", async (req, res) => {
  try {
    const jobId = ObjectId(req.params.id);
    await collection.deleteOne({ _id: jobId });
    res.status(200).json(`Job ${jobId} has been deleted successful`);
    console.log(`Job ${jobId} has been deleted successful`);
  } catch (error) {
    console.log(error);
  }
});
// GET ONE JOB ----------------------------
jobRouter.get("/:id", async (req, res) => {
  try {
    const jobId = ObjectId(req.params.id);
    const job = await collection.find({ _id: jobId }).toArray();
    res.status(200).json(job[0]);
    console.log(job[0]);
  } catch (error) {
    console.log(error);
  }
});
// GET ALL JOBS ----------------------------
jobRouter.get("/", async (req, res) => {
  try {
    const jobs = await collection.find().toArray();
    res.status(200).json(jobs);
    console.log(`Get all job data has been successful!`);
  } catch (error) {
    console.log(error);
  }
});
export default jobRouter;

// Lagacy Code -----------------------------
// Create Job
/* jobRouter.post("/createjob", async (req, res) => {
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
 */
