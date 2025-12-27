import { useParams, useLocation, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { type VideoMetadata } from "../services/youtube";
import { type MissionContent } from "../services/gemini";

interface LocationState {
    metadata: VideoMetadata;
    briefing: MissionContent;
}

export default function LearningMission() {
    const { missionId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { metadata, briefing } = (location.state as LocationState) || {};

    // Redirect if no data (user navigated directly or refresh)
    // In a real app we would fetch if missing
    if (!metadata || !briefing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background-dark text-white p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-warning mb-4">warning</span>
                <h1 className="text-xl font-bold mb-2">MISSION PARAMETERS MISSING</h1>
                <p className="text-slate-400 mb-6">Return to Command Deck to re-initialize.</p>
                <Link to="/dashboard" className="px-6 py-2 bg-primary rounded-full font-bold">RETURN TO BASE</Link>
            </div>
        );
    }

    const playerOptions = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 1, // Keep YouTube controls for now
            modestbranding: 1,
            origin: window.location.origin,
        },
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background-dark text-white font-display">
            {/* Header */}
            <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-surface-dark z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-slate-400 hover:text-white flex items-center gap-2 group"
                    >
                        <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        <span className="text-sm font-bold tracking-widest hidden sm:inline">ABORT MISSION</span>
                    </button>
                    <div className="h-4 w-[1px] bg-white/10"></div>
                    <h1 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">{metadata.title}</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-primary font-bold tracking-widest">MISSION TIME</span>
                        <span className="text-sm font-mono">00:00:00</span>
                    </div>
                    <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                        <span className="material-symbols-outlined text-primary text-sm">videocam</span>
                    </div>
                </div>
            </header>

            {/* Main Content: Split View */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">

                {/* Video Player Area */}
                <div className="flex-1 bg-black relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent to-black/80 z-10 pointer-events-none"></div>
                    <div className="w-full h-full max-w-5xl max-h-[calc(100vh-140px)] aspect-video bg-black rounded-lg overflow-hidden border border-white/5 relative z-0">
                        <YouTube
                            videoId={missionId}
                            opts={playerOptions}
                            className="w-full h-full"
                            title={metadata.title}
                        />
                    </div>
                </div>

                {/* Mission Intel Sidebar (Desktop) / Bottom Sheet (Mobile) - Simplified as sidebar for now */}
                <div className="w-full lg:w-[400px] bg-surface-dark border-l border-white/10 flex flex-col overflow-y-auto relative z-20">
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-xs font-bold text-primary tracking-widest mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">encrypted</span>
                                MISSION INTELLIGENCE
                            </h2>
                            <div className="p-4 rounded-xl bg-background-dark border border-white/5 shadow-inner">
                                <p className="text-sm text-slate-300 leading-relaxed italic">
                                    "{briefing.briefing}"
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xs font-bold text-neon-green tracking-widest mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                OBJECTIVES
                            </h2>
                            <ul className="space-y-3">
                                {briefing.objectives?.map((obj, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                                    >
                                        <div className="mt-0.5 min-w-[18px] h-[18px] rounded border border-slate-500 flex items-center justify-center">
                                            {/* Checkbox state logic later */}
                                        </div>
                                        <span className="text-sm text-slate-200">{obj}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Progress Bar */}
            <footer className="h-16 bg-surface-dark border-t border-white/10 px-6 flex items-center justify-between z-20 relative">
                <div className="flex items-center gap-4 flex-1 max-w-2xl">
                    <span className="text-xs font-bold text-slate-400">MASTERY</span>
                    <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
                        {/* Progress fill */}
                        <div className="absolute inset-y-0 left-0 bg-primary w-[0%] shadow-[0_0_10px_#137fec]"></div>
                        {/* Checkpoint markers example */}
                        <div className="absolute top-0 bottom-0 left-[30%] w-[2px] bg-white/20"></div>
                        <div className="absolute top-0 bottom-0 left-[70%] w-[2px] bg-white/20"></div>
                    </div>
                    <span className="text-xs font-bold text-white">0%</span>
                </div>

                <button className="ml-6 px-6 py-2 bg-white/5 hover:bg-white/10 active:scale-95 transition-all rounded-full border border-white/10 text-xs font-bold tracking-widest text-slate-300 hover:text-white">
                    NOTES
                </button>
            </footer>
        </div>
    );
}
