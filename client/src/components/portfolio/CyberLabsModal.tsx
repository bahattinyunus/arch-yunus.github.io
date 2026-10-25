import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plane, Zap, ExternalLink } from "lucide-react";
import { TulparFlightDeck } from "@/components/cyber-ui/TulparFlightDeck";
import { BudakEdgeLab } from "@/components/cyber-ui/BudakEdgeLab";

export type CyberLabType = "tulpar" | "budak" | null;

interface CyberLabsModalProps {
  type: CyberLabType;
  onClose: () => void;
  lang?: "tr" | "en";
}

export const CyberLabsModal: React.FC<CyberLabsModalProps> = ({ type, onClose, lang = "tr" }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (type) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [type, onClose]);

  if (!type) return null;

  const isTulpar = type === "tulpar";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-white/20 bg-[#07090e]/95 text-white shadow-[0_0_60px_rgba(0,243,255,0.15)] overflow-hidden"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className={`p-2 rounded-lg ${isTulpar ? "bg-neon-blue/20 text-neon-blue" : "bg-yellow-500/20 text-yellow-400"}`}>
                {isTulpar ? <Plane className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
              </span>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/50">
                  {lang === "tr" ? "İNTERAKTİF AR-GE SİMÜLATÖRÜ" : "INTERACTIVE R&D SIMULATOR"}
                </div>
                <h3 className="text-lg font-bold font-mono text-white">
                  {isTulpar ? "TULPAR UAV FLIGHT DECK (MAVLink / ROS2)" : "BUDAK EDGE-AI %80 PRUNING & QUANTIZATION LAB"}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/arsenal"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-white/70 hover:text-white hover:border-white/30 transition-colors"
              >
                <span>{lang === "tr" ? "Cephanelik Sayfasında Aç" : "Open in Arsenal"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onClose}
                aria-label="Kapat"
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-4 md:p-6 overflow-y-auto space-y-6">
            {isTulpar ? <TulparFlightDeck /> : <BudakEdgeLab />}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
