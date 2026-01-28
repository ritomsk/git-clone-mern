function buildFileTree(s3Keys) {
  const root = [];

  s3Keys.forEach(key => {
    const parts = key.split('/');
    let currentLevel = root;

    parts.forEach((part, index) => {
      let existingPath = currentLevel.find(item => item.name === part);

      if (!existingPath) {
        const isFile = index === parts.length - 1;
        
        const newItem = {
          name: part,
          type: isFile ? 'file' : 'folder',
          path: parts.slice(0, index + 1).join('/'),
          children: []
        };

        currentLevel.push(newItem);
        
        if (!isFile) {
          currentLevel = newItem.children;
        }
      } else {
        currentLevel = existingPath.children;
      }
    });
  });

  return root;
}

export { buildFileTree };