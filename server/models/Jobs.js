import mongoose from "mongoose";
const { Schema } = mongoose;
import { ObjectId } from "mongodb";

// Schemas Models ----------------------------
import UsersRecruiter from "./UsersRecruiter.js";

const JobsSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, "An job must have a title"],
  },
  jobCategory: {
    type: String,
    required: [true, "An job must have a category"],
    default: "Manufacturing",
  },
  jobType: {
    type: String,
    required: [true, "An job must have a type"],
    default: "Full Time",
  },
  minSalary: {
    type: Number,
    min: 0,
    max: 999999,
    required: [true, "An job must have a min salary"],
    default: 500,
  },
  maxSalary: {
    type: Number,
    min: 0,
    max: 999999,
    required: [true, "An job must have a max salary"],
    default: 1500,
  },
  aboutJob: {
    type: String,
    required: false,
    default: "",
  },
  mandatoryReq: {
    type: String,
    required: false,
    default: "",
  },
  optionalReq: {
    type: String,
    required: false,
    default: "",
  },
  createdJobDate: {
    type: String,
    required: true,
    default: new Date(),
  },
  candidateData: {
    totalCandidates: {
      // ต้องเอาไป join กับ DB:users:professional
      type: Number,
      default: 0,
    },
    candidatesOnTrack: {
      // ต้องเอาไป join กับ DB:users:professional
      type: Number,
      default: 0,
    },
  },
  createdby: {
    type: mongoose.Schema.ObjectId,
    ref: "UsersRecruiter",
    required: [true, "Job must be belong to an user:recruiter"],
  },
  jobStatus: {
    type: Boolean,
    default: true,
  },
});

JobsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "createdby",
    select: "companyName",
  });
});

export default mongoose.model("Job", JobsSchema);
