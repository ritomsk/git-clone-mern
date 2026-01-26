import Repository from "../models/repository.js";

const verifyRepoOwner = async (req,res,next) => {
  const { id } = req.params;

  try{
    const repo = await Repository.findById(id);
    if(!repo){
      return res.status(404).json({ message: "Repository not found!" });
    }

    if(repo.owner.toString() !== req.user._id){
      return res.status(403).json({ message: "You do not own this repo!" });
    }
    next();
  }
  catch{
    res.status(500).json({ message: "Server Error during Authorization" });
  }
}

export default verifyRepoOwner;