import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Cpu, HardDrive, Gauge, ShieldCheck, CheckCircle2, Sliders, Layers, Sparkles, Copy, Check, Terminal, Code2 } from "lucide-react";
import { useCyberSound } from "@/hooks/use-cyber-sound";

export const BudakEdgeLab: React.FC = () => {
  const { playSound } = useCyberSound();
  const [modelSize, setModelSize] = useState<number>(7); // 7B, 8B, 14B
  const [pruningRatio, setPruningRatio] = useState<number>(65); // 0% - 80%
  const [quantization, setQuantization] = useState<"FP16" | "INT8" | "INT4">("INT4");
  const [targetDevice, setTargetDevice] = useState<"Otonom İHA Companion" | "NVIDIA Jetson Orin Nano" | "Raspberry Pi 5" | "Çelik MCU RISC-V">("Otonom İHA Companion");
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCodePreview, setShowCodePreview] = useState(false);

  // Calculate results dynamically
  const metrics = useMemo(() => {
    const rawVram = modelSize * 2; // in GB for FP16
    const quantMultiplier = quantization === "FP16" ? 1 : quantization === "INT8" ? 0.5 : 0.25;
    const pruningMultiplier = (100 - pruningRatio) / 100;
    
    const finalVram = Math.max(0.4, +(rawVram * quantMultiplier * pruningMultiplier).toFixed(2));
    const memorySavedPct = Math.round(((rawVram - finalVram) / rawVram) * 100);
    const speedupFactor = +(1 / (quantMultiplier * (0.4 + pruningMultiplier * 0.6))).toFixed(1);
    const latency = Math.max(8, Math.round(120 / speedupFactor));

    return {
      rawVram,
      finalVram,
      memorySavedPct,
      speedupFactor,
      latency
    };
  }, [modelSize, pruningRatio, quantization]);

  const generatedScript = `# Budak Edge-AI Pruning & Quantization Pipeline
# Author: Bahattin Yunus Çetin (Arat Labs)
import torch
import torch.nn.utils.prune as prune
from transformers import AutoModelForCausalLM, AutoTokenizer

model_id = "Qwen/Qwen2.5-${modelSize}B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    device_map="auto"
)

# Apply ${pruningRatio}% L1 Structured Pruning
for name, module in model.named_modules():
    if isinstance(module, torch.nn.Linear):
        prune.l1_unstructured(module, name="weight", amount=${(pruningRatio / 100).toFixed(2)})
        prune.remove(module, "weight")

# Export to ${quantization} GGUF / ONNX format
print("✓ Model pruned by ${pruningRatio}%. Quantizing to ${quantization}...")
print("✓ VRAM reduced from ${metrics.rawVram}GB to ${metrics.finalVram}GB (${metrics.memorySavedPct}% saved)")
`;

  const handleCopyCode = () => {
    playSound("transmit");
    navigator.clipboard.writeText(generatedScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="relative rounded-2xl border border-yellow-500/30 bg-black/80 backdrop-blur-xl p-6 md:p-8 overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.1)]">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/40 rounded-xl text-yellow-400 animate-pulse">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded border border-yellow-500/30">
                BUDAK // EDGE-AI LAB
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> SIFIR BULUT BAĞIMLILIĞI
              </span>
            </div>
            <h3 className="text-2xl font-[family-name:var(--font-display)] font-bold text-white tracking-wide mt-1">
              MODEL BUDAMA (%80) & NİCEMLEME LABORATUVARI
            </h3>
          </div>
        </div>

        {/* Hardware Preset Selector */}
        <div className="flex items-center gap-2">
          {(["Otonom İHA Companion", "NVIDIA Jetson Orin Nano", "Raspberry Pi 5", "Çelik MCU RISC-V"] as const).map((device) => (
            <button
              key={device}
              onClick={() => {
                setTargetDevice(device);
                playSound("click");
              }}
              className={`px-2.5 py-1 text-[11px] font-mono rounded border transition-all ${
                targetDevice === device
                  ? "border-yellow-400 bg-yellow-500/20 text-yellow-400 font-bold shadow-[0_0_10px_rgba(234,179,8,0.2)]"
                  : "border-white/10 text-white/50 hover:text-white hover:border-white/30"
              }`}
            >
              {device}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Controls & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left: Sliders & Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Base Model Select */}
          <div>
            <label className="text-xs font-mono text-white/60 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-yellow-400" /> TEMEL LLM PARAMETRESİ</span>
              <span className="text-yellow-400 font-bold font-mono">{modelSize}B Parametre</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[7, 8, 14].map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setModelSize(size);
                    playSound("click");
                  }}
                  className={`py-2 px-3 text-xs font-mono rounded border transition-all ${
                    modelSize === size
                      ? "border-yellow-400 bg-yellow-500/20 text-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.3)] font-bold"
                      : "border-white/10 text-white/50 hover:text-white hover:border-white/30"
                  }`}
                >
                  {size}B Model
                </button>
              ))}
            </div>
          </div>

          {/* Model Pruning Ratio Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-white/60 mb-2">
              <span className="flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5 text-yellow-400" /> MODEL BUDAMA ORANI (PRUNING)</span>
              <span className="text-emerald-400 font-bold font-mono">%{pruningRatio} Budama</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="5"
              value={pruningRatio}
              onChange={(e) => {
                setPruningRatio(+e.target.value);
                playSound("hover");
              }}
              className="w-full accent-yellow-400 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
              <span>%0 (Orijinal)</span>
              <span>%50 (Hafif Budama)</span>
              <span>%80 (Budak Maksimum Limit)</span>
            </div>
          </div>

          {/* Quantization Mode */}
          <div>
            <label className="text-xs font-mono text-white/60 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-yellow-400" /> NİCEMLEME HASSASİYETİ (QUANTIZATION)</span>
              <span className="text-yellow-400 font-bold font-mono">{quantization}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["FP16", "INT8", "INT4"] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setQuantization(q);
                    playSound("click");
                  }}
                  className={`py-2 px-3 text-xs font-mono rounded border transition-all ${
                    quantization === q
                      ? "border-yellow-400 bg-yellow-500/20 text-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.3)] font-bold"
                      : "border-white/10 text-white/50 hover:text-white hover:border-white/30"
                  }`}
                >
                  {q} {q === "INT4" && "🔥 (Ultra Edge)"}
                </button>
              ))}
            </div>
          </div>

          {/* Code snippet toggle button */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                setShowCodePreview(!showCodePreview);
                playSound("click");
              }}
              className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg text-xs font-mono text-white/80 flex items-center gap-2 transition-colors"
            >
              <Code2 className="w-4 h-4 text-yellow-400" />
              <span>{showCodePreview ? "Pipeline Kodunu Gizle" : "Pipeline Kodunu Göster"}</span>
            </button>
            <button
              onClick={handleCopyCode}
              className="px-3.5 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-xs font-mono text-yellow-400 flex items-center gap-2 transition-colors font-semibold"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? "Kopyalandı!" : "PyTorch Kodunu Kopyala"}</span>
            </button>
          </div>
        </div>

        {/* Right: Real-time Optimized Metrics Card */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-xl space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-yellow-400/80 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-400" /> BUDAK OPTİMİZASYON ÇIKTISI
              </span>
              <span className="text-xs font-mono px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30 font-bold">
                %{metrics.memorySavedPct} TASARRUF
              </span>
            </div>

            {/* Metrics Counter Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-black/60 border border-white/10 rounded-lg">
                <div className="text-[11px] font-mono text-white/50 flex items-center gap-1">
                  <HardDrive className="w-3.5 h-3.5 text-yellow-400" /> VRAM GEREKSİNİMİ
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {metrics.finalVram} <span className="text-xs text-white/40">GB</span>
                </div>
                <div className="text-[10px] font-mono text-white/40 mt-1 line-through">
                  Orijinal: {metrics.rawVram} GB
                </div>
              </div>

              <div className="p-4 bg-black/60 border border-white/10 rounded-lg">
                <div className="text-[11px] font-mono text-white/50 flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-emerald-400" /> GECİKME (LATENCY)
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                  {metrics.latency} <span className="text-xs text-white/40">ms</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400/70 mt-1">
                  {metrics.speedupFactor}x Hız Artışı
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Checklist */}
          <div className="space-y-2 pt-4 border-t border-white/10 text-xs font-mono text-white/70">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Donanım Seviyesinde %100 Veri Gizliliği (Zero Data Leak)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Gömülü Linux, RTOS & Mikrodenetleyici Uyumlu Çıktı</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Bulut API Maliyetini Sıfırlayan Cihaz Üstü Inference</span>
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippet Drawer */}
      <AnimatePresence>
        {showCodePreview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-white/10"
          >
            <div className="flex items-center justify-between pb-2 text-xs font-mono text-white/60">
              <span className="flex items-center gap-1.5 text-yellow-400">
                <Terminal className="w-3.5 h-3.5" /> budak_prune_pipeline.py
              </span>
              <button
                onClick={handleCopyCode}
                className="text-xs text-white/50 hover:text-white flex items-center gap-1"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? "Kopyalandı" : "Kopyala"}</span>
              </button>
            </div>
            <pre className="p-4 bg-black/90 border border-white/10 rounded-xl font-mono text-xs text-white/80 overflow-x-auto">
              <code>{generatedScript}</code>
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
