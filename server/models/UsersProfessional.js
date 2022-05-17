import mongoose from "mongoose";
const { Schema } = mongoose;

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
    userAppiedJobs: {
      type: Array,
      default: [],
    },
    userFollowJobs: {
      type: Array,
      default: [],
    },
    uploadFiles: {
      type: [{}],
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
export default mongoose.model("UserProfessional", UsersProfessionalSchema);
