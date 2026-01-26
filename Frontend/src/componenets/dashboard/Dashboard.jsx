import Navbar from '../../Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import Home from './Home.jsx';
import LeftBar from './LeftBar.jsx';
import './Dashboard.css';
import { useState } from 'react';

export default function Dashboard(){
  const [searchQuery, setSearchQuery] = useState("");

  return(
    <div className="dashboard-wrapper">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="dashboard-container">
        <Sidebar />
        <Home searchQuery={searchQuery} />
        <LeftBar />
      </div>
    </div>
  )
};