import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { extractVideoId, fetchVideoMetadata } from "../services/youtube";
import { generateMissionBriefing } from "../services/gemini";

export default function MissionBriefing() {
    const [url, setUrl] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [statusText, setStatusText] = useState("AWAITING TARGET DATA...");
    const navigate = useNavigate();

    // Prevent React Strict Mode double-firing
    const isProcessingRef = useRef(false);

    const videoId = extractVideoId(url);
    const active = !!videoId;

    const handleAnalyze = async () => {
        if (!active || isAnalyzing || !videoId || isProcessingRef.current) return;

        // Set the guard immediately
        isProcessingRef.current = true;
        setIsAnalyzing(true);

        try {
            // 1. Fetch Video Metadata
            setStatusText("ESTABLISHING UPLINK...");
            const metadata = await fetchVideoMetadata(videoId);

            if (!metadata) {
                throw new Error("Target invalid or unreachable.");
            }

            // 2. Generate Briefing (Gemini)
            setStatusText("DECODING INTEL...");
            const briefing = await generateMissionBriefing(metadata.title, metadata.description);

            // 3. Complete & Navigate
            setStatusText("MISSION PARAMETERS CONFIRMED.");

            // Ideally we save this to a store/context, but for now we pass state or just navigate
            // Passing state via location state is good for now
            navigate(`/mission/${videoId}`, { state: { metadata, briefing } });

        } catch (error) {
            console.error("Analysis Failed", error);
            setStatusText("UPLINK FAILED. RETRY.");
            setIsAnalyzing(false);
            isProcessingRef.current = false; // Reset guard on error
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-hidden font-display sci-fi-grid bg-background-dark text-white">
            {/* Ambient Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background-dark/80 via-transparent to-background-dark/90 z-0"></div>
                {/* Digital Rain / Scan Line visual decoration */}
                <div className="absolute w-full h-[2px] bg-primary/20 blur-sm animate-[scan_4s_linear_infinite] top-0 z-0"></div>
            </div>

            {/* Top App Bar */}
            <div className="relative z-10 flex items-center justify-between p-6 pb-2">
                <Link to="/dashboard" className="text-white/70 hover:text-primary transition-colors flex size-12 shrink-0 items-center justify-center rounded-full active:bg-white/5">
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </Link>
                <div className="flex flex-col items-center">
                    <h2 className="text-white text-xs font-bold tracking-[0.2em] text-center text-primary/80 mb-1">SECURE CONNECTION</h2>
                    <h1 className="text-white text-lg font-bold leading-tight tracking-wider text-center glow-text">[ MISSION BRIEFING ]</h1>
                </div>
                <button className="flex size-12 shrink-0 items-center justify-center rounded-full text-white/70 hover:text-primary transition-colors active:bg-white/5">
                    <span className="material-symbols-outlined text-[24px]">settings</span>
                </button>
            </div>

            {/* Main Content Centered */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 w-full max-w-md mx-auto">
                {/* Headline / Prompt */}
                <div className="text-center mb-8 w-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.8, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                    >
                        <span className="material-symbols-outlined text-primary text-[48px] mb-4">satellite_alt</span>
                    </motion.div>
                    <h2 className="text-white text-3xl font-bold leading-tight tracking-tight">Initialize Uplink</h2>
                    <p className="text-slate-400 text-sm mt-2 font-mono">Paste coordinates to begin data extraction.</p>
                </div>

                {/* Input Field: The Command Node */}
                <div className="w-full mb-6 group relative">
                    {/* Decorative brackets */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-8 w-[1px] bg-primary/30"></div>
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-primary/30"></div>
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-8 w-[1px] bg-primary/30"></div>
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-primary/30 right-0 left-auto"></div>

                    <div className="flex w-full items-center rounded-full border border-primary/40 bg-background-dark/50 backdrop-blur-md glow-box focus-within:border-primary focus-within:shadow-[0_0_25px_rgba(19,127,236,0.3)] transition-all duration-300 h-16 px-2 overflow-hidden">
                        <div className="flex h-full w-12 items-center justify-center text-primary/70 pl-2">
                            <span className="material-symbols-outlined">link</span>
                        </div>
                        <input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 w-full bg-transparent border-none text-white placeholder:text-slate-500 focus:ring-0 text-base font-medium tracking-wide h-full py-2 outline-none pr-4"
                            placeholder="Enter YouTube Coordinates_"
                            type="text"
                        />
                    </div>
                </div>

                {/* Action Button */}
                <button
                    disabled={!active || isAnalyzing}
                    onClick={handleAnalyze}
                    className="group relative w-full overflow-hidden rounded-full bg-primary p-[1px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <div className="relative flex h-14 w-full cursor-pointer items-center justify-center rounded-full bg-primary px-8 py-1 transition-all group-hover:bg-primary/90">
                        {isAnalyzing ? (
                            <div className="flex items-center gap-2">
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                <span className="font-bold text-white tracking-widest text-lg">ANALYZING...</span>
                            </div>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-white mr-2 animate-bounce">rocket_launch</span>
                                <span className="font-bold text-white tracking-widest text-lg">INITIATE SCAN</span>
                            </>
                        )}
                    </div>
                </button>

                {/* Decorative HUD Elements */}
                {/* Only show HUD when not analyzing or different state? Keeping static for now as per design */}
                <div className="mt-12 w-full grid grid-cols-3 gap-2 opacity-50">
                    <div className="flex flex-col items-center border-t border-primary/20 pt-2">
                        <span className="text-[10px] text-primary font-mono tracking-widest">CPU</span>
                        <span className="text-xs text-white font-mono">34%</span>
                    </div>
                    <div className="flex flex-col items-center border-t border-primary/20 pt-2">
                        <span className="text-[10px] text-primary font-mono tracking-widest">MEM</span>
                        <span className="text-xs text-white font-mono">128TB</span>
                    </div>
                    <div className="flex flex-col items-center border-t border-primary/20 pt-2">
                        <span className="text-[10px] text-primary font-mono tracking-widest">NET</span>
                        <span className="text-xs text-white font-mono animate-pulse">ACTIVE</span>
                    </div>
                </div>
            </div>

            {/* Meta Text Footer */}
            <div className="relative z-10 w-full p-6 text-center mt-auto pb-32">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#137fec]"></div>
                    <p className="text-primary/60 text-xs font-mono tracking-wider">SYSTEM STATUS: {statusText}</p>
                </div>
            </div>

            {/* Bottom Grid Decoration */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
        </div>
    );
}
