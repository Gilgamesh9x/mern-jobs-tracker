import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    jobStatus: {
      type: String,
      // if the user enters a value other than those 3, mongoose will error out. The default would be pending if nothing is entered
      enum: Object.values(JOB_STATUS),
      required: true,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } // to get when it was created and updated
);

export default mongoose.model("Job", JobSchema);
