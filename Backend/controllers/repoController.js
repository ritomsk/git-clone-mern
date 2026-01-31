import Repository from '../models/repository.js'; 
import mongoose from 'mongoose';
import { s3, S3_BUCKET} from '../config/aws-config.js';
import { buildFileTree } from '../utils/buildFileTree.js';

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

    const prefix = `repositories/${repo.owner._id}/${repo.title}/commits/${repo.latestCommitId}/`;

    const data = await s3.listObjectsV2({
      Bucket: S3_BUCKET,
      Prefix: prefix  
    }).promise();
    
    const files = data.Contents.map(obj => {
      return obj.Key.replace(prefix, "");
    })

    const fileTree = buildFileTree(files);

    console.log(fileTree);
    res.json({repo: repo, fileTree: fileTree});
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

const updateRepoAfterPush = async(req,res) =>{
  const { userId, repoName, commitId } = req.body;
  try{
    console.log(userId, repoName);
    const repo = await Repository.findOne({
      owner: userId,
      title: repoName
    });

    console.log(repo);
    if (!repo) {
      console.error(`Repo not found! looking for title: "${repoName}" with owner: "${userId}"`);
      return res.status(404).json({ error: "Repository not found" });
    } 
    repo.latestCommitId = commitId;

    await repo.save();

    res.status(200).json({ message: "Repository updated successfully" });
  }
  catch(err){
    console.error("Error updating repository: ", err);
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
  updateRepoAfterPush,
}

export default repoController;