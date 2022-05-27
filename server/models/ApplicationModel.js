import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    professionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProfessionalModel",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobModel",
      required: true,
    },
    applicationStatus: {
      type: String,
      required: true,
      default: "applied", // มีทั้งหมด 4 สถานะ 1.applied 2.reviewing 3.finished 4.declined
    },
    appliedDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    declinedDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export default mongoose.model("ApplicationModel", ApplicationSchema);
