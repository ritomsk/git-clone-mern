import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

async function commitRepo(message) {
  const repoPath = path.resolve(process.cwd(), ".gitClone");
  const stagedPath = path.join(repoPath, "staging");
  const commitPath = path.join(repoPath, "commits");
  const configPath = path.join(repoPath, 'config.json');
  
  try{
    const commitId = uuidv4();
    const commitDir = path.join(commitPath, commitId);
    await fs.mkdir(commitDir, { recursive: true });

    await copyRecursive(stagedPath,commitDir);

    await fs.writeFile(
      path.join(commitDir, 'commit.json'),
      JSON.stringify({ message, date: new Date().toISOString() })
    )
    
    let configContent = await fs.readFile(configPath, 'utf-8');
    configContent = JSON.parse(configContent);
    configContent.latestCommitId = commitId;

    await fs.writeFile(configPath,JSON.stringify(configContent, null, 2));

    await fs.rm(stagedPath, { recursive: true, force: true});
    await fs.mkdir(stagedPath);

    console.log(`Commit ${commitId} created with message: ${message}`);
  }
  catch(err){
    console.error("error adding file to commits", err);
  }
}

async function copyRecursive(src, dest) {
  const stats = await fs.lstat(src);

  if (stats.isDirectory()) {
    await fs.mkdir(dest, { recursive: true });

    const entries = await fs.readdir(src);
    for (const entry of entries) {
      if (entry === '.gitClone' || entry === 'node_modules') continue;

      const srcPath = path.join(src, entry);
      const destPath = path.join(dest, entry);
      
      await copyRecursive(srcPath, destPath);
    }
    
  } else {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
  }
}

export { commitRepo };