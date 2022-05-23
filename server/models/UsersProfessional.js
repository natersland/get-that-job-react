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
    userAppiedJobs: {
      type: Array,
      default: [],
    },
    userFollowJobs: {
      type: Array,
      default: [],
    },
    userAppiedJobs: [
      // ถ้า recruiter กด Mark as started ข้อมูลใน totalCandidates[index] จะย้ายไปอยู่ candidatesOnTrack ข้างล่างสุด
      {
        jobAppliedId: mongoose.Schema.Types.ObjectId, // เป็น id ที่ถูก gen ใหม่ ตอนกดสมัครงาน
        appliedDate: { type: [Date], default: new Date() },
        isApply: { type: [Boolean], default: true }, // ถ้า Mark as started,Finished ต้องเปลี่ยนเป็น false
        isReview: { type: [Boolean], default: false }, // ถ้า Mark as started ต้องเปลี่ยนเป็น true และอันอื่น false หมด
        isFinised: { type: [Boolean], default: false }, // ถ้า Finished ต้องเปลี่ยนเป็น true และอันอื่น false หมด
      },
    ],
    userFollowJobs: {
      type: [{}], // เมื่อ recruiter กด Mark as started ข้อมูลจะย้ายจาก totalCandidates มาอยู่ในนี้
    },

    uploadFiles: {
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
