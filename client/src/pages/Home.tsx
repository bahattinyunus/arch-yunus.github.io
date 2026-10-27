import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  createContext,
  useContext,
} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowDown,
  Github,
  Mail,
  Copy,
  Check,
  MapPin,
  Cpu,
  Code2,
  Lock,
  Search,
  Menu,
  X,
  Award,
  BadgeCheck,
  Calendar,
  Languages,
  Linkedin,
  Sparkles,
  Star,
  FolderGit2,
  Users,
  Globe,
  ChevronLeft,
  ChevronRight,
  Orbit,
  Plane,
  BrainCircuit,
  Brain,
  Shield,
  Activity,
  Terminal as TerminalIcon,
  ExternalLink,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import { CONTENT, IDENTITY } from "@/lib/portfolioContent";
import { ProjectVisualMock } from "@/components/portfolio/ProjectMockups";
import { CyberLabsModal, type CyberLabType } from "@/components/portfolio/CyberLabsModal";
import { CuratedProjects } from "@/components/portfolio/CuratedProjects";
import { FieldOperationsGallery } from "@/components/portfolio/FieldOperationsGallery";
import { CertificationVault } from "@/components/cyber-ui/CertificationVault";
import { ALL_CERTIFICATES } from "@/lib/certificatesData";
import { VanguardAI } from "@/components/cyber-ui/VanguardAI";
import { CyberFieldCanvas } from "@/components/cyber-ui/CyberFieldCanvas";
import { BeeRouteSimulator } from "@/components/cyber-ui/BeeRouteSimulator";
import { useCyberSound } from "@/hooks/use-cyber-sound";

const SECTION_IDS = [
  "anasayfa",
  "hakkimda",
  "yetenekler",
  "projeler",
  "sertifikalar",
  "terminal",
  "iletisim",
];

const NAV_KEYS = [
  { key: "about", href: "#hakkimda" },
  { key: "skills", href: "#yetenekler" },
  { key: "projects", href: "#projeler" },
  { key: "certificates", href: "#sertifikalar" },
  { key: "terminal", href: "#terminal" },
  { key: "contact", href: "#iletisim" },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const WRAP = "mx-auto w-full max-w-[1380px] px-6 md:px-10";

const NAV_ACTION_INDICATOR =
  "hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const STATEMENT_TONE_CLASS = {
  normal: "",
  muted: "text-muted",
  accent: "text-accent font-medium",
};

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ================================================================== */
/*  Dil Yönetimi (Context)                                             */
/* ================================================================== */
type LangType = "tr" | "en";
interface LangContextType {
  lang: LangType;
  setLang: (lang: LangType) => void;
  t: typeof CONTENT.tr;
}

const LangCtx = createContext<LangContextType>({
  lang: "tr",
  setLang: () => {},
  t: CONTENT.tr,
});
const useLang = () => useContext(LangCtx);

/* ================================================================== */
/*  Yardımcı Bileşenler ve Hook'lar                                    */
/* ================================================================== */
function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  x = 0,
  once = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 1.2, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  index,
  title,
  kicker,
}: {
  index: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-accent">({index})</span>
        <h2 className="font-display text-[clamp(2.2rem,5.5vw,3.75rem)] font-semibold leading-none tracking-tight text-ink">
          {title}
        </h2>
      </div>
      {kicker && (
        <span className="hidden max-w-[26ch] text-right text-sm leading-snug text-muted sm:block">
          {kicker}
        </span>
      )}
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-accent"
    />
  );
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

// GitHub Canlı Verisi (Stats + Repolar)
function useGithub(user: string, fallback: typeof IDENTITY.statsFallback) {
  const [data, setData] = useState({ stats: fallback, repos: [] as any[] });
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [reposRes, userRes] = await Promise.all([
          fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`),
          fetch(`https://api.github.com/users/${user}`),
        ]);
        if (!reposRes.ok || !userRes.ok) return;
        const repos = await reposRes.json();
        const u = await userRes.json();
        const list = Array.isArray(repos) ? repos : [];
        const stars = list.reduce(
          (s: number, r: any) => s + (r.stargazers_count || 0),
          0
        );
        if (active) {
          setData({
            stats: {
              repos: u.public_repos ?? fallback.repos,
              stars: stars > 0 ? stars : fallback.stars,
              followers: u.followers ?? fallback.followers,
            },
            repos: list,
          });
        }
      } catch {
        /* Ağ hatası durumunda fallback değerlerde kal */
      }
    })();
    return () => {
      active = false;
    };
  }, [user, fallback]);
  return data;
}

/* ================================================================== */
/*  Navigasyon & Dil Seçici & Mobil Menü                               */
/* ================================================================== */
function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "tr" ? "en" : "tr")}
      aria-label="Dil değiştir / Switch language"
      className={`inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors ${NAV_ACTION_INDICATOR} ${className}`}
    >
      <Globe className="h-3.5 w-3.5 text-accent" />
      {lang === "tr" ? "EN" : "TR"}
    </button>
  );
}

const IS_MAC =
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad|iPod/.test(navigator.platform || "");
const META_LABEL = IS_MAC ? "⌘" : "Ctrl";

function Navbar({ onOpenLab }: { onOpenLab?: (type: CyberLabType) => void }) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SECTION_IDS);
  const { playSound, isAmbientPlaying, toggleAmbient } = useCyberSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
            <header className="fixed inset-x-0 top-3 md:top-5 z-50 px-4 md:px-8 pointer-events-none">
        <nav className="mx-auto max-w-7xl pointer-events-auto flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3 rounded-full border border-white/10 bg-[#08080a]/85 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all">
          <a href="#anasayfa" className="inline-flex items-center gap-3 group">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-accent shadow-[0_0_10px_rgba(214,255,63,0.8)]" />
            </span>
            <span className="font-display text-sm md:text-base font-bold tracking-tight text-white group-hover:text-accent transition-colors">
              bahattinyunus
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> ODTÜ BÖTE & Hacettepe
            </span>
          </a>

          <div className="hidden min-w-0 items-center gap-4 xl:flex 2xl:gap-6">
            {NAV_KEYS.map((n) => {
              const isActive = active === n.href.slice(1);
              return (
                <a
                  key={n.href}
                  href={n.href}
                  className={`relative px-2 py-1 text-xs font-mono transition-colors ${
                    isActive ? "text-accent font-semibold" : "text-white/60 hover:text-white"
                  }`}
                >
                  {(t.nav as any)[n.key]}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-2 right-2 h-0.5 rounded-full bg-accent shadow-[0_0_8px_rgba(214,255,63,0.8)]"
                    />
                  )}
                </a>
              );
            })}

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-cmdk"))}
              aria-label={t.cmd.placeholder}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition-all hover:bg-white/10 hover:text-white hover:border-white/20"
            >
              <Search className="h-3.5 w-3.5 text-accent" />
              <kbd className="font-mono text-[10px] tracking-wide text-white/40">
                {META_LABEL} K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => {
                toggleAmbient();
                playSound("click");
              }}
              title={isAmbientPlaying ? "Mute Cyber Audio Synth" : "Enable Procedural Cyber Audio"}
              aria-label="Ses efektlerini aç/kapat"
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all ${
                isAmbientPlaying
                  ? "border-accent/60 bg-accent/15 text-accent shadow-[0_0_12px_rgba(214,255,63,0.3)]"
                  : "border-white/10 text-white/50 hover:border-white/20 hover:text-white"
              }`}
            >
              {isAmbientPlaying ? (
                <Volume2 className="h-3.5 w-3.5 text-accent animate-pulse" />
              ) : (
                <VolumeX className="h-3.5 w-3.5 text-white/40" />
              )}
              <span className="hidden 2xl:inline font-mono text-[10px]">
                {isAmbientPlaying ? "AUDIO: ON" : "AUDIO: OFF"}
              </span>
            </button>

            <LangSwitch />

            <a
              href="/operations"
              aria-label="Siber Operasyonlar Paneli"
              className="inline-flex min-h-8 shrink-0 items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 text-xs font-mono text-accent hover:bg-accent/20 transition-all shadow-[0_0_15px_rgba(214,255,63,0.15)]"
            >
              <TerminalIcon className="h-3.5 w-3.5" />
              <span>{t.nav.login}</span>
            </a>

            <a
              href={`mailto:${IDENTITY.email}`}
              className="inline-flex min-h-8 shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 text-xs font-mono text-white hover:bg-white/10 hover:border-white/30 transition-all"
            >
              <Mail className="h-3.5 w-3.5 text-accent" />
              <span>{t.nav.mail}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={() => {
                toggleAmbient();
                playSound("click");
              }}
              aria-label="Ses"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white hover:bg-white/5"
            >
              {isAmbientPlaying ? (
                <Volume2 className="h-4 w-4 text-accent animate-pulse" />
              ) : (
                <VolumeX className="h-4 w-4 text-white/40" />
              )}
            </button>
            <LangSwitch />
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Menüyü aç/kapat"
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white hover:bg-white/5"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobil Menü */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-canvas/95 backdrop-blur-xl xl:hidden"
          >
            <div className={`${WRAP} flex h-16 items-center justify-between`}>
              <span className="font-display font-medium text-ink">bahattinyunus</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Kapat"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className={`${WRAP} flex flex-1 flex-col justify-center gap-3`}>
              {NAV_KEYS.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, ease: EASE, duration: 0.5 }}
                  className="font-display text-4xl tracking-tight text-ink/90 transition-colors hover:text-accent"
                >
                  {(t.nav as any)[n.key]}
                </motion.a>
              ))}

              <motion.a
                href="/operations"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + NAV_KEYS.length * 0.05,
                  ease: EASE,
                  duration: 0.5,
                }}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-line px-5 py-3 text-base font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <TerminalIcon className="h-4 w-4 text-accent" /> {t.nav.login}
              </motion.a>

              <motion.a
                href={`mailto:${IDENTITY.email}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 + NAV_KEYS.length * 0.05,
                  ease: EASE,
                  duration: 0.5,
                }}
                className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-base font-medium text-canvas"
              >
                <Mail className="h-4 w-4" /> {IDENTITY.email}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================================================================== */
