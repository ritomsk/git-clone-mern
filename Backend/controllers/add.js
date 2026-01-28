import fs from 'fs/promises';
import path from 'path';

async function addRepo(filePath) {
  const repoPath = path.resolve(process.cwd(), ".gitClone");
  const stagingPath = path.join(repoPath, "staging");

  try {
    const relativePath = path.relative(process.cwd(), filePath);
    const destPath = path.join(stagingPath, relativePath);

    await copyRecursive(filePath, destPath);
    console.log(`Added ${relativePath} to staging.`);
    
  } catch (err) {
    console.error("Error adding to staging area:", err);
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

export { addRepo };