import express from 'express';
import repoController from '../controllers/repoController.js';

const repoRouter = express.Router();

repoRouter.post("/repo/create", repoController.createRepository);
repoRouter.get("/repo/all", repoController.getAllRepository);
repoRouter.get("/repo/:id", repoController.fetchRepositoryByID);
repoRouter.get("/repo/name/:name", repoController.fetchRepositoryByName);
repoRouter.get("/repo/user/:userID", repoController.fetchRepositoryForCurrentUser);
repoRouter.put("/repo/update/:id", repoController.updateRepositoryByID);
repoRouter.delete("/repo/delete/:id", repoController.deleteRepositoryByID);
repoRouter.patch("/repo/toggle/:id", repoController.toggleVisibilityByID);

export default repoRouter;