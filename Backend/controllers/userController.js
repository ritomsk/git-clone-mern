import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import 'dotenv/config';

const signup = async (req,res) => {
  const { username, email, password } = req.body;
  if( !username || !email || !password){
    res.status(401).json({ message: "Missing credentials!" });
  }

  try{
    const user = await User.findOne({ username });
    
    if(user){
      res.status(400).json({ message: "User already exists!"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User ({
      username,
      email,
      password: hashedPassword,
      repositoires: [],
      starRepos: [],
      followedUsers: [],
    });

    const result = await newUser.save();

    const token = jwt.sign({ id: result._id}, process.env.TOKEN_KEY, { expiresIn: 7* 86400 });
    res.json({ token });
  }
  catch(err){
    console.error("Error signing up: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const login = async (req,res) => {
  const { email, password } = req.body;

  if(!email || !password){
    res.status(401).json({ message: "Missing credentials!" });
  }
  try{
    const user = await User.findOne({ email });
    if(!user){
      res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if(!isMatch){
      res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({id: user._id}, process.env.TOKEN_KEY, { expiresIn: 7* 86400 })

    res.json({token, userId: user._id});

  }
  catch(err){
    console.error("Error logging in: ", err);
    res.status(500).json({ message: "Server Error" });
  }
}

const getUserProfile = async (req,res) => {
  const { id } = req.params;
  try{
    const user = await User.findById(id);
    if(!user){
      res.status(404).json({ message: "User not found!" });
    }
    res.json(user);
  }
  catch(err){
    console.error("Error fetching user profile: ", err);
    res.status(500).json({ message: "Server error!" });
  }
}

const getAllUsers = async (req,res) => {
  try{
    const users = await User.find({});
    if(!users){
      res.status(404).json({ message: "User not found!" });
    }
    res.json(users);
  }
  catch(err){
    console.error("Error fetching users: ", err);
    res.status(500).json({ message: "Server error!" });
  }
}

const updateUserProfile = async (req,res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  if(!email && !password ){
    res.status(401).json({ message: "Invalid credentials" });
  }
  try{
    let updateFields = { email };

    if(password){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: updateFields
      },
      { new: true, runValidators: true }
    );

    if(!updatedUser){
      res.status(404).json({ message: "User not found!" });
    }

    res.json(updatedUser);
  }
  catch(err){
    console.error("Error updating user profile: ", err);
    res.status(500).json({ message: "Server error!" });
  }
}

const deleteUserProfile = async (req,res) => {
  const { id } = req.params;
  try{
    const user = await User.findByIdAndDelete(id);
    console.log(user);
    if(!user){
      res.status(404).json({ message: "User not found!" });
    }
    res.json(user);
  }
  catch(err){
    console.error("Error deleting user profile: ", err);
    res.status(500).json({ message: "Server error!" });
  }
}

const userController =  { 
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile
}

export default userController;