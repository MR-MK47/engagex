import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { type Question } from "../../services/gemini";

interface TrainingGroundsProps {
    question: Question;
    onComplete: (correct: boolean) => void;
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
        if (result) {
            onComplete(result === "correct");
        }
    };

    return (
        <div className="absolute inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-2xl bg-surface-dark border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative my-4 sm:my-auto max-h-[95vh] sm:max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-sm">
                        <span className="material-symbols-outlined text-lg animate-pulse">crisis_alert</span>
                        TRAINING GROUNDS // LIVE FIRE
                    </div>
                    <div className="text-xs font-mono text-slate-400">ID: {question.id.split('-')[1]}</div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                    <h3 className="text-xl md:text-2xl text-white font-bold mb-8 leading-relaxed">
                        {question.text}
                    </h3>

                    <div className="grid grid-cols-1 gap-4 mb-8">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                disabled={isLocked}
                                onClick={() => setSelectedOption(index)}
                                className={cn(
                                    "p-4 text-left rounded-xl border transition-all duration-200 flex items-center gap-4 group relative overflow-hidden",
                                    // Default State
                                    !isLocked && selectedOption !== index && "bg-background-dark border-white/10 hover:border-primary/50 hover:bg-white/5",
                                    // Selected State
                                    !isLocked && selectedOption === index && "bg-primary/20 border-primary shadow-[0_0_15px_rgba(19,127,236,0.2)]",
                                    // Correct State (Locked)
                                    isLocked && index === question.correctAnswer && "bg-green-500/20 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]",
                                    // Incorrect Selected State (Locked)
                                    isLocked && selectedOption === index && result === "incorrect" && "bg-red-500/20 border-red-500",
                                    // Dim other options when locked
                                    isLocked && index !== question.correctAnswer && selectedOption !== index && "opacity-50 grayscale"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full border border-current flex items-center justify-center text-sm font-bold shrink-0 transition-colors",
                                    selectedOption === index ? "bg-primary/20" : "bg-transparent group-hover:bg-white/10"
                                )}>
                                    {String.fromCharCode(65 + index)}
                                </div>
                                <span className={cn(
                                    "text-base font-medium",
                                    isLocked && index === question.correctAnswer ? "text-green-400" : "text-slate-200"
                                )}>
                                    {option}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Feedback / Action Area */}
                    <AnimatePresence mode="wait">
                        {!isLocked ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex justify-end"
                            >
                                <button
                                    onClick={handleLockAnswer}
                                    disabled={selectedOption === null}
                                    className="px-8 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-full font-bold text-white tracking-wider shadow-lg shadow-primary/20 transition-all active:scale-95"
                                >
                                    LOCK ANSWER
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "p-6 rounded-xl border backdrop-blur-md",
                                    result === "correct" ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"
                                )}
                            >
                                <div className="flex items-start gap-4">
                                    <span className={cn(
                                        "material-symbols-outlined text-3xl",
                                        result === "correct" ? "text-green-400" : "text-red-400"
                                    )}>
                                        {result === "correct" ? "check_circle" : "cancel"}
                                    </span>
                                    <div className="flex-1">
                                        <h4 className={cn(
                                            "font-bold text-lg mb-1",
                                            result === "correct" ? "text-green-400" : "text-red-400"
                                        )}>
                                            {result === "correct" ? "TARGET DESTROYED" : "SYSTEM MALFUNCTION"}
                                        </h4>
                                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                            {question.explanation}
                                        </p>
                                        <button
                                            onClick={handleContinue}
                                            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold text-white transition-colors"
                                        >
                                            CONTINUE MISSION
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
