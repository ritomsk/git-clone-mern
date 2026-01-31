import { useParams } from 'react-router-dom';
import api from '../../utils/axiosInstance.js';
import { useEffect, useState } from 'react';
import './ShowRepo.css';
import Navbar from '../../Navbar.jsx'
import RepoTableView from './RepoTableView.jsx';
import ToggleSidebar from '../dashboard/ToggleSidebar.jsx';

export default function ShowRepo(){
  const { repoId } = useParams(); 
  const [ repo, setRepo ] = useState(null);
  const [fileTree,  setFileTree] = useState([]);
  const [isSidebar, setIsSidebar] = useState(false);

  useEffect(() => {
    const fetchRepoData = async() => {
      try{
        const result = await api.get(`/repo/${repoId}`);
        setRepo(result.data.repo);
        setFileTree(result.data.fileTree);
      }
      catch(err){
        console.error("Error fetching repository!",err);
        alert("Error fetching repository.");
      }
    }

    fetchRepoData();
  }, []);

  if (!repo) {
    return <div></div>;
  }

  return (
      <div className="show-page-wrapper" onClick={() => setIsSidebar(false)}>
        <ToggleSidebar setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
        <Navbar setIsSidebar={setIsSidebar}></Navbar>
        <div className="navbar-show">
          <div className="navbar-show-elements">
            <i className="fa-solid fa-code"></i>
            <span>Code</span>
          </div>
          <div className="navbar-show-elements">
            <i class="fa-regular fa-circle-dot"></i>
            <span>Issues</span>
          </div>
        </div>
        <div className="show-repo-wrapper">
          <div className="show-repo-left">
            <div className="show-repo-name-container">
              <i class="fa-regular fa-user"></i>
              <span>{repo.title}</span>
              <sup>{repo.visibility === true ? 'Public' : 'Private'}</sup>
            </div>
            <div className="show-repo-folder-container">
              <div className="show-repo-owner-info">
                <i class="fa-regular fa-user"></i>
                {repo.owner.username}
              </div>
              <div className="show-repo-folder-info">
                <div className="show-folder">
                  <RepoTableView 
                    fileTree={fileTree} 
                    onFileSelect={(path) => console.log("Fetch content for:", path)} 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="show-repo-right">
            <h4>About</h4>
            <p>
              {repo.description}
            </p>
          </div>
        </div>
      </div>
  )
}