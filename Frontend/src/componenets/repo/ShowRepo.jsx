import { useParams } from 'react-router-dom';
import api from '../../utils/axiosInstance.js';
import { useEffect, useState } from 'react';
import './ShowRepo.css';
import Navbar from '../../Navbar.jsx'

export default function ShowRepo(){
  const { repoId } = useParams(); 
  const [ repo, setRepo ] = useState([]);

  useEffect(() => {
    const fetchRepoData = async() => {
      try{
        const result = await api.get(`/repo/${repoId}`);
        setRepo(result.data);
      }
      catch(err){
        console.error("Error fetching repository!",err);
        alert("Error fetching repository.");
      }
    }

    fetchRepoData();
  }, []);

  return (
      <div className="show-page-wrapper">
        <Navbar></Navbar>
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
                  <i class="fa-solid fa-folder"></i>
                  <span>Backend</span>
                </div>
                <div className="show-folder">
                  <i class="fa-solid fa-folder"></i>
                  <span>Frontend</span>
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