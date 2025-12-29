import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { AnimatePresence, motion } from "framer-motion";

// --- Types ---

type SkillStatus = "locked" | "unlocked" | "current" | "mastered";

interface SkillNode {
    id: string;
    title: string;
    x: number;
    y: number;
    status: SkillStatus;
    icon: string;
    xpReward?: number;
    type?: "Technical" | "Soft Skill" | "Core";
    duration?: string;
    description: string;
}

// --- Data ---
// Positions are relative to the center or a fixed canvas size (800x1000) matched to design
const SKILL_NODES: SkillNode[] = [
    {
        id: "intro",
        title: "Intro",
        x: 400,
        y: 100,
        status: "mastered",
        icon: "school",
        xpReward: 100,
        type: "Core",
        duration: "10 min",
        description: "Welcome to the system. Understand the basics of engagement."
    },
    {
        id: "logic",
        title: "Logic",
        x: 250,
        y: 250,
        status: "mastered",
        icon: "psychology",
        xpReward: 300,
        type: "Technical",
        duration: "25 min",
        description: "Master boolean logic and decision making structures."
    },
    {
        id: "variables",
        title: "Variables",
        x: 550,
        y: 250,
        status: "mastered",
        icon: "data_object",
        xpReward: 300,
        type: "Technical",
        duration: "20 min",
        description: "Understand data storage and manipulation."
    },
    {
        id: "data-structures",
        title: "Data Structures",
        x: 250,
        y: 450,
        status: "current",
        icon: "account_tree",
        xpReward: 500,
        type: "Technical",
        duration: "45 min",
        description: "Learn how to organize and store data efficiently. Mastering arrays, linked lists, and trees will unlock advanced algorithms."
    },
    {
        id: "loops",
        title: "Loops",
        x: 550,
        y: 450,
        status: "unlocked",
        icon: "loop",
        xpReward: 400,
        type: "Technical",
        duration: "30 min",
        description: "Automate repetitive tasks with iteration."
    },
    {
        id: "algorithms",
        title: "Algorithms",
        x: 250,
        y: 650,
        status: "locked",
        icon: "calculate",
        xpReward: 800,
        type: "Technical",
        duration: "60 min",
        description: "Advanced problem solving techniques."
    },
    {
        id: "circuits",
        title: "Circuits",
        x: 400,
        y: 650,
        status: "locked",
        icon: "memory",
        xpReward: 600,
        type: "Core",
        duration: "50 min",
        description: "Hardware level understanding of logic."
    },
];

