const { execSync } = require('child_process');

console.log('Committing Vanguard AI Agent upgrades to main...');
execSync('git commit -m "feat: upgrade vanguard to full autonomous ai agent with quick chips, badges and field ops intel"', { stdio: 'inherit' });

console.log('Pushing to origin main...');
execSync('git push origin main', { stdio: 'inherit' });
console.log('Main branch updated and pushed!');
