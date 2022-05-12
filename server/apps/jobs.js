import { ObjectId } from "mongodb";
import { Router } from "express";
import { db } from "../utils/db.js";

const jobRouter = Router();

/* jobRouter.get("/", async (req, res) => {
  const keywords = req.query.keywords;
  const filterKeywords = keywords.split(" ").join("|");
  const regex = new RegExp(filterKeywords, "ig");
  const results = jobs.filter((job) => {
    return job.jobTitle.match(regex) || job.companyName.math(regex);
  });

  const collection = db.collection("jobs");
  const jobResults = await collection.find(query).toArray();

  if (!hasFound) {
    return res.status(404).json({
      messsage: `not found`,
    });
  } else {
    return res.json({
      data: results,
    });
  }
}); */

/* jobRouter.get("/", async (req, res) => {
  const jobTitle = req.query.jobTitle;
  const companyName = req.query.companyName;
  const keywords = req.query.keywords;

  const query = {};

  if (jobTitle) {
    query.jobTitle = jobTitle;
  } else if (companyName) {
    query.companyName = companyName;
  } else if (keywords) {
    query.jobtitle = new RegExp(`${keywords}`, "i");
  }

  const collection = db.collection("jobs");
  const results = await collection.find(query).toArray();

  return res.json({
    data: results,
  });
}); */
jobRouter.get("/", async (req, res) => {
  const jobTitle = req.query.jobTitle;
  const keywords = req.query.keywords;

  const query = {};

  if (jobTitle) {
    query.jobTitle = jobTitle;
  } else if (keywords) {
    query.jobTitle = new RegExp(`${keywords}`, "i");
  }

  const collection = db.collection("jobs");
  const jobs = await collection.find(query).toArray();

  return res.json({
    data: jobs,
  });
});

export default jobRouter;
