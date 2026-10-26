// @ts-nocheck
import { profileData } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Target, ExternalLink, Info, Search, Cpu, Star, GitFork, ShieldCheck, Terminal, Layers } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ProjectModal } from "@/components/cyber-ui/ProjectModal";
import { useCyberSound } from "@/hooks/use-cyber-sound";
import { MissionLogs } from "@/components/cyber-ui/MissionLogs";
import { FieldOperationsGallery } from "@/components/portfolio/FieldOperationsGallery";

export default function Operations() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const { playSound } = useCyberSound();

    const categories = Object.keys(profileData.categories);

    // Extract unique languages
    const languages = useMemo(() => {
        const langs = new Set<string>();
        profileData.featured_projects.forEach(p => {
            if (p.language) langs.add(p.language);
        });
        return Array.from(langs);
    }, []);

    const filteredProjects = useMemo(() => {
        return profileData.featured_projects.filter(project => {
            // Category match
            if (selectedCategory) {
                const categoryProjects = profileData.categories[selectedCategory as keyof typeof profileData.categories] || [];
                if (!categoryProjects.includes(project.name)) return false;
            }
            // Language match
            if (selectedLanguage && project.language !== selectedLanguage) {
                return false;
            }
            // Search query match
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase().trim();
                const matchName = project.name.toLowerCase().includes(q);
                const matchDesc = project.description.toLowerCase().includes(q);
                const matchLang = project.language?.toLowerCase().includes(q);
                if (!matchName && !matchDesc && !matchLang) return false;
            }
            return true;
        });
    }, [selectedCategory, selectedLanguage, searchQuery]);

    const totalStars = useMemo(() => {
        return profileData.featured_projects.reduce((acc, curr) => acc + (curr.stars || 0), 0);
    }, []);

    return (
        <div className="space-y-8 pb-12">
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

            {/* Header with Metrics */}
            <div className="flex flex-col gap-6 pb-6 border-b border-white/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Target className="w-8 h-8 text-neon-green animate-pulse" />
                        <div>
                            <h2 className="text-3xl font-[family-name:var(--font-display)] tracking-wider text-white">
                                OPERATIONS <span className="text-neon-green">//</span> MISSION REPOSITORY
                            </h2>
                            <p className="text-xs font-mono text-white/50">TACTICAL INVENTORY OF AUTONOMOUS SYSTEMS & ARCHITECTURES</p>
                        </div>
                    </div>

                    {/* Quick Stats Pill */}
                    <div className="flex items-center gap-3 font-mono text-xs">
                        <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-neon-blue" />
                            <span className="text-white/60">DEPLOYED:</span>
                            <span className="text-neon-blue font-bold">{profileData.featured_projects.length}</span>
                        </div>
                        <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded flex items-center gap-2">
                            <Star className="w-3.5 h-3.5 text-yellow-400" />
                            <span className="text-white/60">TOTAL_STARS:</span>
                            <span className="text-yellow-400 font-bold">{profileData.github_stats.total_stars}+</span>
                        </div>
                    </div>
                </div>

                {/* Search Bar & Filters */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    {/* Search input */}
                    <div className="lg:col-span-4 relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-hover:text-neon-blue transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH_PROJECTS_OR_STACK..."
                            className="w-full bg-black/60 border border-white/20 pl-9 pr-4 py-2 text-xs font-mono text-white placeholder:text-white/30 focus:outline-none focus:border-neon-blue transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-white/40 hover:text-white"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="lg:col-span-8 flex flex-wrap gap-2 items-center">
                        <button
                            onClick={() => {
                                setSelectedCategory(null);
                                playSound('click');
                            }}
                            className={`px-3 py-1.5 text-xs font-mono border transition-all ${selectedCategory === null ? 'border-neon-green text-neon-green bg-neon-green/10 shadow-[0_0_10px_rgba(0,255,157,0.2)]' : 'border-white/15 text-white/60 hover:border-white/40'}`}
                        >
                            ALL_DOMAINS
                        </button>
                        {categories.slice(0, 5).map(cat => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(selectedCategory === cat ? null : cat);
                                    playSound('click');
                                }}
                                className={`px-3 py-1.5 text-xs font-mono border transition-all ${selectedCategory === cat ? 'border-neon-green text-neon-green bg-neon-green/10 shadow-[0_0_10px_rgba(0,255,157,0.2)]' : 'border-white/15 text-white/60 hover:border-white/40'}`}
                            >
                                {cat.toUpperCase().replace(/ /g, '_')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Language pills secondary filter */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[10px] font-mono text-white/40 uppercase mr-1">Stack Filter:</span>
                    <button
                        onClick={() => setSelectedLanguage(null)}
                        className={`px-2 py-0.5 text-[10px] font-mono border rounded ${selectedLanguage === null ? 'border-neon-blue text-neon-blue bg-neon-blue/10' : 'border-white/10 text-white/40 hover:text-white'}`}
                    >
                        ALL
                    </button>
                    {languages.map(lang => (
                        <button
                            key={lang}
                            onClick={() => {
                                setSelectedLanguage(selectedLanguage === lang ? null : lang);
                                playSound('click');
                            }}
                            className={`px-2 py-0.5 text-[10px] font-mono border rounded transition-all ${selectedLanguage === lang ? 'border-neon-blue text-neon-blue bg-neon-blue/10' : 'border-white/10 text-white/40 hover:text-white'}`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results status banner */}
            <div className="flex items-center justify-between text-xs font-mono text-white/40">
                <span>FOUND {filteredProjects.length} MATCHING SYSTEM NODES</span>
                {(selectedCategory || selectedLanguage || searchQuery) && (
                    <button
                        onClick={() => {
                            setSelectedCategory(null);
                            setSelectedLanguage(null);
                            setSearchQuery("");
                        }}
                        className="text-neon-blue hover:underline"
                    >
                        RESET_FILTERS
                    </button>
                )}
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, i) => (
                        <motion.div
                            key={project.name}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.3) }}
                            className="group relative h-full flex flex-col"
                        >
                            {/* Cyber Card Container */}
                            <div
                                className="h-full bg-black/40 border border-white/10 group-hover:border-neon-blue/50 group-hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all duration-300 flex flex-col cyber-clip-br overflow-hidden"
                            >
                                <Link
                                    href={`/operations/${encodeURIComponent(project.name.toLowerCase())}`}
                                    onClick={() => playSound('click')}
                                    className="block relative h-48 overflow-hidden cursor-pointer"
                                >
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        onError={(e) => {
                                            // Fallback for missing project image
                                            e.currentTarget.src = "/images/project-ai.jpg";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 border border-white/20 text-[10px] font-mono text-neon-blue backdrop-blur-sm">
                                        {project.language}
                                    </div>
                                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-neon-green/30 text-[9px] font-mono text-neon-green backdrop-blur-sm flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" /> ONLINE
                                    </div>
                                </Link>

                                <div className="p-6 flex-1 flex flex-col">
                                    <Link
                                        href={`/operations/${encodeURIComponent(project.name.toLowerCase())}`}
                                        onClick={() => playSound('click')}
                                    >
                                        <h3 className="text-lg font-[family-name:var(--font-display)] font-bold mb-2 text-white group-hover:text-neon-blue transition-colors cursor-pointer">
                                            {project.name}
                                        </h3>
                                    </Link>
                                    <p className="text-sm text-white/60 mb-6 flex-1 line-clamp-3 font-mono">
                                        {project.description}
                                    </p>

                                    <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs font-mono">
                                        <div className="flex gap-3 text-white/40">
                                            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" /> {project.stars}</span>
                                            <span className="flex items-center gap-1"><GitFork className="w-3 h-3" /> {project.forks}</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center gap-1 text-neon-blue hover:text-white transition-colors"
                                            >
                                                SOURCE <ExternalLink className="w-3 h-3" />
                                            </a>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedProject(project);
                                                    playSound('scan');
                                                }}
                                                className="flex items-center gap-1 text-neon-green/80 hover:text-neon-green transition-colors"
                                                title="Quick Intel Preview"
                                            >
                                                INTEL <Info className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-16 border border-dashed border-white/10 rounded-lg p-8">
                    <Terminal className="w-12 h-12 text-white/20 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-lg font-mono text-white/60 mb-2">NO MATCHING OPERATIONS FOUND</h3>
                    <p className="text-xs font-mono text-white/40 mb-4">No systems match your specified filter parameters.</p>
                    <button
                        onClick={() => {
                            setSelectedCategory(null);
                            setSelectedLanguage(null);
                            setSearchQuery("");
                        }}
                        className="px-4 py-2 border border-neon-blue text-neon-blue text-xs font-mono hover:bg-neon-blue/10 transition-colors"
                    >
                        RESET FILTERS
                    </button>
                </div>
            )}

            <MissionLogs />

            <div className="mt-16">
                <FieldOperationsGallery lang="tr" />
            </div>
        </div>
    );
}

