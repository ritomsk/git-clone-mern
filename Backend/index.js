import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';
import 'dotenv/config';
import { Server } from 'socket.io';
import yargs from 'yargs';
import { hideBin} from 'yargs/helpers';
import mainRouter from './router/main.router.js';

import { initRepo } from './controllers/init.js';
import { addRepo } from './controllers/add.js';
import { commitRepo } from './controllers/commit.js';
import { pushRepo } from './controllers/push.js';
import { pullRepo } from './controllers/pull.js';
import { revertRepo } from './controllers/revert.js';
import { addRemote } from './controllers/addRemote.js';
import { login } from './controllers/login.js';

yargs(hideBin(process.argv))
  .command("start", "start the server", startServer)
  .command("init", 'initialize a repository', {}, initRepo)
  .command(
    'add <file>',
    'add file to repository',
    (yargs) => {
      yargs.positional("file", {
        describe: "file to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command(
    'commit <message>',
    'Commit the staged files',
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string"
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )
  .command(
    'push',
    'Push commits to S3',
    pushRepo
  )
  .command(
    'pull',
    'Pull commits from S3',
    pullRepo
  )
  .command(
    'revert <commitId>',
    'Revert changes to the given commitId',
    (yargs) => {
      yargs.positional('commitId',{
        describe: "Commit ID to revert to",
        type: "string"
      });
    },
    (argv) => {
      revertRepo(argv.commitId);
    }
  )
  .command(
    'remote add origin <repoName>',
    'Connect to the given repository',
    (yargs) => {
      yargs.positional('repoName', {
        describe: "repo name to connect to.",
        type: "string"
      });
    },
    (argv) => {
        addRemote(argv.repoName);
    }
  )
  .command(
    'login <email> <password>',
    'provide user details for logging in',
    (yargs) => {
      yargs
      .positional('email', {
        describe: "user email address",
        type: "string"
      })
      .positional('password', {
        describe: "user password",
        type: "string"
      });
    },
    (argv) => {
      login(argv.email, argv.password);
    }
  )
  .demandCommand(1, "You need at least one command")
  .help()
  .argv;


function startServer(){
  const app = express();
  const port = process.env.PORT || 3000;
  const dbURI = process.env.MONGO_DB_URI;

  app.use(bodyParser.json());
  app.use(express.json());
  app.use(cors({
    origin: '*',
  }))

  mongoose
    .connect(dbURI)
    .then(() => console.log("Connected to DB!"))
    .catch((err) => console.error("Error connecting to DB: ", err));
  
  app.use('/', mainRouter);

  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (userID) => {
      user = userID;
      console.log("======");
      console.log(user);
      console.log("======");
      socket.join(userID);
    });
  });

  const db = mongoose.connection;

  db.once("open", async () => {
    console.log("CRUD operations called!");
  });

  httpServer.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  })
}