# Git Clone (MERN + AWS S3)

A full-stack, distributed version control system and repository hosting platform inspired by GitHub. This project provides both a Web User Interface (Frontend) and a local CLI Engine (Backend) to manage code versions.

This project allows you to create repositories on the web, initialize local repositories via the custom CLI, track file changes, commit them, and push the actual file data to AWS S3 while maintaining repository metadata in MongoDB.

## 🏗 System Architecture

The project is divided into three main components:
1. **Frontend (React + Vite):** A user-friendly dashboard to manage repositories, view commits, and handle user authentication.
2. **Backend Server (Node.js + Express):** A RESTful API that handles user authentication, repository metadata, issue tracking, and interacts with MongoDB. It also uses Socket.io for potential real-time features.
3. **CLI Engine (Yargs):** A custom, local version control engine (similar to Git) that tracks file changes in a `.gitClone` folder and handles pushing/pulling raw commit data to AWS S3.

```mermaid
graph TD
    subgraph Frontend [Frontend (React + Vite)]
        UI[Web Interface]
        Dashboard[Dashboard & Repo View]
        AuthUI[Login/Signup]
    end

    subgraph Backend [Backend (Node.js + Express)]
        API[RESTful API]
        CLI[Git-like CLI Engine]
        Sockets[Socket.io]
    end

    subgraph Storage & Database
        Mongo[(MongoDB)]
        S3[(AWS S3 Bucket)]
        LocalFS[Local File System .gitClone]
    end

    UI -->|HTTP Requests| API
    AuthUI -->|Authentication| API
    Dashboard -->|Fetch Data| API
    API -->|Read/Write Metadata| Mongo
    
    CLI -->|Read/Write Files| LocalFS
    CLI -->|Upload Commits| S3
    CLI -->|Sync Metadata| API
    CLI -->|Download Commits| S3
```

---

## 🚀 Installation & Local Setup

Follow these crystal-clear instructions to install and run the engine locally.

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** instance (Local or MongoDB Atlas)
- **AWS Account** with an S3 Bucket configured and IAM credentials (Access Key & Secret Key)

### 1. Clone the Repository
```bash
git clone <repository_url>
cd git-clone-mern
```

### 2. Backend Setup
Navigate to the backend directory and install the dependencies.
```bash
cd Backend
npm install
```

Create a `.env` file in the root of the `Backend` directory with the following variables:
```env
PORT=3000
MONGO_DB_URI=your_mongodb_connection_string

# AWS S3 Configuration
S3_BUCKET=your_aws_s3_bucket_name
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region

# Authentication Secret
JWT_SECRET=your_jwt_secret
```

**Start the Backend API Server:**
```bash
node index.js start
```
*The server will run on `http://localhost:3000`.*

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install the dependencies.
```bash
cd Frontend
npm install
```

**Start the Frontend Development Server:**
```bash
npm run dev
```
*The application will typically be accessible at `http://localhost:5173`.*

---

## 💻 Using the CLI Engine locally

The Backend also acts as your local version control engine. Instead of `git`, you will use `node index.js` (pointing to the backend's index.js) to manage your local repositories. 

*Tip: For easier use, you can set up a bash alias for the engine: `alias mygit="node /absolute/path/to/Backend/index.js"`*

Here are the commands to use the engine:

### 1. Login
Authenticate your CLI with your backend account to receive a token.
```bash
node index.js login <email> <password>
```

### 2. Initialize a Repository
Navigate to any project directory on your computer where you want to track files, and initialize the custom repository. This creates a `.gitClone` tracking directory.
```bash
node index.js init
```

### 3. Add a Remote
Connect your local repository to a repository you created on the Frontend dashboard.
```bash
node index.js remote add origin <repoName>
```

### 4. Stage Files
Add a file to the staging area.
```bash
node index.js add <file_name>
```

### 5. Commit Changes
Commit the staged files with a descriptive message.
```bash
node index.js commit "Your commit message"
```

### 6. Push Commits
Push your local commits. The CLI will upload the raw files to your **AWS S3 bucket** and notify the backend API to update the MongoDB database.
```bash
node index.js push
```

### 7. Pull Commits
Fetch commits and file changes from the AWS S3 bucket.
```bash
node index.js pull
```

### 8. Revert
Revert your working directory to a specific commit ID.
```bash
node index.js revert <commitId>
```

---

## 🛠 Tech Stack
- **Frontend:** React, React Router, Vite, TailwindCSS (or Vanilla CSS), Axios, Lucide React.
- **Backend:** Node.js, Express.js, Mongoose, Socket.io, Yargs (for CLI).
- **Database:** MongoDB (Metadata), AWS S3 (Raw file storage).
- **Authentication:** JWT (JSON Web Tokens), bcrypt.
