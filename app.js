import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
// parses cookies coming from requests so we can have access to them doing: req.cookies
// PS: because we can see the cookie in the request but we can't access it without cookieParser
// Cookie parser creates an object that contains the cookies in the request
import cookieParser from "cookie-parser";

import jobsRouter from "./src/routers/jobRouter.js";
import authRouter from "./src/routers/authRouter.js";
import userRouter from "./src/routers/userRouter.js";

import { errorHandlerMiddleware } from "./src/middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./src/middleware/authMiddleware.js";

import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

// Public folder
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// Cloudinary

import cloudinary from "cloudinary";

const app = express();

////////////////////////////////////////// Middleware //////////////////////////////////////////

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      // other directives...
    },
  })
);
app.use(mongoSanitize());
////////////////////////////////////////// Cloudinary /////////////////////////////////////////////
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

///////////////////////////////////// Routers ///////////////////////////////////////////////////////////////////

// Jobs router
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// Auth router
app.use("/api/v1/auth", authRouter);

// User router
app.use("/api/v1/users", authenticateUser, userRouter);

/////////////////////////////////////////// Public folder setup ///////////////////////////////////////

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));

// It allows front-end routing (using libraries like React Router) to manage navigation within the app.
// When users directly access paths (e.g., /profile, /dashboard), the server will still respond with index.html, which loads the SPA, and the front-end router will determine what content to display based on the URL.

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

//////////////////////////////////// Error middlewares //////////////////////////////////////////////////////////////

// 404 middleware

app.use("*", (req, res) => {
  return res.status(404).json({ message: "Page not found" });
});

// error middleware

app.use(errorHandlerMiddleware);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default app;
