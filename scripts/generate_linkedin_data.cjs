const fs = require('fs');
const path = require('path');

const folders = fs.readdirSync('linkedin').filter(f => fs.statSync(path.join('linkedin', f)).isDirectory());
folders.sort((a,b) => parseInt(a) - parseInt(b));

const metaMap = {
  '1': {
    id: 'aselsan-golbasi',
    title: 'ASELSAN Gölbaşı Teknoloji Üssü Teknik İnceleme Gezisi',
    category: 'Savunma & Havacılık',
    organization: 'ASELSAN & Hacettepe HACEST',
    date: '2026',
    location: 'Ankara, Türkiye',
    badge: 'Milli Teknoloji Hamlesi',
    highlight: 'Savunma sanayiimizin amiral gemisi ASELSAN Gölbaşı Teknoloji Üssü\'nde Ar-Ge hatları, kritik entegrasyonlar ve operasyonel mükemmellik incelemesi.'
  },
  '2': {
    id: 'turkiye-fransa-genclik-degisimi',
    title: 'Türkiye – Fransa Uluslararası Gençlik Değişimi Programı',
    category: 'Uluslararası Diplomasi',
    organization: 'T.C. Gençlik ve Spor Bakanlığı & Türkiye Maarif Vakfı',
    date: '2026',
    location: 'Strasbourg (Fransa), Basel (İsviçre), Kehl (Almanya)',
    badge: '66.500+ Başvuru / Seçilen 20 Genç',
    highlight: 'Avrupa Parlamentosu, AİHM, T.C. Strasbourg Başkonsolosluğu ve Université de Strasbourg diplomasi, hukuk ve akademik saha incelemeleri.'
  },
  '3': {
    id: 'btk-firat-yapay-zeka',
    title: 'BTK Akademi & Fırat Üniversitesi: Yapay Zekâ ile İçerik Üretimi',
    category: 'Yapay Zekâ',
    organization: 'BTK Akademi & Fırat Üniversitesi',
    date: '2026',
    location: 'Elazığ, Türkiye',
    badge: '24 Saat Uygulamalı',
    highlight: 'Üretken yapay zekâ araçları, ileri seviye prompt tasarımı ve kurumsal iş süreçlerine yapay zekâ entegrasyonu.'
  },
  '4': {
    id: 'btk-malatya-yapay-zeka',
    title: 'BTK Akademi Malatya: Yapay Zekâ ile İçerik Üretimi',
    category: 'Yapay Zekâ',
    organization: 'BTK Akademi',
    date: 'Temmuz 2025',
    location: 'Malatya, Türkiye',
    badge: '24 Saat Yüz Yüze',
    highlight: 'Otonom sistemler, ajan yapıları ve prompt optimizasyonu ile üretken zekânın içerik üretiminde pratik senaryoları.'
  },
  '5': {
    id: 'kamp-plus-siber-guvenlik',
    title: 'KAMP+ Siber Güvenlik Kampı',
    category: 'Siber Savunma',
    organization: 'T.C. GSB & Bilgi Güvenliği Derneği',
    date: 'Mayıs 2025',
    location: 'Bursa Karacaali, Türkiye',
    badge: 'Siber Vatan & Savunma',
    highlight: 'Ağ güvenliği, ofansif siber güvenlik, sızma testleri ve defansif strateji çalışmaları üzerine yoğun saha kampı.'
  },
  '6': {
    id: 'tua-astro-hackathon',
    title: 'Türkiye Uzay Ajansı (TUA) Astro Hackathon',
    category: 'Uzay & Havacılık',
    organization: 'Türkiye Uzay Ajansı & TÜBİTAK',
    date: '2025',
    location: 'Trabzon, Türkiye',
    badge: '48 Saat / 15 Açık Kaynak Proje',
    highlight: '48 saat kesintisiz maratonda derin uzay vizyonuyla geliştirilen 15 açık kaynaklı uzay ve astronomi yazılım projesi.'
  },
  '7': {
    id: 'siber-vatan-beyaz-sapka',
    title: 'Siber Vatan 2026 Beyaz Şapkalı Hacker Kampı',
    category: 'Siber Savunma',
    organization: 'DOKA & Siber Vatan',
    date: '2026',
    location: 'Trabzon, Türkiye',
    badge: '5 Günlük Yoğun Hackathon & Kamp',
    highlight: 'Zafiyet analizi, Web uygulama güvenliği, penetrasyon testleri ve kurumsal savunma kurguları üzerine uygulamalı kamp.'
  },
  '8': {
    id: 'teknofest-ar-ge-atolyesi',
    title: 'Teknoloji Takımları & TEKNOFEST Ar-Ge Çalışmaları',
    category: 'Ar-Ge & İnovasyon',
    organization: 'Milli Teknoloji Hamlesi / Üniversite Takımları',
    date: '2025 - 2026',
    location: 'Trabzon / Ankara, Türkiye',
    badge: 'Saha Mühendisliği',
    highlight: 'Milli teknoloji yarışmaları ve üniversite takımları bünyesinde prototipleme, donanım entegrasyonu ve saha testleri.'
  },
  '9': {
    id: 'tei-tusas-havacilik-motorlari',
    title: 'TEI - TUSAŞ Motor Sanayii: Havacılık Motorları Okulu',
    category: 'Savunma & Havacılık',
    organization: 'TEI - TUSAŞ Motor Sanayii A.Ş.',
    date: '2026',
    location: 'Eskişehir / Çevrim İçi & Saha',
    badge: 'Gaz Türbinli Motorlar',
    highlight: 'Gaz türbinli havacılık motorları, tasarım prensipleri, ileri imalat teknikleri ve motor mimarileri üzerine prestijli eğitim.'
  },
  '10': {
    id: 'btk-articulate-storyline',
    title: 'BTK Akademi: Articulate Storyline 360 İleri Seviye Atölyesi',
    category: 'Eğitim Teknolojileri',
    organization: 'BTK Akademi',
    date: 'Ocak 2026',
    location: 'Trabzon, Türkiye',
    badge: '30 Saat Uygulamalı',
    highlight: 'Öğretim tasarımı (BÖTE disiplini) ile interaktif simülasyonlar, karmaşık değişken mantığı ve eğitim yazılımı mimarisi.'
  },
  '11': {
    id: 'btk-multimedya-veri-guvenligi',
    title: 'Multimedya Veri Güvenliğinde Yapay Zekâ Kullanımı',
    category: 'Yapay Zekâ & Güvenlik',
    organization: 'BTK Akademi',
    date: 'Kasım 2025',
    location: 'Trabzon, Türkiye',
    badge: '42 Saat / GitHub Repo Projesi',
    highlight: 'EXIF, ELA, PRNU analizi, derin sahtecilik (deepfake) tespiti, GAN modelleri, C2PA standartları ve açık kaynak proje kütüphanesi.'
  },
  '12': {
    id: 't3-su-alti-sistemleri',
    title: 'T3 Vakfı: Otonom Su Altı Sistemleri Eğitimi',
    category: 'Robotik & Otonom',
    organization: 'T3 Vakfı & İTÜ AUV Team',
    date: 'Eylül 2025',
    location: 'İstanbul, Türkiye',
    badge: 'Milli Teknoloji Hamlesi',
    highlight: 'Su altı robotik platformları, hidrodinamik tasarım, sensör füzyonu ve otonom görev algoritmaları eğitimi.'
  },
  '13': {
    id: 'kamp-plus-havacilik-uzay',
    title: 'KAMP+ Havacılık ve Uzay Kampı & Feza Arşivi',
    category: 'Uzay & Havacılık',
    organization: 'T.C. GSB & TÜBİTAK',
    date: 'Kasım 2025',
    location: 'Bursa Karacaali, Türkiye',
    badge: 'FezaArsivi Açık Kaynak',
    highlight: 'Astronomi, radyo astronomi, Satürn saha gözlemleri, ışık kirliliği analizi ve FezaArsivi açık kaynak veri reposu.'
  }
};

