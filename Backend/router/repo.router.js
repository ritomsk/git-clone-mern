import express from 'express';
import repoController from '../controllers/repoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import verifyRepoOwner from '../middlewares/verifyRepoOwner.js';

const repoRouter = express.Router();

repoRouter.post(
  "/repo/create",
  authMiddleware,
  repoController.createRepository
);
repoRouter.get(
  "/repo/all", 
  repoController.getAllRepository
);
repoRouter.get("/repo/:id", 
  repoController.fetchRepositoryByID
);
repoRouter.get(
  "/repo/name/:name", 
  repoController.fetchRepositoryByName
);
repoRouter.get(
  "/repo/user/:userID",
  repoController.fetchRepositoryForCurrentUser
);
repoRouter.put(
  "/repo/update/:id",
  authMiddleware,
  verifyRepoOwner,
  repoController.updateRepositoryByID
);
repoRouter.delete(
  "/repo/delete/:id",
  authMiddleware,
  verifyRepoOwner,
  repoController.deleteRepositoryByID
);
repoRouter.patch(
  "/repo/toggle/:id",
  authMiddleware,
  verifyRepoOwner,
  repoController.toggleVisibilityByID
);
repoRouter.post(
  "/repo/push",
  authMiddleware,
  repoController.updateRepoAfterPush
)


export default repoRouter;