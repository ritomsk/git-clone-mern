import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';
import './ToggleSidebar.css';

export default function ToggleSidebar({setIsSidebar, isSidebar}){
  const navigate = useNavigate();
  const { setCurrUser } = useAuth();

  const handleLogOut = (e) => {
    e.stopPropagation();
    localStorage.removeItem("token")
    localStorage.removeItem("userId");
    setCurrUser(null);
  }
  return (
    <div>
      <div className={`toggle-sidebar-wrapper ${isSidebar ? 'open' : ''}`} onClick={(e) => e.stopPropagation()} >
        <div className="top-bar">
          <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDfC1lHYN3oYb9YGTDCqnPeOaaw2Pqlr96CA&s" 
                alt="github logo" 
                className="github-logo"
          />
          <div className="cross-wrapper" onClick={() => setIsSidebar(false)}>
           <i className="fa-solid fa-xmark"></i>  
          </div>
        </div>
        <div className="content-bar">
          <div className="content-bar-item" onClick={() => navigate('/')}>
            <i className="fa-regular fa-house"></i>
            <p>Home</p>
          </div>
          <div className="content-bar-item" onClick={() => navigate('/issues')}>
            <i className="fa-regular fa-circle-dot"></i>
            <p>Issues</p>
          </div>
          <div className="content-bar-item" onClick={() => navigate('/repo/all')}>
            <i className="fa-regular fa-file"></i>
            <p>Repositories</p>
          </div>
          <div className="content-bar-item" onClick={() => navigate('/profile')}>
            <i class="fa-regular fa-circle-user"></i>
            <p>Profile</p>
          </div>
          <div className="content-bar-item" onClick={() => navigate('/settings')}>
            <i className="fa-solid fa-gear"></i>
            <p>Settings</p>
          </div>
          <div className="content-bar-item" onClick={handleLogOut}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <p>Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
}
