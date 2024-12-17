import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/customErrors.js";

export function createJWT(payload) {
  // first value is what data we wanna hold in that token
  // second is to see if our token was tampered with
  // third an object for some settings
  // PS: the expiry is sent with the token so after 1d it becomes invalid so even if the cookie is still in the browser, we'll not log in when we verify it because it has expired
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
}

export function verifyJWT(token) {
  // the decoded variable will either return an error "jwt malformed" or it will return the payload data
  // the reason we added try and catch is because we wanna display our own error if the verification of the token fails
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new UnauthenticatedError("Invalid token");
  }
}
