import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useLocation } from "wouter";
import { Shield, Cpu, Terminal, Target, Radio, Search, ExternalLink, Activity, Lock, Unlock, User, BookOpen, Volume2, Sparkles, HelpCircle, Plane, Zap, Award, Layers } from "lucide-react";
import { profileData } from "@/lib/data";
import { useVault } from "@/contexts/VaultContext";
import { useCyberSound } from "@/hooks/use-cyber-sound";

export const CommandTerminal: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [terminalOutput, setTerminalOutput] = useState<{ text: string; action?: { label: string; onClick: () => void } } | null>(null);
    const [, setLocation] = useLocation();
    const { isSecureMode, toggleSecureMode } = useVault();
    const { playSound, toggleAmbient } = useCyberSound();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "`" && !['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) || (e.key === "~")) {
                e.preventDefault();
                setOpen((prev) => !prev);
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
            setTerminalOutput({
                text: isSecureMode ? "SECURE_MODE: DEACTIVATED // STANDARD_CLEARANCE" : "SECURE_MODE: ACTIVATED // HIGH_CLEARANCE_VAULT_OPENED"
            });
        } else if (normalized === "whoami") {
            playSound('access');
            setTerminalOutput({
                text: "UID: BAHATTIN_YUNUS_CETIN // DEVELOPER · AI & UAV ARCHITECT // METU & HACETTEPE",
                action: { label: "Hakkımda Git", onClick: () => runCommand(() => setLocation("/#hakkimda")) }
            });
        } else if (normalized === "cv" || normalized === "resume") {
            playSound('transmit');
            window.open("/cv3.pdf", "_blank");
            setTerminalOutput({
                text: "RESMİ_CV_AÇILDI: /cv3.pdf (Doğrulanmış Özgeçmiş)",
                action: { label: "CV İndir (PDF)", onClick: () => window.open("/cv3.pdf", "_blank") }
            });
        } else if (normalized === "help" || normalized === "?") {
            playSound('type');
            setTerminalOutput({
                text: "KOMUTLAR: whoami, cv, locks, audio, tulpar, budak, beeroute, certs, stats, ping, clear, exit"
            });
        } else if (normalized === "audio" || normalized === "synth" || normalized === "sound") {
            toggleAmbient();
            playSound('transmit');
            setTerminalOutput({
                text: "CYBER_SYNTH_AUDIO_DURUMU_DEĞİŞTİRİLDİ"
            });
        } else if (normalized === "tulpar" || normalized === "flight" || normalized === "uav") {
            playSound('click');
            runCommand(() => setLocation("/arsenal"));
        } else if (normalized === "budak" || normalized === "pruning" || normalized === "edge") {
            playSound('click');
            runCommand(() => setLocation("/arsenal"));
        } else if (normalized === "beeroute" || normalized === "abc") {
            playSound('click');
            runCommand(() => setLocation("/#projeler"));
        } else if (normalized === "certs" || normalized === "vault") {
            playSound('click');
            runCommand(() => setLocation("/intelligence"));
        } else if (normalized === "stats") {
            playSound('type');
            setTerminalOutput({
                text: `METRİKLER: 231+ Repos | 1500+ Stars | 2063+ GitHub Followers | 12.6K+ LinkedIn | 266+ Sertifika`
            });
        } else if (normalized === "ping") {
            playSound('ping');
            setTerminalOutput({
                text: `PONG // LATENCY: 14.2ms // EDGE_NODES: ANKARA (ODTÜ), STRASBOURG (FRANCE), TEI (ESKİŞEHİR)`
            });
        } else if (normalized === "clear") {
            setInputValue("");
            setTerminalOutput(null);
        } else if (normalized === "exit" || normalized === "quit") {
            setOpen(false);
        } else {
            playSound('alert');
            setTerminalOutput({
                text: `Bilinmeyen komut: '${normalized}'. 'help' yazarak geçerli komutları görebilirsiniz.`
            });
        }
    };

    return (
        <Command.Dialog
            open={open}
            onOpenChange={(v) => {
                setOpen(v);
                if (!v) setTerminalOutput(null);
            }}
            label="Global Tactical Terminal"
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
                    placeholder="Komut girin (whoami, cv, locks, audio, tulpar, budak, help)..."
                    className="flex-1 bg-transparent text-white font-mono outline-none placeholder:text-white/30 text-sm md:text-base"
                />
                <div className="flex items-center gap-1.5 text-xs font-mono text-white/40">
                    <span className="bg-white/10 px-2 py-0.5 rounded text-[10px]">ESC</span>
                </div>
            </div>

            {terminalOutput && (
                <div className="p-3 bg-neon-blue/10 border-b border-neon-blue/30 font-mono text-xs text-neon-blue flex items-center justify-between gap-2">
                    <span className="break-all">{`> ${terminalOutput.text}`}</span>
                    <div className="flex items-center gap-2 shrink-0">
                        {terminalOutput.action && (
                            <button
                                onClick={terminalOutput.action.onClick}
                                className="px-2 py-0.5 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue border border-neon-blue/40 rounded text-[10px] font-bold transition-colors"
                            >
                                {terminalOutput.action.label}
                            </button>
                        )}
                        <button onClick={() => setTerminalOutput(null)} className="text-white/40 hover:text-white text-[10px]">TEMİZLE</button>
                    </div>
                </div>
            )}

            <Command.List className="max-h-[380px] overflow-y-auto p-2 scrollbar-hide">
                <Command.Empty className="py-6 text-center text-white/50 font-mono text-xs">
                    Eşleşen komut bulunamadı. Enter'a basarak ham sistem komutu koşturabilirsiniz.
                </Command.Empty>

                <Command.Group heading="SİSTEM & GÜVENLİK KONTROLLERİ" className="text-xs font-mono text-neon-blue/70 mb-2 px-2 mt-2">
                    <Command.Item
                        onSelect={() => runCommand(() => toggleSecureMode())}
                        className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-neon-blue/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-neon-blue/20"
                    >
                        {isSecureMode ? <Unlock className="w-4 h-4 text-yellow-500" /> : <Lock className="w-4 h-4 text-neon-blue" />}
                        <span className="font-bold text-xs font-mono">{isSecureMode ? 'GÜVENLİK_KASASINI_KAPAT' : 'GÜVENLİK_KASASINI_AÇ (SECURE_MODE)'}</span>
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
                        <span className="font-bold text-xs font-mono">CYBER_SYNTH_AUDIO_AÇ_KAPA</span>
                        <kbd className="ml-auto text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 font-mono">audio</kbd>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="İNTERAKTİF SİMÜLATÖRLER & LABLAR" className="text-xs font-mono text-yellow-400 mb-2 px-2 mt-3">
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/arsenal"))}
                        className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-yellow-500/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-yellow-500/20"
                    >
                        <Plane className="w-4 h-4 text-neon-blue" />
                        <span className="font-bold text-xs font-mono">TULPAR UAV FLIGHT DECK (TELEMETRİ)</span>
                        <kbd className="ml-auto text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 font-mono">tulpar</kbd>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/arsenal"))}
                        className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-yellow-500/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-yellow-500/20"
                    >
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="font-bold text-xs font-mono">BUDAK %80 MODEL BUDAMA LABORATUVARI</span>
                        <kbd className="ml-auto text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 font-mono">budak</kbd>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/intelligence"))}
                        className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-yellow-500/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-yellow-500/20"
                    >
                        <Award className="w-4 h-4 text-purple-400" />
                        <span className="font-bold text-xs font-mono">266+ DİJİTAL SERTİFİKA KASASI</span>
                        <kbd className="ml-auto text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 font-mono">certs</kbd>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="DOĞRULANMIŞ ÖZGEÇMİŞ & RAPORLAR" className="text-xs font-mono text-emerald-400 mb-2 px-2 mt-3">
                    <Command.Item
                        onSelect={() => runCommand(() => window.open("/cv3.pdf", "_blank"))}
                        className="flex items-center gap-3 px-3 py-2.5 text-white hover:bg-emerald-500/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-emerald-500/20"
                    >
                        <ExternalLink className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-xs font-mono text-emerald-400">RESMİ CV'Yİ İNDİR (PDF)</span>
                        <kbd className="ml-auto text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 font-mono">cv</kbd>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="NAVİGASYON MERKEZLERİ" className="text-[10px] font-mono text-white/30 mb-2 px-2 mt-3 uppercase tracking-widest">
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/"))}
                        className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                    >
                        <Shield className="w-4 h-4 text-white/40" />
                        <span className="font-mono text-xs">ANASAYFA (MISSION_CONTROL)</span>
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
                        <span className="font-mono text-xs">OPERASYONLAR (PROJE LOGLARI)</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/intelligence"))}
                        className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                    >
                        <Terminal className="w-4 h-4 text-white/40" />
                        <span className="font-mono text-xs">INTELLIGENCE (AKREDİTASYON & SAHA)</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/doctrine"))}
                        className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                    >
                        <BookOpen className="w-4 h-4 text-white/40" />
                        <span className="font-mono text-xs">DOKTRİN (FELSEFİ MANİFESTO)</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/comms"))}
                        className="flex items-center gap-3 px-3 py-2 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                    >
                        <Radio className="w-4 h-4 text-white/40" />
                        <span className="font-mono text-xs">İLETİŞİM (COMMS KANALLARI)</span>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="AMİRAL GEMİSİ PROJELER" className="text-[10px] font-mono text-white/30 mb-2 px-2 mt-3 uppercase tracking-widest">
                    {profileData.featured_projects.slice(0, 6).map((project) => (
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
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-neon-green" /> PROTOKOL_STABİL</span>
                    <span>METAL_YAKA v5.0</span>
                </div>
                <div className="flex items-center gap-2">
                    <kbd className="bg-white/5 px-1.5 py-0.5 rounded text-white/60">↑↓</kbd>
                    <kbd className="bg-white/5 px-1.5 py-0.5 rounded text-white/60">ENTER</kbd>
                </div>
            </div>
        </Command.Dialog>
    );
};
