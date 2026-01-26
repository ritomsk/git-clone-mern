import User from '../models/user.js';
import Repository from '../models/repository.js';
import Issue from '../models/issue.js';
import mongoose from 'mongoose';

const createRepository = async (req,res) => {
  const { title, description, content, owner, issues, visibility } = req.body;
  
  if(!title){
    res.status(400).json({ error: 'Repository name is required!'});
  }
  if(!mongoose.Types.ObjectId.isValid(owner)){
    res.status(400).json({ error: "Invalid UserID" });
  }

  try{
    const newRepository = new Repository({
      title,
      description,
      content,
      owner,
      issues,
      visibility
    });

    const result = await newRepository.save();

    res.status(201).json({ message: "Repository created!", repositoryId: result._id });
  }
  catch(err){
    console.error("Error creating repository: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const getAllRepository = async (req,res) => {
  try{
    const repos = await Repository.find({visibility: "true"})
      .populate("owner")
      .populate("issues")
      .sort({_id: -1})
      .limit(10);
    if(!repos || repos.length == 0){
      res.status(401).json({ error: 'No repository found!'});
    }

    res.json(repos);
  }
  catch(err){
    console.error("Error fetching repositories: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const fetchRepositoryByID = async (req,res) => {
  const { id } = req.params;
  try{
    const repo = await Repository.findById(id).populate("owner").populate("issues");
    if(!repo || repo.length == 0){
      res.status(404).json({ error: 'Repository not found!'});
    }

    res.json(repo);
  }
  catch(err){
    console.error("Error fetching repository: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const fetchRepositoryByName = async (req,res) => {
  const { name } = req.params;
  try{
    const repo = await Repository.find({ title: name }).populate("owner").populate("issues");
    if(!repo || repo.length == 0){
      res.status(404).json({ error: 'Repository not found!'});
    }

    res.json(repo);
  }
  catch(err){
    console.error("Error fetching repository: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const fetchRepositoryForCurrentUser = async (req,res) => {
  const { userID } = req.params; 
  try{
    const repo = await Repository.find({ owner: userID}).populate("owner").populate("issues");

    if(!repo || repo.length == 0){
      res.status(404).json({ error: 'User Repositories not found!'});
    }

    res.json(repo);
  }
  catch(err){
    console.error("Error fetching repositories: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const updateRepositoryByID = async (req,res) => {
  const { id } = req.params;
  const { description, content } = req.body;

  if ( !description && !content ){
    res.status(400).json({ error: 'Required fields not provided!'});
  }
  try{
    const repo = await Repository.findById(id);
    if(!repo || repo.length == 0){
      res.status(404).json({ error: 'Repository not found!'});
    }

    repo.content.push(content);
    repo.description = description;

    const updatedRepo = await repo.save();

    res.json({
      message: "Repository updated successfully!",
      repository: updatedRepo
    })
  }
  catch(err){
    console.error("Error updating repository: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const deleteRepositoryByID = async (req,res) => {
  const { id } = req.params;
  try{
    const deletedRepo = await Repository.findByIdAndDelete(id);
    if(!deletedRepo || deletedRepo.length == 0){
      res.status(404).json({ error: 'Repository not found!'});
    }

    res.json({ message: "Repository deleted successfully!" });
  }
  catch(err){
    console.error("Error deleting repository: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const toggleVisibilityByID = async (req,res) => {
  const { id } = req.params;

  try{
    const repo = await Repository.findById(id);
    if(!repo || repo.length == 0){
      res.status(404).json({ error: 'Repository not found!'});
    }

    repo.visibility = !repo.visibility;

    const updatedRepo = await repo.save();

    res.json({
      message: "Repository visibility toggled successfully!",
      repository: updatedRepo
    })
  }
  catch(err){
    console.error("Error toggling repository visibility: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const repoController = { 
  createRepository,
  getAllRepository,
  fetchRepositoryByID,
  fetchRepositoryByName,
  fetchRepositoryForCurrentUser,
  updateRepositoryByID,
  deleteRepositoryByID,
  toggleVisibilityByID,
}

export default repoController;