import express from 'express';
import issueController from '../controllers/issueController.js';

const issueRouter = express.Router();

issueRouter.post("/issue/create", issueController.createIssue);
issueRouter.get("/issue/:id", issueController.fetchIssueByID);
issueRouter.delete("/issue/:id", issueController.deleteIssueByID);
issueRouter.put("/issue/:id", issueController.updateIssueByID);
issueRouter.get("/issue/all", issueController.fetchAllIssues);

export default issueRouter;