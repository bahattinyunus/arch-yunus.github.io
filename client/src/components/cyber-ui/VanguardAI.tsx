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
    Binary,
    DownloadCloud,
    Loader2
} from 'lucide-react';
import { useCyberSound } from '@/hooks/use-cyber-sound';
import { useLocation } from 'wouter';
import { profileData } from '@/lib/data';
import { inferNeuralResponse, type NeuralInferenceResult } from '@/lib/neuralAgentEngine';
import { WebLLMService, AVAILABLE_MODELS, type WebLLMProgress, type WebLLMModel } from '@/lib/webllmService';

interface Message {
    sender: 'vanguard' | 'user';
    text: string;
    action?: { label: string; path?: string; external?: string };
    badges?: string[];
    analysis?: NeuralInferenceResult['analysis'];
    isWebLLM?: boolean;
}

export const VanguardAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showTelemetry, setShowTelemetry] = useState(false);
    
    // WebLLM State
    const [selectedModelId, setSelectedModelId] = useState<string>("Qwen2.5-1.5B-Instruct-q4f16_1-MLC");
    const [llmMode, setLlmMode] = useState<boolean>(false);
    const [llmLoading, setLlmLoading] = useState<boolean>(false);
    const [llmProgress, setLlmProgress] = useState<WebLLMProgress | null>(null);
    const [llmReady, setLlmReady] = useState<boolean>(false);

    const [messages, setMessages] = useState<Message[]>([
        {
            sender: 'vanguard',
            text: `Selam! Ben Bahattin Yunus Çetin\'in yapay zekâ asistanıyım.\n\nASELSAN saha gezisi, 66.500+ aday arasından seçildiği Türkiye–Fransa Gençlik Değişimi, TUA Uzay Hackathonu, Siber Vatan kampı, ODTÜ/Hacettepe eğitimi veya projeleri hakkında aklına takılan her şeyi sorabilirsin.`,
            badges: ["Dual-Engine (Local + WebGPU)", "Qwen2.5-1.5B (Optimum Türkçe)", "ASELSAN & TUA", "266+ Sertifika"],
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
        { label: "📄 Resmi CV (PDF)", query: "Yunus Çetin'in güncel CV ve özgeçmiş dosyasını indirebilir miyim?" },
        { label: "📍 ASELSAN Gölbaşı Üssü", query: "ASELSAN Gölbaşı saha operasyonu incelemesi nedir?" },
        { label: "🇪🇺 Türkiye–Fransa Değişimi", query: "Türkiye Fransa Gençlik Değişimi programı ve Strasbourg detayları?" },
        { label: "🛡️ Siber Vatan Kampı", query: "Siber Vatan Beyaz Şapkalı Hacker Kampı ve siber güvenlik çalışmaları?" },
        { label: "🌌 TUA & Uzay Hackathonu", query: "TUA Uzay Hackathonu ve Feza Arşivi nedir?" },
        { label: "🛸 Tulpar Aero & İHA-1", query: "Tulpar Aero-Dynamics ve İHA çalışmaları nedir?" },
        { label: "⚡ Budak %80 Edge-AI", query: "Budak Edge-AI model budama ve INT8 optimizasyonu nedir?" },
        { label: "📜 266+ Sertifika & ODTÜ", query: "Eğitim geçmişi ve sertifikaları nelerdir?" },
        { label: "💻 GitHub & Açık Kaynak", query: "GitHub açık kaynak projelerin ve repoların nelerdir?" },
        { label: "🎮 BeeRoute Simülatörü", query: "BeeRoute otonom drone rota simülatörü nedir?" }
    ];

    useEffect(() => {
        if (isOpen && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen, isTyping, llmProgress]);

    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev);
        window.addEventListener("toggle-vanguard", handleToggle);
        return () => window.removeEventListener("toggle-vanguard", handleToggle);
    }, []);

    // Load Open-Source WebLLM Model directly into WebGPU
    const handleActivateWebLLM = async (targetModelId?: string) => {
        const modelToLoad = targetModelId || selectedModelId;
        const service = WebLLMService.getInstance();
        service.setModel(modelToLoad);

        if (service.isReady() && service.getModelName() === modelToLoad) {
            setLlmMode(true);
            setLlmReady(true);
            return;
        }

        setLlmLoading(true);
        playSound('scan');
        try {
            await service.loadModel((prog) => {
                setLlmProgress(prog);
            });
            setLlmReady(true);
            setLlmMode(true);
            setLlmLoading(false);
            playSound('access');
            const currentModelConfig = AVAILABLE_MODELS.find(m => m.id === modelToLoad);
            setMessages(prev => [
                ...prev,
                {
                    sender: 'vanguard',
                    text: `[HUGGING FACE MODELİ AKTİF: ${modelToLoad}]\nModel Hugging Face deposundan ("${currentModelConfig?.hfRepo || 'mlc-ai'}") WebGPU VRAM belleğinize indirildi.\nTürkçe dil yeteneği optimize edildi. Şimdi doğrudan Türkçe olarak konuşabilirsiniz!`,
                    badges: ["Hugging Face MLC", currentModelConfig?.name || modelToLoad, "WebGPU Accelerated", "0 Server Cost"],
                    isWebLLM: true
                }
            ]);
        } catch (err: any) {
            setLlmLoading(false);
            setMessages(prev => [
                ...prev,
                {
                    sender: 'vanguard',
                    text: `[WebGPU Uyarısı]: ${err.message}\nCihazınızda WebGPU donanım desteği bulunmadığı için ultra-hızlı In-Browser Semantik Sinir Ağı devrede kalmaya devam ediyor.`,
                    badges: ["Local Semantic Fallback Active"]
                }
            ]);
        }
    };

    const handleSend = async (textToSend?: string) => {
        const query = textToSend || inputValue;
        if (!query.trim()) return;

        playSound('type');
        const userMsg: Message = { sender: 'user', text: query };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");

        const trimmedQuery = query.trim();
        // Cyber Command Line Interface (/cv, /operations, /certs, /arsenal, /comms, /help)
        if (trimmedQuery.startsWith("/")) {
            const cmd = trimmedQuery.toLowerCase();
            if (cmd === "/cv" || cmd === "/resume") {
                setTimeout(() => {
                    playSound('transmit');
                    setMessages(prev => [
                        ...prev,
                        {
                            sender: 'vanguard',
                            text: "Bahattin Yunus Çetin'in resmi ve doğrulanmış güncel özgeçmiş dosyası hazır.",
                            badges: ["Resmi CV", "PDF Doğrulandı"],
                            action: { label: "Özgeçmişi İndir (PDF)", external: "/cv3.pdf" }
                        }
                    ]);
                }, 150);
                return;
            }
            if (cmd === "/operations" || cmd === "/missions") {
                setTimeout(() => {
                    playSound('transmit');
                    setMessages(prev => [
                        ...prev,
                        {
                            sender: 'vanguard',
                            text: "ASELSAN Gölbaşı, 66.500+ adaylı Türkiye-Fransa Gençlik Değişimi, TUA ve Siber Vatan dâhil 13 doğrulanmış saha operasyonu.",
                            badges: ["13 Saha Görevi", "44+ Orijinal Fotoğraf"],
                            action: { label: "Saha Operasyonlarını Aç", path: "/operations" }
                        }
                    ]);
                }, 150);
                return;
            }
            if (cmd === "/certs" || cmd === "/sertifikalar") {
                setTimeout(() => {
                    playSound('transmit');
                    setMessages(prev => [
                        ...prev,
                        {
                            sender: 'vanguard',
                            text: "266'dan fazla BTK Akademi, ODTÜ Bilgeİş, Turkcell, T3 Vakfı ve SHGM akreditasyonu doğrulanmıştır.",
                            badges: ["266+ Sertifika", "Akreditasyon Kasası"],
                            action: { label: "Sertifika Kasasını Aç", path: "/intelligence" }
                        }
                    ]);
                }, 150);
                return;
            }
            if (cmd === "/arsenal" || cmd === "/stack") {
                setTimeout(() => {
                    playSound('transmit');
                    setMessages(prev => [
                        ...prev,
                        {
                            sender: 'vanguard',
                            text: "PyTorch, ROS 2, C++20, Edge-AI, BeeRoute ve Tulpar 6-DoF aerodinamik telemetri uçuş güvertesi.",
                            badges: ["Cephanelik & Stack", "2 İnteraktif Simülatör"],
                            action: { label: "Cephaneliğe Git", path: "/arsenal" }
                        }
                    ]);
                }, 150);
                return;
            }
            if (cmd === "/comms" || cmd === "/contact") {
                setTimeout(() => {
                    playSound('transmit');
                    setMessages(prev => [
                        ...prev,
                        {
                            sender: 'vanguard',
                            text: "Yunus'a doğrudan e-posta (bahattinyunuscetin1@gmail.com) veya telefon (+90 551 668 86 24) ile ulaşabilirsiniz.",
                            badges: ["Doğrudan İletişim", "Şifreli Comms"],
                            action: { label: "Comms Terminalini Aç", path: "/comms" }
                        }
                    ]);
                }, 150);
                return;
            }
            if (cmd === "/help") {
                setTimeout(() => {
                    playSound('transmit');
                    setMessages(prev => [
                        ...prev,
                        {
                            sender: 'vanguard',
                            text: "Taktik Komut Rehberi:\n• /cv - Resmi PDF özgeçmişi indir\n• /operations - 13 saha operasyonu & 44+ fotoğraf\n• /certs - 266+ sertifika ve lisans kasası\n• /arsenal - Teknoloji stack'i ve simülatörler\n• /comms - İletişim kanalları ve mesaj formu",
                            badges: ["Taktik Komutlar", "Yardım"]
                        }
                    ]);
                }, 150);
                return;
            }
        }

        setIsTyping(true);

        const service = WebLLMService.getInstance();

        if (llmMode && service.isReady()) {
            const startTime = performance.now();
            // Multi-turn history formatting (last 6 messages)
            const history = messages.slice(-6).map(m => ({
                role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
                content: m.text
            }));

            // Create streaming placeholder message
            setMessages(prev => [
                ...prev,
                {
                    sender: 'vanguard',
                    text: '...',
                    badges: ["WebGPU Live Stream", service.getModelName()],
                    isWebLLM: true
                }
            ]);

            try {
                let streamedContent = "";
                const response = await service.generateStream(query, history, (fullText) => {
                    streamedContent = fullText;
                    setMessages(prev => {
                        const copy = [...prev];
                        const lastIdx = copy.length - 1;
                        if (lastIdx >= 0 && copy[lastIdx].sender === 'vanguard') {
                            copy[lastIdx] = {
                                ...copy[lastIdx],
                                text: fullText
                            };
                        }
                        return copy;
                    });
                });

                const endTime = performance.now();
                const elapsed = parseFloat(((endTime - startTime) / 1000).toFixed(2));
                const finalTokens = Math.max(1, Math.round(response.length / 3.5));
                const speed = parseFloat((finalTokens / Math.max(0.1, elapsed)).toFixed(1));

                playSound('transmit');
                setMessages(prev => {
                    const copy = [...prev];
                    const lastIdx = copy.length - 1;
                    if (lastIdx >= 0 && copy[lastIdx].sender === 'vanguard') {
                        copy[lastIdx] = {
                            sender: 'vanguard',
                            text: response || streamedContent,
                            badges: ["WebGPU Accelerated", `Süre: ${elapsed}s`, `${speed} tok/s`, service.getModelName()],
                            isWebLLM: true,
                            analysis: {
                                intent: "GENERATIVE_WEBGPU",
                                confidence: 99,
                                tokens: query.split(" "),
                                metrics: {
                                    inferenceTimeMs: elapsed * 1000,
                                    tokensProcessed: finalTokens,
                                    perplexityScore: 1.02
                                }
                            }
                        };
                    }
                    return copy;
                });
            } catch (err: any) {
                console.warn("WebLLM error, falling back:", err);
                const result = inferNeuralResponse(query);
                setMessages(prev => {
                    const copy = [...prev];
                    const lastIdx = copy.length - 1;
                    if (lastIdx >= 0 && copy[lastIdx].sender === 'vanguard') {
                        copy[lastIdx] = {
                            sender: 'vanguard',
                            text: result.text,
                            action: result.action,
                            badges: [...result.badges, "Fallback Active"],
                            analysis: result.analysis
                        };
                    }
                    return copy;
                });
            } finally {
                setIsTyping(false);
            }
        } else {
            // Standart In-Browser Semantic Neural Engine (15ms ultra hızlı)
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
            }, 250);
        }
    };

    return (
        <div className="fixed bottom-24 right-6 md:right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 20 }}
                        className="absolute bottom-16 right-0 w-[94vw] max-w-[450px] h-[620px] bg-black/95 border-2 border-neon-blue/60 backdrop-blur-2xl cyber-clip-br shadow-[0_0_60px_rgba(0,243,255,0.35)] flex flex-col overflow-hidden rounded-2xl"
                    >
                        {/* Agent Top Navigation Bar */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-2.5 text-neon-blue">
                                <div className="p-1.5 rounded-lg bg-neon-blue/20 border border-neon-blue/40 shadow-[0_0_12px_rgba(0,243,255,0.4)]">
                                    <Brain className="w-4 h-4 animate-pulse" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs tracking-wider font-bold text-white">VANGUARD AI AGENT</span>
                                        {llmMode ? (
                                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">WEBGPU LLM</span>
                                        ) : (
                                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-neon-green/20 text-neon-green border border-neon-green/30">LOCAL ENGINE</span>
                                        )}
                                    </div>
                                    <div className="text-[10px] font-mono text-white/50 flex items-center gap-1.5">
                                        <Activity className="w-2.5 h-2.5 text-neon-blue animate-spin" />
                                        <span>{llmMode ? `${WebLLMService.getInstance().getModelName()} (Hugging Face)` : "İstemci Tarafı Sinirsel Çıkarım"}</span>
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

                        {/* Open-Source Hugging Face Model Selector & WebGPU Controller */}
                        <div className="px-3.5 py-2 border-b border-white/10 bg-gradient-to-r from-purple-950/40 via-black to-black flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/90">
                                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                    <span className="font-semibold">Hugging Face Model (WebGPU):</span>
                                </div>
                                {llmReady ? (
                                    <button
                                        onClick={() => setLlmMode(!llmMode)}
                                        className={`px-2.5 py-0.5 rounded text-[10px] font-mono border transition-all ${
                                            llmMode
                                                ? "bg-purple-500 text-white border-purple-400 font-bold shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                                                : "bg-white/5 border-white/20 text-white/60 hover:text-white"
                                        }`}
                                    >
                                        {llmMode ? "AKTİF" : "DEVRE DIŞI"}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleActivateWebLLM()}
                                        disabled={llmLoading}
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-500 border border-purple-400 text-white text-[10px] font-mono font-bold transition-all disabled:opacity-50 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                                    >
                                        {llmLoading ? (
                                            <>
                                                <Loader2 className="w-3 h-3 animate-spin" />
                                                <span>İndiriliyor...</span>
                                            </>
                                        ) : (
                                            <>
                                                <DownloadCloud className="w-3 h-3" />
                                                <span>Modeli İndir</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>

                            {/* Model Selector Pills */}
                            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-0.5">
                                {AVAILABLE_MODELS.map((m) => {
                                    const isSelected = selectedModelId === m.id;
                                    return (
                                        <button
                                            key={m.id}
                                            disabled={llmLoading}
                                            onClick={() => {
                                                setSelectedModelId(m.id);
                                                if (llmReady && selectedModelId !== m.id) {
                                                    setLlmReady(false);
                                                    setLlmMode(false);
                                                    handleActivateWebLLM(m.id);
                                                }
                                            }}
                                            className={`px-2 py-0.5 rounded text-[9px] font-mono whitespace-nowrap border transition-all ${
                                                isSelected
                                                    ? "bg-purple-500/25 border-purple-400 text-purple-200 font-bold"
                                                    : "bg-white/[0.02] border-white/10 text-white/50 hover:text-white hover:border-white/20"
                                            }`}
                                            title={`${m.size} • VRAM: ${m.vram} • Hugging Face: ${m.hfRepo}`}
                                        >
                                            {m.name} {m.recommended && "⭐"}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Loading Progress Bar for Open Source Model */}
                        {llmLoading && llmProgress && (
                            <div className="p-3 border-b border-purple-500/30 bg-purple-950/30 text-[11px] font-mono text-purple-200 space-y-1.5">
                                <div className="flex justify-between">
                                    <span>{llmProgress.text}</span>
                                    <span>{Math.round(llmProgress.progress * 100)}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 transition-all duration-300"
                                        style={{ width: `${Math.round(llmProgress.progress * 100)}%` }}
                                    />
                                </div>
                            </div>
                        )}

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
                                                : msg.isWebLLM
                                                ? 'bg-purple-950/20 border border-purple-500/30 text-white/95 shadow'
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
                                                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono ${
                                                            msg.isWebLLM
                                                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                                                : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                                                        }`}
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
                                        {msg.sender === 'user' ? 'OPERATOR' : msg.isWebLLM ? 'WEBGPU QWEN2.5 ENGINE' : 'VANGUARD NEURAL ENGINE (LOCAL)'}
                                    </span>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex items-center gap-2 text-neon-blue text-[11px] font-mono p-2.5 bg-white/5 border border-white/10 rounded-lg w-fit animate-pulse">
                                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                                    <span>{llmMode ? "WEBGPU AÇIK KAYNAK MODEL YANITI ÜRETİYOR..." : "YEREL SİNİR AĞI ÇIKARIMI HESAPLANIYOR..."}</span>
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
                                placeholder={llmMode ? "Qwen2.5 LLM'e serbest soru sor... (veya /help)" : "Yapay zekâya soru sor... (veya /help, /cv)"}
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
                        <span>LOCAL AI // WebGPU Model</span>
                    </div>
                )}
            </motion.button>
        </div>
    );
};
