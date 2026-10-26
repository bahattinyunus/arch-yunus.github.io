const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '../linkedin');
const dirs = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

const posts = [];

dirs.sort((a, b) => parseInt(a) - parseInt(b)).forEach(dirName => {
  const dirPath = path.join(baseDir, dirName);
  const files = fs.readdirSync(dirPath);
  
  const txtFile = files.find(f => f.endsWith('.txt'));
  const images = files.filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png'));

  let content = '';
  if (txtFile) {
    try {
      content = fs.readFileSync(path.join(dirPath, txtFile), 'utf8');
    } catch (e) {
      // try binary/latin1 if utf8 fails
      content = fs.readFileSync(path.join(dirPath, txtFile), 'latin1');
    }
  }

  posts.push({
    id: dirName,
    txtFile,
    imageCount: images.length,
    images,
    preview: content.slice(0, 300).replace(/\r?\n/g, ' ')
  });
});

console.log(JSON.stringify(posts, null, 2));
