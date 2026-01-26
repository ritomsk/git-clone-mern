import { Link } from 'react-router-dom';
import './Home.css';

export default function Home(){
  return (
    <div className="home-wrapper">
      <h2>Home</h2>
      <div className="repos-wrapper">
        <div className="repo-container">
          <div className="repo-info">
            <h3>My-project</h3>
            <p>my first project</p>
          </div>
          <Link to='/repo' className="view-repo-home">VIEW REPOSITORY</Link>
        </div>
        <div className="repo-container">
          <div className="repo-info">
            <h3>Git-mern-clone</h3>
            <p>Working clone of Github with MERN stack and CLI implementation.</p>
          </div>
          <Link to='/repo' className="view-repo-home">VIEW REPOSITORY</Link>
        </div>
        <div className="repo-container">
          <div className="repo-info">
            <h3>ChatGPT Clone</h3>
            <p>Working AI Chatbot with voice feature implementation.</p>
          </div>
          <Link to='/repo' className="view-repo-home">VIEW REPOSITORY</Link>
        </div>
        <div className="repo-container">
          <div className="repo-info">
            <h3>AirBNB Clone</h3>
            <p>Fully functional Home booking web application.</p>
          </div>
          <Link to='/repo' className="view-repo-home">VIEW REPOSITORY</Link>
        </div>
      </div>
    </div>
  )
};