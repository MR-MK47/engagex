import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface FlowStateArenaProps {
    onComplete: (confidence: "guessing" | "unsure" | "solid" | "skip") => void;
}

export function FlowStateArena({ onComplete }: FlowStateArenaProps) {
    const [selectedConfidence, setSelectedConfidence] = useState<"guessing" | "unsure" | "solid" | null>(null);

    const confidenceOptions = [
        {
            value: "guessing",
            label: "GUESSING",
            icon: "help_center", // or 'question_mark'
            color: "text-red-400",
            borderColor: "border-red-500/50",
            bgActive: "bg-red-500/20",
            desc: "I relied on luck or process of elimination."
        },
        {
            value: "unsure",
            label: "UNSURE",
            icon: "sentiment_neutral",
            color: "text-amber-400",
            borderColor: "border-amber-500/50",
            bgActive: "bg-amber-500/20",
            desc: "I understood some parts but need more practice."
        },
        {
            value: "solid",
            label: "SOLID",
            icon: "check_circle",
            color: "text-green-400",
            borderColor: "border-green-500/50",
            bgActive: "bg-green-500/20",
            desc: "I fully grasped the concepts and feel confident."
        }
    ] as const;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent font-display">
            {/* Background Blur */}
            <div className="absolute inset-0 bg-background-dark/90 backdrop-blur-lg z-0">
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/90 to-background-dark"></div>
                {/* Scanline */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(37,192,244,0.02)_50%)] bg-[length:100%_4px] opacity-30 pointer-events-none"></div>
            </div>

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-lg mx-auto px-6 py-8"
            >
                <div className="flex flex-col items-center justify-center mb-8 text-center space-y-2">
                    <span className="material-symbols-outlined text-primary text-4xl mb-2 animate-pulse">psychology</span>
                    <h2 className="text-2xl text-white font-bold tracking-widest uppercase glow-text">Session Complete</h2>
                    <p className="text-[#90bccb] text-sm tracking-wide">Flow State Assessment Required</p>
                </div>

                <div className="bg-[#101e22]/90 backdrop-blur-xl shadow-neon w-full rounded-xl border border-primary/30 relative overflow-hidden group p-6">
                    {/* Decorative Corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br-lg"></div>

                    <h3 className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 text-center">
                        How did you feel about this session?
                    </h3>

                    <div className="flex flex-col gap-3 mb-8">
                        {confidenceOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setSelectedConfidence(option.value)}
                                className={cn(
                                    "relative group flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 text-left",
                                    selectedConfidence === option.value
                                        ? `${option.bgActive} ${option.borderColor} shadow-[0_0_15px_rgba(0,0,0,0.3)]`
                                        : "bg-black/20 border-white/10 hover:bg-white/5 hover:border-white/20"
                                )}
                            >
                                <div className={cn(
                                    "p-2 rounded-full border bg-black/40 transition-colors",
                                    selectedConfidence === option.value ? option.borderColor : "border-white/10"
                                )}>
                                    <span className={cn("material-symbols-outlined text-xl", option.color)}>
                                        {option.icon}
                                    </span>
                                </div>
                                <div>
                                    <span className={cn("block text-sm font-bold tracking-wider", option.color)}>
                                        {option.label}
                                    </span>
                                    <span className="text-xs text-[#5c7c8a] group-hover:text-gray-400 transition-colors">
                                        {option.desc}
                                    </span>
                                </div>

                                {/* Active Indicator */}
                                {selectedConfidence === option.value && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        <span className={cn("material-symbols-outlined", option.color)}>check</span>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => selectedConfidence && onComplete(selectedConfidence)}
                        disabled={!selectedConfidence}
                        className={cn(
                            "w-full py-4 rounded-lg font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2",
                            selectedConfidence
                                ? "bg-primary text-background-dark hover:bg-white hover:text-black shadow-neon"
                                : "bg-[#16262c] text-[#5c7c8a] cursor-not-allowed"
                        )}
                    >
                        <span>Confirm Assessment</span>
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>

                    <div className="mt-4 text-center">
                        <button
                            onClick={() => onComplete("skip")}
                            className="text-[10px] text-[#5c7c8a] hover:text-white uppercase tracking-widest transition-colors"
                        >
                            Skip Assessment
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
