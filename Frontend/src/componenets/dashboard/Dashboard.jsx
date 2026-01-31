import Navbar from '../../Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import Home from './Home.jsx';
import LeftBar from './LeftBar.jsx';
import ToggleSidebar from './ToggleSidebar.jsx';
import './Dashboard.css';
import { useState } from 'react';

export default function Dashboard(){
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebar, setIsSidebar] = useState(false);

  return(
    <div className="dashboard-wrapper" onClick={() => setIsSidebar(false)}>  
      <ToggleSidebar setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setIsSidebar={setIsSidebar} />
      <div className="dashboard-container">
        <Sidebar />
        <Home searchQuery={searchQuery} />
        <LeftBar />
      </div>
    </div>
  )
};