import mongoose from "mongoose";
const { Schema } = mongoose;

const UsersRecruiterSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobs",
    required: true,
  },
  email: {
    type: String,
    required: [true, "An user:recruiter must have a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "An user:recruiter must have a password"],
  },
  role: {
    type: String,
    required: [true, "An user:recruiter must have a role"],
    default: "recruiter",
  },
  companyName: {
    type: String,
    default: "",
    required: true,
  },
  companyWebsite: {
    type: String,
    default: "",
    required: true,
  },
  about: {
    type: String,
    default: "",
    required: true,
  },
  companyLogo: {
    type: [{}],
    default: null,
  },
});
export default mongoose.model("UsersRecruiter", UsersRecruiterSchema);
/* userId: { type: mongoose.Schema.Types.ObjectId, ref: "UsersRecruiter" }, */
