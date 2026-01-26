import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import verifyUser from '../middlewares/verifyUser.js';

const userRouter = express.Router();

userRouter.get(
  "/allUsers",
  userController.getAllUsers
);
userRouter.post(
  "/signup",
  userController.signup
);
userRouter.post(
  "/login",
  userController.login
);
userRouter.get(
  "/userProfile/:id",
  userController.getUserProfile
);
userRouter.put(
  "/updateProfile/:id",
  authMiddleware,
  verifyUser,
  userController.updateUserProfile
);
userRouter.delete(
  "/deleteProfile/:id",
  authMiddleware,
  verifyUser,
  userController.deleteUserProfile
);

export default userRouter;