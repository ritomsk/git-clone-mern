import Navbar from '../../Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import Home from './Home.jsx';
import LeftBar from './LeftBar.jsx';
import './Dashboard.css';

export default function Dashboard(){
  return(
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <Home />
        <LeftBar />
      </div>
    </div>
  )
};