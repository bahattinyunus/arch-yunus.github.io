import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Unlock, Trophy, Sparkles, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useCyberSound } from '@/hooks/use-cyber-sound';

export interface ClearanceContextType {
    clearance: number;
    incrementClearance: (amount?: number) => void;
    checkAccess: (required: number) => boolean;
    rankTitle: string;
}

const RANKS = [
    { level: 1, title: "SİVİL GÖZLEMCİ", subtitle: "Public Guest · Temel Erişim" },
    { level: 2, title: "SAHA ANALİSTİ", subtitle: "Field Analyst · Ar-Ge Logları Açık" },
    { level: 3, title: "AVİYONİK PİLOTU", subtitle: "UAV Operator · Telemetri Yetkili" },
    { level: 4, title: "SİSTEM MİMARI", subtitle: "Kernel Architect · Çekirdek Güvenlik" },
    { level: 5, title: "METAL YAKA EFENDİSİ", subtitle: "Deep-Tech Overlord · Tam Yetki (Root)" }
];

const ClearanceContext = createContext<ClearanceContextType | undefined>(undefined);

export const ClearanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clearance, setClearance] = useState(1);
    const { playSound } = useCyberSound();

    useEffect(() => {
        const saved = localStorage.getItem('security_clearance');
        if (saved) {
            const parsed = parseInt(saved, 10);
            if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
                setClearance(parsed);
            }
        }
    }, []);

    const incrementClearance = (amount: number = 1) => {
        setClearance((prev) => {
            const next = Math.min(prev + amount, 5);
            if (next > prev) {
                localStorage.setItem('security_clearance', next.toString());
                playSound('access');
            }
            return next;
        });
    };

    const checkAccess = (required: number) => clearance >= required;
    const currentRank = RANKS[Math.min(clearance - 1, RANKS.length - 1)];

    return (
        <ClearanceContext.Provider value={{ clearance, incrementClearance, checkAccess, rankTitle: currentRank.title }}>
            {children}
            <ClearanceHUD level={clearance} rank={currentRank} onLevelUp={() => incrementClearance(1)} />
        </ClearanceContext.Provider>
    );
};

export const useClearance = () => {
    const context = useContext(ClearanceContext);
    if (!context) {
        return {
            clearance: 1,
            incrementClearance: () => {},
            checkAccess: () => true,
            rankTitle: "SİVİL GÖZLEMCİ"
        };
    }
    return context;
};

const ClearanceHUD: React.FC<{
    level: number;
    rank: { level: number; title: string; subtitle: string };
    onLevelUp: () => void;
}> = ({ level, rank, onLevelUp }) => {
    const [showPromo, setShowPromo] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const { playSound } = useCyberSound();

    useEffect(() => {
        if (level > 1) {
            setShowPromo(true);
            const timer = setTimeout(() => setShowPromo(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [level]);

    return (
        <div className="fixed bottom-6 left-6 z-[80] font-mono text-xs select-none">
            {/* Level-Up Celebration Banner */}
            <AnimatePresence>
                {showPromo && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-3 p-3.5 bg-black/90 border border-neon-blue/60 backdrop-blur-xl rounded-xl shadow-[0_0_30px_rgba(0,243,255,0.3)] flex items-center gap-3 text-white"
                    >
                        <div className="p-2 rounded-lg bg-neon-blue/20 text-neon-blue border border-neon-blue/40 animate-pulse">
                            <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[10px] text-neon-blue uppercase tracking-widest font-bold">
                                YETKİ SEVİYESİ YÜKSELDİ // CLEARANCE_PROMOTED
                            </div>
                            <div className="text-sm font-bold text-white uppercase tracking-wider">
                                LEVEL {level}: {rank.title}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Persistent Tactical Clearance Badge */}
            <div 
                onClick={() => {
                    setIsExpanded(!isExpanded);
                    playSound('click');
                }}
                className="cursor-pointer p-2.5 sm:p-3 bg-black/85 border border-white/15 hover:border-neon-blue/50 backdrop-blur-xl rounded-xl shadow-lg flex items-center gap-3 group transition-all"
            >
                <div className="relative">
                    <Shield className={`w-6 h-6 transition-colors ${level >= 4 ? 'text-neon-blue' : level >= 2 ? 'text-emerald-400' : 'text-white/40'}`} />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                        {level}
                    </span>
                </div>

                <div className="hidden sm:block space-y-1">
                    <div className="flex items-center justify-between text-[9px] text-white/50 gap-4">
                        <span className="font-bold text-white group-hover:text-neon-blue transition-colors">
                            {rank.title}
                        </span>
                        <span className="text-neon-blue">{level}/5</span>
                    </div>

                    <div className="w-28 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-neon-blue to-emerald-400"
                            animate={{ width: `${(level / 5) * 100}%` }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>
                </div>

                <div className="text-white/30 group-hover:text-white transition-colors">
                    {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                </div>
            </div>

            {/* Expanded Clearance Dossier Drawer */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="mt-2 p-4 w-72 sm:w-80 bg-black/95 border border-neon-blue/40 rounded-xl backdrop-blur-2xl shadow-[0_0_40px_rgba(0,243,255,0.2)] text-white space-y-3"
                    >
                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                            <span className="text-[10px] text-neon-blue font-bold uppercase tracking-wider">
                                Taktik Yetki Matrisi
                            </span>
                            <span className="text-[10px] text-white/40">LEVEL {level}</span>
                        </div>

                        <div className="space-y-1.5 text-[11px]">
                            {RANKS.map((r) => {
                                const isUnlocked = level >= r.level;
                                return (
                                    <div
                                        key={r.level}
                                        className={`p-2 rounded border flex items-center justify-between transition-colors ${
                                            isUnlocked
                                                ? "border-neon-blue/30 bg-neon-blue/10 text-white"
                                                : "border-white/5 bg-white/[0.02] text-white/40"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {isUnlocked ? (
                                                <CheckCircle2 className="w-3.5 h-3.5 text-neon-blue" />
                                            ) : (
                                                <Lock className="w-3.5 h-3.5 text-white/30" />
                                            )}
                                            <div>
                                                <div className="font-bold text-[10px]">{r.title}</div>
                                                <div className="text-[9px] text-white/50">{r.subtitle}</div>
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-mono text-neon-blue">LVL {r.level}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50">
                            <span>Görevleri tamamla, seviye atla</span>
                            {level < 5 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onLevelUp();
                                    }}
                                    className="px-2 py-0.5 rounded bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue border border-neon-blue/40 font-bold"
                                >
                                    +1 YETKİ TESTİ
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
