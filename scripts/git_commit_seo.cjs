const { execSync } = require('child_process');

console.log('Committing to main...');
execSync('git commit -m "seo: enhance google indexation, json-ld knowledge graph and xml sitemap"', { stdio: 'inherit' });

console.log('Pushing to origin main...');
execSync('git push origin main', { stdio: 'inherit' });
console.log('Pushed to main successfully!');
