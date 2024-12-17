import { Router } from "express";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/current-user", getCurrentUser);

// we did upload.single("avatar") meaning we wanna upload one file (value) in the formData which is the avatar
// now the upload.single("avatar") middleware will set a req.file that has information about the file
// we can log it in the controller
userRouter.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

userRouter.get(
  "/admin/app-stats",
  authorizePermissions("admin"),
  getApplicationStats
);

export default userRouter;
