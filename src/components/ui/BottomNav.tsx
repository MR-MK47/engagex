import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function BottomNav() {
    const location = useLocation();
    const path = location.pathname;

    // Determine active tab
    const isDashboard = path === "/dashboard";
    const isBriefing = path === "/mission-briefing";
    const isMission = path.includes("/mission/");

    // Hide on Learning Mission page (active mission) and Knowledge Map
    if (isMission || path === "/knowledge-map") {
        return null;
    }

    const isTabActive = isBriefing || isMission; // Treat briefing as mission tab for now

    return (
        <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 30 }}
                className="pointer-events-auto bg-surface-dark/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl px-6 py-3 flex items-center gap-8"
            >
                {/* Dashboard Tab */}
                <Link to="/dashboard" className="relative group">
                    <button className={cn(
                        "flex flex-col items-center gap-1 transition-colors",
                        isDashboard ? "text-primary" : "text-slate-400 hover:text-white"
                    )}>
                        <div className={cn(
                            "p-2 rounded-xl transition-all duration-300",
                            isDashboard ? "bg-primary/20 shadow-[0_0_15px_rgba(19,127,236,0.3)]" : "group-hover:bg-white/5"
                        )}>
                            <span className="material-symbols-outlined text-[24px]">grid_view</span>
                        </div>
                    </button>
                    {isDashboard && (
                        <motion.div layoutId="nav-pill" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_#137fec]" />
                    )}
                </Link>

                {/* Mission Tab */}
                <Link to="/mission-briefing" className="relative group">
                    <button className={cn(
                        "flex flex-col items-center gap-1 transition-colors",
                        isBriefing ? "text-primary" : "text-slate-400 hover:text-white"
                    )}>
                        <div className={cn(
                            "p-2 rounded-xl transition-all duration-300",
                            isBriefing ? "bg-primary/20 shadow-[0_0_15px_rgba(19,127,236,0.3)]" : "group-hover:bg-white/5"
                        )}>
                            <span className="material-symbols-outlined text-[24px]">rocket_launch</span>
                        </div>
                    </button>
                    {isBriefing && (
                        <motion.div layoutId="nav-pill" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_#137fec]" />
                    )}
                </Link>

                {/* Stats Tab (Placeholder) */}
                <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors group relative">
                    <div className="p-2 rounded-xl group-hover:bg-white/5 transition-all duration-300">
                        <span className="material-symbols-outlined text-[24px]">bar_chart</span>
                    </div>
                </button>

                {/* Profile Tab */}
                <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors group relative">
                    <div className="p-2 rounded-xl group-hover:bg-white/5 transition-all duration-300">
                        <span className="material-symbols-outlined text-[24px]">person</span>
                    </div>
                </button>
            </motion.div>
        </div>
    );
}
