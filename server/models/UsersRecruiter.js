import mongoose from "mongoose";
const { Schema } = mongoose;

const UsersRecruiterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "recruiter",
  },
  companyName: {
    type: String,
    default: "",
  },
  companyWebsite: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  companyLogo: {
    // ต้องเอาไป join กับ DB:jobs
    type: [],
    default: null,
  },
  createdJobs: {
    // ต้องเอาไป join กับ DB:jobs
    type: [],
    default: null,
  },
});
export default mongoose.model("UsersRecruiter", UsersRecruiterSchema);
