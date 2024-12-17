// we used fs/promises instead of fs to we would work with await and not with a callback
import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "./src/models/jobModel.js";
import User from "./src/models/userModel.js";

try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email: "test@gmail.com" });

  // this returns an array of objects
  const jsonJobs = JSON.parse(
    await readFile(new URL("./src/utils/mockJobs.json", import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  // delete any previous jobs by this user
  await Job.deleteMany({ createdBy: user._id });
  // we passed an array this time
  await Job.create(jobs);
  console.log("Success!!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
