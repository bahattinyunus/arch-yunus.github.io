const fs = require('fs');

let code = fs.readFileSync('client/src/components/portfolio/CuratedProjects.tsx', 'utf8');

const newProjects = `    {
      id: "multimedia-forensics",
      title: "DeepForensics // Multimedya Veri Güvenliği",
      tag: "ai",
      category: lang === "tr" ? "Yapay Zekâ & Güvenlik" : "AI & Forensics",
      desc: lang === "tr"
        ? "BTK Akademi 42 saatlik Trabzon atölyesinde geliştirilen; EXIF, ELA, PRNU analizi, GAN tabanlı Deepfake tespiti ve C2PA dijital içerik doğrulama paketi."
        : "AI-driven multimedia forensics suite featuring EXIF, ELA, PRNU noise analysis, GAN deepfake detection and C2PA verifiable content standards.",
      tech: ["PyTorch", "OpenCV", "PRNU", "Deepfake Detection", "C2PA"],
      stars: 46,
      repo: "https://github.com/bahattinyunus/BTK-Akademi-Trabzon-Multimedya-Veri-Guvenliginde-Yapay-Zeka-Kullanimi",
      icon: Terminal
    },
    {
      id: "siber-vatan-pentest",
      title: "VatanRedOps // Siber Vatan Güvenlik Kütüphanesi",
      tag: "embedded",
      category: lang === "tr" ? "Siber Savunma & Pentest" : "Cyber Security",
      desc: lang === "tr"
        ? "Siber Vatan 2026 Beyaz Şapkalı Hacker kampında geliştirilen; ağ protokol analizi, web zafiyet tarama ve tersine mühendislik betikleri."
        : "Automated penetration testing, network dissection, and reverse engineering scripts created during the Siber Vatan White Hat Hacker camp.",
      tech: ["Python", "Wireshark", "BurpSuite", "Bash", "Reversing"],
      stars: 58,
      repo: "https://github.com/bahattinyunus/siber-vatan-calismalari",
      icon: Code2
    },
`;

if (!code.includes('multimedia-forensics')) {
  code = code.replace('    {\n      id: "math2code",', newProjects + '    {\n      id: "math2code",');
  fs.writeFileSync('client/src/components/portfolio/CuratedProjects.tsx', code, 'utf8');
  console.log('Successfully added DeepForensics and VatanRedOps to CuratedProjects.tsx!');
} else {
  console.log('Projects already exist in CuratedProjects.tsx');
}
