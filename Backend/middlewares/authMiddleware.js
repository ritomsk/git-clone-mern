import jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyToken = (req,res,next) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader){
    return res.status(401).json({ message: "No token provided!" });
  }

  const token = authHeader.split(' ')[1];
  if(!token){
    return res.status(401).json({ message: "Malformed token! "});
  }

  try{
    const verify = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = verify;

    next();
  }
  catch(err){
    return res.status(400).json({ message: "Invalid Token!" });
  }
}

export default verifyToken;

