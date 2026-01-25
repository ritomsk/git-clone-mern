import User from '../models/user.js';
import Repository from '../models/repository.js';
import Issue from '../models/issue.js';
import mongoose from 'mongoose';

const createIssue = async (req,res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  if(!title){
    res.status(400).json({ error: 'Issue title is required!'});
  }
  try{
    const newIssue = new Issue({
      title,
      description,
      repository: id,
    });

    await newIssue.save();

    res.status(201).json(newIssue);
  }
  catch(err){
    console.error("Error creating issue: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const fetchIssueByID = async (req,res) => {
  const { id } = req.params;
  try{
    const issue = await Issue.findById(id);
    if(!issue){
    res.status(404).json({ error: 'Issue not found!' });
    }

    res.json(issue);
  }
  catch(err){
    console.error("Error fetching issue: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const deleteIssueByID = async (req,res) => {
  const { id } = req.params;
  try{
    const issue = await Issue.findByIdAndDelete(id);

    if(!issue || issue.length == 0){
    res.status(404).json({ error: 'Issue not found!' });
    }

    res.json({ message: "Issue deleted successfully!" });
  }
  catch(err){
    console.error("Error deleting issue: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const updateIssueByID = async (req,res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try{
    const issue = await Issue.findByIdAndUpdate(id,
      {
        title,
        description,
        status
      }
    );
    if(!issue){
    res.status(404).json({ error: 'Issue not found!' });
    }

    res.json(issue);
  }
  catch(err){
    console.error("Error fetching issue: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const fetchAllIssues = async (req,res) => {
  try{
    const issues = await Issue.find({});

    if(!issues || issues.length == 0){
      res.status(404).json({ error: 'Issues not found!' });
    }

    res.json(issues);
  }
  catch(err){
    console.error("Error fetching issues: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const issueController = {
  createIssue,
  fetchIssueByID,
  deleteIssueByID,
  updateIssueByID,
  fetchAllIssues,
}

export default issueController;