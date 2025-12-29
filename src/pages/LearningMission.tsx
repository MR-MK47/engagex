import { useRef, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { type VideoMetadata } from "../services/youtube";
import { type MissionContent, type Question } from "../services/gemini";
import { TrainingGrounds } from "../components/mission/TrainingGrounds";
import { FlowStateArena } from "../components/mission/FlowStateArena";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";
import { saveMissionProgress, logQuestionAttempt, awardXP } from "../services/progress";

interface LocationState {
    metadata: VideoMetadata;
    briefing: MissionContent;
}

interface QuestionAttempt {
    questionId: string;
    questionText: string;
    selectedOption: string;
    isCorrect: boolean;
    timestamp: number;
}

export default function LearningMission() {
    const { missionId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { metadata, briefing } = (location.state as LocationState) || {};

    // Player State
    const playerRef = useRef<any>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
    const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);
    const [attempts, setAttempts] = useState<QuestionAttempt[]>([]);
    const [showConfidenceCheck, setShowConfidenceCheck] = useState(false);

    // Checkpoints (from Gemini questions)
    const checkpoints = briefing?.questions || [];

    // Initialize Mission Progress in Firestore
    useEffect(() => {
        if (user && missionId && metadata) {
            saveMissionProgress(user.uid, missionId, {
                title: metadata.title,
                subject: "General", // Placeholder or derived from metadata
                score: 0,
                completed: false
            });
        }
    }, [user, missionId, metadata]);

    // Redirect if no data
    if (!metadata || !briefing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background-dark text-white p-6 text-center font-display">
                <span className="material-symbols-outlined text-4xl text-warning mb-4">warning</span>
                <h1 className="text-xl font-bold mb-2">MISSION PARAMETERS MISSING</h1>
                <p className="text-slate-400 mb-6">Return to Command Deck to re-initialize.</p>
                <Link to="/dashboard" className="px-6 py-2 bg-primary text-background-dark rounded-full font-bold hover:bg-white transition-colors">RETURN TO BASE</Link>
            </div>
        );
    }

    // Monitor Player Time
    useEffect(() => {
        let interval: any;

        if (isPlaying && playerRef.current) {
            interval = setInterval(async () => {
                const time = await playerRef.current.getCurrentTime();
                setCurrentTime(time);
                setDuration(playerRef.current.getDuration());

                // Check for checkpoints
                const upcomingCheckpoint = checkpoints.find(q =>
                    !completedQuestions.includes(q.id) &&
                    Math.abs(time - q.timestamp) < 1 // Within 1 second window
                );

                if (upcomingCheckpoint) {
                    playerRef.current.pauseVideo();
                    setIsPlaying(false);
                    // activeQuestion state triggers the overlay
                    setActiveQuestion(upcomingCheckpoint);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isPlaying, checkpoints, completedQuestions]);

    const handlePlayerReady = (event: any) => {
        playerRef.current = event.target;
        setDuration(event.target.getDuration());
    };

    const handlePlayerStateChange = (event: any) => {
        // 1 = Playing, 2 = Paused
        setIsPlaying(event.data === 1);
    };

    const handleQuestionComplete = async (correct: boolean, selectedIndex: number) => {
        if (activeQuestion) {
            const attempt = {
                questionId: activeQuestion.id,
                questionText: activeQuestion.text,
                selectedOption: activeQuestion.options[selectedIndex],
                isCorrect: correct,
                timestamp: Date.now()
            };

            setCompletedQuestions(prev => [...prev, activeQuestion.id]);
            setAttempts(prev => [...prev, attempt]);

            // Save to Firestore
            if (user && missionId) {
                // We use any type cast here because the generic QuestionAttempt in this file 
                // slightly differs from or needs to map to the service type
                await logQuestionAttempt(user.uid, missionId, attempt);
            }
        }
        setActiveQuestion(null);
        if (playerRef.current) {
            playerRef.current.playVideo();
        }
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
        // Ensure we exit full screen if possible, though browser restrictions might apply
        setShowConfidenceCheck(true);
    };

    const handleConfidenceComplete = async (confidence: "guessing" | "unsure" | "solid" | "skip") => {
        if (user && missionId) {
            // Calculate final XP
            // Base XP: 100
            // + 50 per correct answer
            const correctCount = attempts.filter(a => a.isCorrect).length;
            const xpEarned = 100 + (correctCount * 50);

            await saveMissionProgress(user.uid, missionId, {
                completed: true,
                score: xpEarned,
                confidenceLevel: confidence
            });

            await awardXP(user.uid, xpEarned);
        }
        navigate("/dashboard");
    };

    const playerOptions = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1, // Fix for mobile/portrait behavior
            origin: window.location.origin,
        },
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background-dark text-white font-display selection:bg-primary/30 selection:text-primary">

            {/* Training Grounds Overlay (Modal) */}
            <AnimatePresence>
                {activeQuestion && (
                    <TrainingGrounds
                        question={activeQuestion}
                        onComplete={(correct, selectedIndex) => {
                            handleQuestionComplete(correct, selectedIndex);
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Flow State Arena (Confidence Check) */}
            <AnimatePresence>
                {showConfidenceCheck && (
                    <FlowStateArena
                        onComplete={handleConfidenceComplete}
                    />
                )}
            </AnimatePresence>

            {/* Header */}
            <header className="flex-none flex items-center justify-between p-4 pt-6 bg-[#101e22]/90 backdrop-blur-sm z-20 border-b border-[#315a68]/20">
                <button
                    onClick={() => navigate("/mission-briefing")}
                    className="group flex items-center text-[#90bccb] hover:text-primary transition-colors"
                >
                    <div className="w-8 h-8 flex items-center justify-center rounded border border-[#315a68]/40 bg-[#16262c] group-hover:border-primary/50 transition-colors">
                        <span className="material-symbols-outlined text-xl group-hover:-translate-x-0.5 transition-transform">chevron_left</span>
                    </div>
                </button>

                <div className="flex-1 mx-4 overflow-hidden relative h-8 items-center flex justify-center">
                    <div className="text-center px-4 py-1 rounded border border-[#315a68]/20 bg-[#16262c]/50">
                        <span className="text-primary text-xs font-bold tracking-[0.1em] uppercase shadow-primary drop-shadow-[0_0_5px_rgba(13,185,242,0.3)] truncate block max-w-[200px] sm:max-w-md">
                            MISSION: {metadata.title}
                        </span>
                    </div>
                </div>

                <div className="w-8 h-8 flex items-center justify-center rounded border border-[#315a68]/40 bg-[#16262c]">
                    <span className="material-symbols-outlined text-[#90bccb] text-sm">settings</span>
                </div>
            </header>

            {/* Main Content (Scrollable) */}
            <div className="flex-1 flex flex-col overflow-y-auto relative no-scrollbar pb-32">

                {/* Video Section */}
                <div className="p-4 mt-2 max-w-4xl mx-auto w-full">
                    <div className="relative w-full aspect-video bg-black/40 rounded border border-[#315a68]/50 overflow-hidden group pointer-events-none">
                        {/* Decorative Corners */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl z-20 shadow-neon-sm pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr z-20 shadow-neon-sm pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl z-20 shadow-neon-sm pointer-events-none"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br z-20 shadow-neon-sm pointer-events-none"></div>

                        {/* Video Player */}
                        <div className="absolute inset-0 z-10 pointer-events-auto">
                            <YouTube
                                videoId={missionId}
                                opts={playerOptions}
                                onReady={handlePlayerReady}
                                onStateChange={handlePlayerStateChange}
                                onEnd={handleVideoEnd}
                                className="w-full h-full"
                            />
                        </div>

                        {/* Overlays (Pointer events none allows clicking through to video controls) */}
                        <div className="absolute inset-0 scanlines opacity-30 pointer-events-none z-20"></div>
                    </div>
                </div>

                {/* Mission Parameters / Info */}
                <div className="p-4 space-y-4 max-w-4xl mx-auto w-full">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary text-sm">terminal</span>
                        <h3 className="text-[#90bccb] text-xs font-bold tracking-[0.15em] uppercase">Mission Parameters</h3>
                        <div className="flex-1 h-[1px] bg-[#315a68]/50"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#16262c]/50 p-3 rounded border border-[#315a68]/30 flex flex-col gap-1">
                            <span className="text-[#5c7c8a] text-[10px] uppercase tracking-wider">Subject</span>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                <span className="text-white text-sm font-bold">General</span>
                            </div>
                        </div>
                        <div className="bg-[#16262c]/50 p-3 rounded border border-[#315a68]/30 flex flex-col gap-1">
                            <span className="text-[#5c7c8a] text-[10px] uppercase tracking-wider">XP Reward</span>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                                <span className="text-white text-sm font-bold">500 XP</span>
                            </div>
                        </div>
                        <div className="col-span-2 bg-[#16262c]/50 p-3 rounded border border-[#315a68]/30 flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <span className="text-[#5c7c8a] text-[10px] uppercase tracking-wider">Difficulty Rating</span>
                                <span className="text-red-400 text-sm font-bold tracking-wide">HARDCORE</span>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-2 h-4 bg-red-500 rounded-sm"></div>
                                <div className="w-2 h-4 bg-red-500 rounded-sm"></div>
                                <div className="w-2 h-4 bg-red-500 rounded-sm"></div>
                                <div className="w-2 h-4 bg-[#315a68] rounded-sm"></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-[#16262c] rounded border-l-2 border-primary">
                        <p className="text-[#90bccb] text-xs leading-relaxed font-normal">
                            <strong className="text-white">BRIEFING:</strong> {briefing.briefing}
                        </p>
                    </div>

                    {/* Questions Answered Section */}
                    <div className="mt-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-secondary-success text-sm">assignment_turned_in</span>
                            <h3 className="text-[#90bccb] text-xs font-bold tracking-[0.15em] uppercase">Questions Answered</h3>
                            <div className="flex-1 h-[1px] bg-[#315a68]/50"></div>
                        </div>

                        {attempts.length === 0 ? (
                            <div className="text-center p-6 border border-[#315a68]/20 rounded bg-[#16262c]/30">
                                <span className="text-[#5c7c8a] text-xs italic">No data logs available. Engage via checkpoints.</span>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {attempts.map((attempt, i) => (
                                    <div key={i} className="flex flex-col gap-2 p-3 bg-[#16262c]/50 border border-[#315a68]/30 rounded">
                                        <div className="flex justify-between items-start">
                                            <span className="text-white text-xs font-medium">{attempt.questionText}</span>
                                            <span className={cn(
                                                "text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase",
                                                attempt.isCorrect
                                                    ? "bg-green-500/10 text-green-400 border-green-500/30"
                                                    : "bg-red-500/10 text-red-400 border-red-500/30"
                                            )}>
                                                {attempt.isCorrect ? "Correct" : "Failed"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-[#5c7c8a]">
                                            <span>Selected:</span>
                                            <span className={cn(
                                                "font-mono",
                                                attempt.isCorrect ? "text-primary" : "text-white/70"
                                            )}>
                                                {attempt.selectedOption !== undefined ? attempt.selectedOption : "Unknown"}
                                                {/* If index was -1, selectedOption might be undefined. Handle gracefully */}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="flex-none bg-[#101e22]/95 backdrop-blur border-t border-[#315a68]/50 p-4 pb-8 z-30">
                <div className="flex flex-col gap-2 max-w-4xl mx-auto w-full">
                    {/* Progress Segments */}
                    <div className="flex gap-0.5 h-3 w-full mb-1">
                        {/* We need to generate roughly 10 segments based on % completion */}
                        {Array.from({ length: 10 }).map((_, i) => {
                            // Calculate simple progress (approximate)
                            // Total duration vs current time
                            const progress = duration > 0 ? (currentTime / duration) * 10 : 0;
                            const isComplete = i < progress;
                            const isCurrent = i === Math.floor(progress);

                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex-1 rounded-sm transition-all duration-500",
                                        isComplete ? "bg-secondary-success shadow-[0_0_8px_rgba(16,185,129,0.5)]" :
                                            isCurrent ? "bg-primary animate-pulse shadow-neon" :
                                                "bg-[#315a68]/40"
                                    )}
                                ></div>
                            );
                        })}
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-[#5c7c8a] text-[10px] font-mono tracking-widest uppercase">Mastery Progress</p>
                        <p className="text-[#90bccb] text-xs font-mono font-medium">
                            T-MINUS {formatTime(duration - currentTime > 0 ? duration - currentTime : 0)}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}
