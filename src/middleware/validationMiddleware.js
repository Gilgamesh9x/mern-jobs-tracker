import "express-async-errors";
import { body, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Jobs from "../models/jobModel.js";
import Users from "../models/userModel.js";

function withValidationErrors(validateValues) {
  // the array here is just how we group middlewares together
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      // this logs objects of the errors we have
      /* console.log(errors); */
      // next condition will be triggered if the errors is not empty meaning there are errors
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
}

// we can pass this middleware now to any request that needs some kind of validation
export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("Company is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("jobLocation").notEmpty().withMessage("Job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid job status value"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid job type"),
]);

export async function validateIdParam(req, res, next) {
  const id = req.params.jobId;
  // First: Check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("Invalid MongoDB ID");
  }
  // Second: Check if the job exists
  const job = await Jobs.findById(id);
  if (!job) throw new NotFoundError("Job not found");

  // by this point, we already found the job so we can have access to its createdBy
  // check if the request is made by the owner of the post
  const { userId, role } = req.user;
  // if the user is an admin, he can have access to anything
  if (role === "admin") {
    return next();
  }
  // if the user is not an admin, he can only have access to his jobs
  if (job.createdBy.toString() !== userId)
    throw new UnauthorizedError(
      "Sorry, the job you are looking for doesn't belong to you"
    );

  next();
}

// User register validation
// the custom creates your own custom validation function
// the email value with passed in the param is coming from the body("email")
export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .custom(async (email) => {
      const user = await Users.findOne({ email });
      if (user) {
        throw new Error("Email already exists.");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("location").notEmpty().withMessage("Location is required"),
]);

// User login validation

export const validateLoginInput = withValidationErrors([
  body("email").isEmail().withMessage("Enter a valid email"),
  /*     .custom(async (email) => {
      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error("We don't have any account associated with this email");
      }
      return true;
    }), */
  body("password").notEmpty().withMessage("Password is required"),
]);

// Update user

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .custom(async (email, { req }) => {
      const user = await Users.findOne({ email });
      // let's undersatand why we added the second condition
      // we have 2 cases where the user updates his profile. First, if he doesn't update the email. Second, if he does update the email
      // if he doesn't update the email, we will find the user but that user will be us. And if it's us, then we will throw the error which is something we don't want. So if the user isn't us, don't throw the error (it just means I updated my profile but not the email)
      // the second case is, if the user updates the email. In that case, we look if that email exists in other users, if it does, error out, if not, don't.
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("Email already exists.");
      }
      return true;
    }),
  body("location").notEmpty().withMessage("Location is required"),
]);
