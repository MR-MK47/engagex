import React, { useEffect } from "react";
import { cn } from "../../lib/utils";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export function Sidebar({ isOpen, onClose, children, className }: SidebarProps) {
    // Prevent scrolling when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Drawer Panel - Left Side */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={cn(
                            "fixed inset-y-0 left-0 z-[101] h-full w-3/4 max-w-xs bg-surface-dark/95 backdrop-blur-xl border-r border-primary/20 shadow-[0_0_50px_-10px_rgba(19,127,236,0.3)] p-6 flex flex-col",
                            className
                        )}
                    >
                        {/* Cyberpunk decoration line */}
                        <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>

                        {/* Children Content */}
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
