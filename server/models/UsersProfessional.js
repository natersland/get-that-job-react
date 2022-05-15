import mongoose from "mongoose";
const { Schema } = mongoose;

const UsersProfessionalSchema = new mongoose.Schema({
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
    type: [{}],
    default: null,
  },
  userFollowJobs: {
    type: [{}],
    default: null,
  },
  uploadFiles: {
    type: [{}],
    default: null,
  },
});
export default mongoose.model("UserProfessional", UsersProfessionalSchema);
