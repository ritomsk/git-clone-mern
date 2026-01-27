import fs from 'fs/promises';
import path from 'path';

async function addRemote(repoName){
  const repoPath = path.resolve(process.cwd(), '.gitClone');
  const configPath = path.join(repoPath, 'config.json');

  try{
    await fs.access(configPath);

    const configContent = await fs.readFile(configPath, 'utf-8');

    let config = configContent ? JSON.parse(configContent) : {};

    if(!config.remote) config.remote = {};

    config.remote.origin = repoName;

    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    console.log("Connected to repo!");
    }
  catch(err){
    console.error("Not a git repository! Run node index.js init first!");
  }
}

export { addRemote };