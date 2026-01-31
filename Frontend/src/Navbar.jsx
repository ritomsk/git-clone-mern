import './Navbar.css';
import { useNavigate } from 'react-router-dom';

export default function Navbar({searchQuery, setSearchQuery, setIsSidebar}){
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div
          className="toggle-sidebar"
          onClick={(e) => {
            e.stopPropagation();
            setIsSidebar(true)
            }
          }
          >
         <i className="fa-solid fa-bars"></i>
        </div>
        <div className="logo-container">
          <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDfC1lHYN3oYb9YGTDCqnPeOaaw2Pqlr96CA&s" 
              alt="github logo" 
              className="github-logo"
            />
        </div>
        <p onClick={() => navigate('/')}>Dashboard</p>
      </div>
      <div className="navbar-right">
        <div className="search-bar-container">
          <i className="fa-solid fa-magnifying-glass nav-icon"></i>
          <input type="text"
          name="search"
          placeholder="Search repository"
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
          />
        </div>
        <div className="icon-container" data-tooltip="Create repository" onClick={() => navigate('/repo/create')}>
          <i className="fa-solid fa-plus nav-icon"></i>
        </div>
        <div className="icon-container" data-tooltip="Repositories">
          <i className="fa-solid fa-file nav-icon"></i>
        </div>
        <div className="icon-container" data-tooltip="Issues">
          <i className="fa-regular fa-circle-dot nav-icon"></i>
        </div>
        <div className="icon-container" data-tooltip="Profile">
          <i className="fa-regular fa-circle-user nav-icon"></i>
        </div>
      </div>
    </div>
  )
};