/*  HERO Bölümü                                                        */
/* ================================================================== */
const headlineParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
};
const charChild = {
  hidden: { y: "120%", opacity: 0, filter: "blur(12px)" },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: EASE },
  },
};

function AnimatedWord({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <motion.span key={i} variants={charChild} className="inline-block">
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </>
  );
}

function Hero({ onOpenLab }: { onOpenLab?: (type: CyberLabType) => void }) {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="anasayfa"
      ref={ref}
      className={`${WRAP} relative flex min-h-screen flex-col justify-center pb-16 pt-28`}
    >
      <motion.div style={{ y, opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mb-8 flex flex-wrap items-center gap-3 text-sm"
        >
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md font-mono text-xs text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </span>
            <span className="text-white/90 font-medium">AKTİF GÖREVDE</span>
            <span className="text-white/30">|</span>
            <span className="text-accent">ODTÜ BÖTE & HACETTEPE</span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-white/50 hidden sm:inline-flex items-center gap-1">
              <MapPin className="h-3 w-3 text-accent" /> Ankara, TR
            </span>
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
            className="pointer-events-none absolute -left-[5%] top-1/2 -z-10 h-[140%] w-[55%] -translate-y-1/2 rounded-full opacity-[0.14] blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
            }}
          />
          <motion.h1
            variants={headlineParent}
            initial="hidden"
            animate="show"
            aria-label={`${IDENTITY.name}.`}
            className="relative font-display text-[clamp(2.8rem,11.5vw,10.5rem)] font-bold leading-[0.88] tracking-[-0.035em] text-ink"
          >
            <span aria-hidden className="block overflow-hidden pb-[0.06em]">
              <span className="block">
                <AnimatedWord text={IDENTITY.firstName} />
              </span>
            </span>
            <span aria-hidden className="block overflow-hidden pb-[0.06em]">
              <span className="block">
                <AnimatedWord text={IDENTITY.lastName} />
                <motion.span variants={charChild} className="inline-block text-accent">
                  <motion.span
                    className="inline-block"
                    animate={{ opacity: [1, 0.35, 1], scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5,
                    }}
                  >
                    .
                  </motion.span>
                </motion.span>
              </span>
            </span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.2, ease: EASE }}
          className="mt-12 flex flex-col gap-8 border-t border-line pt-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl space-y-4">
            <div>
              <p className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                {t.hero.role}
              </p>
              <p className="mt-2 leading-relaxed text-white/60 md:text-base font-mono">
                {t.hero.tagline}
              </p>
            </div>

            {/* Modern Hero Bento Stat Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
                <span className="text-xl font-bold font-mono text-accent block">20 / 66.500+</span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{lang === "tr" ? "Fransa Değişimi" : "Youth Exchange"}</span>
              </div>
              <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
                <span className="text-xl font-bold font-mono text-emerald-400 block">266+</span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{lang === "tr" ? "Resmi Sertifika" : "Certificates"}</span>
              </div>
              <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
                <span className="text-xl font-bold font-mono text-neon-blue block">13 Saha Görevi</span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{lang === "tr" ? "ASELSAN & TUA & Siber" : "Field Operations"}</span>
              </div>
              <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
                <span className="text-xl font-bold font-mono text-amber-400 block">SHGM İHA-1</span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{lang === "tr" ? "Pilot Lisansı" : "UAV Pilot License"}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projeler"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-canvas transition hover:opacity-90"
              >
                {t.hero.ctaProjects}
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="/cv3.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-5 py-3.5 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20 hover:border-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.18)]"
              >
                <Award className="h-4 w-4 text-emerald-400 transition-transform group-hover:scale-110" />
                <span>{lang === "tr" ? "Resmi CV (PDF)" : "Official CV (PDF)"}</span>
              </a>
              <a
                href="#iletisim"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3.5 text-sm font-medium text-ink transition hover:bg-surface"
              >
                {t.hero.ctaContact}
              </a>
            </div>

            {/* Hizli Canli Simulatör Başlatıcıları */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => onOpenLab?.("tulpar")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neon-blue/40 bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20 transition-all shadow-[0_0_15px_rgba(0,243,255,0.12)]"
              >
                <Plane className="h-3.5 w-3.5 animate-pulse" />
                <span>🛫 {lang === "tr" ? "Uçuş Simülatörü (HUD)" : "Flight Deck HUD"}</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenLab?.("budak")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-all shadow-[0_0_15px_rgba(234,179,8,0.12)]"
              >
                <Zap className="h-3.5 w-3.5 animate-pulse" />
                <span>⚡ {lang === "tr" ? "Edge-AI Lab (%80)" : "Edge-AI Lab"}</span>
              </button>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("toggle-vanguard"))}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line bg-surface/80 text-muted hover:text-ink hover:border-accent/40 transition-colors"
              >
                <Brain className="h-3.5 w-3.5 text-accent" />
                <span>🧠 {lang === "tr" ? "Vanguard AI" : "Vanguard AI"}</span>
              </button>
              <a
                href="#sertifikalar"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all shadow-[0_0_15px_rgba(16,185,129,0.12)]"
              >
                <Award className="h-3.5 w-3.5 text-emerald-400" />
                <span>📜 {lang === "tr" ? "266+ Lisans & Sertifika" : "266+ Cert Vault"}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ================================================================== */
