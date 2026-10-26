import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  MapPin,
  Calendar,
  Building,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
  Sparkles,
  Shield,
  Plane,
  Brain,
  Globe,
  Radio,
  Code2,
  Award,
} from "lucide-react";
import { FIELD_OPERATIONS, type FieldOperationItem } from "@/lib/linkedinData";

interface FieldOperationsGalleryProps {
  lang?: "tr" | "en";
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Savunma & Havacılık": <Plane className="w-4 h-4 text-emerald-400" />,
  "Uluslararası Diplomasi": <Globe className="w-4 h-4 text-blue-400" />,
  "Siber Savunma": <Shield className="w-4 h-4 text-rose-400" />,
  "Yapay Zekâ": <Brain className="w-4 h-4 text-purple-400" />,
  "Yapay Zekâ & Güvenlik": <Brain className="w-4 h-4 text-purple-400" />,
  "Uzay & Havacılık": <Radio className="w-4 h-4 text-cyan-400" />,
  "Robotik & Otonom": <Layers className="w-4 h-4 text-amber-400" />,
  "Eğitim Teknolojileri": <Code2 className="w-4 h-4 text-indigo-400" />,
  "Ar-Ge & İnovasyon": <Sparkles className="w-4 h-4 text-yellow-400" />,
};

export const FieldOperationsGallery: React.FC<FieldOperationsGalleryProps> = ({ lang = "tr" }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<FieldOperationItem | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    FIELD_OPERATIONS.forEach((op) => set.add(op.category));
    return ["all", ...Array.from(set)];
  }, []);

  const filteredOperations = useMemo(() => {
    if (selectedCategory === "all") return FIELD_OPERATIONS;
    return FIELD_OPERATIONS.filter((op) => op.category === selectedCategory);
  }, [selectedCategory]);

  const openLightbox = (op: FieldOperationItem, imgIdx: number = 0) => {
    setActiveItem(op);
    setModalImageIndex(imgIdx);
  };

  const closeLightbox = () => {
    setActiveItem(null);
    setModalImageIndex(0);
  };

  const nextModalImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!activeItem) return;
    setModalImageIndex((prev) => (prev + 1) % activeItem.images.length);
  };

  const prevModalImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!activeItem) return;
    setModalImageIndex((prev) => (prev - 1 + activeItem.images.length) % activeItem.images.length);
  };

  const t = {
    title: lang === "tr" ? "Saha Operasyonları & Canlı Görev Günlüğü" : "Field Operations & Mission Log",
    kicker:
      lang === "tr"
        ? "Gerçek saha verileri, kurum incelemeleri, hackathon maratonları ve uluslararası görevler"
        : "Real-world field observations, institutional missions, hackathon sprints and global summits",
    all: lang === "tr" ? "Tüm Görevler" : "All Missions",
    viewPhotos: lang === "tr" ? "Saha Fotoğraflarını İncele" : "View Field Photos",
    photosCount: lang === "tr" ? "Fotoğraf" : "Photos",
    fieldReport: lang === "tr" ? "Saha Raporu & Misyon Notu" : "Field Report & Mission Brief",
    verifiedBadge: lang === "tr" ? "Doğrulanmış Saha Görevi" : "Verified Field Mission",
  };

  return (
    <div className="relative mt-20 pt-12 border-t border-border/40">
      {/* Background aesthetic glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>{t.kicker}</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-bold font-display tracking-tight text-white flex items-center gap-3">
            {t.title}
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-normal">
              44+ Aktif Görsel
            </span>
          </h3>
        </div>

        {/* Categories / Filter pills */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 border flex items-center gap-1.5 whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-accent text-black border-accent font-semibold shadow-lg shadow-accent/20"
                  : "bg-surface/60 border-border/60 text-muted-foreground hover:text-white hover:border-border"
              }`}
            >
              {cat === "all" ? (
                <>
                  <Layers className="w-3 h-3" />
                  {t.all}
                </>
              ) : (
                <>
                  {CATEGORY_ICONS[cat] || <Sparkles className="w-3 h-3" />}
                  {cat}
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Operations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOperations.map((op, idx) => (
          <motion.article
            key={op.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            className="group relative flex flex-col rounded-2xl border border-border/60 bg-gradient-to-b from-surface/80 to-surface/40 backdrop-blur-md overflow-hidden hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5"
          >
            {/* Image Preview Carousel / Hero */}
            <div
              className="relative aspect-[16/10] w-full overflow-hidden bg-black/60 cursor-pointer"
              onClick={() => openLightbox(op, 0)}
            >
              <img
                src={op.images[0]}
                alt={op.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/30" />

              {/* Badges on image */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-black/75 backdrop-blur-md border border-white/10 text-white shadow">
                  {CATEGORY_ICONS[op.category]}
                  <span>{op.category}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-accent/90 text-black shadow">
                  <Award className="w-3 h-3" />
                  <span>{op.badge}</span>
                </span>
              </div>

              {/* Image counter indicator */}
              <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono bg-black/80 backdrop-blur-md border border-white/10 text-white/90">
                <Maximize2 className="w-3 h-3" />
                <span>
                  {op.images.length} {t.photosCount}
                </span>
              </div>
            </div>

            {/* Content area */}
            <div className="flex flex-col flex-1 p-5">
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mb-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-accent" />
                  {op.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  {op.location}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white group-hover:text-accent transition-colors line-clamp-2 mb-2">
                {op.title}
              </h4>

              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono mb-3">
                <Building className="w-3.5 h-3.5" />
                <span className="truncate">{op.organization}</span>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                {op.highlight}
              </p>

              {/* Action button */}
              <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between">
                <button
                  onClick={() => openLightbox(op, 0)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent hover:underline"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{t.viewPhotos}</span>
                </button>
                <span className="text-[11px] font-mono text-muted-foreground">
                  GÖREV #{op.folderId}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-surface border border-border/80 shadow-2xl overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-surface/90">
                <div className="flex items-center gap-3 pr-4">
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent">
                    {CATEGORY_ICONS[activeItem.category] || <Compass className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white leading-tight">
                      {activeItem.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mt-0.5">
                      <span>{activeItem.organization}</span>
                      <span>•</span>
                      <span>{activeItem.location}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-lg bg-surface/80 border border-border text-muted-foreground hover:text-white hover:bg-surface transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Image Viewer + Description */}
              <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Visual Section */}
                <div className="lg:col-span-7 bg-black/90 relative flex flex-col justify-center items-center min-h-[320px] md:min-h-[460px] p-4">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={activeItem.images[modalImageIndex]}
                      alt={activeItem.title}
                      className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-2xl"
                    />

                    {/* Navigation Buttons for multiple images */}
                    {activeItem.images.length > 1 && (
                      <>
                        <button
                          onClick={prevModalImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextModalImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  {activeItem.images.length > 1 && (
                    <div className="flex items-center gap-2 mt-4 max-w-full overflow-x-auto pb-1 scrollbar-none">
                      {activeItem.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setModalImageIndex(i)}
                          className={`relative w-14 h-14 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                            modalImageIndex === i ? "border-accent scale-105" : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={img} alt="thumb" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Narrative / Context Section */}
                <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-surface/50 border-t lg:border-t-0 lg:border-l border-border/60 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-accent">
                        {t.fieldReport}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        {activeItem.badge}
                      </span>
                    </div>

                    <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line font-sans">
                      {activeItem.fullStory}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Shield className="w-3.5 h-3.5" />
                      {t.verifiedBadge}
                    </span>
                    <span>
                      {modalImageIndex + 1} / {activeItem.images.length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
