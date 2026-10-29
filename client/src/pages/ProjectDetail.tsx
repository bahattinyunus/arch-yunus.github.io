import React, { useState } from "react";
import { 
  ArrowLeft, ArrowUpRight, Github, Layers, ShieldCheck, Terminal, 
  Star, GitFork, Copy, Check, Cpu, Zap, Activity, Radio, Sparkles, Plane, ExternalLink, Code2
} from "lucide-react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { profileData } from "@/lib/data";
import { useCyberSound } from "@/hooks/use-cyber-sound";

export default function ProjectDetail() {
  const [, params] = useRoute("/operations/:projectId");
  const { playSound } = useCyberSound();
  const [copiedCode, setCopiedCode] = useState(false);

  const cleanParam = (params?.projectId || "").toLowerCase().replace(/[-_]/g, "");
  const project = profileData.featured_projects.find((item) => {
    const cleanName = item.name.toLowerCase().replace(/[-_]/g, "");
    return cleanName === cleanParam || item.name.toLowerCase() === params?.projectId?.toLowerCase();
  });

  if (!project) {
    return (
      <div className="mx-auto max-w-xl py-24 text-center font-mono space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-full">
          <Activity className="w-3.5 h-3.5" />
          <span>KAYIT BULUNAMADI // 404_NODE_NOT_FOUND</span>
        </div>
        <h1 className="text-4xl font-bold font-[family-name:var(--font-display)] text-white">
          Aranan Proje Veritabanında Yok
        </h1>
        <p className="text-sm text-white/50">
          Belirtilen ID ({params?.projectId}) ile eşleşen bir operasyonel sistem kaydı tespit edilemedi.
        </p>
        <Link 
          href="/operations" 
          onClick={() => playSound("click")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-blue/20 hover:bg-neon-blue/30 border border-neon-blue/50 text-neon-blue text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,243,255,0.2)]"
        >
          <ArrowLeft size={16} /> Operasyonlar Kataloğuna Dön
        </Link>
      </div>
    );
  }

  const architecture = project.architecture || [
    "Modüler ve asenkron mimari omurgası",
    "Düşük gecikmeli veri serileştirme katmanı",
    "Otomasyon ve gerçek zamanlı telemetri akışları",
    "Dokümante edilmiş tip güvenli API arayüzü"
  ];
  
  const security = project.security || [
    "Bellek sızıntısı ve sınır taşması koruması",
    "Girdi doğrulama ve kriptografik özet kontrolü",
    "İzlenebilirlik ve hata toleranslı fail-safe mekanizması",
    "Sürekli güvenlik denetimi (SAST) standartları"
  ];

  const quickStartSnippet = `# ${project.name} - Quick Start Pipeline
git clone ${project.url}.git
cd ${project.name.toLowerCase()}
${project.language === "Python" ? "pip install -r requirements.txt\npython main.py --mode production" : project.language === "C++" ? "mkdir build && cd build\ncmake .. && make -j4\n./${project.name.toLowerCase()}" : "npm install\nnpm run dev"}
`;

  const handleCopy = () => {
    playSound("transmit");
    navigator.clipboard.writeText(quickStartSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Determine if there is a simulator bridge
  const isTulpar = project.name.toLowerCase().includes("tulpar");
  const isBudak = project.name.toLowerCase().includes("budak");
  const isBeeRoute = project.name.toLowerCase().includes("beeroute");

  return (
    <div className="space-y-12 pb-20 font-sans">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-xs">
        <Link 
          href="/operations" 
          onClick={() => playSound("click")}
          className="inline-flex items-center gap-2 text-white/50 hover:text-neon-blue transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          <span>OPERATIONS // CATALOG</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-neon-green/10 border border-neon-green/30 text-neon-green text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping" /> AKTİF AR-GE DEPOSU
          </span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span className="text-white/50 hidden sm:inline">{project.category || "Yazılım & AI"}</span>
        </div>
      </div>

      {/* Hero Header Section */}
      <header className="grid items-center gap-10 lg:grid-cols-12">
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-neon-blue/15 border border-neon-blue/40 text-neon-blue font-mono text-xs font-bold rounded">
              {project.language}
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/15 text-white/70 font-mono text-xs rounded">
              AÇIK KAYNAK MİMARİ
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-[family-name:var(--font-display)] leading-[1.05]">
            {project.name}
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-white/70 font-mono">
            {project.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a 
              href={project.url} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-neon-blue hover:text-black transition-all shadow-lg"
            >
              <Github size={16} /> GitHub'da İncele <ArrowUpRight size={14} />
            </a>

            {project.demo_url && (
              <a 
                href={project.demo_url} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neon-blue/40 bg-neon-blue/10 font-mono text-xs font-bold text-neon-blue hover:bg-neon-blue/20 transition-all shadow-[0_0_15px_rgba(0,243,255,0.15)]"
              >
                <Sparkles size={16} /> Canlı Sistem / Repo <ArrowUpRight size={14} />
              </a>
            )}

            {isTulpar && (
              <Link
                href="/arsenal"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-neon-blue/50 bg-neon-blue/20 text-neon-blue font-mono text-xs font-bold hover:bg-neon-blue/30 transition-all shadow-[0_0_20px_rgba(0,243,255,0.25)] animate-pulse"
              >
                <Plane size={16} /> Flight Deck HUD Simülatörünü Aç
              </Link>
            )}

            {isBudak && (
              <Link
                href="/arsenal"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-yellow-500/50 bg-yellow-500/20 text-yellow-400 font-mono text-xs font-bold hover:bg-yellow-500/30 transition-all shadow-[0_0_20px_rgba(234,179,8,0.25)] animate-pulse"
              >
                <Zap size={16} /> Budak %80 Pruning Lab'ı Aç
              </Link>
            )}

            {isBeeRoute && (
              <Link
                href="/#projeler"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-accent/50 bg-accent/20 text-accent font-mono text-xs font-bold hover:bg-accent/30 transition-all shadow-[0_0_20px_rgba(214,255,63,0.25)] animate-pulse"
              >
                <Activity size={16} /> BeeRoute Koloni Simülatörünü Aç
              </Link>
            )}
          </div>
        </motion.div>

        {/* Project Visual Display */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-5 overflow-hidden rounded-2xl border border-neon-blue/30 bg-black/60 shadow-[0_0_40px_rgba(0,243,255,0.12)] relative group"
        >
          <img 
            src={project.image} 
            alt={project.name} 
            className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/images/project-ai.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/70">
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400" /> {project.stars} Yıldız
            </span>
            <span className="flex items-center gap-1.5">
              <GitFork className="w-4 h-4 text-neon-blue" /> {project.forks} Fork
            </span>
          </div>
        </motion.div>
      </header>

      {/* Technical Architecture & Quality Matrix */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Architecture Specs */}
        <section className="lg:col-span-8 p-7 md:p-8 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="p-2.5 rounded-xl bg-neon-blue/10 border border-neon-blue/30 text-neon-blue">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-[family-name:var(--font-display)] text-white">
                Nasıl Çalışıyor? // Mimari Katmanlar
              </h2>
              <span className="text-xs font-mono text-white/40">SİSTEM ANALİZİ VE VERİ AKIŞ ŞEMASI</span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Left: Architecture Items */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neon-blue font-mono">
                <Terminal size={14} /> Teknik Yapı & Boru Hatları
              </h3>
              <ul className="space-y-3 font-mono text-xs text-white/70">
                {architecture.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neon-blue shadow-[0_0_6px_#00f3ff]" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Security & Reliability */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono">
                <ShieldCheck size={14} /> Dayanıklılık & Güvenlik Kalkanı
              </h3>
              <ul className="space-y-3 font-mono text-xs text-white/70">
                {security.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/20 transition-colors">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Start Terminal Snippet */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-white/60 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-accent" /> HIZLI BAŞLANGIÇ & KURULUM BETİĞİ
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/15 rounded text-xs font-mono text-white/70 flex items-center gap-1.5 transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? "Kopyalandı" : "Kopyala"}</span>
              </button>
            </div>
            <pre className="p-4 bg-black/90 border border-white/10 rounded-xl font-mono text-xs text-neon-blue/90 overflow-x-auto leading-relaxed">
              <code>{quickStartSnippet}</code>
            </pre>
          </div>
        </section>

        {/* Project Summary Sidebar */}
        <aside className="lg:col-span-4 p-7 rounded-2xl border border-neon-blue/20 bg-neon-blue/[0.03] backdrop-blur-xl flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono text-neon-blue uppercase tracking-widest block">DOSYA BİLGİSİ</span>
              <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-white mt-1">
                Operasyon Özeti
              </h3>
            </div>

            <dl className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <dt className="text-white/40">Geliştirme Dili</dt>
                <dd className="font-bold text-neon-blue">{project.language}</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <dt className="text-white/40">GitHub Yıldız</dt>
                <dd className="font-bold text-yellow-400">{project.stars} ⭐</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <dt className="text-white/40">Fork Sayısı</dt>
                <dd className="font-bold text-white">{project.forks}</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <dt className="text-white/40">Lisans</dt>
                <dd className="text-white/70">MIT Open Source</dd>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <dt className="text-white/40">Mühendis</dt>
                <dd className="text-white">Bahattin Yunus Çetin</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-white/40">Akademik Bağlantı</dt>
                <dd className="text-emerald-400">ODTÜ BÖTE & Hacettepe</dd>
              </div>
            </dl>
          </div>

          <a 
            href={project.url} 
            target="_blank" 
            rel="noreferrer" 
            className="w-full py-3 bg-neon-blue/15 hover:bg-neon-blue/25 border border-neon-blue/40 rounded-xl text-center font-mono text-xs font-bold text-neon-blue flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,243,255,0.15)]"
          >
            GitHub Reposuna Git <ArrowUpRight size={15} />
          </a>
        </aside>
      </div>
    </div>
  );
}
