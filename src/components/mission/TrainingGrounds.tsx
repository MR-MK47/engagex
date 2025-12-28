import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { type Question } from "../../services/gemini";

interface TrainingGroundsProps {
    question: Question;
    onComplete: (correct: boolean, selectedIndex: number) => void;
}

export function TrainingGrounds({ question, onComplete }: TrainingGroundsProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isLocked, setIsLocked] = useState(false);
    const [result, setResult] = useState<"correct" | "incorrect" | null>(null);

    const handleLockAnswer = () => {
        if (selectedOption === null) return;

        setIsLocked(true);
        const isCorrect = selectedOption === question.correctAnswer;
        setResult(isCorrect ? "correct" : "incorrect");
    };

    const handleContinue = () => {
        if (result && selectedOption !== null) {
            onComplete(result === "correct", selectedOption);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent font-display">
            {/* Background: Paused Video Layer Simulation - In reality, the real video is behind this component. 
                But to match the design's "blur" effect on the whole page, we can use a backdrop-blur on this container. 
            */}
            <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-lg z-0">
                {/* Vignette & Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/40 to-background-dark/90"></div>
                {/* Fine Scanline Texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(37,192,244,0.02)_50%)] bg-[length:100%_4px] opacity-30 pointer-events-none"></div>
            </div>

            {/* HUD Overlay Wrapper */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col w-full max-w-md mx-auto px-5 py-6"
            >
                {/* HUD Header / Status */}
                <div className="flex items-center justify-center gap-2 py-4 mb-4 animate-pulse">
                    <span className="material-symbols-outlined text-primary text-[20px]">pause_circle</span>
                    <h3 className="text-primary/80 tracking-[0.2em] text-xs font-bold uppercase">System Paused // Awaiting Input</h3>
                </div>

                {/* Main Interceptor Card */}
                <div className="flex-1 flex flex-col justify-center">
                    <div className="bg-[#101e22]/85 backdrop-blur-xl shadow-[0_0_15px_rgba(37,192,244,0.15),inset_0_0_20px_rgba(37,192,244,0.05)] w-full rounded-xl border border-primary/30 relative overflow-hidden group">
                        {/* Decorative HUD corners */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary rounded-tl-lg z-20"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary rounded-tr-lg z-20"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary rounded-bl-lg z-20"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary rounded-br-lg z-20"></div>

                        {/* Faint Grid Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,192,244,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,192,244,0.05)_1px,transparent_1px)] bg-[length:20px_20px] opacity-20 pointer-events-none z-0"></div>

                        {/* Card Header */}
                        <div className="relative z-10 border-b border-primary/20 bg-primary/5 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className={cn("material-symbols-outlined text-xl", result ? "" : "animate-bounce", result === 'correct' ? "text-green-400" : result === 'incorrect' ? "text-red-400" : "text-primary")}>
                                    {result ? (result === 'correct' ? 'check_circle' : 'cancel') : 'warning'}
                                </span>
                                <span className={cn("font-bold tracking-widest text-xs uppercase", result === 'correct' ? "text-green-400" : result === 'incorrect' ? "text-red-400" : "text-primary")}>
                                    {result ? (result === 'correct' ? 'TARGET DESTROYED' : 'SYSTEM MALFUNCTION') : 'Incoming Query // Level 1'}
                                </span>
                            </div>
                            <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_theme('colors.primary')]"></div>
                        </div>

                        {/* Question Content */}
                        <div className="relative z-10 p-5 pt-6">
                            <p className="text-white text-lg font-medium leading-relaxed mb-6">
                                {question.text}
                            </p>

                            {/* Options List */}
                            <div className="flex flex-col gap-3" role="radiogroup">
                                {question.options.map((option, index) => (
                                    <label
                                        key={index}
                                        className={cn(
                                            "relative flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all duration-200 group/option",
                                            // Base styles
                                            "bg-black/20 border-white/10",
                                            // Interactive styles (only when not locked)
                                            !isLocked && "hover:bg-primary/5 hover:border-primary/40",
                                            // Selected styles
                                            // Logic handling
                                            isLocked && index === question.correctAnswer ? "border-secondary-success bg-secondary-success/10" :
                                                isLocked && selectedOption === index && result === 'incorrect' ? "border-red-500 bg-red-500/10" :
                                                    selectedOption === index ? "border-primary shadow-[inset_0_0_15px_rgba(37,192,244,0.1)] bg-primary/10" : ""
                                        )}
                                        onClick={() => !isLocked && setSelectedOption(index)}
                                    >
                                        <div className={cn(
                                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                                            selectedOption === index || (isLocked && index === question.correctAnswer) ? "border-primary shadow-[0_0_10px_theme('colors.primary')]" : "border-white/20"
                                        )}>
                                            <div className={cn(
                                                "h-2.5 w-2.5 rounded-full bg-primary transition-opacity",
                                                selectedOption === index || (isLocked && index === question.correctAnswer) ? "opacity-100" : "opacity-0"
                                            )}></div>
                                        </div>
                                        <div className="flex grow flex-col">
                                            <p className={cn(
                                                "text-sm font-medium transition-colors",
                                                selectedOption === index ? "text-white" : "text-gray-300",
                                                !isLocked && "group-hover/option:text-white"
                                            )}>
                                                {option}
                                            </p>
                                        </div>
                                        {/* Glow effect for selected */}
                                        {selectedOption === index && (
                                            <div className="absolute inset-0 rounded-lg border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:shadow-[inset_0_0_15px_rgba(37,192,244,0.1)] pointer-events-none"></div>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Result Explanation */}
                        <AnimatePresence>
                            {isLocked && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    className="px-5 pb-5 overflow-hidden"
                                >
                                    <div className={cn(
                                        "p-3 rounded bg-black/40 border border-white/5 text-sm",
                                        result === "correct" ? "text-green-200" : "text-red-200"
                                    )}>
                                        {question.explanation}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Footer Action */}
                        <div className="relative z-10 p-5 pt-2">
                            <button
                                onClick={isLocked ? handleContinue : handleLockAnswer}
                                disabled={selectedOption === null}
                                className={cn(
                                    "relative w-full group overflow-hidden rounded-xl p-[1px] transition-transform active:scale-[0.98]",
                                    selectedOption === null ? "opacity-50 grayscale cursor-not-allowed" : "shadow-[0_0_20px_rgba(37,192,244,0.4)]"
                                )}
                            >
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-r",
                                    isLocked
                                        ? (result === 'correct' ? "from-green-500 to-emerald-600" : "from-red-500 to-rose-600")
                                        : "from-primary to-[#1fa1ce]"
                                )}></div>

                                <div className="relative flex h-12 w-full items-center justify-center bg-[#101e22] rounded-[10px] group-hover:bg-[#101e22]/80 transition-colors">
                                    <div className={cn(
                                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity",
                                        isLocked
                                            ? (result === 'correct' ? "bg-green-500/20" : "bg-red-500/20")
                                            : "bg-primary/20"
                                    )}></div>
                                    <span className={cn("material-symbols-outlined mr-2 text-xl",
                                        isLocked
                                            ? (result === 'correct' ? "text-green-500" : "text-red-500")
                                            : "text-primary"
                                    )}>
                                        {isLocked ? (result === 'correct' ? 'check' : 'replay') : 'upload'}
                                    </span>
                                    <span className={cn("font-bold text-base tracking-wider",
                                        isLocked
                                            ? (result === 'correct' ? "text-green-500" : "text-red-500")
                                            : "text-primary"
                                    )}>
                                        {isLocked ? (result === 'correct' ? 'CONTINUE' : 'CONTINUE') : 'SUBMIT DATA'}
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom decorative element */}
                <div className="mt-4 flex justify-between items-end opacity-40">
                    <div className="flex flex-col gap-1">
                        <div className="h-1 w-16 bg-primary/50"></div>
                        <div className="h-1 w-8 bg-primary/30"></div>
                    </div>
                    <div className="text-[10px] text-primary tracking-widest font-mono">ID: 884-XJ-92</div>
                </div>
            </motion.div>
        </div>
    );
}
