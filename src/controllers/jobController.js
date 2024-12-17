import "express-async-errors"; // this catches the errors and passes them to the errorHandlerMiddleware (if you don't handle the error manually)
import Jobs from "../models/jobModel.js";
import mongoose from "mongoose";
import dayjs from "dayjs";

export async function getAllJobs(req, res) {
  /*   console.log(req.query); */
  const { userId } = req.user;
  const { search, jobStatus, jobType, sort, page } = req.query;

  const queryObject = {
    createdBy: userId,
  };

  if (search) {
    // $or => Means return if one of the conditions is met
    // $regex: value => Means the field position or company should have as a value at least the value set in search. Meaning, if the value of position is "coco soso", if the search is "soso", it'll meet the condition
    // $options: "i" => case sensitive meaning "Manager is equal to manager"
    // look notes images for more info
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { jobLocation: { $regex: search, $options: "i" } },
    ];
  }
  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  ////////////////// Pagination logic //////////////////////////////////////////

  const pageNumber = +page || 1;

  const limit = 10;

  const skip = (pageNumber - 1) * limit;

  const jobs = await Jobs.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  ////////////////////////////////////////////////////////////////

  const totalJobs = await Jobs.countDocuments(queryObject);
  const totalPages = Math.ceil(totalJobs / limit);

  return res
    .status(200)
    .json({ totalJobs, totalPages, currentPage: pageNumber, jobs });
}

export async function getJob(req, res) {
  // if you enter a valid id but that doesn't exist, it returns null (in this case, we let the validation middleware handle it)
  // if you enter an id that's not valid, it errors out (an error from mongo)
  const job = await Jobs.findById(req.params.jobId);
  return res.status(200).json({ job });
}

export async function createJob(req, res) {
  const { userId } = req.user;
  req.body.createdBy = userId;
  // Create a new job instance. It returns the instance created
  const job = await Jobs.create(req.body);
  return res.status(201).json({ message: "Job added successfully", job });
}

export async function editJob(req, res) {
  // Update the job in the database (only override the values that we are sending)
  // the { new: true } will return the updated document
  const newJob = await Jobs.findByIdAndUpdate(req.params.jobId, req.body, {
    new: true,
  });
  return res.status(200).json({ message: "Job updated successfully", newJob });
}

export async function deleteJob(req, res) {
  // Delete the job and return the deleted document
  const deletedJob = await Jobs.findByIdAndDelete(req.params.jobId);
  return res
    .status(200)
    .json({ message: "Job deleted successfully", deletedJob });
}

export async function getUserJobsStats(req, res) {
  const { userId } = req.user;

  // this returns an array of objects
  let stats = await Jobs.aggregate([
    // here, we'll be getting all the jobs created by the user who sent the request
    { $match: { createdBy: new mongoose.Types.ObjectId(userId) } },
    // this will give us an object that has the value of jobStatus in a property _id and counts the different values (how many values we have in each job status) and stores them in the object in a property "count"
    // sum just means count
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  const results = {
    pending: stats.find((job) => job._id === "pending")?.count || 0,
    interview: stats.find((job) => job._id === "interview")?.count || 0,
    declined: stats.find((job) => job._id === "declined")?.count || 0,
  };
  ////////////////////////////////////////////////////////////////////
  let monthlyApplications = await Jobs.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    // this will give us an array of objects and each objects had jobs that have the same year and month and it also counts how many of them exist
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    // sort the objects based on the year and the month in a descending order
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  const monthyAppsData = monthlyApplications
    .map((obj) => {
      const date =
        dayjs()
          .month(obj._id.month - 1)
          .format("MMM") +
        " " +
        dayjs().year(obj._id.year).format("YY");
      const count = obj.count;

      return { date, count };
    })
    .reverse();

  res.status(200).json({
    results,
    monthyAppsData,
  });
}
