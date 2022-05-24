import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";
// Schema Medels ---------------------
import RecruiterModel from "../models/RecruiterModel.js";
import ProfessionalModel from "../models/ProfessionalModel.js";
// Database ---------------------------
const appCollection = db.collection("applications");
const jobsCollection = db.collection("jobs");
const usersCollection = db.collection("users");
