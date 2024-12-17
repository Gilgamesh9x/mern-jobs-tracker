import { Router } from "express";
import {
  getAllJobs,
  getJob,
  createJob,
  editJob,
  deleteJob,
  getUserJobsStats,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import { checkForTestUser } from "../middleware/authMiddleware.js";

const jobsRouter = Router();

jobsRouter.get("/", getAllJobs);

jobsRouter.get("/jobs-stats", getUserJobsStats);

jobsRouter.get("/:jobId", validateIdParam, getJob);

jobsRouter.post("/", checkForTestUser, validateJobInput, createJob);

jobsRouter.patch(
  "/:jobId",
  checkForTestUser,
  validateJobInput,
  validateIdParam,
  editJob
);

jobsRouter.delete("/:jobId", checkForTestUser, validateIdParam, deleteJob);

export default jobsRouter;
