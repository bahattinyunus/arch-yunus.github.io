const { execSync } = require('child_process');

console.log('Committing email fix to main...');
execSync('git commit -m "fix: update official email to bahattinyunuscetin1@gmail.com across all modules"', { stdio: 'inherit' });

console.log('Pushing to origin main...');
execSync('git push origin main', { stdio: 'inherit' });
console.log('Main branch updated successfully!');
