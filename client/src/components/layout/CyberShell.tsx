// @ts-nocheck
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Shield, Cpu, Radio, Target, Terminal, Power, BookOpen } from "lucide-react";
import { CommandTerminal } from "../cyber-ui/CommandTerminal";
import { ForceField } from "../cyber-ui/ForceField";
import { useCyberSound } from "@/hooks/use-cyber-sound";
import { useKonamiCode } from "@/hooks/use-konami-code";
import { useVault } from "@/contexts/VaultContext";
import { VaultShell } from "./VaultShell";
import { NeuralBackground } from "../cyber-ui/NeuralBackground";
import { DataStreamBackground } from "../cyber-ui/DataStreamBackground";
import { VanguardAI } from "../cyber-ui/VanguardAI";

interface CyberShellProps {
    children: React.ReactNode;
}

export const CyberShell: React.FC<CyberShellProps> = ({ children }) => {
    const [location] = useLocation();
    const [time, setTime] = useState(new Date());
    const [visitedPaths, setVisitedPaths] = useState<Set<string>>(new Set([location]));
    const { playSound, isAmbientPlaying, toggleAmbient } = useCyberSound();
    const isMatrixMode = useKonamiCode();
    const { isSecureMode, toggleSecureMode } = useVault();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setVisitedPaths(prev => new Set([...prev, location]));
    }, [location]);

    const navItems = [
        { path: "/", label: "MISSION CONTROL", icon: Shield },
        { path: "/arsenal", label: "ARSENAL", icon: Cpu },
        { path: "/operations", label: "OPERATIONS", icon: Target },
        { path: "/intelligence", label: "INTELLIGENCE", icon: Terminal },
        { path: "/doctrine", label: "DOCTRINE", icon: BookOpen },
        { path: "/comms", label: "COMMS", icon: Radio },
    ];

    const triggerCommandTerminal = () => {
        playSound('click');
        const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true });
        document.dispatchEvent(event);
    };

    return (
        <div className={`min-h-screen bg-[var(--color-cyber-black)] text-foreground font-[family-name:var(--font-body)] overflow-hidden flex flex-col relative selection:bg-neon-blue selection:text-black ${isMatrixMode ? 'matrix-mode' : ''}`}>
            {/* Interactive Background */}
            {isMatrixMode ? (
                <div className="fixed inset-0 z-0 bg-black pointer-events-none font-mono text-green-500 text-xs opacity-20 overflow-hidden break-all leading-3">
                    MATRIX MODE ACTIVE - SYSTEM OVERRIDE
                </div>
            ) : (
                <>
                    <ForceField />
                    <NeuralBackground />
                    <DataStreamBackground />
                </>
            )}

            <VaultShell />

            {/* Background Effects */}
            <div className="fixed inset-0 bg-scanlines opacity-20 pointer-events-none z-50 animate-glitch-sm"></div>
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_90%)] pointer-events-none z-40"></div>


            {/* Command Palette */}
            <CommandTerminal />

            {/* AI Assistant */}
            <VanguardAI />

            {/* Top HUD Bar */}
            <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-6 bg-black/40 backdrop-blur-md z-30 relative">
                <div className="flex items-center gap-3 md:gap-4">
                    <Terminal className="text-neon-blue w-6 h-6 animate-pulse" />
                    <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                        <h1 className="text-lg md:text-xl font-[family-name:var(--font-display)] tracking-[0.2em] text-neon-blue group-hover:text-white transition-colors" onMouseEnter={() => playSound('hover')}>
                            METAL YAKA <span className="text-white/50 text-xs md:text-sm">v4.5.STRATO</span>
                        </h1>
                    </Link>
                </div>

                <div className="flex items-center gap-3 md:gap-6">
                    {/* Ambient Synth Sound Toggle */}
                    <button
                        onClick={() => {
                            toggleAmbient();
                            playSound('click');
                        }}
                        title={isAmbientPlaying ? "Mute Ambient Synth" : "Enable Cyber Synth Drone"}
                        className={`flex items-center gap-2 px-2.5 py-1 rounded border text-xs font-mono transition-all ${isAmbientPlaying ? 'border-neon-blue/60 bg-neon-blue/10 text-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.2)]' : 'border-white/10 text-white/40 hover:text-white hover:border-white/30'}`}
                    >
                        <div className="flex items-end gap-[2px] h-3 w-3">
                            <span className={`w-0.5 bg-current rounded-full ${isAmbientPlaying ? 'h-full animate-[pulse_0.6s_ease-in-out_infinite]' : 'h-1'}`} />
                            <span className={`w-0.5 bg-current rounded-full ${isAmbientPlaying ? 'h-2/3 animate-[pulse_0.9s_ease-in-out_infinite]' : 'h-1'}`} />
                            <span className={`w-0.5 bg-current rounded-full ${isAmbientPlaying ? 'h-4/5 animate-[pulse_0.75s_ease-in-out_infinite]' : 'h-1'}`} />
                        </div>
                        <span className="hidden sm:inline">{isAmbientPlaying ? 'SYNTH: ON' : 'AUDIO: MUTED'}</span>
                    </button>

                    {/* Quick Command Terminal Button */}
                    <button
                        onClick={triggerCommandTerminal}
                        className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/10 bg-white/5 hover:border-neon-blue/50 hover:bg-neon-blue/5 text-white/60 hover:text-neon-blue text-xs font-mono transition-all"
                    >
                        <Power className="w-3 h-3 text-neon-blue" />
                        <span>CLI <kbd className="text-[10px] bg-white/10 px-1 rounded">⌘K</kbd></span>
                    </button>

                    {/* Vault Security Toggle */}
                    <div
                        className={`group flex items-center gap-2 px-3 py-1 bg-white/5 rounded border transition-colors cursor-pointer ${isSecureMode ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-white/10 hover:border-neon-green/50'}`}
                        onClick={() => {
                            toggleSecureMode();
                            playSound(isSecureMode ? 'click' : 'access');
                        }}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isSecureMode ? 'bg-yellow-500' : 'bg-neon-green'}`}></div>
                        <span className={`text-xs font-mono group-hover:text-opacity-100 transition-colors ${isSecureMode ? 'text-yellow-500' : 'text-neon-green/80 text-neon-green'}`}>
                            {isSecureMode ? 'SECURE' : 'STABLE'}
                        </span>
                    </div>

                    <div className="hidden md:block text-2xl font-[family-name:var(--font-display)] text-white/80">
                        {time.toLocaleTimeString([], { hour12: false })}
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-y-auto overflow-x-hidden scrollbar-hide">
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    {/* Grid for depth */}
                    <div className="w-full h-full"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)',
                            backgroundSize: '100px 100px'
                        }}>
                    </div>
                </div>

                {/* Actual Content */}
                <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto min-h-full flex flex-col">
                    {children}
                </div>
            </main>

            {/* Bottom HUD / Navigation */}
            <footer className="h-20 border-t border-white/10 bg-black/60 backdrop-blur-md z-30 relative px-6 flex items-center justify-between">
                <nav className="flex items-center gap-1 md:gap-4 overflow-x-auto w-full md:w-auto p-1">
                    {navItems.map((item) => {
                        const isActive = location === item.path;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => playSound('click')}
                                onMouseEnter={() => playSound('hover')}
                                className={`
                  relative px-6 py-2 flex items-center gap-3 font-[family-name:var(--font-display)] tracking-wider text-sm transition-all duration-300
                  ${isActive
                                        ? 'text-black bg-neon-blue clip-path-hexagon shadow-[0_0_20px_rgba(0,243,255,0.4)]'
                                        : 'text-white/60 hover:text-neon-blue hover:bg-white/5'
                                    }
                `}>
                                {isActive && (
                                    <span className="absolute left-0 bottom-0 top-0 w-1 bg-white/50 animate-pulse"></span>
                                )}
                                <Icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden lg:flex items-center gap-4 px-6 border-x border-white/10">
                    <div className="flex flex-col gap-1 w-48">
                        <div className="flex justify-between text-[8px] font-mono text-white/40 uppercase tracking-widest">
                            <span>Sector_Stabilization</span>
                            <span>{Math.round((visitedPaths.size / navItems.length) * 100)}%</span>
                        </div>
                        <div className="h-1 bg-white/5 w-full relative overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-neon-green shadow-[0_0_5px_rgba(0,255,157,0.5)]"
                                animate={{ width: `${(visitedPaths.size / navItems.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex flex-col items-end text-xs text-white/30 font-mono">
                    <div className="flex items-center gap-2 text-neon-blue/50">
                        <Power className="w-3 h-3" />
                        <span>CMD+K TO INITIATE TERMINAL</span>
                    </div>
                    <span>COORDINATES: 39.8914° N, 32.7847° E [ANKARA // METU]</span>
                </div>
            </footer>
        </div>
    );
};
