const fs = require('fs');
let html = fs.readFileSync('client/index.html', 'utf8');
if (!html.includes('bahattinyunuscetin1@gmail.com')) {
  html = html.replace('"jobTitle": "Developer & AI Researcher",', '"jobTitle": "Developer & AI Researcher",\n          "email": "mailto:bahattinyunuscetin1@gmail.com",');
  fs.writeFileSync('client/index.html', html, 'utf8');
  console.log('Added email to client/index.html schema!');
} else {
  console.log('Email already present in client/index.html');
}
