import { useState } from 'react';
import { Folder, FileCode, CornerLeftUp } from 'lucide-react';
import './RepoTableView.css';

export default function RepoTableView({ fileTree, onFileSelect }) {
  const [currentPath, setCurrentPath] = useState([]);

  const getCurrentFolderContents = () => {
    let currentLevel = fileTree;
    
    for (const folderName of currentPath) {
      const folder = currentLevel.find(item => item.name === folderName);
      if (folder && folder.children) {
        currentLevel = folder.children;
      }
    }
    return currentLevel || [];
  };

  const handleFolderClick = (folderName) => {
    setCurrentPath([...currentPath, folderName]);
  };

  const handleGoBack = () => {
    setCurrentPath(currentPath.slice(0, -1));
  };

  const contents = getCurrentFolderContents();

  return (
    <div className="folder-view-wrapper">
      <div className="root-folder">
        {currentPath.length > 0 ? (
           <button onClick={handleGoBack} className="btn-go-back">
             <CornerLeftUp size={16} />
           </button>
        ) : (
          <span>root</span>
        )}
        <span>{currentPath.join(" / ")}</span>
      </div>

      <div className="folders-container">
        {contents.map((item) => (
          <div 
            key={item.name}
            className="file-folder"
            onClick={() => 
              item.type === 'folder' 
                ? handleFolderClick(item.name) 
                : onFileSelect(item.path)
            }
          >
            {item.type === 'folder' ? (
              <Folder size={20} className="" />
            ) : (
              <FileCode size={20} className="" />
            )}
            
            <span className="">
              {item.name}
            </span>
          </div>
        ))}

        {contents.length === 0 && (
          <div className="empty-folder">Empty folder</div>
        )}
      </div>
    </div>
  );
};
