// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useLocation } from "wouter";
import { Shield, Cpu, Terminal, Target, Radio, Search, ExternalLink, Activity, Lock, Unlock, User, BookOpen, Volume2, Sparkles, HelpCircle } from "lucide-react";
import { profileData } from "@/lib/data";
import { useVault } from "@/contexts/VaultContext";
import { useCyberSound } from "@/hooks/use-cyber-sound";

export const CommandTerminal = () => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [terminalOutput, setTerminalOutput] = useState<string | null>(null);
    const [, setLocation] = useLocation();
    const { isSecureMode, toggleSecureMode } = useVault();
    const { playSound, toggleAmbient } = useCyberSound();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "`" && !['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) || (e.key === "~")) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        setTerminalOutput(null);
        command();
    };

    const handleSystemCommand = (cmd: string) => {
        const normalized = cmd.toLowerCase().trim();
        if (normalized === "locks" || normalized === "secure") {
            toggleSecureMode();
            playSound('access');
            setTerminalOutput(isSecureMode ? "SECURE_MODE: DEACTIVATED" : "SECURE_MODE: ACTIVATED // HIGH_CLEARANCE");
        } else if (normalized === "whoami") {
            playSound('access');
            setTerminalOutput(`UID: BAHATTIN_YUNUS_CETIN // DEVELOPER · AI & EMBEDDED ARCHITECT // METU CEIT & HACETTEPE`);
        } else if (normalized === "cv" || normalized === "resume") {
            playSound('transmit');
            window.open("/cv3.pdf", "_blank");
            setTerminalOutput("RESMI_CV_ACILDI: /cv3.pdf (Doğrulanmış Özgeçmiş)");
        } else if (normalized === "help") {
            playSound('type');
            setTerminalOutput("COMMANDS: whoami, cv, locks, audio, clear, projects, doctrine, exit");
        } else if (normalized === "audio" || normalized === "synth") {
            toggleAmbient();
            playSound('transmit');
            setTerminalOutput("SYNTH_AUDIO_STATE_TOGGLED");
        } else if (normalized === "clear") {
            setInputValue("");
            setTerminalOutput(null);
        } else if (normalized === "exit" || normalized === "quit") {
            setOpen(false);
        }
    };

    return (
        <Command.Dialog
            open={open}
            onOpenChange={(v) => {
                setOpen(v);
                if (!v) setTerminalOutput(null);
            }}
            label="Global Command Menu"
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[92vw] max-w-[660px] bg-black/95 border border-neon-blue/60 shadow-[0_0_60px_rgba(0,243,255,0.25)] rounded-lg overflow-hidden backdrop-blur-2xl z-[100] cyber-clip-both"
        >
            <div className="flex items-center border-b border-white/10 px-4 py-3 bg-white/5">
                <Terminal className="w-5 h-5 text-neon-blue mr-3 animate-pulse" />
                <Command.Input
                    autoFocus
                    value={inputValue}
                    onValueChange={(val) => {
                        setInputValue(val);
                        if (terminalOutput) setTerminalOutput(null);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && inputValue.trim()) {
                            handleSystemCommand(inputValue);
                        }
                    }}
                    placeholder="Type command (whoami, locks, help, audio) or search..."
                    className="flex-1 bg-transparent text-white font-mono outline-none placeholder:text-white/30 text-sm md:text-base"
                />
                <div className="flex items-center gap-1.5 text-xs font-mono text-white/40">
                    <span className="bg-white/10 px-2 py-0.5 rounded text-[10px]">ESC</span>
                </div>
            </div>

            {terminalOutput && (
                <div className="p-3 bg-neon-blue/10 border-b border-neon-blue/30 font-mono text-xs text-neon-blue flex items-center justify-between">
                    <span>{`> ${terminalOutput}`}</span>
                    <button onClick={() => setTerminalOutput(null)} className="text-white/40 hover:text-white text-[10px]">CLEAR</button>
                </div>
            )}

            <Command.List className="max-h-[380px] overflow-y-auto p-2 scrollbar-hide">
                <Command.Empty className="py-6 text-center text-white/50 font-mono text-xs">
                    No matching protocols found. Press Enter to execute as raw command.
                </Command.Empty>

                <Command.Group heading="SYSTEM CONTROLS" className="text-xs font-mono text-neon-blue/70 mb-2 px-2 mt-2">
                    <Command.Item
                        onSelect={() => runCommand(() => toggleSecureMode())}
                        className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-neon-blue/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-neon-blue/20"
                    >
                        {isSecureMode ? <Unlock className="w-4 h-4 text-yellow-500" /> : <Lock className="w-4 h-4 text-neon-blue" />}
                        <span className="font-bold text-xs font-mono">{isSecureMode ? 'DEACTIVATE_SECURE_MODE' : 'INITIALIZE_SECURE_MODE'}</span>
                        <kbd className="ml-auto text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 font-mono">locks</kbd>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => {
                            handleSystemCommand('whoami');
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-neon-blue/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-neon-blue/20"
                    >
                        <User className="w-4 h-4 text-neon-green" />
                        <span className="font-bold text-xs font-mono">OPERATOR_IDENTITY (WHOAMI)</span>
                        <kbd className="ml-auto text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 font-mono">whoami</kbd>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => {
                            toggleAmbient();
                            playSound('transmit');
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-neon-blue/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-neon-blue/20"
                    >
                        <Volume2 className="w-4 h-4 text-neon-red" />
                        <span className="font-bold text-xs font-mono">TOGGLE_CYBER_SYNTH_DRONE</span>
                        <kbd className="ml-auto text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 font-mono">audio</kbd>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="VERIFIED RESUME & INTEL" className="text-xs font-mono text-emerald-400 mb-2 px-2 mt-3">
                    <Command.Item
                        onSelect={() => runCommand(() => window.open("/cv3.pdf", "_blank"))}
                        className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-emerald-500/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-emerald-500/20"
                    >
                        <ExternalLink className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-xs font-mono text-emerald-400">DOWNLOAD_OFFICIAL_CV (PDF)</span>
                        <kbd className="ml-auto text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 font-mono">cv</kbd>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="NAVIGATION HUBS" className="text-[10px] font-mono text-white/30 mb-2 px-2 mt-3 uppercase tracking-widest">
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/"))}
                        className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                    >
                        <Shield className="w-4 h-4 text-white/40" />
                        <span className="font-mono text-xs">MISSION_CONTROL (HOME)</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/arsenal"))}
                        className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                    >
                        <Cpu className="w-4 h-4 text-white/40" />
                        <span className="font-mono text-xs">ARSENAL (SKILLS & ARCHITECTURE)</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/operations"))}
                        className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                    >
                        <Target className="w-4 h-4 text-white/40" />
                        <span className="font-mono text-xs">OPERATIONS (PROJECT LOGS)</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/intelligence"))}
                        className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                    >
                        <Terminal className="w-4 h-4 text-white/40" />
                        <span className="font-mono text-xs">INTELLIGENCE (KNOWLEDGE BASE)</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/doctrine"))}
                        className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                    >
                        <BookOpen className="w-4 h-4 text-white/40" />
                        <span className="font-mono text-xs">DOCTRINE (MANIFESTO)</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/comms"))}
                        className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                    >
                        <Radio className="w-4 h-4 text-white/40" />
                        <span className="font-mono text-xs">COMMS (UPLINK CHANNELS)</span>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="FLAGSHIP OPERATIONS" className="text-[10px] font-mono text-white/30 mb-2 px-2 mt-3 uppercase tracking-widest">
                    {profileData.featured_projects.slice(0, 5).map(project => (
                        <Command.Item
                            key={project.name}
                            onSelect={() => runCommand(() => setLocation(`/operations/${encodeURIComponent(project.name.toLowerCase())}`))}
                            className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-neon-blue/60" />
                            <span className="font-mono text-xs">{project.name.toUpperCase()}</span>
                            <span className="text-[10px] font-mono text-white/30 ml-auto">{project.language}</span>
                        </Command.Item>
                    ))}
                </Command.Group>
            </Command.List>

            <div className="border-t border-white/10 p-3 bg-black/50 text-[10px] font-mono text-white/40 flex justify-between px-4 items-center">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-neon-green" /> NODE_STABLE</span>
                    <span>STRATO_OS v4.5</span>
                </div>
                <div className="flex items-center gap-2">
                    <kbd className="bg-white/5 px-1.5 py-0.5 rounded text-white/60">↑↓</kbd>
                    <kbd className="bg-white/5 px-1.5 py-0.5 rounded text-white/60">ENTER</kbd>
                </div>
            </div>
        </Command.Dialog>
    );
};
