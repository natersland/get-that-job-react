import mongoose from "mongoose";
const { Schema } = mongoose;

const JobsSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobCategory: {
    type: String,
    required: true,
    default: "Manufacturing",
  },
  jobType: {
    type: String,
    required: true,
    default: "Full Time",
  },
  minSalary: {
    type: Number,
    min: 0,
    max: 999999,
    required: true,
    default: 500,
  },
  maxSalary: {
    type: Number,
    min: 0,
    max: 999999,
    required: true,
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
  jobStatus: {
    type: Boolean,
    default: true,
  },
});
export default mongoose.model("Job", JobsSchema);
