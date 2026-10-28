import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

// Glitch Text Effect Component
export const GlitchText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={cn("relative inline-block group", className)}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-destructive opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
    </div>
  );
};

// Hexagon Badge Component
export const HexBadge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn(
      "relative px-4 py-1 text-xs font-mono uppercase tracking-wider text-primary-foreground bg-primary/20 border border-primary/50 backdrop-blur-sm clip-path-hexagon hover:bg-primary/30 transition-colors cursor-default",
      className
    )}>
      {children}
    </div>
  );
};

// Cyber Card Component
export const CyberCard = ({ children, className, hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, boxShadow: "0 0 25px rgba(0, 240, 255, 0.15)" } : {}}
      className={cn(
        "relative bg-card/30 border border-primary/20 backdrop-blur-md overflow-hidden rounded-lg p-6 transition-colors duration-300",
        "hover:border-primary/50",
        "before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:border-t-2 before:border-l-2 before:border-primary before:content-[''] before:transition-all before:duration-300 group-hover:before:w-full group-hover:before:h-full",
        "after:absolute after:bottom-0 after:right-0 after:w-2 after:h-2 after:border-b-2 after:border-r-2 after:border-primary after:content-[''] after:transition-all after:duration-300 group-hover:after:w-full group-hover:after:h-full",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// Typewriter Text Component
export const TypewriterText = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = React.useState("");

  React.useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);

  return <span className="font-mono">{displayText}<span className="animate-pulse">_</span></span>;
};

// Section Header
export const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <div className="mb-12 relative">
      <div className="flex items-center gap-4 mb-2">
        <div className="h-[1px] w-12 bg-primary/50"></div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground uppercase tracking-tight">
          <GlitchText text={title} />
        </h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
      </div>
      {subtitle && (
        <p className="text-muted-foreground font-mono text-sm md:text-base pl-16 max-w-2xl">

        </p>
      )}
    </div>
  );
};
