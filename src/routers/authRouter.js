import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";
import rateLimiter from "express-rate-limit";

const authRouter = Router();

// Function to create a customizable rate limiter
function apiLimiter(max) {
  return rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max, // Use the customizable max value
    message: { message: "IP rate limit exceeded, retry in 15 minutes." },
  });
}

authRouter.post("/register", apiLimiter(5), validateRegisterInput, register);
authRouter.post("/login", apiLimiter(6), validateLoginInput, login);
authRouter.get("/logout", logout);

export default authRouter;
