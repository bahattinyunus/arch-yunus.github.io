import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Terminal, Shield, Zap, Volume2, Sparkles } from 'lucide-react';
import { useCyberSound } from '@/hooks/use-cyber-sound';

const SPECIAL_WORDS = ["ARAT_LABS", "TULPAR_UAV", "BUDAK_EDGE", "ODTÜ_CEIT", "HACETTEPE", "ROS2_HUMBLE", "RISCV_MCU", "SİBER_VATAN", "TUA_CUBESAT", "TEI_TURBINE", "METAL_YAKA_v5.0"];

export const MatrixOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { playSound } = useCyberSound();
    const [fps, setFps] = useState(60);
    const [packetCount, setPacketCount] = useState(48210);

    useEffect(() => {
        if (!isOpen) return;
        playSound("boot");

        const down = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", down);
        return () => window.removeEventListener("keydown", down);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let lastTime = performance.now();
        let frameCount = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Characters to rain down
        const chars = "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ1234567890ABCDEF$#@%&*+=~";
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -50);
        }

        const render = (time: number) => {
            frameCount++;
            if (time - lastTime >= 1000) {
                setFps(frameCount);
                frameCount = 0;
                lastTime = time;
                setPacketCount(p => p + Math.floor(Math.random() * 20 + 10));
            }

            // Translucent black fade to create trailing effect
            ctx.fillStyle = 'rgba(5, 7, 12, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = Math.random() > 0.98
                    ? SPECIAL_WORDS[Math.floor(Math.random() * SPECIAL_WORDS.length)]
                    : chars[Math.floor(Math.random() * chars.length)];

                // Leading character glows bright white / neon yellow
                ctx.fillStyle = drops[i] * fontSize < 50
                    ? '#d6ff3f'
                    : Math.random() > 0.8
                    ? '#00f3ff'
                    : '#00ff66';

                ctx.shadowColor = '#00ff66';
                ctx.shadowBlur = drops[i] * fontSize < 50 ? 8 : 2;

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-sm overflow-hidden select-none cursor-crosshair font-mono"
                >
                    <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

                    {/* Scanline CRT simulation */}
                    <div className="absolute inset-0 bg-scanlines opacity-25 pointer-events-none" />

                    {/* HUD Top Bar */}
                    <div className="absolute top-0 left-0 right-0 p-4 md:px-8 bg-black/80 border-b border-neon-blue/30 backdrop-blur-md flex items-center justify-between z-10 text-xs">
                        <div className="flex items-center gap-3">
                            <span className="p-1.5 rounded bg-neon-green/20 border border-neon-green/40 text-neon-green animate-pulse">
                                <Terminal className="w-4 h-4" />
                            </span>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-neon-blue font-bold tracking-wider">
                                        PROTOCOL: METAL_YAKA // KERNEL_STREAM_ACTIVE
                                    </span>
                                    <span className="text-[10px] bg-neon-blue/20 text-neon-blue px-2 py-0.5 rounded border border-neon-blue/30 hidden sm:inline">
                                        AES-256 STREAM
                                    </span>
                                </div>
                                <div className="text-[10px] text-white/50 flex items-center gap-3 mt-0.5">
                                    <span>OPERATÖR: BAHATTİN YUNUS ÇETİN</span>
                                    <span>·</span>
                                    <span className="text-neon-green flex items-center gap-1">
                                        <Activity className="w-3 h-3 animate-ping" /> STABİL
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Real-time Telemetry & Exit Button */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-4 text-[11px] text-white/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                                <span>FPS: <strong className="text-neon-green">{fps}</strong></span>
                                <span>PAKET: <strong className="text-neon-blue">{packetCount.toLocaleString()}</strong></span>
                                <span>LATENCY: <strong className="text-yellow-400">11.4ms</strong></span>
                            </div>

                            <button
                                onClick={() => {
                                    playSound("click");
                                    onClose();
                                }}
                                className="px-3.5 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg flex items-center gap-1.5 font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                            >
                                <X className="w-4 h-4" />
                                <span>ÇIKIŞ [ESC]</span>
                            </button>
                        </div>
                    </div>

                    {/* HUD Center Reticle */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-80 h-80 rounded-full border border-neon-blue/20 flex items-center justify-center relative animate-pulse">
                            <div className="w-64 h-64 rounded-full border border-dashed border-emerald-400/20" />
                            <div className="absolute w-full h-[1px] bg-neon-blue/20" />
                            <div className="absolute h-full w-[1px] bg-neon-blue/20" />
                            <div className="absolute top-4 text-[10px] text-neon-blue/60 tracking-widest">
                                REAL-TIME QUANTUM DECRYPTOR
                            </div>
                            <div className="absolute bottom-4 text-[10px] text-emerald-400/60 tracking-widest">
                                NODE: ANKARA // METU // HACETTEPE
                            </div>
                        </div>
                    </div>

                    {/* HUD Bottom Info Bar */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] text-white/40 pointer-events-none px-4">
                        <span>BAHATTIN YUNUS CETIN · AI & UAV ARCHITECT</span>
                        <span>PRESS [ESC] TO DISENGAGE CYBER MATRIX</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
