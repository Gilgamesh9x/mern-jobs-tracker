import "express-async-errors";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
import { v2 as cloudinary } from "cloudinary";
import { formatImage } from "../middleware/multerMiddleware.js";

export async function getCurrentUser(req, res) {
  const { userId } = req.user;
  // here there is no need for any error handling in case the user doesn't exist because the authMiddleware takes care of that
  // the only error could be from Mongo and express-async-errors will take care of it
  const user = await User.findById(userId, { password: 0 });
  return res.status(200).json({ user });
}

export async function updateUser(req, res) {
  /* console.log(req.file); */
  // We only wanna upload the image to cloudinary if the user sends an img
  if (req.file) {
    const file = formatImage(req.file);
    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file);
    // these are the 2 properties we added in the Schema
    req.body.avatar = uploadResult.secure_url;
    req.body.avatarPublicId = uploadResult.public_id;
  }
  /////////////////////////////////////////////////////////////////////////////////////////
  // just in case someone sends the password property, let's delete it
  delete req.body.password;
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body);

  // now, if the user had already a profile pic and wanted to update it, we want to delete the old pic from Cloudinary
  // to do that, we check if the user already had a pic
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.uploader.destroy(updatedUser.avatarPublicId);
  }
  return res.status(200).json({ message: "User updated successfully" });
}

export async function getApplicationStats(req, res) {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  return res.status(200).json({ users, jobs });
}
