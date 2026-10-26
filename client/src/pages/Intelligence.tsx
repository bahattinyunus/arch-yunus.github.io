import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Search, GraduationCap, Plane, Award, ShieldCheck, Compass, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { profileData } from "@/lib/data";
import { CertificationVault } from "@/components/cyber-ui/CertificationVault";
import { FieldOperationsGallery } from "@/components/portfolio/FieldOperationsGallery";

export function Intelligence() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "certs" | "education" | "field" | "articles">("all");

  const posts = useMemo(() => profileData.blog_posts.filter((post) => `${post.title} ${post.summary}`.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm]);

  return (
    <div className="space-y-12 pb-16">
      {/* Top Header */}
      <header className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
        <div>
          <div className="section-eyebrow flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-neon-blue" />
            <span>INTELLIGENCE & AKREDİTASYON MERKEZİ</span>
          </div>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight text-white font-[family-name:var(--font-display)]">
            AKADEMİK, TEKNİK & DOKTRİNEL ARŞİV
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 font-mono">
            Havacılık (İHA-1), Otonom Sistemler, Edge-AI, 266+ Lisans & Sertifika, Üniversite Eğitimleri ve Stratejik Mühendislik Doktrinleri.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "TÜMÜ" },
            { id: "certs", label: "266+ SERTİFİKA" },
            { id: "education", label: "EĞİTİM & PİLOTAJ" },
            { id: "field", label: "SAHA GÖREVLERİ (44+ FOTO)" },
            { id: "articles", label: "DOKTRİNLER & YAZILAR" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-mono rounded-lg border transition-all ${
                activeTab === tab.id
                  ? "border-neon-blue bg-neon-blue/20 text-neon-blue font-bold shadow-[0_0_12px_rgba(0,243,255,0.25)]"
                  : "border-white/10 text-white/50 hover:text-white hover:border-white/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Academic Education & Aviation Accreditations */}
      {(activeTab === "all" || activeTab === "education") && (
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-l-2 border-neon-blue/60 px-4">
            <GraduationCap className="w-6 h-6 text-neon-blue" />
            <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-white">
              AKADEMİK EĞİTİM & HAVACILIK AKREDİTASYONLARI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {profileData.education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 bg-white/[0.03] border border-white/10 hover:border-neon-blue/40 rounded-2xl transition-all relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-neon-blue mb-3">
                  <span className="px-2 py-0.5 rounded bg-neon-blue/10 border border-neon-blue/30">{edu.degree}</span>
                  <span className="text-white/40">{edu.period || edu.status}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{edu.school}</h3>
                <p className="text-xs font-mono text-emerald-400 font-semibold mb-3">{edu.field}</p>
                <p className="text-xs font-mono text-white/60 leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>

          {/* Aviation & Specialized Licenses */}
          <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
            <h3 className="text-sm font-mono text-white/60 uppercase tracking-widest flex items-center gap-2">
              <Plane className="w-4 h-4 text-neon-blue" /> HAVACILIK, UZAY & ÖZEL PİLOTAJ LİSANSLARI
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {profileData.aviation_accreditations.map((item, i) => (
                <div key={i} className="p-3 bg-black/50 border border-white/10 rounded-xl space-y-1">
                  <div className="text-[10px] font-mono text-neon-blue">{item.category}</div>
                  <div className="text-xs font-bold text-white">{item.badge}</div>
                  <div className="text-[10px] font-mono text-white/40">{item.issuer}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 120+ Certification Vault */}
      {(activeTab === "all" || activeTab === "certs") && (
        <CertificationVault />
      )}

      {/* Medium Technical Doctrine Articles */}
      
      {/* Field Operations & Real Missions Gallery */}
      {(activeTab === "all" || activeTab === "field") && (
        <section className="space-y-6">
          <FieldOperationsGallery lang="tr" />
        </section>
      )}

      {(activeTab === "all" || activeTab === "articles") && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-2 border-emerald-400/60 px-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-white">
                MÜHENDİSLİK DOKTRİNLERİ & TEKNİK YAZILAR
              </h2>
            </div>
            <label className="relative block w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35" size={14} />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Yazılarda ara..."
                className="w-full rounded-lg border border-white/12 bg-white/[.04] py-2 pl-9 pr-4 text-xs font-mono text-white outline-none transition placeholder:text-white/30 focus:border-emerald-400/50"
              />
            </label>
          </div>

          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.a
                key={post.title}
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-5 rounded-2xl border border-white/10 bg-white/[.03] p-4 transition hover:border-emerald-400/40 hover:bg-white/[.05] md:grid-cols-[190px_1fr_auto] md:items-center md:p-5"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <div className="h-32 overflow-hidden rounded-xl bg-[#19201d] md:h-28">
                  <img src={post.image} alt="" className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                    <BookOpen size={13} /> {post.date}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-white transition group-hover:text-emerald-400">{post.title}</h3>
                  <p className="mt-1 max-w-2xl text-xs font-mono leading-relaxed text-white/60">{post.summary}</p>
                </div>
                <ArrowUpRight className="hidden text-white/30 transition group-hover:text-emerald-400 md:block" size={20} />
              </motion.a>
            ))}
            {posts.length === 0 && <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center text-white/45 font-mono text-xs">Aramanla eşleşen bir doktrin/yazı bulunamadı.</div>}
          </div>
        </section>
      )}
    </div>
  );
}

