import React from "react";
import {
  Plane,
  Cpu,
  BrainCircuit,
  Radio,
  Lock,
  Activity,
  Zap,
  Gauge,
  CheckCircle2,
  Terminal as TerminalIcon,
  Search,
} from "lucide-react";

export function WindowDots() {
  return (
    <div className="flex gap-1.5">
      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
      <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
      <span className="h-3 w-3 rounded-full bg-[#28c840]" />
    </div>
  );
}

// 1. Tulpar UAV Avionics & Telemetry Mockup
export function TulparUavMock() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-line bg-elevated/90 shadow-2xl shadow-black/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(214,255,63,0.14), transparent 68%)",
        }}
      />
      {/* Window Header */}
      <div className="relative flex items-center gap-3 border-b border-line px-5 py-4">
        <WindowDots />
        <div className="ml-2 inline-flex items-center gap-2 font-mono text-xs text-muted">
          <Plane className="h-4 w-4 text-accent" /> Tulpar Avionics HUD · ROS2
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-[10px] text-accent">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-accent" /> ARMED · AUTO
        </span>
      </div>

      {/* Main HUD Body */}
      <div className="relative grid gap-4 p-5 sm:grid-cols-2">
        {/* Telemetry Radial Box */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-canvas/60 p-5 text-center">
          <div
            className="relative flex h-32 w-32 items-center justify-center rounded-full p-[6px]"
            style={{
              background:
                "conic-gradient(var(--color-accent) 0deg 275deg, var(--color-line) 275deg 360deg)",
            }}
          >
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#0d0d10]">
              <span className="font-mono text-[9px] uppercase tracking-widest text-faint">
                AIRSPEED
              </span>
              <span className="mt-0.5 font-display text-3xl font-bold tracking-tight text-ink">
                86.4
              </span>
              <span className="font-mono text-[10px] text-muted">km/h</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 font-mono text-xs text-muted">
            <Activity className="h-3.5 w-3.5 text-accent" /> Alt: 420m · Pitch: +2.4°
          </div>
        </div>

        {/* Status Metrics */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
          <div className="rounded-xl border border-line bg-canvas/60 p-4">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-faint">
              <span>BATTERY / FUEL</span>
              <span className="text-accent font-semibold">84%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
              <div className="h-full w-[84%] rounded-full bg-accent" />
            </div>
          </div>

          <div className="rounded-xl border border-line bg-canvas/60 p-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-faint">
              WAYPOINT MISSION
            </div>
            <div className="mt-1 flex items-center justify-between font-mono text-xs text-ink/90">
              <span>WP 03 / 08</span>
              <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] text-accent">ETA: 04:12</span>
            </div>
          </div>

          <div className="col-span-2 rounded-xl border border-line bg-canvas/60 p-3 sm:col-span-1">
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted truncate">
              <TerminalIcon className="h-3.5 w-3.5 text-accent shrink-0" />
              <span className="truncate">/uav/optical_flow · 120Hz FastDDS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative flex items-center justify-between border-t border-line px-5 py-3 text-[11px] font-mono text-faint">
        <span className="inline-flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-accent" /> PX4 v1.14 & UE5 Physics Link
        </span>
        <span className="rounded-full border border-line px-2 py-0.5">LATENCY: 0.8ms</span>
      </div>
    </div>
  );
}

// 2. Budak Edge-AI Pruning Mockup
export function BudakPruningMock() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-line bg-elevated/90 shadow-2xl shadow-black/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(214,255,63,0.13), transparent 68%)",
        }}
      />
      {/* Header */}
      <div className="relative flex items-center gap-3 border-b border-line px-5 py-4">
        <WindowDots />
        <div className="ml-2 inline-flex items-center gap-2 font-mono text-xs text-muted">
          <BrainCircuit className="h-4 w-4 text-accent" /> Budak Edge-AI Optimizer
        </div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 font-mono text-[10px] text-faint">
          <Lock className="h-3 w-3 text-accent" /> ZERO-CLOUD
        </span>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2 gap-4 p-5">
        <div className="col-span-2 rounded-xl border border-line bg-canvas/60 p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-faint">
              WEIGHT PRUNING RATIO
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
              <CheckCircle2 className="h-3 w-3" /> DISTILLED
            </span>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <span className="font-display text-5xl font-bold leading-none tracking-tight md:text-6xl text-ink">
              80.0
            </span>
            <span className="mb-1 text-xl font-bold text-accent">%</span>
            <span className="mb-1.5 ml-auto font-mono text-xs text-muted">
              4x Parameter Compression
            </span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full w-[80%] rounded-full bg-accent shadow-[0_0_12px_rgba(214,255,63,0.4)]" />
          </div>
        </div>

        <div className="rounded-xl border border-line bg-canvas/60 p-4">
          <div className="flex items-center gap-2 font-mono text-xs text-faint">
            <Gauge className="h-4 w-4 text-accent" /> VRAM MEMORY
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-ink">2.8 GB</div>
          <div className="mt-1 font-mono text-[11px] text-faint">was 16 GB (-82.5%)</div>
        </div>

        <div className="rounded-xl border border-line bg-canvas/60 p-4">
          <div className="flex items-center gap-2 font-mono text-xs text-faint">
            <Zap className="h-4 w-4 text-accent" /> INFERENCE TIME
          </div>
          <div className="mt-2 font-display text-2xl font-bold text-ink">18 ms</div>
          <div className="mt-1 font-mono text-[11px] text-accent">7.8x Latency Boost</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-line px-5 py-3 text-[11px] font-mono text-faint">
        <span className="inline-flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5 text-accent" /> INT8 Dynamic Quantization · QLoRA
        </span>
        <span className="rounded-full border border-line px-2 py-0.5">TFLITE / ONNX</span>
      </div>
    </div>
  );
}

