import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export function authenticateUser(req, res, next) {
  // check if the cookie "token" exists
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Invalid Authentication");

  // check if the token is valid
  const { userId, role } = verifyJWT(token);
  // testUser will be either true or false
  const testUser = userId === "671fa85b5e6fb042b9d4496a";
  // we'll create a new user property in our req so we can pass it to the next controller.
  // this way we can attach the user to the job he created
  req.user = { userId, role, testUser };

  next();
}

export function authorizePermissions(...roles) {
  // so the authorizePermissions will return a function that we will pass in our router
  // then we added the rest operator to take the roles we passed (they will become an array, for example ["admin", "manager"])
  // then we check if the roles we passed, one of them includes the role of the user in the request. If yes, pass. If not, throw error
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unautorized to access this route.");
    }
    next();
  };
}

export function checkForTestUser(req, res, next) {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only!");
  }
  next();
}
