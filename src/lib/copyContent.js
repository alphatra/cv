const fs = require('fs');
const path = require('path');

// Define source and destination directories
const sourceDir = path.join(process.cwd(), 'src', 'content');
const destDir = path.join(process.cwd(), 'public', 'content');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy all files from source to destination
try {
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    
    // Only copy if it's a file (not a directory)
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${file}`);
    }
  });
  
  console.log('Content files copied successfully to public/content!');
} catch (error) {
  console.error('Error copying content files:', error);
} 