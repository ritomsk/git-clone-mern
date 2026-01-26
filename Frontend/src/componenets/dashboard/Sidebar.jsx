import './Sidebar.css';

export default function Sidebar(){
  return(
    <div className="sidebar-container">
      <div className="sidebar-info">
        <p>Suggested repositories</p>
        <button className="btn-repo-create">
          <i className="fa-regular fa-file"></i>
          New
        </button>
      </div>
      <input type="text"
      name="search"
      placeholder="Find a repository"
      className="search-input-sidebar"
      />
      <div className="sidebar-repo">
        <div className="repo-view">
          <i className="fa-regular fa-circle-user"></i>
          alan/my-project
        </div>
        <div className="repo-view">
          <i className="fa-regular fa-circle-user"></i>
          joe/git-mern-clone
        </div>
        <div className="repo-view">
          <i className="fa-regular fa-circle-user"></i>
          dorris/react.js
        </div>
      </div>
    </div>
  )
};