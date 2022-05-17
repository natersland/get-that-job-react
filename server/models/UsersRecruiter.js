import mongoose from "mongoose";
const { Schema } = mongoose;

const UsersRecruiterSchema = new mongoose.Schema(
  {
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
      type: [{}],
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
export default mongoose.model("UsersRecruiter", UsersRecruiterSchema);
/* userId: { type: mongoose.Schema.Types.ObjectId, ref: "UsersRecruiter" }, */
