import mongoose from "mongoose";
const { Schema } = mongoose;
import { ObjectId } from "mongodb";

// Schemas Models ----------------------------
import UsersRecruiter from "./UsersRecruiter.js";

const JobsSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UsersRecruiter",
  },
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfessional",
  },
  jobTitle: {
    type: String,
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
      type: Number,
      default: 0,
    },
    candidatesOnTrack: {
      type: Number,
      default: 0,
    },
  },
  jobStatus: {
    type: Boolean,
    default: true,
  },
});

/* JobsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "createdby",
    select: "companyName",
  });
}); */

export default mongoose.model("Job", JobsSchema);