/*  Kayan Åerit (Marquee Ticker)                                       */
/* ================================================================== */
function Marquee() {
  const { t } = useLang();
  const items = t.marquee;
  return (
    <div
      className="relative overflow-hidden border-y border-line py-5 bg-surface/30"
      aria-label="Yetenek şeridi"
    >
      <div className="flex w-max items-center gap-10">
        <div className="flex w-max animate-marquee items-center gap-10 will-change-transform">
          {items.map((item, idx) => (
            <span key={idx} className="flex items-center gap-10">
              <span className="font-display text-base uppercase tracking-wider text-muted">
                {item}
              </span>
              <span className="text-accent text-xs">✦</span>
            </span>
          ))}
        </div>
        <div
          className="flex w-max animate-marquee items-center gap-10 will-change-transform"
          aria-hidden="true"
        >
          {items.map((item, idx) => (
            <span key={`dup-${idx}`} className="flex items-center gap-10">
              <span className="font-display text-base uppercase tracking-wider text-muted">
                {item}
              </span>
              <span className="text-accent text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Hakkımda (About)                                                   */
/* ================================================================== */
function About() {
  const { t } = useLang();
  const a = t.about;
  return (
    <section id="hakkimda" className={`${WRAP} scroll-mt-28 py-28 md:py-40`}>
      <Reveal>
        <SectionHeader index={a.index} title={a.title} kicker={a.kicker} />
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="font-display text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.2] tracking-tight text-ink">
              {a.statement.map((segment, i) => (
                <span
                  key={i}
                  className={STATEMENT_TONE_CLASS[segment.tone] || ""}
                >
                  {segment.text}
                </span>
              ))}
            </p>
          </Reveal>

          <div className="mt-10 max-w-2xl space-y-5 leading-relaxed text-muted md:text-lg">
            {a.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.06 + i * 0.05}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <Reveal delay={0.1} y={0} x={60}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {a.facts.map((f) => (
                <div key={f.label} className="bg-surface p-5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-faint">
                    {f.label}
                  </div>
                  <div className="mt-2 font-display text-base font-semibold leading-snug text-ink">
                    {f.value}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Felsefi Pusula & Mühendislik Doktrini Kartları */}
      <Reveal delay={0.15}>
        <div className="mt-16 pt-12 border-t border-line">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EPİSTEMOLOJİK PUSULA // PHILOSOPHICAL COMPASS</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
                Mühendisliğin Ontolojik ve Felsefi İlkeleri
              </h3>
            </div>
            <a
              href="/doctrine"
              className="inline-flex items-center gap-2 text-xs font-mono text-accent hover:underline"
            >
              Tam Doktrin Manifestosu (/doctrine) <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl border border-line bg-surface/40 hover:border-accent/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-faint uppercase block mb-2">01 // TERMODİNAMİK</span>
                <h4 className="font-display text-lg font-bold text-ink">Entropiye Karşı Düzen</h4>
                <p className="mt-2 text-xs text-muted leading-relaxed">
                  Evrenin kaçınılmaz dağılma eğilimine karşı, deterministik C++ bellek yönetimiyle yerel bir düzen vahası kurmak.
                </p>
              </div>
              <span className="text-[10px] font-mono text-accent mt-4">“Kod, kaosa çekilen sınırdır.”</span>
            </div>

            <div className="p-6 rounded-2xl border border-line bg-surface/40 hover:border-accent/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-faint uppercase block mb-2">02 // VIA NEGATIVA</span>
                <h4 className="font-display text-lg font-bold text-ink">Eksiltme ile Zekâ</h4>
                <p className="mt-2 text-xs text-muted leading-relaxed">
                  Budak Doktrini: Mermerden heykeli çıkarmak gibi; %80 model budama bir tasarruf değil, gürültüden arınmadır.
                </p>
              </div>
              <span className="text-[10px] font-mono text-accent mt-4">“Zekâ, vazgeçebildiklerinizdedir.”</span>
            </div>

            <div className="p-6 rounded-2xl border border-line bg-surface/40 hover:border-accent/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-faint uppercase block mb-2">03 // DUALİTE</span>
                <h4 className="font-display text-lg font-bold text-ink">Determinizm & Sezgi</h4>
                <p className="mt-2 text-xs text-muted leading-relaxed">
                  RTOS mikrodenetleyicisinin katı mantığı ile PyTorch olasılıksal latent uzayının hibrit sentezi.
                </p>
              </div>
              <span className="text-[10px] font-mono text-accent mt-4">“0-1 zemin, olasılık kubbedir.”</span>
            </div>

            <div className="p-6 rounded-2xl border border-line bg-surface/40 hover:border-accent/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-faint uppercase block mb-2">04 // ONTOLOJİ</span>
                <h4 className="font-display text-lg font-bold text-ink">Teknolojik Egemenlik</h4>
                <p className="mt-2 text-xs text-muted leading-relaxed">
                  Başkasının çipinde ve bulutunda koşan zihin özgür değildir. Yerli RISC-V çipi ve bağımsız model mimarisi.
                </p>
              </div>
              <span className="text-[10px] font-mono text-accent mt-4">“Kendi çekirdeğini yazan kazanır.”</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  Yetenekler (Skills) Bento Grid                                     */
/* ================================================================== */
function FeatureCard({ item }: { item: any }) {
  const getIcon = (name: string) => {
    switch (name) {
      case "Plane":
        return <Plane className="h-6 w-6" />;
      case "BrainCircuit":
        return <BrainCircuit className="h-6 w-6" />;
      case "Cpu":
        return <Cpu className="h-6 w-6" />;
      case "Shield":
        return <Shield className="h-6 w-6" />;
      default:
        return <Cpu className="h-6 w-6" />;
    }
  };

  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface/50 p-8 transition-colors duration-500 hover:border-[#3a3a44]">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-elevated text-accent transition-transform duration-500 group-hover:-rotate-6">
          {getIcon(item.icon)}
        </div>
        <ArrowUpRight className="h-5 w-5 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
      <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-ink">
        {item.title}
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{item.desc}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {item.tags.map((tag: string) => (
          <span
            key={tag}
            className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillTile({ item, certifiedLabel }: { item: any; certifiedLabel: string }) {
  const getIcon = (name: string) => {
    switch (name) {
      case "Code2":
        return <Code2 className="h-7 w-7" />;
      case "Cpu":
        return <Cpu className="h-7 w-7" />;
      case "Orbit":
        return <Orbit className="h-7 w-7" />;
      case "Gamepad2":
        return <Brain className="h-7 w-7" />;
      case "Brain":
        return <Brain className="h-7 w-7" />;
      case "Terminal":
        return <TerminalIcon className="h-7 w-7" />;
      default:
        return <Cpu className="h-7 w-7" />;
    }
  };

  return (
    <div className="group h-full rounded-2xl border border-line bg-surface/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#3a3a44] hover:bg-surface">
      <div className="flex items-start justify-between">
        <div className="text-muted transition-colors group-hover:text-accent">
          {getIcon(item.icon)}
        </div>
        {item.certified && (
          <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-accent">
            <BadgeCheck className="h-3 w-3" /> {certifiedLabel}
          </span>
        )}
      </div>
      <div className="mt-8 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
        {item.name}
      </div>
      <div className="mt-1.5 font-mono text-xs text-faint">{item.note}</div>
    </div>
  );
}

function Skills() {
  const { t } = useLang();
  const s = t.skills;
  const certifiedLabel = t.certificates.verified;

  return (
    <section id="yetenekler" className={`${WRAP} scroll-mt-28 py-28 md:py-40`}>
      <Reveal>
        <SectionHeader index={s.index} title={s.title} kicker={s.kicker} />
      </Reveal>

      {/* Focus Areas */}
      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
        {s.focus.map((f, i) => (
          <Reveal
            key={f.title}
            delay={i * 0.06}
            y={0}
            x={i % 2 === 0 ? -60 : 60}
          >
            <FeatureCard item={f} />
          </Reveal>
        ))}
      </div>

      {/* Language / Stack Bento */}
      <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {s.languages.map((l, i) => (
          <Reveal
            key={l.name}
            delay={i * 0.05}
            y={0}
            x={i % 2 === 0 ? -50 : 50}
            className={l.width === "wide" ? "col-span-2 lg:col-span-2" : ""}
          >
            <SkillTile item={l} certifiedLabel={certifiedLabel} />
          </Reveal>
        ))}
      </div>

      {/* Grouped Library List */}
      <Reveal delay={0.1}>
        <div className="mt-5 rounded-2xl border border-line bg-surface/40 p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-faint font-mono">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> {s.moreLabel}
          </div>
          <div className="mt-6 divide-y divide-line">
            {s.more.map((g) => (
              <div
                key={g.group}
                className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 md:flex-row md:items-center md:gap-6"
              >
                <div className="flex items-center gap-2.5 md:w-64 md:shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-sm font-semibold text-ink">{g.group}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it.name}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas/60 px-3 py-1.5 text-xs text-muted"
                    >
                      {it.name}
                      {it.certified && (
                        <BadgeCheck className="h-3.5 w-3.5 text-accent" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  GitHub Canlı İstatistikleri                                         */
/* ================================================================== */
function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) {
      setDisplay(0);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
}

function GithubStats({ stats }: { stats: typeof IDENTITY.statsFallback }) {
  const { t } = useLang();
  const labels = t.projects.stats;
  const cards = [
    { icon: FolderGit2, value: stats.repos, label: labels.repos },
    { icon: Star, value: stats.stars, label: labels.stars },
    { icon: Users, value: stats.followers, label: labels.followers },
  ];
  return (
    <Reveal>
      <div className="mt-16 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
        {cards.map((c) => (
          <a
            key={c.label}
            href={IDENTITY.github}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-1 bg-surface p-5 transition-colors hover:bg-elevated md:p-7"
          >
            <c.icon className="h-5 w-5 text-accent" />
            <div className="mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              <Counter value={c.value} />
              {c.value > 0 && <span className="text-accent">+</span>}
            </div>
            <div className="text-xs uppercase tracking-wider text-faint font-mono">
              {c.label}
            </div>
          </a>
        ))}
      </div>
    </Reveal>
  );
}

function ContributionGraph() {
  const { t } = useLang();
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <Reveal>
      <div className="mt-5 rounded-2xl border border-line bg-surface/40 p-6 md:p-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-faint font-mono">
          <Github className="h-3.5 w-3.5 text-accent" /> {t.projects.contributions}
        </div>
        <div className="mt-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <img
            src={`https://ghchart.rshah.org/d6ff3f/${IDENTITY.githubUser}`}
            alt={t.projects.contributions}
            loading="lazy"
            onError={() => setOk(false)}
            className="w-full min-w-[680px] opacity-90"
          />
        </div>
      </div>
    </Reveal>
  );
}

/* ================================================================== */
/*  Projeler (Projects)                                                */
/* ================================================================== */
function ProjectCard({
  project,
  num,
  reverse,
  viewLabel,
  statusLabel,
  onOpenLab,
  lang = "tr",
}: {
  project: any;
  num: string;
  reverse: boolean;
  viewLabel: string;
  statusLabel: string;
  onOpenLab?: (type: CyberLabType) => void;
  lang?: "tr" | "en";
}) {
  return (
    <Reveal y={0} x={reverse ? 80 : -80}>
      <article className="group grid grid-cols-1 items-center gap-8 rounded-3xl border border-line bg-surface/30 p-6 transition-colors duration-500 hover:border-[#383842] md:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
        <div className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
          <ProjectVisualMock type={project.visualType} />
        </div>

        <div className={`lg:col-span-6 ${reverse ? "lg:order-1" : ""}`}>
          <div className="flex flex-wrap items-center gap-3 text-xs text-faint font-mono">
            <span className="text-accent">({num})</span>
            <span className="h-px w-8 bg-line" />
            <span className="text-muted">{project.type}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span className="ml-auto rounded-full border border-line px-2.5 py-0.5 text-[10px]">
              {project.license}
            </span>
          </div>

          <h3 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[0.95] tracking-tight text-ink">
            {project.name}
          </h3>

          <div className="mt-4 flex flex-wrap gap-2" aria-label={statusLabel}>
            {project.status.map((st: string, i: number) => (
              <span
                key={st}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-mono ${
                  i === 0
                    ? "border-accent/25 bg-accent/10 text-accent font-medium"
                    : "border-line bg-canvas/40 text-muted"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    i === 0 ? "bg-accent" : "bg-faint"
                  }`}
                />
                {st}
              </span>
            ))}
          </div>

          <p className="mt-4 max-w-xl leading-relaxed text-muted md:text-base">
            {project.description}
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {project.features.map((f: string) => (
              <li key={f} className="flex items-start gap-2.5 text-xs text-ink/85">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((stk: string) => (
              <span
                key={stk}
                className="rounded-full border border-line bg-canvas/60 px-3 py-1 font-mono text-xs text-muted"
              >
                {stk}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="group/btn inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-canvas"
            >
              <Github className="h-4 w-4" /> {viewLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </a>

            {(project.id === "tulpar-aero" || project.visualType === "tulpar") && (
              <button
                type="button"
                onClick={() => onOpenLab?.("tulpar")}
                className="inline-flex items-center gap-2 rounded-full border border-neon-blue/60 bg-neon-blue/15 px-4 py-2.5 text-xs font-mono font-semibold text-neon-blue hover:bg-neon-blue hover:text-black transition-all shadow-[0_0_20px_rgba(0,243,255,0.2)]"
              >
                <Plane className="h-3.5 w-3.5 animate-pulse" />
                <span>{lang === "tr" ? "Canlı Uçuş Telemetrisi (HUD)" : "Launch Flight Deck HUD"}</span>
              </button>
            )}

            {(project.id === "budak-edge" || project.visualType === "budak") && (
              <button
                type="button"
                onClick={() => onOpenLab?.("budak")}
                className="inline-flex items-center gap-2 rounded-full border border-yellow-500/60 bg-yellow-500/15 px-4 py-2.5 text-xs font-mono font-semibold text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)]"
              >
                <Zap className="h-3.5 w-3.5 animate-pulse" />
                <span>{lang === "tr" ? "%80 Model Budama Lab'ını Test Et" : "Test Edge-AI Pruning Lab"}</span>
              </button>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function MoreRepos({
  repos,
  labels,
}: {
  repos: any[];
  labels: typeof CONTENT.tr.projects.more;
}) {
  if (!repos.length) return null;
  return (
    <Reveal delay={0.1}>
      <div className="mt-14 md:mt-20">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-faint font-mono">
          <Sparkles className="h-3.5 w-3.5 text-accent" /> {labels.title}
        </div>
        <p className="mt-2 text-sm text-muted">{labels.subtitle}</p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repos.slice(0, 6).map((r) => (
            <a
              key={r.id}
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-line bg-surface/40 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#383842] hover:bg-surface"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2 font-medium text-ink">
                  <FolderGit2 className="h-4 w-4 shrink-0 text-accent" />
                  <span className="truncate">{r.name}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
              <p className="mt-3 line-clamp-2 flex-1 text-xs text-muted">
                {r.description || labels.noDesc}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs font-mono text-faint">
                {r.language && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {r.language}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3" /> {r.stargazers_count}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6">
          <a
            href={IDENTITY.github}
            target="_blank"
            rel="noreferrer"
            className="group/btn inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <Github className="h-4 w-4" /> {labels.viewAll}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function Projects({ onOpenLab }: { onOpenLab?: (type: CyberLabType) => void }) {
  const { t, lang } = useLang();
  const p = t.projects;
  const { stats, repos } = useGithub(IDENTITY.githubUser, IDENTITY.statsFallback);

  return (
    <section id="projeler" className={`${WRAP} scroll-mt-28 py-28 md:py-40`}>
      <Reveal>
        <SectionHeader index={p.index} title={p.title} kicker={p.kicker} />
      </Reveal>

      <GithubStats stats={stats} />
      <ContributionGraph />

      <div className="mt-12 space-y-10 md:mt-16 md:space-y-14">
        {p.items.map((proj, i) => (
          <ProjectCard
            key={proj.id}
            project={proj}
            num={String(i + 1).padStart(2, "0")}
            reverse={i % 2 === 1}
            viewLabel={p.view}
            statusLabel={p.statusLabel}
            onOpenLab={onOpenLab}
            lang={lang}
          />
        ))}
      </div>

      <div className="mt-16">
        <BeeRouteSimulator />
      </div>
      <CuratedProjects lang={lang} onOpenLab={onOpenLab} />

      <FieldOperationsGallery lang={lang} />

      <MoreRepos repos={repos} labels={p.more} />
    </section>
  );
}

/* ================================================================== */
/*  Sertifikalar (Certificates) Snap Carousel                          */
/* ================================================================== */
function CertificateCard({ cert, labels }: { cert: any; labels: any }) {
  const getIcon = (name: string) => {
    switch (name) {
      case "Plane":
        return <Plane className="h-6 w-6" />;
      case "Orbit":
        return <Orbit className="h-6 w-6" />;
      case "Shield":
        return <Shield className="h-6 w-6" />;
      case "Brain":
        return <Brain className="h-6 w-6" />;
      case "Code2":
        return <Code2 className="h-6 w-6" />;
      default:
        return <Award className="h-6 w-6" />;
    }
  };

  return (
    <a
      href={cert.url || IDENTITY.github}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface/40 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#3a3a44] hover:bg-surface"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-elevated text-accent">
          {getIcon(cert.icon)}
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] font-medium text-accent">
          <BadgeCheck className="h-3.5 w-3.5" /> {labels.verified}
        </span>
      </div>

      <h3 className="mt-7 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
        {cert.title}
      </h3>

      <div className="mt-2 flex items-center gap-2 text-sm text-muted">
        <Award className="h-4 w-4 text-faint" /> {cert.issuer}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-faint">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" /> {cert.date}
        </span>
        <span className="inline-flex items-center gap-1.5">
          #{cert.code}
        </span>
      </div>

      <div className="mt-auto border-t border-line pt-5">
        <div className="text-[10px] font-mono uppercase tracking-wider text-faint">
          {labels.validates}
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-ink px-3 py-1 font-mono text-xs font-medium text-canvas">
            {cert.skill}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted transition-colors group-hover:text-accent">
            {labels.view}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

function Certificates() {
  const { t } = useLang();
  const c = t.certificates;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [showAllVault, setShowAllVault] = useState(false);
  const labels = { verified: c.verified, validates: c.validates, view: c.view };

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  const scrollByCard = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="sertifikalar" className={`${WRAP} scroll-mt-28 py-28 md:py-40`}>
      <Reveal>
        <SectionHeader index={c.index} title={c.title} kicker={c.kicker} />
      </Reveal>

      <Reveal delay={0.05}>
        <div className="relative mt-14 md:mt-16">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label={c.prev}
            className="absolute -left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/85 text-ink backdrop-blur transition hover:border-accent hover:bg-elevated disabled:pointer-events-none disabled:opacity-0 md:flex lg:-left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label={c.next}
            className="absolute -right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/85 text-ink backdrop-blur transition hover:border-accent hover:bg-elevated disabled:pointer-events-none disabled:opacity-0 md:flex lg:-right-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollerRef}
            onScroll={updateArrows}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {c.items.map((cert) => (
              <div
                key={cert.code}
                data-card
                className="shrink-0 snap-start basis-[85%] sm:basis-[48%] lg:basis-[31.5%]"
              >
                <CertificateCard cert={cert} labels={labels} />
              </div>
            ))}
          </div>

          {/* Mobil Oklar */}
          <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label={c.prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              aria-label={c.next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 266+ Sertifika Kasası Açma Butonu & Entegrasyonu */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => setShowAllVault(!showAllVault)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-neon-blue/40 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue font-mono text-sm font-semibold transition-all shadow-[0_0_20px_rgba(0,243,255,0.15)] group"
          >
            <Shield className="w-5 h-5 text-neon-blue transition-transform group-hover:scale-110" />
            <span>{showAllVault ? "SERTİFİKA KASASINI GİZLE" : "TÜM LİSANSLAR VE SERTİFİKALAR KASASINI AÇ (266+)"}</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${showAllVault ? "rotate-90" : "group-hover:translate-x-1"}`} />
          </button>
          <p className="mt-2 text-xs font-mono text-white/50">
            ODTÜ Bilgeİş (70+) · BTK Akademi (100+) · Turkcell Geleceği Yazanlar · T3 Vakfı · SHGM İHA-1 Pilot Lisansı
          </p>
        </div>

        {showAllVault && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-14 pt-10 border-t border-white/10"
          >
            <CertificationVault />
          </motion.div>
        )}
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  İnteraktif CLI Terminal                                            */
/* ================================================================== */
const TERMINAL_CMDS = [
  "help",
  "tulpar",
  "budak",
  "vanguard",
  "whoami",
  "cv",
  "doctrine",
  "philosophy",
  "entropy",
  "zen",
  "about",
  "skills",
  "projects",
  "ventures",
  "certs",
  "education",
  "pilot",
  "stats",
  "matrix",
  "specs",
  "contact",
  "social",
  "date",
  "clear",
];

function InteractiveTerminal({ onOpenLab }: { onOpenLab?: (type: CyberLabType) => void }) {
  const { t, lang } = useLang();
  const tt = t.terminal;
  const prompt = `${tt.user}@${tt.host}:~$`;

  const bootLines = useMemo(
    () => [
      { tone: "accent", text: tt.welcome },
      { tone: "muted", text: tt.hint },
    ],
    [tt.welcome, tt.hint]
  );

  const [lines, setLines] = useState(bootLines);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLines(bootLines);
    setInput("");
    setHist([]);
    setHistIdx(-1);
  }, [bootLines]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const out = (text: string, tone = "out") => ({ text, tone });

  function runCommand(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    const [name, ...rest] = trimmed.toLowerCase().split(/\s+/);

    switch (name) {
      case "tulpar":
        onOpenLab?.("tulpar");
        return [
          out("▸ TULPAR AERO-DYNAMICS // PX4 & ROS2 FLIGHT DECK BAŞLATILDI", "accent"),
          out("  [AVİYONİK] 6-DoF Uçuş Dinamiği Motoru Aktif"),
          out("  [TELEMETRİ] İrtifa: 1420m | Hız: 185 km/h | Batarya: %87 | Waypoint: WP-04"),
          out("  İnteraktif telemetri HUD penceresi açıldı.", "muted"),
        ];
      case "budak":
        onOpenLab?.("budak");
        return [
          out("▸ BUDAK // EDGE-AI %80 MODEL BUDAMA LABORATUVARI BAŞLATILDI", "accent"),
          out("  [METRİK] Budama Oranı: %80 Yapılandırılmış | Nicemleme: INT4"),
          out("  [PERFORMANS] Gecikme: 18ms | VRAM Tasarrufu: 11.2GB (%73)"),
          out("  İnteraktif Edge-AI budama penceresi açıldı.", "muted"),
        ];
      case "vanguard":
        window.dispatchEvent(new CustomEvent("toggle-vanguard"));
        return [
          out("▸ VANGUARD AI // TAKTİK ASİSTAN AKTİF EDİLDİ", "accent"),
          out("  Siber taktik zeka asistanı ekranın sağ altında açıldı.", "muted"),
        ];
      case "pilot":
        return [
          out("▸ SİVİL HAVACILIK GENEL MÜDÜRLÜĞÜ (SHGM) PİLOTAJ LİSANSI", "accent"),
          out("  Lisans No: TR-IHA1H10609053"),
          out("  Kategori: İHA-1 Sportif / Amatör Ticari Pilot"),
          out("  Durum: Doğrulandı ve Aktif"),
        ];
      case "education":
        return [
          out("▸ AKADEMİK EĞİTİM MATRİSİ:", "accent"),
          out("  1. ODTÜ — Bilgisayar ve Öğretim Teknolojileri Eğitimi (BÖTE) [2026 - 2032]"),
          out("  2. Hacettepe Üniversitesi — Alternatif Enerji Kaynakları [2026 - Devam]"),
          out("  3. Karadeniz Teknik Üniversitesi — Yazılım Mühendisliği [2023 - 2026]"),
          out("  4. İstanbul Üniversitesi — Yönetim Bilişim Sistemleri (AUZEF) [2025 - 2029]"),
          out("  5. Anadolu Üniversitesi — Bilgisayar Programcılığı (AÖF) [2025 - 2027]"),
          out("  6. Atatürk Üniversitesi — Tarih (ATA-AÖF) [2026 - 2030]"),
        ];
      case "stats":
        return [
          out("▸ CANLI DOĞRULANMIŞ GÖSTERGELER:", "accent"),
          out("  Açık Kaynak Repo: 231+ Public Repositories"),
          out("  GitHub Yıldız: 1,500+ Stars"),
          out("  GitHub Takipçi: 2,060+ Followers"),
          out("  LinkedIn Bağlantı: 12,640+ Professionals"),
          out("  Ar-Ge Girişimleri: 6 Lab (Arat, Tulpar, Arkıl, MERL, Budak, Anka)"),
          out("  Sertifikalar: 266+ Onaylı Ulusal ve Uluslararası Belge (ODTÜ, BTK, SHGM, T3)"),
          out("  Canlı Durum: Aktif Geliştirici & BÖTE Öğrencisi (ODTÜ & Hacettepe)"),
        ];
      case "cv":
        return [
          out("▸ BAHATTİN YUNUS ÇETİN — ÖZGEÇMİŞ DOSYASI", "accent"),
          out("  Unvan: Developer | Yapay Zekâ · Siber Güvenlik · Gömülü Sistemler"),
          out("  E-posta: bahattinyunuscetin1@gmail.com | Tel: +90 551 668 86 24"),
          out("  Eğitim:"),
          out("    • ODTÜ — Bilgisayar ve Öğretim Teknolojileri Eğitimi (BÖTE / CEIT, 2026-2032)"),
          out("    • Hacettepe Üniversitesi (2026-2030)"),
          out("    • KTÜ — Yazılım Mühendisliği (2024-2026)"),
          out("    • RTEÜ — Bilişim & Teknoloji (2024-2026)"),
          out("  Lisanslar: SHGM İHA-1 Pilot Lisansı, Siber Vatan Beyaz Şapkalı Hacker, 266+ Akreditasyon"),
          out("  İletişim: bahattinyunuscetin1@gmail.com / linkedin.com/in/bahattinyunus"),
        ];
      case "matrix":
        return [
          out("01000001 01010010 01000001 01010100 00100000 01001100 01000001 01000010 01010011", "accent"),
          out("⚡ WAKE UP, OPERATOR... THE MATRIX HAS YOU. ⚡"),
          out(">> DECRYPTING: Quantum telemetry handshake verified... [OK]"),
          out(">> NEURAL LINK: Tulpar Aero UAV Autopilot synchronized [OK]"),
          out(">> PRUNING MATRIX: Budak Edge-AI 80% sparsity confirmed [OK]"),
          out(">> DOCTRINE: Sovereign Systems, Native Compute, Deep Engineering."),
        ];
      case "doctrine":
      case "philosophy":
        return [
          out("▸ MÜHENDİSLİK VE SİBERNETİK DOKTRİNİ (5 AKSİS):", "accent"),
          out("  I.   Bilişimsel Termodinamik: Evrenin kaçınılmaz entropisine karşı yerel düzen inşası."),
          out("  II.  Via Negativa (Budak): Zekâ eklediklerinizde değil, elediğiniz gürültüdedir (%80 Budama)."),
          out("  III. Determinizm & Sezgi: C++ kesinliğinden PyTorch olasılıksal zekâsına köprü."),
          out("  IV.  Ontolojik Bağımsızlık: Başkasının çipinde koşan zihin, başkasının simülasyonunda aktördür."),
          out("  V.   Mythos & Logos: Kadim Türk kozmolojisi (Tulpar/Arkıl) ile sibernetik geleceğin sentezi."),
          out("  Detaylı manifesto için web menüsünden '/doctrine' sayfasına göz atabilirsiniz.", "muted"),
        ];
      case "entropy":
        return [
          out("▸ BİLİŞİMSEL TERMODİNAMİK VE ENTROPİ DOKTRİNİ:", "accent"),
          out("  'Her sistem çürümeye meyleder; saf kod yazmak, evrenin kaçınılmaz"),
          out("   kaosuna karşı deterministik bir sınır çekme eylemidir.'"),
          out("  — Bahattin Yunus Çetin (ODTÜ BÖTE & Hacettepe)"),
        ];
      case "zen":
        return [
          out("▸ VIA NEGATIVA // EKSİLTME SANATI:", "accent"),
          out("  'Mermer heykeltıraşının fazlalığı kırması gibi; hakiki mühendislik"),
          out("   özellik eklemekle değil, vazgeçilebilecek her şeyi ayıklamakla tamamlanır.'"),
        ];
      case "specs":
        return [
          out("▸ SİSTEM VE TEKNOLOJİ YIĞINI SPESİFİKASYONLARI:", "accent"),
          out("  • Diller: Python 3.12, C++20, C, Rust, Go, TypeScript, CUDA"),
          out("  • AI & ML: PyTorch, vLLM, Unsloth, HuggingFace, TFLite, Model Pruning (%80)"),
          out("  • Robotik & Otonom: ROS2 Humble, PX4 Autopilot, Gazebo, Unreal Engine 5 Sim"),
          out("  • Siber Güvenlik: Kriptografi, ISO 27001, SIEM, Sızma Testleri, Ağ Güvenliği"),
          out("  • Donanım: RTOS, STM32, ESP32, Arduino, Raspberry Pi, Proteus"),
        ];
      case "help":
        return [
          out(tt.helpTitle, "accent"),
          ...TERMINAL_CMDS.map((c) =>
            out(`  ${c.padEnd(10)} ${(tt.cmds as any)[c] || ""}`)
          ),
        ];
      case "whoami":
        return [
          out(`${IDENTITY.name} · @${IDENTITY.handle}`, "accent"),
          out(t.hero.role),
          out(`Location: ${IDENTITY.location}`),
          out(`METU CEIT (2026-2032) · Hacettepe Univ · KTU Software Eng`),
        ];
      case "about":
        return t.about.facts.map((f) =>
          out(`${(f.label + ":").padEnd(24)} ${f.value}`)
        );
      case "skills":
        return [
          out(`${tt.labels.langs}:`, "accent"),
          ...t.skills.languages.map((l) =>
            out(`  ▸ ${l.name.padEnd(10)} ${l.note}`)
          ),
          out(""),
          out(`${tt.labels.focus}:`, "accent"),
          ...t.skills.focus.map((f) => out(`  ▸ ${f.title}`)),
        ];
      case "projects":
        return t.projects.items.flatMap((p) => [
          out(`  ▸ ${p.name} (${p.year}) — ${p.type}`, "accent"),
          out(`    ${p.github}`, "link"),
        ]);
      case "ventures":
        return [
          out("6 R&D Initiatives & Laboratories:", "accent"),
          out("  1. Arat Labs — Next-Gen AI & Complex Systems"),
          out("  2. Tulpar Aero-Dynamics — UAV/SİHA Flight & UE5 Sim"),
          out("  3. Arkıl Games — Mythology & AI Mechanics"),
          out("  4. MERL — Autonomous Code Synthesis Factory"),
          out("  5. Budak — 80% Edge-AI Model Pruning"),
          out("  6. Anka Silicon Dynamics — Embedded Hardware Co-Design"),
        ];
      case "certs": {
        const query = rest.join(" ").toLowerCase().trim();
        if (query) {
          const matched = ALL_CERTIFICATES.filter(
            (c) =>
              c.title.toLowerCase().includes(query) ||
              c.issuer.toLowerCase().includes(query) ||
              (c.code && c.code.toLowerCase().includes(query)) ||
              c.category.toLowerCase().includes(query)
          ).slice(0, 15);

          if (matched.length === 0) {
            return [
              out("Kriterle eşleşen sertifika bulunamadı: " + query, "error"),
              out("İpucu: 'certs bilge', 'certs btk', 'certs ai', 'certs cyber' deneyebilirsiniz.", "muted"),
            ];
          }

          return [
            out(`"${query}" için ${matched.length} kayıt listeleniyor:`, "accent"),
            ...matched.map((c) =>
              out(`  ✓ [${c.date}] ${c.title} · ${c.issuer} (ID: ${c.code || "ONAYLI"})`)
            ),
          ];
        }

        return [
          out("TOPLAM 266+ RESMİ SERTİFİKA & LİSANS SİCİLİ:", "accent"),
          out("  • Bilgeİş (ODTÜ Destekli): 70+ Belge"),
          out("  • BTK Akademi: 100+ Belge"),
          out("  • Turkcell Geleceği Yazanlar: 20+ Belge"),
          out("  • T3 Akademi & T3 Girişim: 15+ Belge"),
          out("  • SHGM İHA-1 Ticari/Sportif Pilot Lisansı"),
          out(""),
          out("Son Eklenen Örnek Kayıtlar:"),
          ...ALL_CERTIFICATES.slice(0, 6).map((c) =>
            out(`  ✓ [${c.date}] ${c.title} · ${c.issuer}`)
          ),
          out(""),
          out("Arama yapmak için: 'certs <kelime>' (Örn: 'certs python', 'certs bilge', 'certs ai')", "muted"),
        ];
      }
      case "contact":
        return [
          out(`email     ${IDENTITY.email}`),
          out(`github    ${IDENTITY.github}`, "link"),
          out(`linkedin  ${IDENTITY.linkedin}`, "link"),
          out(`medium    ${IDENTITY.medium}`, "link"),
        ];
      case "social":
        return [
          out(`github    ${IDENTITY.github}`, "link"),
          out(`linkedin  ${IDENTITY.linkedin}`, "link"),
          out(`medium    ${IDENTITY.medium}`, "link"),
        ];
      case "date":
        return [
          out(
            new Date().toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          ),
        ];
      case "echo":
        return [out(rest.join(" "))];
      case "sudo":
        return [out(tt.labels.sudo, "error")];
      case "clear":
        return "CLEAR";
      default:
        return [
          out(`${tt.notFound}: ${name}`, "error"),
          out(tt.tryHelp, "muted"),
        ];
    }
  }

  function submitCommand(cmdText: string) {
    const result = runCommand(cmdText);
    if (result === "CLEAR") {
      setLines([]);
      setInput("");
      setHistIdx(-1);
      return;
    }
    setLines((prev) => [...prev, { tone: "cmd", text: cmdText }, ...result]);
    if (cmdText.trim()) setHist((h) => [...h, cmdText]);
    setHistIdx(-1);
    setInput("");
  }

  function submit() {
    const raw = input;
    const result = runCommand(raw);
    if (result === "CLEAR") {
      setLines([]);
      setInput("");
      setHistIdx(-1);
      return;
    }
    setLines((prev) => [...prev, { tone: "cmd", text: raw }, ...result]);
    if (raw.trim()) setHist((h) => [...h, raw]);
    setHistIdx(-1);
    setInput("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!hist.length) return;
      const idx = histIdx === -1 ? hist.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(hist[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= hist.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(hist[idx]);
      }
    }
  }

  const toneClass: Record<string, string> = {
    out: "text-muted",
    accent: "text-accent font-semibold",
    muted: "text-faint",
    error: "text-rose-400",
    link: "text-ink/80 underline decoration-line/80",
  };

  return (
    <section id="terminal" className={`${WRAP} scroll-mt-28 py-28 md:py-40`}>
      <Reveal>
        <SectionHeader index={tt.index} title={tt.title} kicker={tt.kicker} />
      </Reveal>

      <Reveal y={36} delay={0.05}>
        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-[#09090c] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
          {/* Modern macOS / Warp Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-3.5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/50 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => submitCommand("clear")} title="clear" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d89e24]/50" />
              <span className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1aab29]/50" />
              <span className="ml-2 font-mono text-[11px] text-white/40 hidden sm:inline">bash — 80x24</span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-white/50">
              <TerminalIcon className="w-3.5 h-3.5 text-accent" />
              <span>{tt.user}@{tt.host}: ~ (x86_64)</span>
            </div>

            {/* Quick Action Chips */}
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px]">
              {["cv", "certs", "doctrine", "matrix", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => submitCommand(cmd)}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-accent/20 border border-white/5 hover:border-accent/40 text-white/60 hover:text-accent transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          {/* Gövde */}
          <div
            ref={bodyRef}
            onClick={() => inputRef.current?.focus()}
            className="h-[360px] cursor-text overflow-y-auto p-4 font-mono text-[13px] leading-relaxed md:h-[420px] md:p-6"
          >
            {lines.map((l, i) =>
              l.tone === "cmd" ? (
                <div key={i} className="flex gap-2 break-all">
                  <span className="shrink-0 text-accent">{prompt}</span>
                  <span className="text-ink">{l.text}</span>
                </div>
              ) : (
                <div
                  key={i}
                  className={`whitespace-pre-wrap break-words ${
                    toneClass[l.tone] || "text-muted"
                  }`}
                >
                  {l.text || "\u00A0"}
                </div>
              )
            )}

            {/* Giriş Satırı */}
            <div className="flex gap-2">
              <span className="shrink-0 text-accent">{prompt}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label="terminal"
                className="flex-1 bg-transparent text-ink caret-accent outline-none"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  İletişim (Contact)                                                 */
/* ================================================================== */
function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* sessizce geç */
    }
  };
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-5 py-3 text-sm text-ink transition-colors hover:bg-surface"
    >
      <Mail className="h-4 w-4 text-accent" />
      <span className="font-mono text-xs md:text-sm">{email}</span>
      {copied ? (
        <Check className="h-4 w-4 text-accent" />
      ) : (
        <Copy className="h-4 w-4 text-faint" />
      )}
    </button>
  );
}

function Contact() {
  const { t } = useLang();
  const c = t.contact;
  return (
    <section id="iletisim" className={`${WRAP} scroll-mt-28 py-28 md:py-40`}>
      <Reveal>
        <div className="flex items-center gap-3 text-sm text-muted font-mono">
          <span className="text-accent">({c.index})</span>
          <span>{c.label}</span>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <a href={`mailto:${IDENTITY.email}`} className="group mt-10 block">
          <span className="block font-display text-[clamp(2.8rem,11.5vw,10.5rem)] font-bold leading-[0.85] tracking-[-0.03em] text-ink">
            {c.big[0]}
          </span>
          <span className="mt-1 flex items-end gap-4 font-display text-[clamp(2.8rem,11.5vw,10.5rem)] font-bold leading-[0.85] tracking-[-0.03em] text-ink">
            <span className="transition-colors duration-300 group-hover:text-accent">
              {c.big[1]}
            </span>
            <ArrowUpRight className="mb-2 h-[0.55em] w-[0.55em] text-muted transition-all duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:text-accent" />
          </span>
        </a>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md leading-relaxed text-muted">{c.blurb}</p>
          <div className="flex flex-wrap items-center gap-3">
            <CopyEmail email={IDENTITY.email} />
            <a
              href="tel:+905516688624"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-5 py-3 text-sm text-ink transition-colors hover:bg-surface font-mono text-xs md:text-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>+90 551 668 86 24</span>
            </a>
            <a
              href={IDENTITY.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-5 py-3 text-sm text-ink transition-colors hover:bg-surface"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={IDENTITY.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-5 py-3 text-sm text-ink transition-colors hover:bg-surface"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  Komut Paleti (⌘K / Ctrl+K)                                         */
/* ================================================================== */
function CommandPalette() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  const commands = useMemo(() => {
    const go = (href: string) => () => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const sections = NAV_KEYS.map((n) => ({
      id: n.href,
      label: (t.nav as any)[n.key],
      hint: t.cmd.goto,
      icon: ChevronRight,
      action: go(n.href),
    }));

    return [
      ...sections,
      {
        id: "tulpar-lab",
        label: "🛫 Tulpar UAV Uçuş Simülatörü (HUD)",
        hint: "Simülatörü Aç",
        icon: Plane,
        action: () => {
          setOpen(false);
          onOpenLab?.("tulpar");
        },
      },
      {
        id: "budak-lab",
        label: "⚡ Budak Edge-AI %80 Model Budama Labı",
        hint: "Laboratuvarı Aç",
        icon: Zap,
        action: () => {
          setOpen(false);
          onOpenLab?.("budak");
        },
      },
      {
        id: "vanguard-ai",
        label: "🧠 Vanguard AI Siber Taktik Asistanı",
        hint: "AI Ajanı Başlat",
        icon: Brain,
        action: () => {
          setOpen(false);
          window.dispatchEvent(new CustomEvent("toggle-vanguard"));
        },
      },
      {
        id: "operations",
        label: "Siber Operasyonlar Merkezi (HUD)",
        hint: "Sayfayı Aç",
        icon: TerminalIcon,
        action: () => (window.location.href = "/operations"),
      },
      {
        id: "arsenal",
        label: "Teknoloji Cephaneliği (Arsenal)",
        hint: "Sayfayı Aç",
        icon: Cpu,
        action: () => (window.location.href = "/arsenal"),
      },
      {
        id: "intelligence",
        label: "120+ Sertifika, Eğitim & İstihbarat",
        hint: "Sayfayı Aç",
        icon: Award,
        action: () => (window.location.href = "/intelligence"),
      },
      {
        id: "doctrine",
        label: "Mühendislik Doktrini & Manifestosu",
        hint: "Sayfayı Aç",
        icon: BrainCircuit,
        action: () => (window.location.href = "/doctrine"),
      },
      {
        id: "comms",
        label: "Şifreli İletişim Hattı (Comms)",
        hint: "Sayfayı Aç",
        icon: Mail,
        action: () => (window.location.href = "/comms"),
      },
      {
        id: "lang",
        label: lang === "tr" ? "Switch to English" : "Türkçe'ye Geç",
        hint: t.cmd.lang,
        icon: Languages,
        action: () => setLang(lang === "tr" ? "en" : "tr"),
      },
      {
        id: "email",
        label: IDENTITY.email,
        hint: t.cmd.copyEmail,
        icon: Copy,
        action: () => navigator.clipboard?.writeText(IDENTITY.email),
      },
      {
        id: "github",
        label: `GitHub · @${IDENTITY.githubUser}`,
        hint: t.cmd.open,
        icon: Github,
        action: () => window.open(IDENTITY.github, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        label: "LinkedIn · Bahattin Yunus",
        hint: t.cmd.open,
        icon: Linkedin,
        action: () => window.open(IDENTITY.linkedin, "_blank", "noopener"),
      },
      {
        id: "top",
        label: t.cmd.toTop,
        hint: "",
        icon: ArrowUpRight,
        action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      },
    ];
  }, [t, lang, setLang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        (c.hint || "").toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onToggle = () => setOpen((o) => !o);
    window.addEventListener("keydown", onKey);
    window.addEventListener("toggle-cmdk", onToggle);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("toggle-cmdk", onToggle);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const run = (cmd: any) => {
    setOpen(false);
    setTimeout(() => cmd.action(), 0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[index]) run(filtered[index]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-canvas/80 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/80"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t.cmd.placeholder}
                className="w-full bg-transparent py-4 text-sm text-ink outline-none placeholder:text-faint"
              />
              <kbd className="shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">
                ESC
              </kbd>
            </div>
            <div className="max-h-[320px] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-faint">
                  {t.cmd.empty}
                </div>
              ) : (
                filtered.map((cmd, i) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      ref={i === index ? activeRef : null}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => run(cmd)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        i === index
                          ? "bg-elevated text-ink"
                          : "text-muted hover:bg-elevated/60"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-accent" />
                      <span className="truncate">{cmd.label}</span>
                      {cmd.hint && (
                        <span className="ml-auto shrink-0 text-[11px] font-mono uppercase tracking-wider text-faint">
                          {cmd.hint}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  Meteors (Düşen Yıldız Animasyonu)                                  */
/* ================================================================== */
function Meteors({ count = 10 }: { count?: number }) {
  const meteors = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: -10 - Math.random() * 30,
        delay: Math.random() * 8,
        duration: 3.5 + Math.random() * 6,
        tail: 110 + Math.random() * 170,
      })),
    [count]
  );
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {meteors.map((m, i) => (
        <span
          key={i}
          className="meteor"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            height: `${m.tail}px`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ================================================================== */
/*  Footer                                                             */
/* ================================================================== */
function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative z-10 border-t border-line">
      <div
        className={`${WRAP} flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted md:flex-row`}
      >
        <span>
          © {new Date().getFullYear()} {IDENTITY.name} —{" "}
          <span className="font-mono text-faint">@{IDENTITY.handle}</span>
        </span>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <a
            href={IDENTITY.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-ink"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={IDENTITY.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-ink"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="#anasayfa" className="transition-colors hover:text-accent font-medium">
            {t.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  Ana Sayfa Bileşeni                                                 */
/* ================================================================== */
export default function Home() {
  const [lang, setLang] = useState<LangType>(() => {
    if (typeof window === "undefined") return "tr";
    const saved = window.localStorage.getItem("lang");
    return saved === "en" || saved === "tr" ? saved : "tr";
  });
  const [activeLab, setActiveLab] = useState<CyberLabType>(null);

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = CONTENT[lang];

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
      <ScrollProgress />
      <CommandPalette onOpenLab={setActiveLab} />

      {/* İnteraktif Siber Simülatör Modalı */}
      <CyberLabsModal type={activeLab} onClose={() => setActiveLab(null)} lang={lang} />

      {/* Vanguard AI Siber Asistan */}
      <VanguardAI />

      {/* Deep-Tech Mesh & Aurora Lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-deep-mesh opacity-90"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(100% 70% at 50% -20%, rgba(214,255,63,0.09) 0%, rgba(0,240,255,0.04) 40%, transparent 80%)",
        }}
      />
      <CyberFieldCanvas />
      <Meteors count={14} />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.025]"
        style={{ backgroundImage: NOISE }}
      />

      <Navbar onOpenLab={setActiveLab} />

      <main className="relative z-10">
        <Hero onOpenLab={setActiveLab} />
        <Marquee />
        <About />
        <Skills />
        <Projects onOpenLab={setActiveLab} />
        <Certificates />
        <InteractiveTerminal onOpenLab={setActiveLab} />
        <Contact />
      </main>

      <Footer />
    </LangCtx.Provider>
  );
}
