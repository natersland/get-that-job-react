import mongoose from "mongoose";
const { Schema } = mongoose;

const UsersProfessionalSchema = new mongoose.Schema({
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
    // ต้องเอาไป join กับ DB:jobs
    type: [{}],
    default: null,
  },
  userFollowJobs: {
    // ต้องเอาไป join กับ DB:jobs
    type: [{}],
    default: null,
  },
  uploadFiles: {
    type: [{}],
    default: null,
  },
});
export default mongoose.model("UserProfessional", UsersProfessionalSchema);
