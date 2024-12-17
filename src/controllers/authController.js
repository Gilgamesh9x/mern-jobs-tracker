import "express-async-errors";
import Users from "../models/userModel.js";
import { hashPassword } from "../utils/hashPasswords.js";
import bcrypt from "bcryptjs";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export async function register(req, res) {
  // Hashing logic //
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  ///////////////////////////////////////////////////////
  const isFirstUser = (await Users.countDocuments()) === 0;
  // add the property role the body sent by the user
  // PS: even if the user makes a request with the role property and gives it the value he wants, we'll still override it
  req.body.role = isFirstUser ? "admin" : "user";
  const user = await Users.create(req.body);
  return res.status(201).json({ message: "User created successfully" });
}

export async function login(req, res) {
  const user = await Users.findOne({ email: req.body.email });

  // check if email and pw are correct
  const isValidUser =
    user && (await bcrypt.compare(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("Invalid Credentials");

  const token = createJWT({ userId: user._id, role: user.role });
  // token is the name of the cookie
  res.cookie("token", token, {
    httpOnly: true, // this means the cookie cannot be accessed with JS
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000), // (60 * 60 * 24 * 1000 is 24h in ms) (it doesn't reset even if the user closes the client). And since the token expires in 24 hours too, that means the data of the token will be deleted from the cookie and we are good to go
    secure: process.env.NODE_ENV === "production", // if we're in production set it to yes, otherwise no (bcause in development, we send http requests and not https)
  });

  return res.status(200).json({ message: "Connected Successfully", token });
}

// log out
export function logout(req, res) {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Set expiration to the past to delete the cookie
  });
  return res.status(200).json({ message: "You logged out successfully." });
}