const events = [];

folders.forEach(f => {
  const dir = path.join('linkedin', f);
  const files = fs.readdirSync(dir);
  const txtFiles = files.filter(x => x.endsWith('.txt'));
  let text = '';
  if (txtFiles.length > 0) {
    text = fs.readFileSync(path.join(dir, txtFiles[0]), 'utf8').trim();
  }
  const imgFiles = files.filter(x => x.endsWith('.jpeg') || x.endsWith('.jpg') || x.endsWith('.png'));
  const meta = metaMap[f] || {
    id: 'operation-' + f,
    title: 'Saha Görevi #' + f,
    category: 'Ar-Ge & İnovasyon',
    organization: 'Milli Teknoloji Hamlesi',
    date: '2025 - 2026',
    location: 'Türkiye',
    badge: 'Saha Çalışması',
    highlight: 'Saha operasyonu ve Ar-Ge çalışmaları.'
  };

  events.push({
    folderId: f,
    id: meta.id,
    title: meta.title,
    category: meta.category,
    organization: meta.organization,
    date: meta.date,
    location: meta.location,
    badge: meta.badge,
    highlight: meta.highlight,
    fullStory: text || meta.highlight,
    images: imgFiles.map(img => '/images/linkedin/' + f + '/' + img)
  });
});

const tsCode = `// Autogenerated from verified LinkedIn posts and field documentation
export interface FieldOperationItem {
  folderId: string;
  id: string;
  title: string;
  category: string;
  organization: string;
  date: string;
  location: string;
  badge: string;
  highlight: string;
  fullStory: string;
  images: string[];
}

export const FIELD_OPERATIONS: FieldOperationItem[] = ` + JSON.stringify(events, null, 2) + `;\n`;

fs.writeFileSync('client/src/lib/linkedinData.ts', tsCode, 'utf8');
console.log('Successfully written client/src/lib/linkedinData.ts with', events.length, 'records and', events.reduce((acc, e) => acc + e.images.length, 0), 'images total!');
