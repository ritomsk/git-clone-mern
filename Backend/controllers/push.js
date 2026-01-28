import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { s3, S3_BUCKET } from '../config/aws-config.js';
import axios from 'axios';

//not doing the authorization part for now

const CONFIG_PATH = path.join(os.homedir(), '.gitClone-secret.json');

async function pushRepo(){
  const repoPath = path.resolve(process.cwd(), ".gitClone");
  const commitsPath = path.join(repoPath, "commits");
  const configPath = path.join(repoPath, 'config.json');

  try{
    const data = await fs.readFile(CONFIG_PATH);
    const { userId, token } = JSON.parse(data);
    const repoData = await fs.readFile(configPath);
    const repoName = JSON.parse(repoData).remote.origin;
    const commitId = JSON.parse(repoData).latestCommitId;

    const commitsDir = await fs.readdir(commitsPath);
    for(const commitDir of commitsDir){
      const commitPath = path.join(commitsPath, commitDir);

      await sendToS3(commitPath, userId, repoName, commitDir,commitPath);
    }
    
    console.log("All commits pushed to S3");

    await axios.post("http://localhost:3000/repo/push",
      {
        userId,
        repoName,
        commitId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  catch(err){
    console.error("Error pushing to S3", err);
  }
}

async function sendToS3(currentPath,userId,repoName,commitId,baseFolder){
  const stats = await fs.lstat(currentPath);
  if(stats.isDirectory()){
    const entries = await fs.readdir(currentPath);
    for (const entry of entries){
      const nextPath = path.join(currentPath,entry);
      await sendToS3(nextPath,userId,repoName,commitId,baseFolder);
    }
  }
  else{
    const fileContent = await fs.readFile(currentPath);
    
    const relativePath = path.relative(baseFolder, currentPath);

    const s3Path = relativePath.replace(/\\/g, "/");

    const key = `repositories/${userId}/${repoName}/commits/${commitId}/${s3Path}`;

    const params = {
      Bucket: S3_BUCKET,
      Key: key,
      Body: fileContent,
      ContentType: "application/json"
    }

    await s3.upload(params).promise();
  }
}

export { pushRepo };