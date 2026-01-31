import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './NewRepoSetup.css';
import Navbar from '../../Navbar.jsx'
import ToggleSidebar from '../dashboard/ToggleSidebar.jsx';

export default function NewRepoSetup(){
  const { title } = useParams(); 
  const [isSidebar, setIsSidebar] = useState(false);

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
              <span>{title}</span>
              <sup>{repo.visibility === true ? 'Public' : 'Private'}</sup>
            </div>
            <i class="fa-solid fa-laptop-code"></i>
          </div>
        </div>
      </div>
  )
}