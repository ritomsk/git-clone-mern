import Navbar from '../../Navbar.jsx';
import './CreateRepo.css';

export default function CreateRepo(){
  return (
    <div className="repo-wrapper">
      <Navbar></Navbar>
      <div className="repo-create-container">
        <div className="repo-header">
          <h3>Create a new repository</h3>
          <p>Repositories contain a project's files and version history. Have a project elsewhere? Import a repository.</p>
          <p>Required fields are marked with an asterisk (*).</p>
        </div>
        <form action="">
          <div className="repo-general">
            <h4>General</h4>
            <div>
              <label htmlFor="owner">Owner*</label>
              <p>Username</p>
              <label htmlFor="repository">Repository name*</label>
              <input
              type="text"
              required
              />
            </div>
            <p>Great repository names are short and memorable. </p>
            <div>
              <label htmlFor="description">Description</label>
              <input
              type="text"
              />
            </div>
          </div>
          <div className="repo-configure">
            <h4>Configuration</h4>
            <div>
              <label htmlFor="visibility"></label>
              <input type="text" name="" id="" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}