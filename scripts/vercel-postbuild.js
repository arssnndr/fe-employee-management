const fs = require('fs');
const path = require('path');

console.log('🔧 Post-build processing for subpath deployment...');

const distPath = 'dist/fe-employee-management/browser';
const subpathDir = path.join(distPath, 'employee-management');

// Create employee-management subdirectory
if (!fs.existsSync(subpathDir)) {
  fs.mkdirSync(subpathDir, { recursive: true });
}

// Copy all files to subpath directory
function copyFiles(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory() && entry.name !== 'employee-management') {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyFiles(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('📁 Copying files to subpath structure...');
copyFiles(distPath, subpathDir);

// Update index.html to fix asset paths
const indexPath = path.join(subpathDir, 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');

  // Fix script and link src/href to point to correct paths
  content = content.replace(/src="([^"]+)"/g, 'src="/employee-management/$1"');
  content = content.replace(/href="([^"]+\.(?:css|ico))"/g, 'href="/employee-management/$1"');

  fs.writeFileSync(indexPath, content);
  console.log('🔄 Updated asset paths in index.html');
}

console.log('✅ Post-build processing completed!');
console.log('📍 Assets available at both / and /employee-management/ paths');
