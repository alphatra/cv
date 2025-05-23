// @ts-expect-error
import fs from 'fs';
// @ts-expect-error
import path from 'path';

// Define source and destination directories
const sourceDir = path.join(process.cwd(), 'src', 'content');
const destDir = path.join(process.cwd(), 'public', 'content');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy all files from source to destination
try {
  // Check if source directory exists first
  if (fs.existsSync(sourceDir)) {
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
  } else {
    console.log('Source directory not found: ' + sourceDir);
    // Create an empty content directory in public so the app doesn't crash
    fs.mkdirSync(destDir, { recursive: true });
  }
} catch (error) {
  console.error('Error copying content files:', error);
} 