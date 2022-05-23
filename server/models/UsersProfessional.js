import mongoose from "mongoose";

const UsersProfessionalSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
      required: true,
    },
    email: {
      type: String,
      required: [true, "An user:professional must have a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "An user:professional must have a password"],
    },
    role: {
      type: String,
      required: [true, "An user:professional must have a role"],
      default: "professional",
    },
    name: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    birthDate: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
    appiedJobs: [
      {
        applicationId: mongoose.Schema.Types.ObjectId,
      },
    ],
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
export default mongoose.model("UserProfessional", UsersProfessionalSchema);
