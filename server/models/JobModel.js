import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UsersRecruiter",
    },
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApplicationModel",
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
      required: true,
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
    jobStatus: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobModel", JobSchema);
