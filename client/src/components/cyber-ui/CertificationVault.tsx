import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, Search, Filter, ShieldCheck, CheckCircle2, Copy, Check, 
  ExternalLink, Sparkles, Cpu, Terminal, Radio, Bookmark, Eye, Layers,
  Download, FileSpreadsheet, Share2, Tag
} from "lucide-react";
import { useCyberSound } from "@/hooks/use-cyber-sound";
import { ALL_CERTIFICATES, CertificateRecord } from "@/lib/certificatesData";

// Önemli kurum rozetleri
const ISSUER_BADGES: Record<string, { bg: string; text: string; border: string }> = {
  "BTK Akademi": { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  "Bilgeİş": { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  "Turkcell Geleceği Yazanlar": { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  "T3 Akademi": { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
  "TBD TÜRKİYE BİLİŞİM DERNEĞİ": { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  "Sivil Havacılık Genel Müdürlüğü (SHGM)": { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30" },
  "TEI - TUSAŞ Motor Sanayii A.Ş.": { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/30" },
  "Siber Vatan (SSB)": { bg: "bg-neon-magenta/10", text: "text-neon-magenta", border: "border-neon-magenta/30" }
};

const POPULAR_TAGS = [
  "Python",
  "Yapay Zekâ",
  "Siber Güvenlik",
  "İHA",
  "Arduino",
  "HTML5",
  "Bulut",
  "Veri",
  "Girişimcilik",
  "KOBİ"
];

export const CertificationVault: React.FC = () => {
  const { playSound } = useCyberSound();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedIssuer, setSelectedIssuer] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [displayCount, setDisplayCount] = useState<number>(24);

  // Kategori tanımları
  const categories = [
    { id: "ALL", label: "Tüm Sertifikalar", count: ALL_CERTIFICATES.length },
    { id: "software", label: "Yazılım & Web", count: ALL_CERTIFICATES.filter(c => c.category === "software").length },
    { id: "ai", label: "Yapay Zekâ & Veri", count: ALL_CERTIFICATES.filter(c => c.category === "ai").length },
    { id: "cyber", label: "Siber Güvenlik", count: ALL_CERTIFICATES.filter(c => c.category === "cyber").length },
    { id: "embedded", label: "Gömülü & Donanım", count: ALL_CERTIFICATES.filter(c => c.category === "embedded").length },
    { id: "business", label: "Girişim & Yönetim", count: ALL_CERTIFICATES.filter(c => c.category === "business").length },
    { id: "general", label: "Kişisel & Kamu", count: ALL_CERTIFICATES.filter(c => c.category === "general").length },
  ];

  // Başlıca Kurumlar
  const topIssuers = [
    "ALL",
    "BTK Akademi",
    "Bilgeİş",
    "Turkcell Geleceği Yazanlar",
    "T3 Akademi",
    "TBD TÜRKİYE BİLİŞİM DERNEĞİ",
    "Diğer Kurumlar"
  ];

  // Filtreleme
  const filteredCerts = useMemo(() => {
    return ALL_CERTIFICATES.filter((cert) => {
      const matchCategory = selectedCategory === "ALL" || cert.category === selectedCategory;
      
      let matchIssuer = true;
      if (selectedIssuer === "Diğer Kurumlar") {
        matchIssuer = !["BTK Akademi", "Bilgeİş", "Turkcell Geleceği Yazanlar", "T3 Akademi", "TBD TÜRKİYE BİLİŞİM DERNEĞİ"].includes(cert.issuer);
      } else if (selectedIssuer !== "ALL") {
        matchIssuer = cert.issuer.toLowerCase().includes(selectedIssuer.toLowerCase());
      }

      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        (cert.code && cert.code.toLowerCase().includes(q)) ||
        (cert.date && cert.date.toLowerCase().includes(q));

      return matchCategory && matchIssuer && matchSearch;
    });
  }, [search, selectedCategory, selectedIssuer]);

  const displayedList = useMemo(() => {
    return filteredCerts.slice(0, displayCount);
  }, [filteredCerts, displayCount]);

  const copyCredential = (code: string, id: string) => {
    if (!code || code === "—") return;
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    playSound("click");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const copyAllFiltered = () => {
    const text = filteredCerts
      .map(
        (c, i) =>
          `${i + 1}. ${c.title} — ${c.issuer} (${c.date}) [ID: ${c.code || "ONAYLI"}]`
      )
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    playSound("click");
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const downloadCSV = () => {
    playSound("click");
    const headers = ["No", "Sertifika Adı", "Veren Kurum", "Tarih", "Doğrulama Kodu / Credential ID", "Kategori"];
    const rows = ALL_CERTIFICATES.map((c, i) => [
      i + 1,
      `"${c.title.replace(/"/g, '""')}"`,
      `"${c.issuer.replace(/"/g, '""')}"`,
      `"${c.date}"`,
      `"${c.code || "—"}"`,
      `"${c.category}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "bahattinyunus_cetin_resmi_sertifikalar_266.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8" id="certification-vault">
      {/* Üst Başlık & İstatistik Paneli */}
      <div className="relative overflow-hidden p-6 md:p-8 bg-gradient-to-br from-black/80 via-black/50 to-neon-blue/5 border border-white/10 rounded-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/5 blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RESMİ AKREDİTASYON & YETKİNLİK SİCİLİ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-display)] font-extrabold text-white tracking-wide">
              LİSANSLAR VE SERTİFİKALAR <span className="text-neon-blue font-mono text-2xl">({ALL_CERTIFICATES.length}+)</span>
            </h2>
            <p className="text-sm font-mono text-white/60 max-w-2xl leading-relaxed">
              T.C. Cumhurbaşkanlığı İnsan Kaynakları Ofisi, BTK Akademi, ODTÜ destekli Bilgeİş, Turkcell Geleceği Yazanlar, T3 Vakfı ve SHGM onaylı pilotaj ve mühendislik akreditasyonları.
            </p>
          </div>

          {/* Aksiyon Butonları & Metrikler */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={downloadCSV}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-neon-blue/15 hover:bg-neon-blue/25 border border-neon-blue/40 text-neon-blue font-mono text-xs rounded-xl transition-all shadow-[0_0_15px_rgba(0,243,255,0.15)]"
              title="266+ Sertifikanın tamamını Excel/CSV olarak indir"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>CSV Olarak İndir ({ALL_CERTIFICATES.length})</span>
            </button>
            <button
              onClick={copyAllFiltered}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs rounded-xl transition-all"
              title="Filtrelenen sertifikaları metin olarak kopyala"
            >
              {copiedAll ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-white/60" />}
              <span>{copiedAll ? "Panoya Kopyalandı!" : "Sicil Dökümü Kopyala"}</span>
            </button>
          </div>
        </div>

        {/* İstatistik Metrikleri & Kurum Dağılımı */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono mt-6 pt-6 border-t border-white/10">
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
            <span className="text-2xl font-bold text-accent block">266+</span>
            <span className="text-[10px] text-white/50 uppercase tracking-wider">Doğrulanmış Sicil</span>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
            <span className="text-2xl font-bold text-emerald-400 block">70+</span>
            <span className="text-[10px] text-white/50 uppercase tracking-wider">Bilgeİş (ODTÜ)</span>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
            <span className="text-2xl font-bold text-blue-400 block">100+</span>
            <span className="text-[10px] text-white/50 uppercase tracking-wider">BTK Akademi</span>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
            <span className="text-2xl font-bold text-red-400 block">İHA-1</span>
            <span className="text-[10px] text-white/50 uppercase tracking-wider">SHGM Ticari Pilot</span>
          </div>
        </div>

        {/* Çok Renkli Kategori Dağılım İlerleme Çubuğu */}
        <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-white/60">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-accent" /> YETKİNLİK MATRİSİ DAĞILIMI
            </span>
            <span className="text-[11px] text-white/40">266 Kayıt · 6 Ana Disiplin</span>
          </div>

          <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden flex p-0.5 border border-white/10">
            <div style={{ width: "22%" }} className="h-full bg-blue-500 rounded-l-full" title="Yazılım & Web: 56 Belge (%22)" />
            <div style={{ width: "21%" }} className="h-full bg-accent" title="Girişim & Yönetim: 56 Belge (%21)" />
            <div style={{ width: "20%" }} className="h-full bg-purple-500" title="Kişisel & Kamu: 54 Belge (%20)" />
            <div style={{ width: "16%" }} className="h-full bg-emerald-400" title="Yapay Zekâ & Veri: 43 Belge (%16)" />
            <div style={{ width: "12%" }} className="h-full bg-cyan-400" title="Gömülü & Donanım: 28 Belge (%12)" />
            <div style={{ width: "9%" }} className="h-full bg-red-400 rounded-r-full" title="Siber Güvenlik: 16 Belge (%9)" />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-mono text-white/50 pt-1">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Yazılım (56)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Yapay Zekâ (43)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400" /> Gömülü/Aviyonik (28)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" /> Siber Güvenlik (16)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent" /> Girişim & Yönetim (56)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> Kişisel/Kamu (54)</span>
          </div>
        </div>
      </div>

      {/* Kontrol Çubuğu (Arama & Filtreler) */}
      <div className="space-y-4">
        {/* Arama Barı */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-blue" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setDisplayCount(24);
            }}
            placeholder="Sertifika adı, kurum veya kimlik numarası (Credential ID) ile ara... (Örn: Python, Bilgeİş, SHGM)"
            className="w-full pl-11 pr-4 py-3.5 bg-black/70 border border-white/15 focus:border-neon-blue rounded-xl text-sm font-mono text-white placeholder:text-white/30 outline-none transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          />
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-white/40 hover:text-white"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Hızlı Arama Etiketleri */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
          <span className="text-white/40 text-[11px] shrink-0 flex items-center gap-1">
            <Tag className="w-3 h-3 text-neon-blue" /> Popüler:
          </span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSearch(tag);
                setDisplayCount(24);
                playSound("click");
              }}
              className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-neon-blue/15 border border-white/10 hover:border-neon-blue/30 text-white/60 hover:text-neon-blue text-[11px] whitespace-nowrap transition-all"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Kategori Sekmeleri */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setDisplayCount(24);
                  playSound("click");
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-1.5 ${
                  active
                    ? "bg-neon-blue/20 border-neon-blue text-neon-blue font-bold shadow-[0_0_12px_rgba(0,243,255,0.25)]"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${active ? "bg-neon-blue text-black font-bold" : "bg-white/10 text-white/40"}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Kurum Hızlı Filtreleri */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
          <span className="text-white/40 text-[11px] shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Kurum:
          </span>
          {topIssuers.map((issuer) => {
            const active = selectedIssuer === issuer;
            return (
              <button
                key={issuer}
                onClick={() => {
                  setSelectedIssuer(issuer);
                  setDisplayCount(24);
                  playSound("click");
                }}
                className={`px-2.5 py-1 rounded text-[11px] whitespace-nowrap transition-all ${
                  active
                    ? "bg-white text-black font-bold"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {issuer === "ALL" ? "Tüm Kurumlar" : issuer}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sonuç Sayısı ve Sıralama Bilgisi */}
      <div className="flex items-center justify-between text-xs font-mono text-white/40 border-b border-white/10 pb-2">
        <span>Filtrelenen: <strong className="text-white">{filteredCerts.length}</strong> / {ALL_CERTIFICATES.length} sertifika</span>
        <span>Gösterilen: 1 - {Math.min(displayCount, filteredCerts.length)}</span>
      </div>

      {/* Sertifika Kartları Grid'i */}
      {displayedList.length === 0 ? (
        <div className="p-12 text-center bg-white/5 border border-white/10 rounded-2xl space-y-3">
          <Sparkles className="w-8 h-8 text-white/30 mx-auto" />
          <p className="text-white/70 font-mono text-sm">Arama kriterlerine uygun sertifika bulunamadı.</p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("ALL");
              setSelectedIssuer("ALL");
            }}
            className="px-4 py-2 bg-neon-blue/20 border border-neon-blue/40 text-neon-blue font-mono text-xs rounded-lg hover:bg-neon-blue/30 transition-all"
          >
            Filtreleri Sıfırla
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedList.map((cert, index) => {
            const badge = ISSUER_BADGES[cert.issuer] || { bg: "bg-white/5", text: "text-white/70", border: "border-white/10" };
            const isCopied = copiedId === cert.id;
            const hasCode = cert.code && cert.code !== "—";

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.015, 0.3) }}
                className="group relative p-6 glass-surface rounded-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:border-accent/40"
              >
                <div>
                  {/* Üst Bar: Kurum & Tarih */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${badge.bg} ${badge.text} ${badge.border} truncate max-w-[200px]`}>
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] font-mono text-white/40 shrink-0">
                      {cert.date}
                    </span>
                  </div>

                  {/* Sertifika Başlığı */}
                  <h3 className="text-sm font-semibold text-white group-hover:text-neon-blue transition-colors line-clamp-2 leading-snug">
                    {cert.title}
                  </h3>
                </div>

                {/* Alt Bar: Doğrulama Kodu / Credential ID */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2 font-mono text-[11px]">
                  {hasCode ? (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-white/40 truncate text-[10px] max-w-[170px]" title={cert.code}>
                        ID: <code className="text-white/70">{cert.code}</code>
                      </span>
                      <button
                        onClick={() => copyCredential(cert.code, cert.id)}
                        className={`p-1.5 rounded transition-all flex items-center gap-1 text-[10px] ${
                          isCopied
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-white/5 hover:bg-neon-blue/20 text-white/50 hover:text-neon-blue border border-white/5 hover:border-neon-blue/30"
                        }`}
                        title="Kimlik Numarasını Kopyala"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Kopyalandı</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Kopyala</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full text-white/30 text-[10px]">
                      <span>Onaylı Sicil Kaydı</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Daha Fazla Göster Butonu */}
      {filteredCerts.length > displayCount && (
        <div className="text-center pt-4">
          <button
            onClick={() => {
              setDisplayCount(prev => prev + 24);
              playSound("click");
            }}
            className="px-6 py-3 bg-neon-blue/15 hover:bg-neon-blue/25 border border-neon-blue/40 hover:border-neon-blue text-neon-blue font-mono text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(0,243,255,0.2)]"
          >
            Daha Fazla Göster (+{Math.min(24, filteredCerts.length - displayCount)} / {filteredCerts.length - displayCount} Kalan)
          </button>
        </div>
      )}
    </div>
  );
};
