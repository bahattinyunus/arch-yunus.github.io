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
    ExternalLink
} from 'lucide-react';
import { useCyberSound } from '@/hooks/use-cyber-sound';
import { useLocation } from 'wouter';
import { profileData } from '@/lib/data';
import { FIELD_OPERATIONS } from '@/lib/linkedinData';

interface Message {
    sender: 'vanguard' | 'user';
    text: string;
    action?: { label: string; path?: string; external?: string };
    badges?: string[];
}

export const VanguardAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [mode, setMode] = useState<'assistant' | 'researcher' | 'tactical'>('assistant');
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: 'vanguard',
            text: `VANGUARD AGENT // v6.0 CORE AKTİF.\nBen Bahattin Yunus Çetin'in otonom portfolyo ve saha operasyonları yapay zekâ ajanıyım.\n\nASELSAN Gölbaşı incelemesi, 66.500+ adaylı Türkiye–Fransa Gençlik Değişimi, TUA Astro Hackathon, Siber Vatan Beyaz Şapkalı Hacker Kampı, ODTÜ BÖTE & Hacettepe eğitimleri, 266+ lisans/sertifika veya Tulpar & Budak projeleri hakkında doğrudan soru sorabilirsiniz.`,
            badges: ["ASELSAN Saha Doğrulaması", "TUA Hackathon", "Siber Vatan", "266+ Sertifika"]
        }
    ]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { playSound } = useCyberSound();
    const [, setLocation] = useLocation();

    const quickPrompts = [
        { label: "📍 Saha Operasyonları & ASELSAN", query: "ASELSAN ve saha operasyonları incelemeleri nelerdir?" },
        { label: "🇪🇺 Türkiye–Fransa Değişimi", query: "Türkiye Fransa Gençlik Değişimi programı nedir?" },
        { label: "🛡️ Siber Vatan & Güvenlik", query: "Siber Vatan ve siber güvenlik çalışmaları nelerdir?" },
        { label: "🌌 TUA & Uzay Hackathonu", query: "TUA Uzay Hackathonu ve uzay çalışmaları neler?" },
        { label: "🛸 Tulpar Aero & İHA-1", query: "Tulpar Aero-Dynamics ve İHA çalışmaları nedir?" },
        { label: "⚡ Budak %80 Edge-AI", query: "Budak Edge-AI optimizasyonu nedir?" },
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

    const generateResponse = (query: string): { text: string; action?: { label: string; path?: string; external?: string }; badges?: string[] } => {
        const q = query.toLowerCase().trim();

        // 1. Saha Operasyonları & ASELSAN
        if (q.includes("aselsan") || (q.includes("saha") && (q.includes("operasyon") || q.includes("gözlem") || q.includes("gezi")))) {
            return {
                text: "ASELSAN Gölbaşı Teknoloji Üssü İncelemesi:\nHacettepe Endüstri ve Sistem Topluluğu organizasyonuyla savunma sanayiimizin amiral gemisi ASELSAN'ın Gölbaşı Teknoloji Üssü'nde Ar-Ge hatları, kritik entegrasyonlar ve operasyonel mükemmellik sistemleri sahada incelenmiştir. Milli teknoloji projelerindeki sistem optimizasyonu doğrulanmıştır.",
                badges: ["Milli Savunma", "Sistem Mühendisliği", "6 Saha Fotoğrafı"],
                action: { label: "Saha Galerisinde İncele", path: "/operations" }
            };
        }

        // 2. Türkiye-Fransa Uluslararası Gençlik Değişimi
        if (q.includes("fransa") || q.includes("avrupa") || q.includes("strasbourg") || q.includes("maarif") || q.includes("diplomasi") || q.includes("aihm") || q.includes("parlamento")) {
            return {
                text: "Türkiye – Fransa Uluslararası Gençlik Değişimi:\n66.500'ü aşkın başvuru arasından seçilen 20 gençten biri olarak T.C. Gençlik ve Spor Bakanlığı ile Türkiye Maarif Vakfı iş birliğiyle tamamlandı. Avrupa Parlamentosu, AİHM, T.C. Strasbourg Başkonsolosluğu, Strasbourg Üniversitesi ile İsviçre (Basel) ve Almanya (Kehl) diplomasi, hukuk ve akademik saha incelemeleri gerçekleştirildi.",
                badges: ["66.500+ Başvuru / 20 Genç", "Avrupa Parlamentosu", "AİHM"],
                action: { label: "Diplomasi & Saha Kayıtları", path: "/operations" }
            };
        }

        // 3. TUA ve Uzay Çalışmaları
        if (q.includes("tua") || q.includes("uzay") || q.includes("astro") || q.includes("hackathon") || q.includes("feza") || q.includes("satürn") || q.includes("radyo astronomi")) {
            return {
                text: "TUA Astro Hackathon & KAMP+ Uzay:\nTürkiye Uzay Ajansı (TUA) Trabzon Astro Hackathon'unda 48 saatlik kesintisiz maratonda 15 açık kaynak proje vizyonu inşa edildi. TÜBİTAK iş birliğiyle KAMP+ Havacılık ve Uzay Kampı'nda Satürn saha gözlemleri ve spektrogram analizi yapılarak 'FezaArsivi' açık kaynak telemetri reposu yayımlandı.",
                badges: ["48 Saat Hackathon", "15 Açık Kaynak Proje", "TÜBİTAK FezaArsivi"],
                action: { label: "FezaArsivi GitHub Deposu", external: "https://github.com/bahattinyunus/FezaArsivi" }
            };
        }

        // 4. Siber Vatan & Siber Güvenlik
        if (q.includes("siber") || q.includes("güvenlik") || q.includes("vatan") || q.includes("hacker") || q.includes("beyaz şapka") || q.includes("forensic") || q.includes("deepfake")) {
            return {
                text: "Siber Vatan & Multimedya Güvenliği:\n- Siber Vatan 2026 Dönemi Trabzon 'Beyaz Şapkalı Hacker' kampı (DOKA & Siber Vatan) başarıyla tamamlandı.\n- BTK Akademi 42 saatlik 'Multimedya Veri Güvenliğinde Yapay Zekâ Kullanımı' atölyesinde EXIF, ELA, PRNU analizi, GAN modelleri ile Deepfake tespiti ve C2PA standartları üzerine açık kaynak kütüphane geliştirildi.",
                badges: ["Siber Vatan", "Beyaz Şapkalı Hacker", "BTK DeepForensics"],
                action: { label: "Siber Savunma Detayları", path: "/intelligence" }
            };
        }

        // 5. Kimdir
        if (q.includes("kimdir") || q.includes("kim") || q.includes("who") || q.includes("biyografi") || q.includes("yunus")) {
            return {
                text: "Bahattin Yunus ÇETİN; Developer & AI Researcher. ODTÜ BÖTE & Hacettepe Üniversitesi bünyesinde lisans ve araştırma faaliyetlerini sürdürmektedir. Tulpar Aero-Dynamics, Budak (%80 Edge-AI), Arkıl Games, MERL ve Anka Silicon Dynamics girişimlerinin kurucusudur. ROS2, C++17/20, PyTorch, Unreal Engine 5 ve SHGM İHA-1 pilotaj lisansıyla savunma, otonom sistemler ve yapay zekâ mimarileri inşa etmektedir.",
                badges: ["ODTÜ BÖTE", "Hacettepe", "İHA-1 Pilotu", "AI Developer"],
                action: { label: "Saha ve Projeleri Gör", path: "/operations" }
            };
        }

        // 6. Tulpar Aero & İHA-1
        if (q.includes("tulpar") || q.includes("iha") || q.includes("uav") || q.includes("drone") || q.includes("uçuş") || q.includes("evtol") || q.includes("pilot")) {
            return {
                text: "Tulpar Aero-Dynamics: UE5 ile fizik tabanlı 6-DoF uçuş mekaniği, aerodinamik veri görselleştirme, İHA/SİHA ve eVTOL için yapay zeka destekli otonom uçuş algoritmaları ve simülatörleri geliştirmektedir. Yunus Çetin aynı zamanda SHGM onaylı lisanslı İHA-1 pilotudur.",
                badges: ["SHGM İHA-1", "6-DoF Uçuş", "UE5 Simülasyon"],
                action: { label: "Tulpar Flight Deck", path: "/arsenal" }
            };
        }

        // 7. Budak Edge-AI
        if (q.includes("budak") || q.includes("edge") || q.includes("prun") || q.includes("budama") || q.includes("nicemleme") || q.includes("quant")) {
            return {
                text: "Budak | Edge-AI Optimization: Yapay zeka modellerini yapılandırılmış model budama ve INT8/INT4 nicemleme teknikleriyle %80'e kadar küçülterek bulut bağımlılığını ve maliyetleri sıfırlayan, cihaz üstünde donanım seviyesinde veri gizliliği sağlayan internet bağımsız Edge-AI ekosistemidir.",
                badges: ["%80 Model Budama", "Edge-AI", "INT8 Nicemleme"],
                action: { label: "Budak Lab Simülatörü", path: "/arsenal" }
            };
        }

        // 8. TEI - TUSAŞ Motor Sanayii
        if (q.includes("tei") || q.includes("tusaş") || q.includes("motor") || q.includes("türbin")) {
            return {
                text: "TEI - TUSAŞ Motor Sanayii Havacılık Motorları Okulu:\nTürkiye'nin havacılık motorlarındaki öncü gücü TEI bünyesinde gaz türbinli motorların tasarım süreçleri, ileri imalat teknikleri, aerotermal analiz ve motor mimarileri üzerine prestijli eğitim başarıyla tamamlanmıştır.",
                badges: ["TEI TUSAŞ", "Gaz Türbinli Motorlar", "Havacılık"],
                action: { label: "Saha Galerisinde Gör", path: "/operations" }
            };
        }

        // 9. Eğitim ve 266+ Sertifika
        if (q.includes("eğitim") || q.includes("üniversite") || q.includes("okul") || q.includes("sertifika") || q.includes("lisans") || q.includes("btk") || q.includes("akademik") || q.includes("odtü") || q.includes("hacettepe")) {
            return {
                text: "Akademik Eğitim & Doğrulanmış Kayıtlar:\n- Orta Doğu Teknik Üniversitesi (ODTÜ) (BÖTE | 2026 – 2032)\n- Hacettepe Üniversitesi (2026 – 2030)\n- Karadeniz Teknik Üniversitesi (Yazılım Mühendisliği | 2024 – 2026)\n- Recep Tayyip Erdoğan Üniversitesi (2024 – 2026)\n- T.C. Gençlik ve Spor Bakanlığı Gönüllü Gençlik Lideri (2024 – Devam)\n\nAkreditasyonlar: 266'dan fazla resmi sertifika (BTK Akademi, Turkcell Geleceği Yazanlar, T3 Akademi, Bilgeİş ODTÜ), SHGM İHA-1 Pilotajı, Siber Vatan ve TEI Akreditasyonu.",
                badges: ["ODTÜ", "Hacettepe", "266+ Lisans"],
                action: { label: "266+ Sertifika Kasası", path: "/intelligence" }
            };
        }

        // 10. İletişim
        if (q.includes("iletişim") || q.includes("mail") || q.includes("contact") || q.includes("ulaş") || q.includes("eposta")) {
            return {
                text: "Resmi İletişim Kanalları:\nE-posta: bahattinyunuscetin1@gmail.com\nGitHub: https://github.com/bahattinyunus\nLinkedIn: https://www.linkedin.com/in/bahattinyunus\n\nSitedeki şifreli Comms terminali üzerinden doğrudan mesaj iletebilirsiniz.",
                badges: ["Doğrulanmış E-Posta", "LinkedIn", "GitHub"],
                action: { label: "Comms Terminalini Aç", path: "/comms" }
            };
        }

        // Fallback intelligent agent reasoning
        return {
            text: `[VANGUARD AGENT CORE] "${query}" sorgusu analiz edildi.\nBahattin Yunus Çetin'in 5 aktif girişimi (Tulpar, Budak, Arkıl, MERL, Anka), 13 doğrulanmış saha operasyonu (ASELSAN, TUA, Maarif Fransa, Siber Vatan vb.) ve 266+ onaylı akreditasyonu bulunmaktadır. İlgili alana gitmek için aşağıdaki butonu kullanabilirsiniz.`,
            badges: ["Doğrulanmış Profil", "13 Saha Görevi", "266+ Akreditasyon"],
            action: { label: "Tüm Operasyonlar & Saha Kayıtları", path: "/operations" }
        };
    };

    const handleSend = (textToSend?: string) => {
        const query = textToSend || inputValue;
        if (!query.trim()) return;

        playSound('type');
        const userMsg: Message = { sender: 'user', text: query };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        setTimeout(() => {
            playSound('transmit');
            const reply = generateResponse(query);
            setMessages(prev => [...prev, {
                sender: 'vanguard',
                text: reply.text,
                action: reply.action,
                badges: reply.badges
            }]);
            setIsTyping(false);
        }, 550);
    };

    return (
        <div className="fixed bottom-24 right-6 md:right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 20 }}
                        className="absolute bottom-16 right-0 w-[92vw] max-w-[420px] h-[580px] bg-black/95 border border-neon-blue/60 backdrop-blur-2xl cyber-clip-br shadow-[0_0_50px_rgba(0,243,255,0.3)] flex flex-col overflow-hidden rounded-2xl"
                    >
                        {/* Agent Top Navigation Bar */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-2.5 text-neon-blue">
                                <div className="p-1 rounded bg-neon-blue/20 border border-neon-blue/40">
                                    <Bot className="w-4 h-4 animate-pulse" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs tracking-wider font-bold text-white">VANGUARD AI AGENT</span>
                                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">ONLINE</span>
                                    </div>
                                    <div className="text-[10px] font-mono text-white/50">Bahattin Yunus Çetin Zekâ Ajanı</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setMessages([{
                                            sender: 'vanguard',
                                            text: "Bellek sıfırlandı. Yeni operasyonel sorgu bekliyorum.",
                                            badges: ["Bellek Temizlendi"]
                                        }]);
                                        playSound('click');
                                    }}
                                    title="Sohbeti Sıfırla"
                                    className="text-white/40 hover:text-neon-blue transition-colors p-1"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/40 hover:text-white transition-colors p-1"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Agent Quick Prompt Chips */}
                        <div className="px-3 py-2 border-b border-white/10 bg-black/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
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
                        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10">
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

                                        {/* Optional interactive action button */}
                                        {msg.action && (
                                            <div className="mt-3 pt-2 border-t border-white/10">
                                                {msg.action.external ? (
                                                    <a
                                                        href={msg.action.external}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neon-blue text-black font-bold text-[11px] hover:bg-white transition-colors"
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
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neon-blue text-black font-bold text-[11px] hover:bg-white transition-colors"
                                                    >
                                                        <span>{msg.action.label}</span>
                                                        <ArrowRight className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <span className="text-[9px] font-mono text-white/30 mt-1 px-1">
                                        {msg.sender === 'user' ? 'OPERATOR' : 'VANGUARD AGENT'}
                                    </span>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex items-center gap-2 text-neon-blue text-[11px] font-mono p-2.5 bg-white/5 border border-white/10 rounded-lg w-fit animate-pulse">
                                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                                    <span>AJAN DÜŞÜNÜYOR & KANIT VERİLERİNİ TARAYOR...</span>
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
                                placeholder="Ajan'a soru sor (ASELSAN, ODTÜ, Fransa...)"
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
                title="Vanguard AI Ajanı"
            >
                <Bot className={`w-7 h-7 ${isOpen ? '' : 'animate-pulse'}`} />

                {/* Orbital Rings */}
                <div className="absolute inset-0 border border-neon-blue/40 rounded-full animate-[spin_8s_linear_infinite]" />
                <div className="absolute -inset-2 border border-neon-blue/20 rounded-full animate-[spin_12s_linear_infinite_reverse]" />

                {/* Ping Effect */}
                {!isOpen && (
                    <div className="absolute -inset-1 bg-neon-blue/25 rounded-full animate-ping opacity-60" />
                )}

                {/* Status Dot */}
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-neon-green rounded-full border-2 border-black animate-pulse" />

                {/* Pill Tooltip when closed */}
                {!isOpen && (
                    <div className="absolute right-16 px-2.5 py-1 rounded-md bg-black/90 border border-neon-blue/40 text-neon-blue font-mono text-[10px] tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                        AI AGENT // Soru Sor
                    </div>
                )}
            </motion.button>
        </div>
    );
};
