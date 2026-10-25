import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GitFork, ExternalLink, Github, Terminal, Cpu, Plane, Orbit, Radio, Code2, Sparkles, Filter } from "lucide-react";
import { profileData } from "@/lib/data";

interface CuratedProjectsProps {
  lang: "tr" | "en";
  onOpenLab?: (type: "tulpar" | "budak") => void;
}

export const CuratedProjects: React.FC<CuratedProjectsProps> = ({ lang, onOpenLab }) => {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [showAll, setShowAll] = useState<boolean>(false);

  const curatedList = [
    {
      id: "beeroute",
      title: "BeeRoute // Bio-mimetic ABC Optimizer",
      tag: "algorithm",
      category: lang === "tr" ? "Algoritma & Optimizasyon" : "Optimization",
      desc: lang === "tr"
        ? "Yapay Arı Kolonisi (Artificial Bee Colony) ile NP-Hard Gezgin Satıcı (TSP) ve rota optimizasyonu sağlayan O(G·S·n²) karmaşıklığında yüksek başarımlı çekirdek."
        : "High-performance bio-mimetic Artificial Bee Colony (ABC) optimizer for NP-Hard Traveling Salesperson & routing with O(G·S·n²) complexity.",
      tech: ["Python", "C++", "NumPy", "Heuristics", "Graph Theory"],
      stars: 48,
      repo: "https://github.com/bahattinyunus/BeeRoute",
      icon: Terminal
    },
    {
      id: "celik-mcu",
      title: "Çelik MCU // Yerli RISC-V C++ SDK",
      tag: "embedded",
      category: lang === "tr" ? "Gömülü Sistemler" : "Embedded & RTOS",
      desc: lang === "tr"
        ? "Beko & Yongatek ortaklığıyla üretilen ilk yerli RISC-V çipi Çelik MCU için modern C++20 SDK, FreeRTOS HAL katmanı ve bare-metal sürücüler."
        : "Modern C++20 SDK, FreeRTOS HAL layer and bare-metal drivers for Çelik MCU, the national Turkish RISC-V microcontroller.",
      tech: ["C++20", "RISC-V", "FreeRTOS", "HAL", "Bare-Metal"],
      stars: 62,
      repo: "https://github.com/bahattinyunus/Celik-MCU-SDK",
      icon: Cpu
    },
    {
      id: "feza-arsivi",
      title: "FezaArsivi // CubeSat & Radyo Astronomi",
      tag: "aviation",
      category: lang === "tr" ? "Uzay & Havacılık" : "Space & Aviation",
      desc: lang === "tr"
        ? "TÜBİTAK/TUA ve KAMP+ destekli radyo astronomi telemetri gözlem merkezi; CubeSat yörünge takibi ve spektrogram analiz kütüphanesi."
        : "Radio astronomy and CubeSat telemetry ground station framework supported by TÜBİTAK/TSA with spectrogram processing pipelines.",
      tech: ["Python", "SDR", "Spectrogram", "Doppler", "Radio Astronomy"],
      stars: 35,
      repo: "https://github.com/bahattinyunus/FezaArsivi",
      icon: Orbit
    },
    {
      id: "trabzon-proto",
      title: "Trabzon Protocol // Asenkron Telemetri",
      tag: "embedded",
      category: lang === "tr" ? "Telemetri & Ağ" : "Networking",
      desc: lang === "tr"
        ? "İnsansız deniz ve hava araçları için düşük bant genişlikli, asenkron ikili (binary) serileştirme ve hata toleranslı MQTT telemetri protokolü."
        : "Ultra-low-bandwidth binary serialization and fault-tolerant MQTT telemetry protocol for autonomous maritime and aerial platforms.",
      tech: ["C++", "MQTT", "Zero-Copy", "Binary Protocol", "CRC32"],
      stars: 41,
      repo: "https://github.com/bahattinyunus/Trabzon-Protocol",
      icon: Radio
    },
    {
      id: "aura-hockey",
      title: "Aura Hockey AR // 3D WebGL & MediaPipe",
      tag: "ai",
      category: lang === "tr" ? "Görüntü İşleme & WebGL" : "Vision & 3D",
      desc: lang === "tr"
        ? "MediaPipe el takibi ile tarayıcıda gerçek zamanlı oynanan 3D artırılmış gerçeklik masa hokeyi; Ankara AI Hackathon amiral gemisi."
        : "Browser-based 3D AR air hockey simulator powered by real-time MediaPipe hand tracking and Three.js physics shaders.",
      tech: ["Three.js", "MediaPipe", "WebGL", "TypeScript", "TensorFlow.js"],
      stars: 55,
      repo: "https://github.com/bahattinyunus/Aura-Hockey-AR",
      icon: Sparkles
    },
    {
      id: "math2code",
      title: "Math2Code // Matematiksel Modelleme Rehberi",
      tag: "algorithm",
      category: lang === "tr" ? "Matematik & Kodlama" : "Comp Math",
      desc: lang === "tr"
        ? "Diferansiyel denklemler, Fourier dönüşümleri ve tensör kalkülüsünü yüksek başarımlı C++ ve Python algoritmalarına dönüştürme başucu kaynağı (200+ Yıldız)."
        : "Comprehensive engineering guide translating differential equations, Fourier transforms and tensor calculus into high-performance code.",
      tech: ["LaTeX", "C++", "Python", "NumPy", "Scientific Computing"],
      stars: 215,
      repo: "https://github.com/bahattinyunus/Math2Code-A-Practical-Guide-for-Developers",
      icon: Code2
    }
  ];

  const tags = [
    { id: "all", label: lang === "tr" ? "Tümü" : "All" },
    { id: "aviation", label: lang === "tr" ? "Havacılık & İHA" : "Aero & UAV" },
    { id: "ai", label: lang === "tr" ? "Yapay Zeka & Vision" : "AI & Vision" },
    { id: "embedded", label: lang === "tr" ? "Gömülü & Donanım" : "Embedded & MCU" },
    { id: "algorithm", label: lang === "tr" ? "Algoritma & Matematik" : "Math & Optimization" },
  ];

  const filtered = useMemo(() => {
    let list = curatedList;
    if (selectedTag !== "all") {
      list = list.filter((p) => p.tag === selectedTag);
    }
    return showAll ? list : list.slice(0, 4);
  }, [selectedTag, showAll]);

  return (
    <div className="mt-16 pt-12 border-t border-line">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === "tr" ? "KÜRATÖRLÜ AÇIK KAYNAK CEPHANELİĞİ" : "CURATED OPEN-SOURCE ARSENAL"}</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
            {lang === "tr" ? "Amiral Gemisi Mühendislik Repoları" : "Flagship Engineering Repositories"}
          </h3>
          <p className="text-sm text-muted mt-1 max-w-xl">
            {lang === "tr"
              ? "Robotik, gömülü sistemler, optimizasyon ve kuantum/fizik algoritmaları üzerine seçkin açık kaynak depoları."
              : "Selected open-source repositories spanning robotics, embedded systems, heuristics, and mathematical physics."}
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {tags.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTag(t.id)}
              className={`px-3 py-1 rounded-full border transition-colors ${
                selectedTag === t.id
                  ? "border-accent/50 bg-accent/15 text-accent font-medium"
                  : "border-line bg-canvas/40 text-muted hover:text-ink hover:border-line/80"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Curated Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {filtered.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col justify-between p-6 rounded-2xl border border-line bg-surface/30 hover:border-accent/40 hover:bg-surface/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-3 text-xs font-mono text-faint mb-3">
                  <span className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-canvas/60 border border-line text-accent">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.category}</span>
                  </span>
                  <span className="flex items-center gap-1 text-yellow-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-yellow-400/30" />
                    <span>{item.stars}+</span>
                  </span>
                </div>

                <h4 className="font-display text-xl font-bold text-ink group-hover:text-accent transition-colors">
                  {item.title}
                </h4>

                <p className="mt-2.5 text-xs md:text-sm text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {item.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-canvas/60 text-faint border border-line"
                    >
                      {t}
                    </span>
                  ))}
                  {item.tech.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-faint">
                      +{item.tech.length - 3}
                    </span>
                  )}
                </div>

                <a
                  href={item.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line text-xs font-medium text-ink hover:bg-ink hover:text-canvas transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{lang === "tr" ? "Repo" : "Code"}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Show more toggle */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-line text-xs font-mono text-muted hover:text-accent hover:border-accent/40 transition-colors"
        >
          <span>
            {showAll
              ? lang === "tr" ? "Daha Az Göster" : "Show Less"
              : lang === "tr" ? `Daha Fazla Amiral Gemisi Repo Göster (+${curatedList.length - 4})` : `Show More Flagship Repos (+${curatedList.length - 4})`}
          </span>
        </button>
      </div>
    </div>
  );
};