export default function KnowledgeMap() {
    const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(SKILL_NODES.find(n => n.status === 'current') || null);

    // --- Helpers ---
    const getNodeStyles = (status: SkillStatus) => {
        switch (status) {
            case "mastered":
                return {
                    button: "bg-[#192633] border-gold text-gold shadow-[0_0_20px_rgba(255,215,0,0.3)]",
                    icon: "",
                    label: "text-gold font-bold"
                };
            case "current":
                return {
                    button: "bg-primary border-white text-white shadow-lg animate-[pulse_3s_infinite]",
                    icon: "",
                    label: "text-white font-bold bg-primary px-2 py-0.5 rounded shadow-md"
                };
            case "unlocked":
                return {
                    button: "bg-[#192633] border-primary text-primary shadow-[0_0_15px_rgba(19,127,236,0.3)]",
                    icon: "",
                    label: "text-primary font-bold"
                };
            case "locked":
            default:
                return {
                    button: "bg-[#111a22] border-gray-600 text-gray-500 cursor-not-allowed",
                    icon: "",
                    label: "text-gray-500 font-medium"
                };
        }
    };

    return (
        <div className="relative flex h-screen min-h-screen w-full flex-col overflow-hidden bg-background-dark text-white font-display">

            {/* Top HUD */}
            <div className="absolute top-0 left-0 right-0 z-50 bg-[#101922]/90 backdrop-blur-sm border-b border-[#233648] p-4 pb-2 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Link to="/dashboard" className="w-10 h-10 flex items-center justify-center rounded-full border border-[#233648] bg-[#192633] hover:border-primary/50 transition-colors">
                        <span className="material-symbols-outlined text-gray-400 hover:text-white">arrow_back</span>
                    </Link>
                    <div>
                        <h2 className="text-white text-lg font-bold leading-tight">Knowledge Map</h2>
                        <span className="text-[#92adc9] text-xs font-medium tracking-wide">SYSTEM OVERVIEW</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-[#192633] px-3 py-1.5 rounded-full border border-[#233648]">
                    <span className="material-symbols-outlined text-gold text-[18px]">bolt</span>
                    <p className="text-white text-sm font-bold">1,250 XP</p>
                </div>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative w-full h-full overflow-auto bg-[#101922]">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                    backgroundImage: "radial-gradient(#324d67 1.5px, transparent 1.5px)",
                    backgroundSize: "24px 24px"
                }}></div>

                {/* Canvas Container */}
                <div className="relative min-w-[800px] min-h-[1000px] w-full h-full flex items-center justify-center">
                    <div className="relative w-[800px] h-[800px] mt-20">

                        {/* Connection Lines (SVG) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                            <defs>
                                <linearGradient id="grad-gold" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#FFD700" stopOpacity="0.5" />
                                </linearGradient>
                                <linearGradient id="grad-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#137fec" stopOpacity="1" />
                                </linearGradient>
                                <linearGradient id="grad-gray" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#137fec" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#324d67" stopOpacity="0.3" />
                                </linearGradient>
                            </defs>

                            {/* Hardcoded paths matching the nodes */}
                            {/* Intro -> Logic */}
                            <path d="M400,100 C400,150 250,150 250,250" fill="none" stroke="url(#grad-gold)" strokeWidth="4" className="opacity-80" />
                            {/* Intro -> Variables */}
                            <path d="M400,100 C400,150 550,150 550,250" fill="none" stroke="url(#grad-gold)" strokeWidth="4" className="opacity-80" />

                            {/* Logic -> Data Structures */}
                            <path d="M250,250 C250,350 250,350 250,450" fill="none" stroke="url(#grad-blue)" strokeWidth="4" />
                            {/* Variables -> Loops */}
                            <path d="M550,250 C550,350 550,350 550,450" fill="none" stroke="url(#grad-blue)" strokeWidth="4" />

                            {/* Data Structures -> Algorithms (Locked) */}
                            <path d="M250,450 C250,550 250,550 250,650" fill="none" stroke="url(#grad-gray)" strokeDasharray="8 4" strokeWidth="3" />
                            {/* Data Structures -> Circuits (Locked) */}
                            <path d="M250,450 C250,550 400,550 400,650" fill="none" stroke="url(#grad-gray)" strokeDasharray="8 4" strokeWidth="3" />

                        </svg>

                        {/* Nodes */}
                        {SKILL_NODES.map((node) => {
                            const styles = getNodeStyles(node.status);
                            const isSelected = selectedSkill?.id === node.id;

                            return (
                                <div
                                    key={node.id}
                                    className="absolute flex flex-col items-center gap-2 z-10 transition-transform duration-300"
                                    style={{ left: node.x, top: node.y, transform: `translate(-50%, -50%) ${isSelected ? 'scale(1.1)' : 'scale(1)'}` }}
                                >
                                    {/* Active Pulse Ring */}
                                    {node.status === 'current' && (
                                        <div className="absolute inset-0 -m-4 rounded-full border border-primary/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none"></div>
                                    )}

                                    <button
                                        onClick={() => setSelectedSkill(node)}
                                        className={cn(
                                            "flex w-16 h-16 items-center justify-center rounded-full border-2 transition-all hover:scale-110 active:scale-95",
                                            styles.button,
                                            isSelected ? "ring-4 ring-offset-2 ring-offset-[#101922] ring-primary/50" : ""
                                        )}
                                    >
                                        <span className="material-symbols-outlined text-3xl">{node.icon}</span>
                                    </button>

                                    <div className={cn("text-xs tracking-wide mt-1 flex items-center gap-1", styles.label)}>
                                        {node.status === 'locked' && <span className="material-symbols-outlined text-[10px]">lock</span>}
                                        {node.status === 'mastered' && <span className="uppercase tracking-widest text-[10px] bg-[#111a22] border border-gold/30 px-1 rounded mr-1">Mastered</span>}
                                        {node.status === 'current' ? "Current" : node.title}
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>

            {/* Bottom Sheet Detail View */}
            <AnimatePresence>
                {selectedSkill && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-40 bg-[#111a22] rounded-t-[2rem] shadow-[0_-5px_30px_rgba(0,0,0,0.5)] border-t border-[#233648] max-h-[50vh] overflow-y-auto"
                    >
                        {/* Handle */}
                        <div className="w-full flex justify-center pt-3 pb-1" onClick={() => setSelectedSkill(null)}>
                            <div className="h-1.5 w-12 rounded-full bg-[#324d67] cursor-pointer hover:bg-white/50 transition-colors"></div>
                        </div>

                        <div className="px-6 pb-8 pt-2 max-w-xl mx-auto">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={cn(
                                            "text-sm font-bold tracking-widest uppercase",
                                            selectedSkill.status === 'mastered' ? "text-gold" : selectedSkill.status === 'locked' ? "text-gray-500" : "text-primary"
                                        )}>
                                            {selectedSkill.status === 'mastered' ? "Mastered Skill" : selectedSkill.status === 'locked' ? "Locked Skill" : "In Progress"}
                                        </span>
                                        {selectedSkill.status === 'current' && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>}
                                    </div>
                                    <h2 className="text-white text-3xl font-bold leading-tight">{selectedSkill.title}</h2>
                                </div>
                                <div className={cn(
                                    "flex w-12 h-12 shrink-0 items-center justify-center rounded-full border",
                                    selectedSkill.status === 'mastered' ? "bg-[#192633] border-gold text-gold" :
                                        selectedSkill.status === 'locked' ? "bg-black/20 border-gray-700 text-gray-600" :
                                            "bg-primary/20 border-primary/50 text-primary"
                                )}>
                                    <span className="material-symbols-outlined text-2xl">{selectedSkill.icon}</span>
                                </div>
                            </div>

                            {/* Chips */}
                            <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
                                {selectedSkill.xpReward && (
                                    <div className="flex h-7 shrink-0 items-center justify-center gap-x-1.5 rounded-full bg-[#233648] px-3 border border-[#324d67]">
                                        <span className="material-symbols-outlined text-gold text-sm">stars</span>
                                        <p className="text-white text-xs font-bold">{selectedSkill.xpReward} XP</p>
                                    </div>
                                )}
                                {selectedSkill.type && (
                                    <div className="flex h-7 shrink-0 items-center justify-center gap-x-1.5 rounded-full bg-[#233648] px-3 border border-[#324d67]">
                                        <span className="material-symbols-outlined text-[#92adc9] text-sm">code</span>
                                        <p className="text-white text-xs font-medium">{selectedSkill.type}</p>
                                    </div>
                                )}
                                {selectedSkill.duration && (
                                    <div className="flex h-7 shrink-0 items-center justify-center gap-x-1.5 rounded-full bg-[#233648] px-3 border border-[#324d67]">
                                        <span className="material-symbols-outlined text-[#92adc9] text-sm">timer</span>
                                        <p className="text-white text-xs font-medium">{selectedSkill.duration}</p>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-[#92adc9] text-base leading-relaxed mb-6">
                                {selectedSkill.description}
                            </p>

                            {/* Action Button */}
                            <button
                                disabled={selectedSkill.status === 'locked'}
                                className={cn(
                                    "w-full h-14 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
                                    selectedSkill.status === 'locked'
                                        ? "bg-[#192633] text-gray-500 cursor-not-allowed border border-[#233648]"
                                        : "bg-primary hover:bg-blue-600 active:scale-[0.98] shadow-[0_4px_20px_rgba(19,127,236,0.4)]"
                                )}
                            >
                                <span className={cn("text-lg font-bold tracking-wide", selectedSkill.status === 'locked' ? "" : "text-white")}>
                                    {selectedSkill.status === 'locked' ? "LOCKED" : selectedSkill.status === 'mastered' ? "PRACTICE AGAIN" : "START LEARNING"}
                                </span>
                                {selectedSkill.status !== 'locked' && <span className="material-symbols-outlined text-white">arrow_forward</span>}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
