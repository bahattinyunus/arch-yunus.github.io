const { execSync } = require('child_process');
const fs = require('fs');

const msg = 'feat: integrate real field operations gallery from linkedin missions with 44+ photos';
const res = execSync(`git commit -m "${msg}"`, { encoding: 'utf8' });
console.log(res);

console.log('Pushing to origin main...');
const pushRes = execSync('git push origin main', { encoding: 'utf8' });
console.log(pushRes);
