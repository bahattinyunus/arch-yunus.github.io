const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building dist...');
execSync('npm run build', { stdio: 'inherit' });

// Ensure 404.html and .nojekyll in dist
const indexHtml = path.join('dist', 'index.html');
const copy404 = path.join('dist', '404.html');
const nojekyll = path.join('dist', '.nojekyll');
fs.copyFileSync(indexHtml, copy404);
fs.writeFileSync(nojekyll, '', 'utf8');

const worktreeDir = path.resolve('../gh-pages-deploy');

if (fs.existsSync(worktreeDir)) {
  console.log('Cleaning up existing worktree directory...');
  try {
    execSync(`git worktree remove --force "${worktreeDir}"`, { stdio: 'inherit' });
  } catch (e) {
    fs.rmSync(worktreeDir, { recursive: true, force: true });
    execSync('git worktree prune', { stdio: 'inherit' });
  }
}

console.log('Adding worktree for gh-pages branch...');
execSync(`git worktree add "${worktreeDir}" gh-pages`, { stdio: 'inherit' });

console.log('Copying dist/ files to worktree...');
// Empty worktree directory except .git
const existingFiles = fs.readdirSync(worktreeDir);
existingFiles.forEach(f => {
  if (f === '.git') return;
  fs.rmSync(path.join(worktreeDir, f), { recursive: true, force: true });
});

// Recursive copy function
function copyFolder(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyFolder(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyFolder('dist', worktreeDir);

console.log('Committing and pushing to gh-pages...');
execSync(`git -C "${worktreeDir}" add -A`, { stdio: 'inherit' });
try {
  execSync(`git -C "${worktreeDir}" commit -m "deploy: update live site with field operations gallery and 44+ photos"`, { stdio: 'inherit' });
} catch (e) {
  console.log('No new changes to commit in gh-pages');
}

execSync(`git -C "${worktreeDir}" push origin gh-pages`, { stdio: 'inherit' });

console.log('Cleaning up worktree...');
execSync(`git worktree remove --force "${worktreeDir}"`, { stdio: 'inherit' });
console.log('Deployment to gh-pages completed successfully!');