// 3. MERL Autonomous Code Factory Mockup
export function MerlSwarmMock() {
  return (
    <div className="relative w-full rounded-2xl border border-line bg-elevated/90 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <WindowDots />
        <div className="ml-2 inline-flex items-center gap-2 font-mono text-xs text-muted">
          <Cpu className="h-3.5 w-3.5 text-accent" /> MERL Multi-Agent Code Factory
        </div>
        <span className="ml-auto rounded-md border border-line px-2 py-1 font-mono text-[10px] text-faint">
          SWARM v1.4
        </span>
      </div>

      <div className="p-5 space-y-2.5">
        <div className="flex items-center gap-3 rounded-lg border border-line bg-canvas/60 px-3.5 py-2.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-line font-mono text-[10px] text-accent">
            A1
          </span>
          <span className="font-mono text-xs text-muted">Architect:</span>
          <span className="truncate font-mono text-xs text-ink/90">
            Synthesizing AST for async dispatch
          </span>
          <span className="ml-auto shrink-0 rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] text-accent">
            READY
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-line bg-canvas/60 px-3.5 py-2.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-line font-mono text-[10px] text-accent">
            A2
          </span>
          <span className="font-mono text-xs text-muted">Auditor:</span>
          <span className="truncate font-mono text-xs text-ink/90">
            Formal verification pass: 42/42 tests
          </span>
          <span className="ml-auto shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">
            100%
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-line bg-canvas/60 px-3.5 py-2.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-line font-mono text-[10px] text-accent">
            A3
          </span>
          <span className="font-mono text-xs text-muted">Refactor:</span>
          <span className="truncate font-mono text-xs text-ink/90">
            Self-healing memory leak patch applied
          </span>
          <span className="ml-auto shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-accent">
            0-DEFECT
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line px-5 py-3 text-[11px] font-mono text-faint">
        <span className="inline-flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-accent" /> Stochastic Multi-Agent Pipeline
        </span>
        <span className="rounded-full border border-line px-2 py-0.5">DOCKER / WASM</span>
      </div>
    </div>
  );
}

// 4. DeepAntenna RF Spectrum Mockup
export function DeepAntennaMock() {
  return (
    <div className="relative w-full rounded-2xl border border-line bg-elevated/90 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <WindowDots />
        <div className="ml-2 inline-flex items-center gap-2 font-mono text-xs text-muted">
          <Radio className="h-3.5 w-3.5 text-accent" /> DeepAntenna RF Spectrum & Cyber
        </div>
        <span className="ml-auto rounded-md border border-line px-2 py-1 font-mono text-[10px] text-accent">
          SİBER VATAN
        </span>
      </div>

      <div className="p-5 space-y-3">
        <div className="rounded-xl border border-line bg-canvas/60 p-4">
          <div className="flex items-center justify-between font-mono text-xs text-faint">
            <span>FREQUENCY HOPPING TRACKER</span>
            <span className="text-accent font-semibold">2.4 GHz ISM</span>
          </div>
          {/* Audio/Spectrum Bars Simulation */}
          <div className="mt-4 flex items-end gap-1.5 h-16 w-full justify-between px-2">
            {[45, 65, 80, 50, 95, 75, 40, 85, 90, 60, 70, 85, 100, 75, 60, 90, 45, 80, 65].map((h, i) => (
              <div
                key={i}
                className="w-full rounded-t bg-gradient-to-t from-line via-accent/60 to-accent"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-line bg-canvas/60 p-3 font-mono text-xs">
            <span className="text-faint text-[10px]">CARRIER SNR</span>
            <div className="text-ink font-bold text-lg mt-0.5">+28.4 dB</div>
          </div>
          <div className="rounded-xl border border-line bg-canvas/60 p-3 font-mono text-xs">
            <span className="text-faint text-[10px]">STEGANO SECURITY</span>
            <div className="text-accent font-bold text-lg mt-0.5">AES-256 GCM</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line px-5 py-3 text-[11px] font-mono text-faint">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5 text-accent" /> SDR Telemetry & Signal Defense
        </span>
        <span className="rounded-full border border-line px-2 py-0.5">C++17 / FFT</span>
      </div>
    </div>
  );
}

export function ProjectVisualMock({ type }: { type: string }) {
  switch (type) {
    case "tulpar":
      return <TulparUavMock />;
    case "budak":
      return <BudakPruningMock />;
    case "merl":
      return <MerlSwarmMock />;
    case "deepantenna":
      return <DeepAntennaMock />;
    default:
      return <TulparUavMock />;
  }
}
