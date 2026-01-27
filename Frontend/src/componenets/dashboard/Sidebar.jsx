import { useEffect,useState } from 'react';
import api from '../../utils/axiosInstance.js';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

export default function Sidebar(){
  const [suggestedRepos, setSuggestedRepos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchSuggestedRepos = async () => {
      try{
        const result = await api.get(`/repo/all`);
        setSuggestedRepos(result.data);
      }
      catch(err){
        console.error("Error fetching repositories: ", err);
        alert("Error fetching repositories");
      }
    }

    fetchSuggestedRepos();
  }, []);

  useEffect(() => {
    if(searchQuery === ''){
      setSearchResults(suggestedRepos);
    }
    else{
      const fileterdRepo = suggestedRepos.filter((repo) => 
      repo.title.toLowerCase().includes(searchQuery.toLowerCase()));
      setSearchResults(fileterdRepo);
    }
  },[searchQuery,suggestedRepos]);

  return(
    <div className="sidebar-container">
      <div className="sidebar-info">
        <p>Suggested repositories</p>
        <button className="btn-repo-create" onClick={(e) => navigate('/repo/create')}>
          <i className="fa-regular fa-file"></i>
          New
        </button>
      </div>
      <input type="text"
      name="search"
      placeholder="Find a repository"
      className="search-input-sidebar"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="sidebar-repo">
        {
          searchResults.map((repo) => (
            <div className="repo-view" key={repo._id}>
              <i className="fa-regular fa-circle-user"></i>
              {repo.owner.username}/{repo.title}
            </div>
          ))
        }
      </div>
    </div>
  )
};