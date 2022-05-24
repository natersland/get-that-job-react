import mongoose from "mongoose";

const RecruiterSchema = new mongoose.Schema(
  {
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
      default: "-",
      required: true,
    },
    companyWebsite: {
      type: String,
      default: "-",
      required: true,
    },
    about: {
      type: String,
      default: "-",
      required: true,
    },
    companyLogo: {
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
export default mongoose.model("RecruiterModel", RecruiterSchema);
/* userId: { type: mongoose.Schema.Types.ObjectId, ref: "UsersRecruiter" }, */
