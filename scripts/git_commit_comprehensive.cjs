const { execSync } = require('child_process');

console.log('Committing updates to main...');
execSync('git commit -m "feat: comprehensive update - intelligence field ops tab, forensics and cyber labs in curated projects"', { stdio: 'inherit' });

console.log('Pushing to origin main...');
execSync('git push origin main', { stdio: 'inherit' });
console.log('Main branch updated and pushed!');
