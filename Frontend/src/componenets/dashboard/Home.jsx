import { Link } from 'react-router-dom';
import './Home.css';
import { useEffect, useState } from 'react';
import api from '../../utils/axiosInstance.js';

export default function Home({searchQuery}){
  const [repositories,  setRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepos = async () => {
      try{
        const result = await api.get(`/repo/user/${userId}`);
        setRepositories(result.data);
      }
      catch(err){
        console.error("Error fetching repositories: ", err);
        alert("Error fetching repositories");
      }
    }

    fetchRepos();
  }, []);

  useEffect(() => {
    if(searchQuery === ''){
      setSearchResults(repositories);
    }
    else{
      const fileterdRepo = repositories.filter((repo) => 
      repo.title.toLowerCase().includes(searchQuery.toLowerCase()));
      setSearchResults(fileterdRepo);
    }
  },[searchQuery,repositories]);

  return (
    <div className="home-wrapper">
      <h2>Home</h2>
      <div className="repos-wrapper">
        {
          searchResults.map((repo) => (
          <div className="repo-container" key={repo._id}>
            <div className="repo-info">
              <h3>{repo.title}</h3>
              <p>{repo.description}</p>
            </div>
            <Link to={`/repo/${repo._id}`} className="view-repo-home">VIEW REPOSITORY</Link>
          </div>
          ))
        }
      </div>
    </div>
  )
};