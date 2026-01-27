import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const CONFIG_PATH = path.join(os.homedir(), '.gitClone-secret.json');

async function login(email, password){
  try{
    const result = await axios.post('http://localhost:3000/login',
      {
        email,
        password
      }
    );

    await fs.writeFile(CONFIG_PATH, JSON.stringify(result.data));
    console.log("logged in successfully!");
  }
  catch(err){
    console.error("Error loggin in: ", err);
  }
}

export { login };