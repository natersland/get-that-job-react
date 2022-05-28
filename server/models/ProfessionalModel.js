import mongoose from "mongoose";

const ProfessionalSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "professional",
    },
    name: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "-",
    },
    birthDate: {
      type: String,
      default: "-",
    },
    linkedin: {
      type: String,
      default: "-",
    },
    title: {
      type: String,
      default: "-",
    },
    experience: {
      type: String,
      default: "-",
    },
    education: {
      type: String,
      default: "-",
    },
    followingJobs: [
      {
        jobId: mongoose.Schema.Types.ObjectId,
      },
    ],
    cvFiles: {
      type: [{}],
      default: null,
    },
    memberSince: {
      type: Date,
      required: true,
      default: new Date().toISOString(),
    },
  },
  { timestamps: true }
);
export default mongoose.model("ProfessionalModel", ProfessionalSchema);
