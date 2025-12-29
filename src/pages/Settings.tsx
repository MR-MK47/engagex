import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";

export default function Settings() {
    const { user, signOut } = useAuth();

    // Mock Preferences State
    const [preferences, setPreferences] = useState({
        hardcoreMode: false,
        audioEffects: true,
        dailyReminders: true,
        highContrast: false,
    });

    const togglePreference = (key: keyof typeof preferences) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display flex flex-col pb-32 selection:bg-primary selection:text-white">

            {/* Top App Bar */}
            <div className="sticky top-0 z-50 bg-[#101922]/90 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
                <Link to="/dashboard" className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </Link>
                <h2 className="text-lg font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">System Controls</h2>
                <div className="size-10"></div> {/* Spacer for alignment */}
            </div>

            <div className="p-4 space-y-6">

                {/* Account Section */}
                <section className="space-y-4">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Identity Profile</h3>
                    <div className="bg-[#192633] rounded-2xl p-4 border border-white/5 shadow-lg">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="Avatar" className="size-16 rounded-full border-2 border-primary object-cover" />
                                ) : (
                                    <div className="size-16 rounded-full bg-surface-dark border-2 border-primary flex items-center justify-center text-primary font-bold text-2xl">
                                        {user?.displayName?.[0] || "U"}
                                    </div>
                                )}
                                <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-[#192633]">
                                    LVL 12
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-bold text-lg leading-tight truncate">{user?.displayName || "Cadet"}</h4>
                                <p className="text-slate-400 text-xs truncate">{user?.email}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => signOut()}
                            className="w-full py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold text-sm tracking-wide transition-colors flex items-center justify-center gap-2 border border-red-500/20"
                        >
                            <span className="material-symbols-outlined text-lg">logout</span>
                            TERMINATE SESSION
                        </button>
                    </div>
                </section>

                {/* Preferences Section */}
                <section className="space-y-4">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Neural Interface</h3>
                    <div className="bg-[#192633] rounded-2xl border border-white/5 shadow-lg overflow-hidden divide-y divide-white/5">

                        {/* Toggle Item */}
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                                    <span className="material-symbols-outlined text-lg">local_fire_department</span>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Hardcore Mode</p>
                                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wide">Strict Deadlines</p>
                                </div>
                            </div>
                            <button
                                onClick={() => togglePreference("hardcoreMode")}
                                className={cn(
                                    "w-12 h-6 rounded-full relative transition-colors duration-300",
                                    preferences.hardcoreMode ? "bg-primary" : "bg-slate-700"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 left-1 size-4 rounded-full bg-white shadow-sm transition-transform duration-300",
                                    preferences.hardcoreMode ? "translate-x-6" : "translate-x-0"
                                )} />
                            </button>
                        </div>

                        {/* Toggle Item */}
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                    <span className="material-symbols-outlined text-lg">volume_up</span>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Audio Effects</p>
                                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wide">Immersive Sound</p>
                                </div>
                            </div>
                            <button
                                onClick={() => togglePreference("audioEffects")}
                                className={cn(
                                    "w-12 h-6 rounded-full relative transition-colors duration-300",
                                    preferences.audioEffects ? "bg-primary" : "bg-slate-700"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 left-1 size-4 rounded-full bg-white shadow-sm transition-transform duration-300",
                                    preferences.audioEffects ? "translate-x-6" : "translate-x-0"
                                )} />
                            </button>
                        </div>

                        {/* Toggle Item */}
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="size-9 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                                    <span className="material-symbols-outlined text-lg">notifications_active</span>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Daily Reminders</p>
                                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wide">Streak Protection</p>
                                </div>
                            </div>
                            <button
                                onClick={() => togglePreference("dailyReminders")}
                                className={cn(
                                    "w-12 h-6 rounded-full relative transition-colors duration-300",
                                    preferences.dailyReminders ? "bg-primary" : "bg-slate-700"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 left-1 size-4 rounded-full bg-white shadow-sm transition-transform duration-300",
                                    preferences.dailyReminders ? "translate-x-6" : "translate-x-0"
                                )} />
                            </button>
                        </div>

                    </div>
                </section>

                {/* System Info Section */}
                <section className="space-y-4">
                    <h3 className="text-xs font-bold text-primary uppercase tracking-widest ml-1">System Diagnostics</h3>
                    <div className="bg-[#192633] rounded-2xl border border-white/5 shadow-lg p-5 space-y-4">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400 font-medium">Core Version</span>
                            <span className="text-white font-mono bg-white/5 px-2 py-1 rounded">v2.4.0-alpha</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400 font-medium">Deployment ID</span>
                            <span className="text-white font-mono bg-white/5 px-2 py-1 rounded">Delta-9</span>
                        </div>
                        <div className="pt-2">
                            <button className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold tracking-wider uppercase transition-colors">
                                Clear Local Cache
                            </button>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-4 opacity-50">
                    <p className="text-xs text-slate-500">EngageX Systems © 2025</p>
                </div>

            </div>
        </div>
    );
}
