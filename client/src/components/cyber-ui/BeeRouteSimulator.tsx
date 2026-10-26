import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Sparkles, Activity, Cpu, CheckCircle2 } from "lucide-react";
import { useCyberSound } from "@/hooks/use-cyber-sound";

interface Point {
  x: number;
  y: number;
  id: number;
}

export const BeeRouteSimulator: React.FC = () => {
  const { playSound } = useCyberSound();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [bestDistance, setBestDistance] = useState(0);
  const [initialDistance, setInitialDistance] = useState(0);
  const [cityCount, setCityCount] = useState(14);
  const [cities, setCities] = useState<Point[]>([]);
  const [bestRoute, setBestRoute] = useState<number[]>([]);

  // Generate random cities
  const generateCities = (count: number) => {
    const pts: Point[] = [];
    const width = 500;
    const height = 300;
    const padding = 30;

    for (let i = 0; i < count; i++) {
      pts.push({
        x: padding + Math.random() * (width - padding * 2),
        y: padding + Math.random() * (height - padding * 2),
        id: i,
      });
    }

    // Default route 0..count-1
    const route = pts.map((_, i) => i);
    const dist = calculateRouteDistance(pts, route);

    setCities(pts);
    setBestRoute(route);
    setInitialDistance(dist);
    setBestDistance(dist);
    setIteration(0);
    setIsRunning(false);
  };

  const calculateRouteDistance = (pts: Point[], route: number[]) => {
    let d = 0;
    for (let i = 0; i < route.length; i++) {
      const p1 = pts[route[i]];
      const p2 = pts[route[(i + 1) % route.length]];
      d += Math.hypot(p1.x - p2.x, p1.y - p2.y);
    }
    return Math.round(d);
  };

  useEffect(() => {
    generateCities(cityCount);
  }, [cityCount]);

  // ABC Simulation step
  useEffect(() => {
    if (!isRunning || cities.length === 0) return;

    const interval = setInterval(() => {
      setIteration((prev) => {
        const nextIter = prev + 1;
        // Two-opt heuristic step simulating Employed & Onlooker bees
        const newRoute = [...bestRoute];
        const i = Math.floor(Math.random() * (newRoute.length - 1));
        const j = i + 1 + Math.floor(Math.random() * (newRoute.length - i - 1));

        // Reverse subsegment
        const sub = newRoute.slice(i, j + 1).reverse();
        newRoute.splice(i, sub.length, ...sub);

        const newDist = calculateRouteDistance(cities, newRoute);
        if (newDist < bestDistance) {
          setBestRoute(newRoute);
          setBestDistance(newDist);
          playSound("click");
        }

        if (nextIter >= 200) {
          setIsRunning(false);
        }
        return nextIter;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [isRunning, cities, bestRoute, bestDistance]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || cities.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw route lines
    if (bestRoute.length > 1) {
      ctx.beginPath();
      for (let i = 0; i < bestRoute.length; i++) {
        const p1 = cities[bestRoute[i]];
        const p2 = cities[bestRoute[(i + 1) % bestRoute.length]];
        if (i === 0) ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.strokeStyle = "rgba(214, 255, 63, 0.85)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#d6ff3f";
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw cities
    cities.forEach((p, idx) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, idx === 0 ? 6 : 4.5, 0, Math.PI * 2);
      ctx.fillStyle = idx === 0 ? "#00f0ff" : "#ffffff";
      ctx.shadowColor = idx === 0 ? "#00f0ff" : "#ffffff";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "9px JetBrains Mono";
      ctx.fillText(`N${p.id}`, p.x + 8, p.y - 4);
    });
  }, [cities, bestRoute]);

  const efficiency = initialDistance > 0 
    ? Math.max(0, Math.round(((initialDistance - bestDistance) / initialDistance) * 100))
    : 0;

  return (
    <div className="relative rounded-2xl glass-surface p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/30 text-accent">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/20 text-accent border border-accent/30">
                CANLI ALGORİTMA MOTORU
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> O(G·S·n²)
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-display text-white mt-1">
              BeeRoute // Yapay Arı Kolonisi (ABC) Simülatörü
            </h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsRunning(!isRunning);
              playSound("click");
            }}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              isRunning
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                : "bg-accent text-black hover:bg-[#e2ff62] shadow-[0_0_15px_rgba(214,255,63,0.3)]"
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? "Durdur" : "Algoritmayı Başlat"}</span>
          </button>

          <button
            onClick={() => {
              generateCities(cityCount);
              playSound("click");
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors"
            title="Yeniden Rastgele Noktalar Üret"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas & Telemetry Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Canvas Area */}
        <div className="lg:col-span-8 relative rounded-xl border border-white/10 bg-black/60 overflow-hidden flex items-center justify-center p-2">
          <canvas
            ref={canvasRef}
            width={500}
            height={300}
            className="w-full max-w-[500px] h-auto aspect-[5/3] block"
          />
          <span className="absolute bottom-2 left-3 font-mono text-[9px] text-white/30 uppercase">
            Latent Euclidean Graph Grid // 2D Projected Mesh
          </span>
        </div>

        {/* Telemetry Metrics */}
        <div className="lg:col-span-4 space-y-3 font-mono">
          <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
            <span className="text-[10px] text-white/40 uppercase block">En Kısa Rota (Mesafe)</span>
            <span className="text-2xl font-bold text-accent">{bestDistance} px</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">
              %{efficiency} Optimizasyon Verimi
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
            <span className="text-[10px] text-white/40 uppercase block">İterasyon / Nesil</span>
            <span className="text-2xl font-bold text-white">{iteration} / 200</span>
            <span className="text-[10px] text-white/40 block mt-0.5">
              İşçi Arı & Gözcü Arı Döngüsü
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02]">
            <span className="text-[10px] text-white/40 uppercase block">Şehir / Düğüm Sayısı</span>
            <div className="flex items-center gap-2 mt-1">
              {[10, 14, 18, 24].map((cnt) => (
                <button
                  key={cnt}
                  onClick={() => setCityCount(cnt)}
                  className={`px-2 py-0.5 text-xs rounded border transition-colors ${
                    cityCount === cnt
                      ? "border-accent bg-accent/20 text-accent font-bold"
                      : "border-white/10 text-white/40 hover:text-white"
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
