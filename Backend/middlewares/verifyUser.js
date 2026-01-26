import User from '../models/user.js';

const verifyUser = async (req,res,next) => {
  const { id } = req.params;

  try{
    const user = await User.findById(id);
    if(!user){
      return res.status(404).json({ message: "User not found!" });
    }

    if(user._id.toString() !== req.user._id){
      return res.status(403).json({ message: "You are not the owner of this account!" });
    }

    next();
  }
  catch(err){
    res.status(500).json({ message: "Server Error during Authorization" });
  }
}

export default verifyUser;