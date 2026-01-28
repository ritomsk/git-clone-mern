import fs from 'fs';
import file from 'fs/promises';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revertRepo(commitId){
  const repoPath = path.resolve(process.cwd(), ".gitClone");
  const commitsPath = path.join(repoPath, "commits");

  try{
    const commitDir = path.join(commitsPath, commitId);
    const files = await readdir(commitDir);
    const parentDir = path.resolve(repoPath, '..');

    await copyRecursive(commitDir, parentDir);

    console.log(`commit ${commitId} reverted successfully!`);
  }
  catch(err){
    console.error(`Error reverting to commitId: ${commitId}`, err);
  }
}

async function copyRecursive(src, dest) {
  const stats = await file.lstat(src);

  if (stats.isDirectory()) {
    await file.mkdir(dest, { recursive: true });

    const entries = await file.readdir(src);
    for (const entry of entries) {
      if (entry === '.gitClone' || entry === 'node_modules') continue;

      const srcPath = path.join(src, entry);
      const destPath = path.join(dest, entry);
      
      await copyRecursive(srcPath, destPath);
    }
    
  } else {
    if(path.basename(src) === 'commit.json') return;
    await file.mkdir(path.dirname(dest), { recursive: true });
    await file.copyFile(src, dest);
  }
}

export { revertRepo };