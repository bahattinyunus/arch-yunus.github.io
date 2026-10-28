import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, Compass, Radio, Shield, Sparkles, Plane, ExternalLink } from 'lucide-react';
import { useCyberSound } from '@/hooks/use-cyber-sound';

export interface TacticalNode {
    id: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
    title: string;
    description: string;
    badge: string;
    role: string;
    color: string;
}

export const TACTICAL_NODES: TacticalNode[] = [
    {
        id: "ankara",
        city: "Ankara",
        country: "Türkiye",
        lat: 39.93,
        lng: 32.85,
        title: "ODTÜ & Hacettepe & ASELSAN Üssü",
        description: "ODTÜ BÖTE & Hacettepe öğrenimi; ASELSAN Gölbaşı Radar & Elektronik Harp saha incelemesi ve TUA CubeSat Hackathon merkezi.",
        badge: "ANA KOMUTA MERKEZİ",
        role: "AI & Otonom Sistemler",
        color: "#00f3ff"
    },
    {
        id: "strasbourg",
        city: "Strasbourg / Paris",
        country: "Fransa",
        lat: 48.57,
        lng: 7.75,
        title: "Türkiye–Fransa Gençlik Değişimi",
        description: "66.500+ başvuru arasından seçilen 20 gençten biri olarak Avrupa Parlamentosu, AİHM ve diplomasi saha ziyareti.",
        badge: "DİPLOMASİ & TEMSİL",
        role: "20 / 66.500+ Gençlik Delegasyonu",
        color: "#3b82f6"
    },
    {
        id: "eskisehir",
        city: "Eskişehir",
        country: "Türkiye",
        lat: 39.77,
        lng: 30.52,
        title: "TEI - TUSAŞ Motor Sanayii",
        description: "6. Dönem Havacılık Motorları Okulu; turbofan ve turboşaft gaz türbinli jet motorları aviyonik eğitimi.",
        badge: "JET MOTORLARI AR-GE",
        role: "Gaz Türbinli Motorlar",
        color: "#f59e0b"
    },
    {
        id: "bursa",
        city: "Bursa",
        country: "Türkiye",
        lat: 40.18,
        lng: 29.06,
        title: "TÜBİTAK & GSB Uzay Kampı",
        description: "FezaArsivi CubeSat ve radyo astronomi telemetri gözlem istasyonu; hidrojen spektrogram analizleri.",
        badge: "UZAY & RADYO ASTRONOMİ",
        role: "CubeSat Telemetri",
        color: "#10b981"
    },
    {
        id: "trabzon",
        city: "Trabzon",
        country: "Türkiye",
        lat: 41.00,
        lng: 39.71,
        title: "KTÜ & Trabzon Protocol MQTT",
        description: "Yazılım mühendisliği eğitimi; denizcilik ve İHA telemetrisi için hafif asenkron ikili Trabzon Protocol çekirdeği.",
        badge: "AĞ & SİSTEM MİMARİSİ",
        role: "C++20 & MQTT Çekirdeği",
        color: "#a855f7"
    }
];

export const CyberGlobe: React.FC<{ onNodeSelect?: (node: TacticalNode) => void }> = ({ onNodeSelect }) => {
    const { playSound } = useCyberSound();
    const [selectedNode, setSelectedNode] = useState<TacticalNode>(TACTICAL_NODES[0]);
    const [isHovered, setIsHovered] = useState(false);

    const handleSelect = (node: TacticalNode) => {
        playSound("access");
        setSelectedNode(node);
        if (onNodeSelect) onNodeSelect(node);
    };

    return (
        <div 
            className="relative w-full max-w-md mx-auto p-5 rounded-2xl border border-neon-blue/30 bg-black/80 backdrop-blur-xl shadow-[0_0_40px_rgba(0,243,255,0.12)] overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-neon-blue animate-spin" style={{ animationDuration: '24s' }} />
                    <span className="text-xs font-mono font-bold text-white tracking-wider">KÜRESEL GÖREV & SAHA AĞI</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neon-blue/15 text-neon-blue border border-neon-blue/30">
                    5 STRATEJİK DÜĞÜM
                </span>
            </div>

            {/* Tactical 3D Holographic Globe Simulation */}
            <div className="relative w-full h-56 flex items-center justify-center my-2">
                {/* Orbital Outer Rings */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                    className="absolute w-52 h-52 rounded-full border border-dashed border-neon-blue/30 pointer-events-none"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                    className="absolute w-44 h-44 rounded-full border border-white/10 pointer-events-none"
                />

                {/* Central Cyber Sphere */}
                <div className="relative w-36 h-36 rounded-full border border-neon-blue/40 bg-gradient-to-br from-neon-blue/10 via-black to-emerald-500/10 shadow-[inset_0_0_30px_rgba(0,243,255,0.25)] flex items-center justify-center">
                    {/* Pulsing Core */}
                    <div className="absolute w-20 h-20 rounded-full bg-neon-blue/20 blur-xl animate-pulse" />

                    {/* Reticle Crosshairs */}
                    <div className="absolute w-full h-[1px] bg-neon-blue/30" />
                    <div className="absolute h-full w-[1px] bg-neon-blue/30" />
                    
                    {/* Selected Node Ping */}
                    <div className="relative z-10 flex flex-col items-center">
                        <span className="relative flex h-4 w-4">
                            <span 
                                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                style={{ backgroundColor: selectedNode.color }}
                            />
                            <span 
                                className="relative inline-flex rounded-full h-4 w-4 shadow-lg border border-white/40"
                                style={{ backgroundColor: selectedNode.color }}
                            />
                        </span>
                        <span className="text-[10px] font-mono font-bold text-white mt-1.5 bg-black/80 px-2 py-0.5 rounded border border-white/20">
                            {selectedNode.city.toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Orbiting Satellites / Nodes */}
                {TACTICAL_NODES.map((node, i) => {
                    const angle = (i * (360 / TACTICAL_NODES.length)) * (Math.PI / 180);
                    const radius = 96; // px distance from center
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    const isSelected = selectedNode.id === node.id;

                    return (
                        <motion.button
                            key={node.id}
                            onClick={() => handleSelect(node)}
                            whileHover={{ scale: 1.25 }}
                            style={{
                                transform: `translate(${x}px, ${y}px)`
                            }}
                            className={`absolute p-1.5 rounded-full border transition-all ${
                                isSelected
                                    ? "bg-white text-black shadow-[0_0_15px_#00f3ff] border-neon-blue scale-110"
                                    : "bg-black/90 text-white/70 hover:text-white border-white/20 hover:border-neon-blue"
                            }`}
                            title={`${node.city} - ${node.title}`}
                        >
                            <span 
                                className="block w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: node.color }}
                            />
                        </motion.button>
                    );
                })}
            </div>

            {/* Selected Node Details Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedNode.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 bg-white/[0.04] border border-white/10 rounded-xl space-y-1.5 font-mono text-xs"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${selectedNode.color}25`, color: selectedNode.color }}>
                            {selectedNode.badge}
                        </span>
                        <span className="text-[10px] text-white/40">
                            LAT: {selectedNode.lat}° · LNG: {selectedNode.lng}°
                        </span>
                    </div>

                    <h4 className="text-sm font-bold text-white font-sans mt-1">
                        {selectedNode.title}
                    </h4>

                    <p className="text-[11px] text-white/60 leading-relaxed font-sans">
                        {selectedNode.description}
                    </p>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50">
                        <span>UZMANLIK: {selectedNode.role}</span>
                        <span className="text-neon-blue font-semibold">{selectedNode.country}</span>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
