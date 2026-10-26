const { execSync } = require('child_process');

console.log('Committing WebLLM open-source model support to main...');
execSync('git commit -m "feat: integrate open-source WebLLM Qwen2.5 WebGPU model engine with dynamic in-browser download"', { stdio: 'inherit' });

console.log('Pushing to origin main...');
execSync('git push origin main', { stdio: 'inherit' });
console.log('Main branch updated and pushed!');
