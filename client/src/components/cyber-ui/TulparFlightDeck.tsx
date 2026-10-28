import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Compass, Activity, Shield, Navigation, Wind, Radio, Zap, Play, Pause, Crosshair, Eye, Target, RefreshCw } from "lucide-react";
import { useCyberSound } from "@/hooks/use-cyber-sound";

export const TulparFlightDeck: React.FC = () => {
  const { playSound } = useCyberSound();
  const [isSimulating, setIsSimulating] = useState(true);
  const [altitude, setAltitude] = useState(1420); // meters
  const [speed, setSpeed] = useState(185); // km/h
  const [battery, setBattery] = useState(87); // %
  const [pitch, setPitch] = useState(2.4);
  const [roll, setRoll] = useState(-1.1);
  const [heading, setHeading] = useState(42);
  const [selectedDrone, setSelectedDrone] = useState<"TULPAR-S1" | "ANKA-EVTOL" | "KUZGUN-STRIKE">("TULPAR-S1");
  const [visionMode, setVisionMode] = useState<"CYBER" | "THERMAL" | "NVG">("CYBER");
  const [isTargetLocked, setIsTargetLocked] = useState(false);
  const [packetCount, setPacketCount] = useState(14820);

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setAltitude((prev) => +(prev + (Math.random() * 6 - 3)).toFixed(1));
      setSpeed((prev) => +(prev + (Math.random() * 4 - 2)).toFixed(1));
      setPitch((prev) => +(prev + (Math.random() * 0.8 - 0.4)).toFixed(2));
      setRoll((prev) => +(prev + (Math.random() * 0.6 - 0.3)).toFixed(2));
      setHeading((prev) => Math.round((prev + (Math.random() * 2 - 1) + 360) % 360));
      setPacketCount((prev) => prev + Math.floor(Math.random() * 5 + 3));
    }, 800);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleManeuver = (dp: number, dr: number) => {
    playSound("click");
    setPitch((prev) => +(prev + dp).toFixed(1));
    setRoll((prev) => +(prev + dr).toFixed(1));
  };

  const resetAttitude = () => {
    playSound("access");
    setPitch(0);
    setRoll(0);
  };

  const toggleTargetLock = () => {
    if (!isTargetLocked) {
      playSound("alert");
    } else {
      playSound("click");
    }
    setIsTargetLocked((prev) => !prev);
  };

  return (
    <div className={`relative rounded-2xl border transition-all duration-500 bg-black/85 backdrop-blur-xl p-6 md:p-8 overflow-hidden ${
      visionMode === "THERMAL"
        ? "border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)]"
        : visionMode === "NVG"
        ? "border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)]"
        : "border-neon-blue/40 shadow-[0_0_50px_rgba(0,243,255,0.15)]"
    }`}>
      {/* Background Grid & Scanlines */}
      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none" />
      <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
        visionMode === "THERMAL" ? "bg-red-500/10" : visionMode === "NVG" ? "bg-emerald-500/10" : "bg-neon-blue/10"
      }`} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className={`p-3 border rounded-xl animate-pulse transition-colors ${
            visionMode === "THERMAL"
              ? "bg-red-500/10 border-red-500/50 text-red-400"
              : visionMode === "NVG"
              ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
              : "bg-neon-blue/10 border-neon-blue/40 text-neon-blue"
          }`}>
            <Plane className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono px-2 py-0.5 rounded border transition-colors ${
                visionMode === "THERMAL"
                  ? "bg-red-500/20 text-red-400 border-red-500/30"
                  : visionMode === "NVG"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-neon-blue/20 text-neon-blue border-neon-blue/30"
              }`}>
                TULPAR AERO-DYNAMICS
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> OTONOM SİSTEM AKTİF
              </span>
            </div>
            <h3 className="text-2xl font-[family-name:var(--font-display)] font-bold text-white tracking-wide mt-1">
              UAV / eVTOL TELEMETRİ FLIGHT DECK
            </h3>
          </div>
        </div>

        {/* Drone selector, Vision Switcher & Simulation Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Vision mode switch */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
            {(["CYBER", "THERMAL", "NVG"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setVisionMode(mode);
                  playSound("scan");
                }}
                className={`px-2.5 py-1 text-[11px] font-mono rounded transition-all ${
                  visionMode === mode
                    ? "bg-white/15 text-white font-bold"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {(["TULPAR-S1", "ANKA-EVTOL", "KUZGUN-STRIKE"] as const).map((drone) => (
            <button
              key={drone}
              onClick={() => {
                setSelectedDrone(drone);
                playSound("click");
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded border transition-all ${
                selectedDrone === drone
                  ? "border-neon-blue bg-neon-blue/20 text-neon-blue shadow-[0_0_12px_rgba(0,243,255,0.3)] font-semibold"
                  : "border-white/10 text-white/50 hover:text-white hover:border-white/30"
              }`}
            >
              {drone}
            </button>
          ))}

          <button
            onClick={() => {
              setIsSimulating(!isSimulating);
              playSound("click");
            }}
            className="p-2 border border-white/20 rounded hover:border-neon-blue hover:text-neon-blue transition-colors text-white/70"
            title={isSimulating ? "Telemetriyi Duraklat" : "Telemetriyi Başlat"}
          >
            {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main HUD Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left: Primary Flight Instruments */}
        <div className="lg:col-span-8 space-y-6">
          {/* Artificial Horizon / Flight Gauge */}
          <div className={`relative h-64 md:h-72 rounded-xl border overflow-hidden flex items-center justify-center transition-colors duration-500 ${
            visionMode === "THERMAL"
              ? "border-red-500/40 bg-red-950/20"
              : visionMode === "NVG"
              ? "border-emerald-500/40 bg-emerald-950/20"
              : "border-white/15 bg-black/60"
          }`}>
            {/* Horizon Graphic */}
            <motion.div
              animate={{ rotate: roll, y: pitch * 5 }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="absolute w-[220%] h-[220%] flex flex-col pointer-events-none"
            >
              <div className={`w-full h-1/2 border-b-2 flex items-end justify-center pb-2 ${
                visionMode === "THERMAL"
                  ? "bg-red-950/30 border-red-500/80"
                  : visionMode === "NVG"
                  ? "bg-emerald-950/40 border-emerald-400/80"
                  : "bg-sky-950/40 border-neon-blue/80"
              }`}>
                <span className="text-[10px] font-mono text-white/50 tracking-widest">GÖKYÜZÜ // +PITCH {pitch}°</span>
              </div>
              <div className={`w-full h-1/2 flex items-start justify-center pt-2 ${
                visionMode === "THERMAL"
                  ? "bg-amber-950/40"
                  : visionMode === "NVG"
                  ? "bg-emerald-950/60"
                  : "bg-amber-950/30"
              }`}>
                <span className="text-[10px] font-mono text-white/40 tracking-widest">ZEMİN // -PITCH</span>
              </div>
            </motion.div>

            {/* Target Locking Reticle Overlay */}
            {isTargetLocked && (
              <motion.div
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
              >
                <div className="w-24 h-24 border-2 border-red-500 rounded-lg animate-pulse flex items-center justify-center relative">
                  <span className="absolute -top-5 text-[9px] font-mono text-red-400 bg-black/80 px-1 border border-red-500/40">
                    TARGET LOCKED [39°53'N 32°52'E]
                  </span>
                  <Crosshair className="w-10 h-10 text-red-500 animate-spin" style={{ animationDuration: "10s" }} />
                  <span className="absolute -bottom-5 text-[9px] font-mono text-red-400 bg-black/80 px-1 border border-red-500/40">
                    DIST: 2,410m · CLOSING
                  </span>
                </div>
              </motion.div>
            )}

            {/* Crosshair & Pitch Ladder */}
            <div className="relative z-10 flex flex-col items-center pointer-events-none">
              <div className="w-16 h-0.5 bg-neon-green shadow-[0_0_8px_#39ff14]" />
              <div className="w-2 h-2 rounded-full border border-neon-green my-2" />
              <div className="w-16 h-0.5 bg-neon-green shadow-[0_0_8px_#39ff14]" />
            </div>

            {/* Digital Speed Tape (Left) */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 border border-white/20 p-2 rounded text-right font-mono">
              <div className="text-[10px] text-white/40">AIRSPEED</div>
              <div className="text-xl font-bold text-neon-blue">{speed}</div>
              <div className="text-[9px] text-white/30">KM/H</div>
            </div>

            {/* Digital Altitude Tape (Right) */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 border border-white/20 p-2 rounded text-left font-mono">
              <div className="text-[10px] text-white/40">ALTITUDE</div>
              <div className="text-xl font-bold text-emerald-400">{altitude}</div>
              <div className="text-[9px] text-white/30">METERS MSL</div>
            </div>

            {/* Heading Compass (Top) */}
            <div className="absolute top-3 px-4 py-1 bg-black/80 border border-neon-blue/40 rounded-full font-mono text-xs text-neon-blue flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-neon-blue" />
              <span>HDG {heading}° NNE · ROLL {roll}°</span>
            </div>

            {/* Autopilot Banner (Bottom) */}
            <div className="absolute bottom-3 px-4 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded font-mono text-[10px] text-neon-blue flex items-center gap-2">
              <Activity className="w-3 h-3" />
              <span>UE5 AERODYNAMICS · ROS2 HUMBLE · MAVLINK2 TELEMETRY</span>
            </div>
          </div>

          {/* Interactive Manual Maneuver & Target Lock Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/[0.03] border border-white/10 rounded-xl font-mono text-xs">
            <div className="flex items-center gap-2 text-white/60">
              <Navigation className="w-3.5 h-3.5 text-neon-blue" />
              <span>MANÜVRA KONTROLÜ:</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleManeuver(-2, 0)}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/15 border border-white/10 rounded text-white text-[11px] transition-colors"
                title="Burnu Kaldır (Pitch Up)"
              >
                ▲ PITCH +
              </button>
              <button
                onClick={() => handleManeuver(2, 0)}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/15 border border-white/10 rounded text-white text-[11px] transition-colors"
                title="Burnu İndir (Pitch Down)"
              >
                ▼ PITCH -
              </button>
              <button
                onClick={() => handleManeuver(0, -3)}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/15 border border-white/10 rounded text-white text-[11px] transition-colors"
                title="Sola Yatış (Roll Left)"
              >
                ◄ SOL YATIŞ
              </button>
              <button
                onClick={() => handleManeuver(0, 3)}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/15 border border-white/10 rounded text-white text-[11px] transition-colors"
                title="Sağa Yatış (Roll Right)"
              >
                ► SAĞ YATIŞ
              </button>
              <button
                onClick={resetAttitude}
                className="px-2 py-1 bg-neon-blue/10 hover:bg-neon-blue/20 border border-neon-blue/40 text-neon-blue rounded text-[11px] flex items-center gap-1 transition-colors"
                title="Yatay Konuma Düzelt"
              >
                <RefreshCw className="w-3 h-3" /> DÜZLE
              </button>
            </div>

            <button
              onClick={toggleTargetLock}
              className={`px-3 py-1 rounded border flex items-center gap-1.5 transition-all font-semibold ${
                isTargetLocked
                  ? "bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.3)] animate-pulse"
                  : "bg-white/5 border-white/15 text-white/70 hover:text-white hover:border-white/30"
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>{isTargetLocked ? "HEDEF KİLİTLİ (TRACK)" : "HEDEF KİLİTLE"}</span>
            </button>
          </div>

          {/* Submetrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono">
                <Wind className="w-3.5 h-3.5 text-neon-blue" /> RÜZGAR HIZI
              </div>
              <div className="text-lg font-bold font-mono text-white mt-1">14.2 <span className="text-xs font-normal text-white/40">kts</span></div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono">
                <Radio className="w-3.5 h-3.5 text-emerald-400" /> SİNYAL GÜCÜ
              </div>
              <div className="text-lg font-bold font-mono text-emerald-400 mt-1">-58 <span className="text-xs font-normal text-white/40">dBm</span></div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono">
                <Zap className="w-3.5 h-3.5 text-yellow-400" /> BATARYA / GÜÇ
              </div>
              <div className="text-lg font-bold font-mono text-yellow-400 mt-1">{battery}% <span className="text-xs font-normal text-white/40">24.2V</span></div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono">
                <Shield className="w-3.5 h-3.5 text-neon-green" /> PAKET AKIŞI
              </div>
              <div className="text-lg font-bold font-mono text-neon-green mt-1">
                {packetCount.toLocaleString()} <span className="text-[10px] font-normal text-white/40">pkts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Flight Computer & Architecture Capabilities */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-4">
            <h4 className="text-sm font-mono font-semibold text-neon-blue uppercase tracking-wider flex items-center gap-2">
              <Navigation className="w-4 h-4" /> Uçuş Mimarisi Yetkinlikleri
            </h4>
            
            <ul className="space-y-3 font-mono text-xs text-white/70">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-blue mt-1.5 shrink-0" />
                <span><strong>Unreal Engine 5:</strong> Fizik tabanlı 6-DoF aerodinamik ve hava akımı simülasyonu.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><strong>ROS2 Entegrasyonu:</strong> Düşük gecikmeli düğüm iletişimi ve otonom engelden kaçınma.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                <span><strong>SHGM İHA-1 Lisanslı:</strong> Sahada bizzat test edilmiş otonom kalkış, seyrüsefer ve iniş.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green mt-1.5 shrink-0" />
                <span><strong>Security by Design:</strong> Şifreli telemetri ve GPS Spoofing dayanıklılığı.</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
              <span>MİMARİ: Tulpar Core v3</span>
              <span className="text-emerald-400">DURUM: HAZIR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
