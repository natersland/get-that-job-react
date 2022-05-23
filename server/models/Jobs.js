import mongoose from "mongoose";
import UsersProfessional from "./UsersProfessional.js";

const JobsSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UsersRecruiter",
    },
    jobTitle: {
      type: String,
    },
    createdJobDate: {
      type: Date,
      required: true,
      default: new Date().toISOString(),
    },
    jobCategory: {
      type: String,
    },
    jobType: {
      type: String,
      required: [true, "An job must have a type"],
    },
    minSalary: {
      type: Number,
      min: 0,
      max: 999999,
    },
    maxSalary: {
      type: Number,
      min: 0,
      max: 999999,
    },
    aboutJob: {
      type: String,
      required: false,
      default: "-",
    },
    mandatoryReq: {
      type: String,
      required: false,
      default: "-",
    },
    optionalReq: {
      type: String,
      required: false,
      default: "-",
    },
    candidates: [
      {
        applicationId: mongoose.Schema.Types.ObjectId,
      },
    ],
    jobStatus: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobsSchema);
