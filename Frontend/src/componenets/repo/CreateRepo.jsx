import { useState } from 'react';
import Navbar from '../../Navbar.jsx';
import './CreateRepo.css';
import api from '../../utils/axiosInstance.js';
import { useNavigate } from 'react-router-dom';
import ToggleSidebar from '../dashboard/ToggleSidebar.jsx';

export default function CreateRepo(){
  const [title, setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [visibility, setVisibility] = useState("true");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const isPublic = visibility === 'true' ? true : false;
    try{
      setIsLoading(true);
      const result = await api.post('/repo/create',
        {
          title: title,
          description: desc,
          owner: userId,
          visibility: isPublic
        }
      );

      setIsLoading(false);
      navigate(`/${userId}/${title}`);
    }
    catch(err){
      console.error("Error creating repository: ", err);
      alert("Failed to create a repository");
      setIsLoading(false);
    }
  }

  return (
    <div className="repo-wrapper" onClick={() => setIsSidebar(false)}>
      <ToggleSidebar setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
      <Navbar setIsSidebar={setIsSidebar}></Navbar>
      <div className="repo-create-container">
        <div className="repo-header">
          <h3>Create a new repository</h3>
          <p>Repositories contain a project's files and version history. Have a project elsewhere? Import a repository.</p>
          <p><i>Required fields are marked with an asterisk (*).</i></p>
        </div>
        <form>
          <div className="repo-general">
            <h4>General</h4>
            <div className="repo-owner-repo">
              <div className="repo-inp-box">
                <label htmlFor="owner">Owner*</label>
                <div>Username</div>
              </div>
              <div className="repo-inp-box">
                <label htmlFor="repository">Repository name*</label>
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control repo-create-inp"
                required
                />
              </div>
            </div>
            <p>Great repository names are short and memorable. </p>
            <div className="repo-inp-box">
              <label htmlFor="description">Description</label>
              <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="form-control repo-create-desc"
              />
            </div>
          </div>
          <div className="repo-configure">
            <h4>Configuration</h4>
            <div className="form-group">
              <label htmlFor="visibility">Repository Visibility*</label>
              <select 
                id="visibility"
                className="form-select"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option value="true">Public</option>
                <option value="false">Private</option>
              </select>
              
              <p className="note">
                {visibility === "true" 
                  ? "Anyone on the internet can see this repository." 
                  : "You choose who can see and commit to this repository."}
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="btn-repo-create btn-submit-repo"
            onClick={handleSubmit}
            disabled={isLoading}
            >
              <b>
                {
                  isLoading ? 'Loading...' : 'Create Repository'
                }
              </b>
          </button>
        </form>
      </div>
    </div>
  )
}