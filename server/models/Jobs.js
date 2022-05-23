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
    createdJobDate: {
      type: Date,
      required: true,
      default: new Date().toISOString(),
    },
    candidates: [
      // ถ้า recruiter กด Mark as started ข้อมูลใน totalCandidates[index] จะย้ายไปอยู่ candidatesOnTrack ข้างล่างสุด
      {
        professionalId: mongoose.Schema.Types.ObjectId,
        appliedDate: { type: [Date], default: new Date() },
        isApply: { type: [Boolean], default: true }, // ถ้า Mark as started,Finished ต้องเปลี่ยนเป็น false
        isReview: { type: [Boolean], default: false }, // ถ้า Mark as started ต้องเปลี่ยนเป็น true และอันอื่น false หมด
        isFinised: { type: [Boolean], default: false }, // ถ้า Finished ต้องเปลี่ยนเป็น true และอันอื่น false หมด
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
