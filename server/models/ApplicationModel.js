import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    professionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProfessionalModel",
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobModel",
    },
    appliCationStatus: {
      type: String,
      required: true,
      default: "reviewing", // มีทั้งหมด 4 สถานะ 1.applied 2.reviewing 3.finished 4.decline
    },
    appliedDate: {
      type: Date,
      required: true,
      default: new Date().toISOString(),
    },
  },
  { timestamps: true }
);

export default mongoose.model("ApplicationModel", Application);
