import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { s3, S3_BUCKET } from '../config/aws-config.js';

//not doing the authorization part for now

const CONFIG_PATH = path.join(os.homedir(), '.gitClone-secret.json');

async function pushRepo(){
  const repoPath = path.resolve(process.cwd(), ".gitClone");
  const commitsPath = path.join(repoPath, "commits");
  const configPath = path.join(repoPath, 'config.json');

  try{
    const data = await fs.readFile(CONFIG_PATH);
    const { userId, token} = JSON.parse(data);
    const repoData = await fs.readFile(configPath);
    const repoName = JSON.parse(repoData).remote.origin;

    const commitsDir = await fs.readdir(commitsPath);
    for(const commitDir of commitsDir){
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fs.readdir(commitPath);

      for( const file of files ){
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);
        const key = `repositories/${userId}/${repoName}/commits/${commitDir}/${file}`;
        const params = {
          Bucket: S3_BUCKET,
          Key: key,
          Body: fileContent
        }

        await s3.upload(params).promise();
      }
    }
    console.log("All commits pushed to S3");
  }
  catch(err){
    console.error("Error pushing to S3", err);
  }
}

export { pushRepo };