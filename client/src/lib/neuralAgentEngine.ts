/**
 * Vanguard Conversational Neural Engine
 * Samimi, doğal Türkçe konuşan ve Yunus Çetin'in tüm projelerini, 
 * eğitimini ve saha tecrübelerini akıcı bir şekilde anlatan zekâ motoru.
 */

export interface NeuralAnalysis {
  intent: string;
  confidence: number;
  tokens: string[];
  metrics: {
    inferenceTimeMs: number;
    tokensProcessed: number;
  };
}

export interface NeuralInferenceResult {
  text: string;
  badges: string[];
  action?: { label: string; path?: string; external?: string };
  analysis: NeuralAnalysis;
}

// Doğal konuşma kalıpları ve semantik niyet eşleştirmeleri
export function inferNeuralResponse(input: string): NeuralInferenceResult {
  const startTime = performance.now();
  const q = input.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(Boolean);

  let text = "";
  let badges: string[] = [];
  let action: NeuralInferenceResult["action"] = undefined;
  let intent = "CONVERSATIONAL";

  // 1. Selamlaşma / Hal hatır sorma
  if (
    q.includes("naber") ||
    q.includes("ne haber") ||
    q.includes("nasılsın") ||
    q.includes("nasilsin") ||
    q.includes("selam") ||
    q.includes("merhaba") ||
    q.includes("sa") ||
    q.includes("s.a") ||
    q.includes("günaydın") ||
    q.includes("iyi günler") ||
    q.includes("iyi akşamlar") ||
    q.includes("hey") ||
    q.includes("kanka") ||
    q.includes("hocam")
  ) {
    intent = "GREETING";
    const greetings = [
      "İyidir kanka, sistemler tam gaz çalışıyor! Yunus'un projeleri, ASELSAN saha gezisi, ODTÜ eğitimleri ya da açık kaynak işleri hakkında konuşabiliriz. Ne merak ediyorsun?",
      "Selamlar! İyilik sağlık, yerel sinir ağı devrede. Yunus Çetin'in yapay zekâ, İHA pilotajı, siber güvenlik veya 266+ sertifikası hakkında ne sormak istersin?",
      "Aleykümselam kanka, bomba gibiyiz! Sitede geziniyorsan projeler, saha operasyonları veya akademik doktrinler hakkında istediğini sorabilirsin."
    ];
    text = greetings[Math.floor(Math.random() * greetings.length)];
    badges = ["Çevrim İçi", "Yunus'un AI Ajanı", "Hazır"];
    action = { label: "Projeleri İncele", path: "/operations" };
  }

  // 2. Sen kimsin / Ne işe yararsın
  else if (
    q.includes("sen kimsin") ||
    q.includes("necisin") ||
    q.includes("ne yaparsın") ||
    q.includes("ne ayaksın") ||
    q.includes("ne işe yararsın") ||
    q.includes("rolün ne")
  ) {
    intent = "AGENT_IDENTITY";
    text = "Ben Bahattin Yunus Çetin'in kişisel yapay zekâ asistanıyım. Tarayıcında doğrudan çalışıyorum. Yunus'un 5 girişimi (Tulpar, Budak, Arkıl, MERL, Anka), 13 saha operasyonu (ASELSAN, Fransa Maarif Gençlik Değişimi, TUA vb.) ve akademik geçmişiyle ilgili her şeyi yanıtlayabilirim.";
    badges = ["Vanguard AI", "Yerel Çıkarım", "Yunus Çetin Asistanı"];
    action = { label: "Tüm Saha Operasyonları", path: "/operations" };
  }

  // 3. Yunus kimdir / Biyografi
  else if (
    q.includes("yunus kim") ||
    q.includes("bahattin kim") ||
    q.includes("kimdir") ||
    q.includes("biyografi") ||
    q.includes("hakkında") ||
    q.includes("who is")
  ) {
    intent = "BIO_IDENTITY";
    text = "Bahattin Yunus Çetin; ODTÜ Bilgisayar ve Öğretim Teknolojileri Eğitimi (BÖTE / CEIT) ve Hacettepe Üniversitesi öğrencisi; T.C. Gençlik ve Spor Bakanlığı Gönüllü Gençlik Lideri ve KTÜ EHK Yönetim Kurulu Üyesidir. Yapay zekâ, siber güvenlik (Siber Vatan Beyaz Şapkalı Hacker) ve gömülü sistemler üzerine çalışan lisanslı bir SHGM İHA-1 pilotudur. 266'dan fazla onaylı sertifika ve lisansa sahiptir.";
    badges = ["ODTÜ BÖTE", "Hacettepe", "GSB Gençlik Lideri", "İHA-1 Pilotu", "266+ Sertifika"];
    action = { label: "Resmi CV'yi İndir (PDF)", external: "/cv3.pdf" };
  }

  // 3.1 CV / Özgeçmiş İndirme
  else if (
    q.includes("cv") ||
    q.includes("özgeçmiş") ||
    q.includes("ozgecmis") ||
    q.includes("resume") ||
    (q.includes("indir") && (q.includes("belge") || q.includes("dosya") || q.includes("pdf")))
  ) {
    intent = "CV_DOWNLOAD";
    text = "Yunus Çetin'in güncel, resmi ve doğrulanmış özgeçmişini (PDF) doğrudan buradan indirebilir ve tüm akademik/teknik geçmişini inceleyebilirsin.";
    badges = ["Resmi CV", "Doğrulanmış Özgeçmiş", "PDF"];
    action = { label: "Resmi CV'yi İndir (PDF)", external: "/cv3.pdf" };
  }

  // 4. ASELSAN ve Saha Operasyonları
  else if (
    q.includes("aselsan") ||
    q.includes("gölbaşı") ||
    q.includes("golbasi") ||
    q.includes("saha") ||
    q.includes("teknik gezi")
  ) {
    intent = "ASELSAN_FIELD";
    text = "Yunus, Hacettepe Endüstri ve Sistem Topluluğu organizasyonuyla savunma sanayiimizin amiral gemisi ASELSAN Gölbaşı Teknoloji Üssü'ndeydi. Karmaşık Ar-Ge hatlarını, kritik sistem entegrasyonlarını ve operasyonel mükemmellik süreçlerini sahada bizzat inceledi. Sitede 6 adet orijinal saha fotoğrafı da bulunuyor!";
    badges = ["ASELSAN Gölbaşı", "Milli Savunma", "6 Saha Fotoğrafı"];
    action = { label: "Saha Galerisinde Fotoğraflara Bak", path: "/operations" };
  }

  // 5. Fransa ve Uluslararası Diplomasi
  else if (
    q.includes("fransa") ||
    q.includes("france") ||
    q.includes("strasbourg") ||
    q.includes("avrupa") ||
    q.includes("aihm") ||
    q.includes("parlamento") ||
    q.includes("maarif") ||
    q.includes("diplomasi")
  ) {
    intent = "FRANCE_DIPLOMACY";
    text = "Türkiye–Fransa Gençlik Değişimi Programı'na 66.500'ü aşkın başvuru arasından seçilen 20 gençten biri olarak katıldı. Avrupa Parlamentosu, AİHM, T.C. Strasbourg Başkonsolosluğu ve Strasbourg Üniversitesi'ni ziyaret etti; ayrıca İsviçre (Basel) ve Almanya (Kehl) saha incelemelerini tamamladı.";
    badges = ["66.500+ Başvuru / 20 Genç", "Avrupa Parlamentosu", "AİHM"];
    action = { label: "Diplomasi & Saha Kayıtları", path: "/operations" };
  }

  // 6. TUA, Uzay ve TÜBİTAK
  else if (
    q.includes("tua") ||
    q.includes("uzay") ||
    q.includes("astro") ||
    q.includes("hackathon") ||
    q.includes("tübitak") ||
    q.includes("tubitak") ||
    q.includes("feza") ||
    q.includes("satürn")
  ) {
    intent = "SPACE_AEROSPACE";
    text = "Türkiye Uzay Ajansı (TUA) Trabzon Astro Hackathon'unda 48 saat kesintisiz maratonda 15 açık kaynaklı uzay projesi geliştirdi. TÜBİTAK iş birliğiyle Bursa Karacaali'deki uzay kampında teleskopla Satürn gözlemleri ve spektrogram analizi yaptı; 'FezaArsivi' adında açık kaynak bir uzay reposu paylaştı.";
    badges = ["48 Saat Hackathon", "15 Açık Kaynak Proje", "FezaArsivi"];
    action = { label: "FezaArsivi Reposu", external: "https://github.com/bahattinyunus/FezaArsivi" };
  }

  // 7. Siber Güvenlik, Siber Vatan ve Hack
  else if (
    q.includes("siber") ||
    q.includes("vatan") ||
    q.includes("güvenlik") ||
    q.includes("guvenlik") ||
    q.includes("hacker") ||
    q.includes("beyaz şapka") ||
    q.includes("deepfake") ||
    q.includes("adli")
  ) {
    intent = "CYBER_SECURITY";
    text = "Siber Vatan 2026 Beyaz Şapkalı Hacker kampını başarıyla bitirdi. Ağ sızma testleri ve web zafiyet analizi üzerine çalışıyor. Ayrıca BTK Akademi Trabzon'da 42 saatlik multimedya güvenliği atölyesinde Deepfake ve sahtecilik tespiti yapan açık kaynak bir yapay zekâ kütüphanesi (DeepForensics) geliştirdi.";
    badges = ["Siber Vatan 2026", "Beyaz Şapkalı Hacker", "BTK DeepForensics"];
    action = { label: "Siber Güvenlik Arşivi", path: "/intelligence" };
  }

  // 8. Tulpar Aero ve İHA Uçuşları
  else if (
    q.includes("tulpar") ||
    q.includes("iha") ||
    q.includes("siha") ||
    q.includes("uav") ||
    q.includes("drone") ||
    q.includes("uçuş") ||
    q.includes("pilot") ||
    q.includes("shgm")
  ) {
    intent = "TULPAR_AVIONICS";
    text = "Tulpar Aero-Dynamics, Unreal Engine 5 üzerinde 6 serbestlik dereceli (6-DoF) gerçek zamanlı uçuş aerodinamiği ve İHA otonom seyrüsefer algoritmaları geliştiren bir proje. Yunus aynı zamanda SHGM onaylı ticari İHA-1 pilot lisansına sahip!";
    badges = ["SHGM İHA-1 Pilotu", "6-DoF UE5", "Otonom Uçuş"];
    action = { label: "Tulpar Uçuş Güvertesi", path: "/arsenal" };
  }

  // 9. Budak ve Model Budama (Edge-AI)
  else if (
    q.includes("budak") ||
    q.includes("edge") ||
    q.includes("prun") ||
    q.includes("budama") ||
    q.includes("nicemleme") ||
    q.includes("int8")
  ) {
    intent = "BUDAK_EDGE_AI";
    text = "Budak, yapay zekâ modellerini %80'e kadar küçülten (Structured Pruning + INT8 Quantization) bir Edge-AI optimizasyon mimarisidir. Modelleri buluta bağımlı kalmadan cihaz üzerinde (Raspberry Pi, telefon, gömülü kart) sıfır veri sızıntısıyla çalıştırır.";
    badges = ["%80 Model Budama", "Cihaz Üstü AI", "INT8 Nicemleme"];
    action = { label: "Budak Lab Simülasyonu", path: "/arsenal" };
  }

  // 10. Eğitim, Üniversite ve 266+ Sertifika
  else if (
    q.includes("eğitim") ||
    q.includes("egitim") ||
    q.includes("üniversite") ||
    q.includes("universite") ||
    q.includes("okul") ||
    q.includes("odtü") ||
    q.includes("odtu") ||
    q.includes("hacettepe") ||
    q.includes("ktü") ||
    q.includes("sertifika") ||
    q.includes("lisans")
  ) {
    intent = "EDUCATION_CERTS";
    text = "Akademik geçmiş:\n• ODTÜ — Bilgisayar ve Öğretim Teknolojileri Eğitimi (BÖTE | 2026–2032)\n• Hacettepe Üniversitesi (2026–2030)\n• KTÜ — Yazılım Mühendisliği (2024–2026)\n• 266'dan fazla resmi sertifika ve lisans (BTK Akademi, Turkcell, T3 Akademi, Bilgeİş ODTÜ, SHGM İHA-1).";
    badges = ["ODTÜ BÖTE", "Hacettepe", "266+ Sertifika"];
    action = { label: "266+ Sertifika Kasası", path: "/intelligence" };
  }

  // 11. İletişim / E-posta
  else if (
    q.includes("iletişim") ||
    q.includes("iletisim") ||
    q.includes("mail") ||
    q.includes("eposta") ||
    q.includes("e-posta") ||
    q.includes("ulaş") ||
    q.includes("ulas")
  ) {
    intent = "CONTACT_COMMS";
    text = "Yunus'a doğrudan şu kanallardan ulaşabilirsin:\n• E-posta: bahattinyunuscetin1@gmail.com\n• LinkedIn: linkedin.com/in/bahattinyunus\n• GitHub: github.com/bahattinyunus\nİstersen sitedeki şifreli Comms terminalinden de mesaj bırakabilirsin!";
    badges = ["bahattinyunuscetin1@gmail.com", "LinkedIn", "GitHub"];
    action = { label: "Comms Terminalini Aç", path: "/comms" };
  }

  // 12. GitHub & Açık Kaynak Projeler
  else if (
    q.includes("github") ||
    q.includes("repo") ||
    q.includes("kod") ||
    q.includes("kaynak") ||
    q.includes("açık kaynak")
  ) {
    intent = "GITHUB_REPOS";
    text = "Yunus'un GitHub profilinde 30'dan fazla açık kaynaklı repo ve proje bulunuyor. Öne çıkanlar:\n• FezaArsivi (TUA & Uzay projeleri)\n• DeepForensics (BTK Deepfake ve adli bilişim)\n• Tulpar & Budak Edge-AI kod tabanları.\nTüm açık kaynak kodları inceleyebilir veya katkı sağlayabilirsin!";
    badges = ["github.com/bahattinyunus", "30+ Repo", "Open Source"];
    action = { label: "GitHub Profilini Ziyaret Et", external: "https://github.com/bahattinyunus" };
  }

  // 13. Teknoloji Yığını & Yetenekler
  else if (
    q.includes("yetenek") ||
    q.includes("teknoloji") ||
    q.includes("stack") ||
    q.includes("dil") ||
    q.includes("kullandığı") ||
    q.includes("framework") ||
    q.includes("python") ||
    q.includes("c++") ||
    q.includes("ros")
  ) {
    intent = "TECH_STACK";
    text = "Yunus Çetin'in ana teknoloji cephaneliği:\n• AI / ML: PyTorch, TensorFlow, Hugging Face, TensorRT, ONNX\n• Robotik & Otonom: ROS2 Humble, Gazebo, PX4, MAVLink, OpenCV, C++\n• Gömülü & Edge: Jetson Nano, Raspberry Pi, INT8 Quantization\n• Web & Modern Stack: React 19, TypeScript, TailwindCSS, WebGPU, Node.js";
    badges = ["PyTorch & ROS2", "C++ & Python", "Edge-AI & WebGPU"];
    action = { label: "Teknoloji Cephaneliğini Gör", path: "/arsenal" };
  }

  // 14. İnteraktif Simülatörler (Tulpar / BeeRoute)
  else if (
    q.includes("simülatör") ||
    q.includes("simulator") ||
    q.includes("beeroute") ||
    q.includes("arı") ||
    q.includes("rota") ||
    q.includes("uçuş güvertesi")
  ) {
    intent = "SIMULATOR_TOOLS";
    text = "Sitede 2 adet interaktif siber simülatör bulunuyor:\n1. BeeRoute: 2.5D kentsel otonom kurye drone rota planlama algoritması.\n2. Tulpar Uçuş Güvertesi: 6-DoF aerodinamik telemetri paneli.\nİkisi de tamamen tarayıcı içinde gerçek zamanlı fizik motoruyla çalışıyor!";
    badges = ["BeeRoute Simulator", "Tulpar 6-DoF", "Gerçek Zamanlı Fizik"];
    action = { label: "Cephanelik ve Simülatörler", path: "/arsenal" };
  }

  // 15. Teşekkür / Kapanış
  else if (
    q.includes("sağol") ||
    q.includes("sagol") ||
    q.includes("teşekkür") ||
    q.includes("tesekkur") ||
    q.includes("eyvallah") ||
    q.includes("adamsın") ||
    q.includes("harika") ||
    q.includes("süper")
  ) {
    intent = "APPRECIATION";
    text = "Rica ederim kanka, ne demek! Başka bir konu ya da proje olursa buradayım. Sitedeki interaktif simülatörlere (Tulpar veya BeeRoute) de mutlaka göz at derim!";
    badges = ["Rica Ederim!", "Keyifli Gezinmeler"];
  }

  // 16. Sohbet / Espri / Genel Sorular
  else if (
    q.includes("nerelisin") ||
    q.includes("nerede") ||
    q.includes("yaş") ||
    q.includes("şaka") ||
    q.includes("fıkra") ||
    q.includes("ele geçirecek mi")
  ) {
    intent = "CASUAL_CHAT";
    text = "Yunus Ankara merkezli çalışıyor; ODTÜ ve Hacettepe koridorlarında kod yazıp laboratuvarlarda İHA uçuruyor. Ben de onun dijital ikizi olarak tarayıcında nöbetteyim! Yapay zekâ dünyayı ele geçirmeyecek ama işini çok kolaylaştıracak, garanti ederim 😄";
    badges = ["Ankara", "ODTÜ & Hacettepe", "AI Assistant"];
  }

  // 17. Genel / Anlaşılamayan Doğal Yanıt
  else {
    intent = "FALLBACK";
    text = `Kanka sorunu tam yakalayamadım ama Yunus'un ASELSAN saha ziyareti, 66.500+ adaylı Fransa Gençlik Değişimi, TUA uzay hackathonu, ODTÜ/Hacettepe eğitimleri ya da Tulpar & Budak projeleri hakkında merak ettiğin bir şey varsa sorabilirsin!`;
    badges = ["Yunus'un AI Asistanı", "Saha & Projeler"];
    action = { label: "Tüm Projeleri Keşfet", path: "/operations" };
  }

  const endTime = performance.now();
  const inferenceTimeMs = parseFloat((endTime - startTime).toFixed(2));

  return {
    text,
    badges,
    action,
    analysis: {
      intent,
      confidence: 96,
      tokens,
      metrics: {
        inferenceTimeMs: Math.max(8, inferenceTimeMs),
        tokensProcessed: tokens.length
      }
    }
  };
}
