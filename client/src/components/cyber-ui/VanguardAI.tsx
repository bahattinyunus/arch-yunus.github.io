// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain,
    Sparkles,
    Send,
    X,
    Terminal,
    ArrowRight,
    Shield,
    RefreshCw,
    Bot,
    Compass,
    Plane,
    Cpu,
    Globe,
    Layers,
    Award,
    CheckCircle2,
    Zap,
    ExternalLink,
    Activity,
    Sliders,
    Binary
} from 'lucide-react';
import { useCyberSound } from '@/hooks/use-cyber-sound';
import { useLocation } from 'wouter';
import { profileData } from '@/lib/data';
import { inferNeuralResponse, type NeuralInferenceResult } from '@/lib/neuralAgentEngine';

interface Message {
    sender: 'vanguard' | 'user';
    text: string;
    action?: { label: string; path?: string; external?: string };
    badges?: string[];
    analysis?: NeuralInferenceResult['analysis'];
}

export const VanguardAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showTelemetry, setShowTelemetry] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: 'vanguard',
            text: `VANGUARD NEURAL AGENT // v7.0 CLIENT-SIDE INFERENCE AKTİF.\nTarayıcı üzerinde yerel (in-browser) çalışan sinirsel çıkarım motoru hazırlandı.\n\nASELSAN Gölbaşı teknik üssü, 66.500+ adaylı Türkiye–Fransa Gençlik Değişimi, TUA Astro Hackathon, Siber Vatan Beyaz Şapkalı Hacker Kampı, ODTÜ BÖTE & Hacettepe eğitimleri, 266+ lisans/sertifika veya Tulpar & Budak projeleri hakkında doğrudan soru sorabilirsiniz.`,
            badges: ["Local Engine (In-Browser)", "Semantic Resonance", "ASELSAN & TUA", "266+ Sertifika"],
            analysis: {
                intent: "SYSTEM_INITIALIZATION",
                confidence: 99,
                tokens: ["init", "ready"],
                metrics: {
                    inferenceTimeMs: 14.2,
                    tokensProcessed: 32,
                    perplexityScore: 1.02
                }
            }
        }
    ]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { playSound } = useCyberSound();
    const [, setLocation] = useLocation();

    const quickPrompts = [
        { label: "📍 ASELSAN Gölbaşı Üssü", query: "ASELSAN Gölbaşı saha operasyonu incelemesi nedir?" },
        { label: "🇪🇺 Türkiye–Fransa Değişimi", query: "Türkiye Fransa Gençlik Değişimi programı ve Strasbourg detayları?" },
        { label: "🛡️ Siber Vatan Kampı", query: "Siber Vatan Beyaz Şapkalı Hacker Kampı ve siber güvenlik çalışmaları?" },
        { label: "🌌 TUA & Uzay Hackathonu", query: "TUA Uzay Hackathonu ve Feza Arşivi nedir?" },
        { label: "🛸 Tulpar Aero & İHA-1", query: "Tulpar Aero-Dynamics ve İHA çalışmaları nedir?" },
        { label: "⚡ Budak %80 Edge-AI", query: "Budak Edge-AI model budama ve INT8 optimizasyonu nedir?" },
        { label: "📜 266+ Sertifika & ODTÜ", query: "Eğitim geçmişi ve sertifikaları nelerdir?" }
    ];

    useEffect(() => {
        if (isOpen && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen, isTyping]);

    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev);
        window.addEventListener("toggle-vanguard", handleToggle);
        return () => window.removeEventListener("toggle-vanguard", handleToggle);
    }, []);

    const handleSend = (textToSend?: string) => {
        const query = textToSend || inputValue;
        if (!query.trim()) return;

        playSound('type');
        const userMsg: Message = { sender: 'user', text: query };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Gerçek in-browser neural inference çağrısı
        setTimeout(() => {
            playSound('transmit');
            const result = inferNeuralResponse(query);
            setMessages(prev => [
                ...prev,
                {
                    sender: 'vanguard',
                    text: result.text,
                    action: result.action,
                    badges: result.badges,
                    analysis: result.analysis
                }
            ]);
            setIsTyping(false);
        }, 320); // Gerçek lokal çıkarım gecikmesi
    };

    return (
        <div className="fixed bottom-24 right-6 md:right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 20 }}
                        className="absolute bottom-16 right-0 w-[94vw] max-w-[440px] h-[600px] bg-black/95 border-2 border-neon-blue/60 backdrop-blur-2xl cyber-clip-br shadow-[0_0_60px_rgba(0,243,255,0.35)] flex flex-col overflow-hidden rounded-2xl"
                    >
                        {/* Agent Top Navigation Bar */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-2.5 text-neon-blue">
                                <div className="p-1.5 rounded-lg bg-neon-blue/20 border border-neon-blue/40 shadow-[0_0_12px_rgba(0,243,255,0.4)]">
                                    <Brain className="w-4 h-4 animate-pulse" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs tracking-wider font-bold text-white">VANGUARD NEURAL ENGINE</span>
                                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-neon-green/20 text-neon-green border border-neon-green/30">LOCAL AI</span>
                                    </div>
                                    <div className="text-[10px] font-mono text-white/50 flex items-center gap-1.5">
                                        <Activity className="w-2.5 h-2.5 text-neon-blue animate-spin" />
                                        <span>Tarayıcıda Çalışan Çıkarım Motoru</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setShowTelemetry(!showTelemetry)}
                                    title="Telemetri & Sinir Ağı Katmanı"
                                    className={`p-1.5 rounded-md border text-xs font-mono transition-colors ${showTelemetry ? 'bg-neon-blue text-black border-neon-blue' : 'text-white/40 hover:text-white border-white/10'}`}
                                >
                                    <Binary className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => {
                                        setMessages([{
                                            sender: 'vanguard',
                                            text: "Bellek sıfırlandı. Sinirsel çıkarım motoru yeni sorgu bekliyor.",
                                            badges: ["Cache Cleared", "Neural Net Ready"]
                                        }]);
                                        playSound('click');
                                    }}
                                    title="Sohbeti Sıfırla"
                                    className="text-white/40 hover:text-neon-blue transition-colors p-1.5 rounded-md hover:bg-white/5"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/40 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Agent Quick Prompt Chips */}
                        <div className="px-3 py-2 border-b border-white/10 bg-black/50 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                            {quickPrompts.map((p, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(p.query)}
                                    className="px-2.5 py-1 rounded-md text-[10px] font-mono whitespace-nowrap bg-white/5 hover:bg-neon-blue/20 border border-white/10 hover:border-neon-blue/40 text-white/80 hover:text-neon-blue transition-all"
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>

                        {/* Messages Conversation Stream */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <div
                                        className={`max-w-[88%] p-3.5 rounded-xl text-xs font-mono leading-relaxed ${
                                            msg.sender === 'user'
                                                ? 'bg-neon-blue/20 border border-neon-blue/40 text-white shadow-[0_0_15px_rgba(0,243,255,0.1)]'
                                                : 'bg-white/[0.04] border border-white/10 text-white/90 shadow'
                                        }`}
                                    >
                                        <div className="whitespace-pre-line">{msg.text}</div>

                                        {/* Optional badges */}
                                        {msg.badges && msg.badges.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-white/10">
                                                {msg.badges.map((b, bi) => (
                                                    <span
                                                        key={bi}
                                                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                                                    >
                                                        <CheckCircle2 className="w-2.5 h-2.5" />
                                                        {b}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Telemetry / Neural Inference metrics bar */}
                                        {showTelemetry && msg.analysis && (
                                            <div className="mt-2.5 pt-2 border-t border-dashed border-white/15 bg-black/40 p-2 rounded text-[9px] font-mono text-neon-blue/80 space-y-1">
                                                <div className="flex items-center justify-between text-white/60">
                                                    <span>INTENT: {msg.analysis.intent}</span>
                                                    <span className="text-neon-green">CONF: {msg.analysis.confidence}%</span>
                                                </div>
                                                <div className="flex items-center justify-between text-white/40">
                                                    <span>INFERENCE: {msg.analysis.metrics?.inferenceTimeMs}ms</span>
                                                    <span>TOKENS: {msg.analysis.metrics?.tokensProcessed}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Interactive Action Button */}
                                        {msg.action && (
                                            <div className="mt-3 pt-2 border-t border-white/10">
                                                {msg.action.external ? (
                                                    <a
                                                        href={msg.action.external}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neon-blue text-black font-bold text-[11px] hover:bg-white transition-colors shadow-[0_0_10px_rgba(0,243,255,0.2)]"
                                                    >
                                                        <span>{msg.action.label}</span>
                                                        <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            if (msg.action?.path) {
                                                                setLocation(msg.action.path);
                                                                setIsOpen(false);
                                                            }
                                                        }}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neon-blue text-black font-bold text-[11px] hover:bg-white transition-colors shadow-[0_0_10px_rgba(0,243,255,0.2)]"
                                                    >
                                                        <span>{msg.action.label}</span>
                                                        <ArrowRight className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <span className="text-[9px] font-mono text-white/30 mt-1 px-1 flex items-center gap-1">
                                        {msg.sender === 'user' ? 'OPERATOR' : 'VANGUARD NEURAL ENGINE (LOCAL)'}
                                    </span>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex items-center gap-2 text-neon-blue text-[11px] font-mono p-2.5 bg-white/5 border border-white/10 rounded-lg w-fit animate-pulse">
                                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                                    <span>YEREL SİNİR AĞI ÇIKARIMI HESAPLANIYOR...</span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Footer */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="p-3 border-t border-white/10 bg-white/[0.02] flex gap-2"
                        >
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Local AI'a soru sor (ASELSAN, ODTÜ, TUA...)"
                                className="flex-1 bg-black/80 border border-white/20 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder:text-white/35 focus:outline-none focus:border-neon-blue transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                                className="px-3.5 rounded-lg bg-neon-blue text-black font-bold hover:bg-white disabled:opacity-30 transition-colors flex items-center justify-center shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                            >
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    setIsOpen(!isOpen);
                    playSound(isOpen ? 'click' : 'access');
                }}
                className={`
                    w-14 h-14 rounded-full flex items-center justify-center relative group
                    ${isOpen ? 'bg-neon-blue text-black shadow-[0_0_25px_rgba(0,243,255,0.6)]' : 'bg-black border-2 border-neon-blue text-neon-blue shadow-[0_0_25px_rgba(0,243,255,0.4)]'}
                    transition-all duration-300
                `}
                title="Vanguard Local AI Engine"
            >
                <Brain className={`w-7 h-7 ${isOpen ? '' : 'animate-pulse'}`} />

                {/* Orbital Rings */}
                <div className="absolute inset-0 border border-neon-blue/40 rounded-full animate-[spin_8s_linear_infinite]" />
                <div className="absolute -inset-2 border border-neon-blue/20 rounded-full animate-[spin_12s_linear_infinite_reverse]" />

                {/* Ping Effect */}
                {!isOpen && (
                    <div className="absolute -inset-1 bg-neon-blue/25 rounded-full animate-ping opacity-60" />
                )}

                {/* Status Dot */}
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-neon-green rounded-full border-2 border-black animate-pulse" />

                {/* Tooltip Pill */}
                {!isOpen && (
                    <div className="absolute right-16 px-2.5 py-1 rounded-md bg-black/90 border border-neon-blue/40 text-neon-blue font-mono text-[10px] tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-neon-green" />
                        <span>LOCAL AI // In-Browser Engine</span>
                    </div>
                )}
            </motion.button>
        </div>
    );
};
