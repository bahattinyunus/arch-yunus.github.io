const fs = require('fs');
let code = fs.readFileSync('client/src/pages/Intelligence.tsx', 'utf8');

if (!code.includes('FieldOperationsGallery')) {
  code = code.replace(
    'import { CertificationVault } from "@/components/cyber-ui/CertificationVault";',
    'import { CertificationVault } from "@/components/cyber-ui/CertificationVault";\nimport { FieldOperationsGallery } from "@/components/portfolio/FieldOperationsGallery";'
  );
  code = code.replace(
    'activeTab, setActiveTab] = useState<"all" | "certs" | "education" | "articles">("all");',
    'activeTab, setActiveTab] = useState<"all" | "certs" | "education" | "field" | "articles">("all");'
  );
  code = code.replace(
    '{ id: "education", label: "EĞİTİM & PİLOTAJ" },',
    '{ id: "education", label: "EĞİTİM & PİLOTAJ" },\n            { id: "field", label: "SAHA GÖREVLERİ (44+ FOTO)" },'
  );
  
  const fieldSection = `
      {/* Field Operations & Real Missions Gallery */}
      {(activeTab === "all" || activeTab === "field") && (
        <section className="space-y-6">
          <FieldOperationsGallery lang="tr" />
        </section>
      )}
`;
  code = code.replace('{(activeTab === "all" || activeTab === "articles") && (', fieldSection + '\n      {(activeTab === "all" || activeTab === "articles") && (');
  fs.writeFileSync('client/src/pages/Intelligence.tsx', code, 'utf8');
  console.log('Successfully updated Intelligence.tsx');
} else {
  console.log('Already has FieldOperationsGallery');
}
