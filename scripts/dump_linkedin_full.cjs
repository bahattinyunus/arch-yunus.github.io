const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../linkedin');
const dirs = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

dirs.sort((a, b) => parseInt(a) - parseInt(b)).forEach(dirName => {
  const dirPath = path.join(baseDir, dirName);
  const files = fs.readdirSync(dirPath);
  const txtFile = files.find(f => f.endsWith('.txt'));

  let content = '';
  if (txtFile) {
    try {
      content = fs.readFileSync(path.join(dirPath, txtFile), 'utf8');
    } catch (e) {
      content = fs.readFileSync(path.join(dirPath, txtFile), 'latin1');
    }
  }

  console.log(`=== GÖNDERİ ${dirName} (${txtFile || 'YOK'}) ===`);
  console.log(content.trim());
  console.log('FOTOĞRAFLAR:', files.filter(f => !f.endsWith('.txt')).join(', '));
  console.log('\n-----------------------------------------\n');
});
