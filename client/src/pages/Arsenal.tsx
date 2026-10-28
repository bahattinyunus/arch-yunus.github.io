// @ts-nocheck
import { profileData } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, Shield, Layers, Zap, Network, Server, Lock, Activity, CheckCircle2, ChevronRight, Plane } from "lucide-react";
import { useState } from "react";
import { useVault } from "@/contexts/VaultContext";
import { SkillHexGrid } from "@/components/cyber-ui/SkillHexGrid";
import { useCyberSound } from "@/hooks/use-cyber-sound";
import { TulparFlightDeck } from "@/components/cyber-ui/TulparFlightDeck";
import { BudakEdgeLab } from "@/components/cyber-ui/BudakEdgeLab";

export default function Arsenal() {
    const { isSecureMode } = useVault();
    const { playSound } = useCyberSound();
    const [selectedTab, setSelectedTab] = useState<'all' | 'tulpar' | 'budak' | 'ai' | 'systems' | 'architecture'>('all');
    const [activeBlueprintNode, setActiveBlueprintNode] = useState<number | null>(null);

    const blueprintNodes = [
        {
            id: 1,
            title: "01 // EDGE INGESTION & DATA TELEMETRY",
            role: "Multi-domain Sensors, Trabzon Protocol & MQTT Streaming",
            details: "Asymmetric data gathering across autonomous robotics, microstrip RF sensors, and maritime telemetry streams.",
            tech: ["MQTT", "NumPy", "SciPy", "C++"],
            status: "OPTIMAL"
        },
        {
            id: 2,
            title: "02 // KNOWLEDGE DISTILLATION CORE (ANKA)",
            role: "Hardware-Agnostic Neural Compression",
            details: "Transferring deep cognition from 70B+ teacher models into compact 7B/8B student weights via QLoRA & loss distillation.",
            tech: ["PyTorch", "HuggingFace", "Unsloth", "vLLM"],
            status: "OVERCLOCKED"
        },
        {
            id: 3,
            title: "03 // STOCHASTIC HEURISTIC OPTIMIZATION",
            role: "NP-Hard Combinatorial Problem Solvers",
            details: "Bio-mimetic Artificial Bee Colony (ABC) execution running at O(G·S·n²) time complexity with convergence guarantees.",
            tech: ["BeeRoute Kernel", "Genetic Algorithms", "Graph Theory"],
            status: "STABLE"
        },
        {
            id: 4,
            title: "04 // ZERO-TRUST CYBER DEFENSE SHIELD",
            role: "Autonomous Threat Mitigation & CTF Hardened Kernel",
            details: "Multi-layered defense with dynamic session isolation, cryptographic attestation, and real-time behavioral anomaly scoring.",
            tech: ["Zero Trust", "AES-256-GCM", "Memory Safety", "Linux Cgroups"],
            status: "VERIFIED"
        }
    ];

    const allAiSkills = profileData.ai_tools || [
        { name: "PyTorch", level: 95, category: "Core AI" },
        { name: "HuggingFace", level: 92, category: "Transformers" },
        { name: "Unsloth", level: 90, category: "Fine-Tuning" },
        { name: "vLLM", level: 88, category: "Inference Engine" },
        { name: "QLoRA", level: 90, category: "Quantization" },
        { name: "Knowledge Distill", level: 94, category: "Compression" }
    ];

    const allSystemSkills = [
        ...profileData.skills.languages.map(l => ({ name: l, level: 90, category: 'Language' })),
        ...profileData.skills.frameworks.map(f => ({ name: f, level: 85, category: 'Framework' })),
        ...profileData.skills.tools.map(t => ({ name: t, level: 80, category: 'Tool' }))
    ];

    return (
        <div className="space-y-12 pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
                <div className="flex items-center gap-4">
                    <Cpu className={`w-8 h-8 animate-pulse ${isSecureMode ? 'text-yellow-500' : 'text-neon-red'}`} />
                    <div>
                        <h2 className="text-3xl font-[family-name:var(--font-display)] tracking-wider text-white">
                            {isSecureMode ? 'SECURE_CONNECTOME' : 'ARSENAL'} <span className={isSecureMode ? 'text-yellow-500' : 'text-neon-red'}>//</span> BIOLUMINESCENT_SKILL_GRID
                        </h2>
                        <p className="text-xs font-mono text-white/50">TECHNICAL PROFICIENCY MATRIX & SYSTEM ARCHITECTURAL BLUEPRINTS</p>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2">
                    <a
                        href="/cv3.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-xs font-mono border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                    >
                        <Shield className="w-3.5 h-3.5" />
                        <span>RESMİ CV (PDF)</span>
                    </a>
                    {[
                        { id: 'all', label: 'ALL_DOMAINS' },
                        { id: 'tulpar', label: 'TULPAR_UAV_FLIGHT_DECK' },
                        { id: 'budak', label: 'BUDAK_EDGE_AI_LAB' },
                        { id: 'ai', label: 'AI_&_DISTILLATION' },
                        { id: 'systems', label: 'LOW_LEVEL_&_SYSTEMS' },
                        { id: 'architecture', label: 'ARCHITECTURE_BLUEPRINT' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setSelectedTab(tab.id as any);
                                playSound('click');
                            }}
                            className={`px-3 py-1.5 text-xs font-mono border transition-all ${selectedTab === tab.id
                                ? (isSecureMode ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' : 'border-neon-blue bg-neon-blue/10 text-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.2)]')
                                : 'border-white/15 text-white/60 hover:border-white/40'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tulpar Flight Deck Interactive HUD */}
            {(selectedTab === 'all' || selectedTab === 'tulpar') && (
                <TulparFlightDeck />
            )}

            {/* Budak Edge-AI Pruning Lab */}
            {(selectedTab === 'all' || selectedTab === 'budak') && (
                <BudakEdgeLab />
            )}

            {/* Architecture Blueprint Section */}
            {(selectedTab === 'all' || selectedTab === 'architecture') && (
                <section className="space-y-6">
                    <div className="flex items-center justify-between px-4 border-l-2 border-neon-blue/50">
                        <div className="flex items-center gap-3">
                            <Layers className="w-5 h-5 text-neon-blue" />
                            <h3 className="text-xl font-[family-name:var(--font-display)] tracking-tight text-white">
                                ANKA_COGNITION & ZERO-TRUST PIPELINE // ARCHITECTURE SPEC
                            </h3>
                        </div>
                        <span className="text-[10px] font-mono text-neon-blue/60 bg-neon-blue/10 px-2 py-0.5 rounded border border-neon-blue/20">
                            SPEC_v4.5
                        </span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {blueprintNodes.map((node) => {
                            const isSelected = activeBlueprintNode === node.id;
                            return (
                                <motion.div
                                    key={node.id}
                                    onClick={() => {
                                        setActiveBlueprintNode(isSelected ? null : node.id);
                                        playSound('click');
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    className={`p-5 rounded border cursor-pointer transition-all relative overflow-hidden cyber-clip-br ${isSelected
                                        ? 'bg-neon-blue/10 border-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.25)]'
                                        : 'bg-black/50 border-white/10 hover:border-neon-blue/40'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-mono text-neon-blue font-bold">{node.title}</span>
                                        <span className="text-[9px] font-mono text-neon-green px-1.5 py-0.5 bg-neon-green/10 border border-neon-green/30 rounded">
                                            {node.status}
                                        </span>
                                    </div>

                                    <h4 className="font-bold text-white text-sm mb-2 font-[family-name:var(--font-display)]">
                                        {node.role}
                                    </h4>

                                    <p className="text-xs font-mono text-white/60 mb-4 line-clamp-3">
                                        {node.details}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                                        {node.tech.map(t => (
                                            <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/70 rounded">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* AI & Distillation Skill Grid */}
            {(selectedTab === 'all' || selectedTab === 'ai') && (
                <section className="space-y-6">
                    <div className="flex items-center gap-3 px-4 border-l-2 border-neon-blue/50">
                        <Terminal className="w-5 h-5 text-neon-blue" />
                        <h3 className="text-xl font-[family-name:var(--font-display)] tracking-tight text-white">
                            AI, LLM OPTIMIZATION & FORWARD INTELLIGENCE
                        </h3>
                    </div>
                    <SkillHexGrid skills={allAiSkills} color="var(--color-neon-blue)" />
                </section>
            )}

            {/* Low-Level, Systems & Languages */}
            {(selectedTab === 'all' || selectedTab === 'systems') && (
                <section className="space-y-6">
                    <div className="flex items-center gap-3 px-4 border-l-2 border-neon-green/50">
                        <Shield className="w-5 h-5 text-neon-green" />
                        <h3 className="text-xl font-[family-name:var(--font-display)] tracking-tight text-white">
                            SYSTEMS, LOW-LEVEL COMPUTING & ARCHITECTURE
                        </h3>
                    </div>
                    <SkillHexGrid skills={allSystemSkills} color="var(--color-neon-green)" />
                </section>
            )}

            {/* Domain Intel & Strategic Competencies */}
            <div className="grid md:grid-cols-2 gap-8">
                <section className={`bg-white/5 p-6 rounded-lg border cyber-clip-br ${isSecureMode ? 'border-yellow-500/20' : 'border-white/10'}`}>
                    <h3 className={`text-xl font-[family-name:var(--font-display)] mb-6 flex items-center gap-2 ${isSecureMode ? 'text-yellow-500' : 'text-neon-green'}`}>
                        <Shield className="w-5 h-5" /> STRATEGIC_DOMAIN_INTEL
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                        {profileData.skills.concepts.map((concept, i) => (
                            <div
                                key={i}
                                onMouseEnter={() => playSound('hover')}
                                className={`px-3 py-1.5 border text-xs font-mono tracking-wide transition-all ${isSecureMode
                                    ? 'border-yellow-500/30 bg-yellow-500/5 text-yellow-500 hover:bg-yellow-500/15'
                                    : 'border-neon-green/30 bg-neon-green/5 text-neon-green hover:bg-neon-green/15 hover:shadow-[0_0_10px_rgba(0,255,157,0.2)]'
                                    }`}
                            >
                                {concept}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white/5 p-6 rounded-lg border border-white/10 cyber-clip-tl flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-[family-name:var(--font-display)] text-neon-blue mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5" /> REPOSITORY_STATUS
                        </h3>
                        <p className="text-sm font-mono text-white/60 leading-relaxed mb-6">
                            Tüm çekirdek depolar; GitHub CI/CD, otomatik güvenlik denetimi (SAST), tip güvenliği ve doktrinel kod standartları ile sürekli doğrulanmaktadır.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 text-center">
                        <div>
                            <div className="text-xl font-bold font-[family-name:var(--font-display)] text-white">{profileData.github_stats.public_repos}</div>
                            <div className="text-[10px] font-mono text-white/40">PUBLIC_REPOS</div>
                        </div>
                        <div>
                            <div className="text-xl font-bold font-[family-name:var(--font-display)] text-neon-blue">{profileData.github_stats.total_stars}+</div>
                            <div className="text-[10px] font-mono text-white/40">STARS</div>
                        </div>
                        <div>
                            <div className="text-xl font-bold font-[family-name:var(--font-display)] text-neon-green">{profileData.github_stats.followers}+</div>
                            <div className="text-[10px] font-mono text-white/40">FOLLOWERS</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

