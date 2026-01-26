import { Link } from 'react-router-dom';
import './LeftBar.css';

export default function LeftBar(){
  return(
    <div className="leftbar-wrapper">
      <div className="leftbar-update">
        <div className="update-info">
          <h3>GitHub Trending</h3>
          <p>Check out the latest update 4.56.123v for the latest features!</p>
        </div>
        <Link to='/' className="view-trending-leftbar">VIEW TRENDING</Link>
      </div>
      <div className="leftbar-update">
        <div className="update-info">
          <h3>GitHub Trending</h3>
          <p>Check out the latest update 4.56.123v for the latest features!</p>
        </div>
        <Link to='/' className="view-trending-leftbar">VIEW TRENDING</Link>
      </div>
    </div>
  )
};