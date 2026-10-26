const fs = require('fs');
let code = fs.readFileSync('client/src/pages/Operations.tsx', 'utf8');

if (!code.includes('FieldOperationsGallery')) {
  code = code.replace(
    'import { MissionLogs } from "@/components/cyber-ui/MissionLogs";',
    'import { MissionLogs } from "@/components/cyber-ui/MissionLogs";\nimport { FieldOperationsGallery } from "@/components/portfolio/FieldOperationsGallery";'
  );
  code = code.replace(
    '<MissionLogs />',
    '<MissionLogs />\n\n            <div className="mt-16">\n                <FieldOperationsGallery lang="tr" />\n            </div>'
  );
  fs.writeFileSync('client/src/pages/Operations.tsx', code, 'utf8');
  console.log('Successfully updated Operations.tsx');
} else {
  console.log('Already updated');
}
