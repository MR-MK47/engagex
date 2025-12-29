import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sidebar } from "../components/ui/Sidebar";

export default function Dashboard() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        setIsSidebarOpen(false);
        signOut();
    };

    return (
        <div className="flex flex-col gap-6 p-4 pt-6 max-w-md mx-auto w-full">
            {/* Header / HUD */}
            <header className="sticky top-0 z-50 backdrop-blur-md bg-background-dark/80 border-b border-white/5 px-4 py-3 -mx-4">
                <div className="flex items-center justify-between gap-3">
                    {/* Avatar & Status */}
                    <div className="flex items-center gap-3">
                        <div className="relative group cursor-pointer" onClick={() => setIsSidebarOpen(true)}>
                            <div className="absolute -inset-0.5 rounded-full bg-primary opacity-50 blur group-hover:opacity-75 transition duration-200"></div>
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="Avatar"
                                    className="relative size-10 rounded-full border-2 border-surface-dark object-cover"
                                />
                            ) : (
                                <div className="relative size-10 rounded-full border-2 border-surface-dark bg-surface-dark flex items-center justify-center text-primary font-bold">
                                    {user?.displayName?.[0] || "U"}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-primary font-bold tracking-widest uppercase leading-none mb-1">Cadet</span>
                            <div className="flex items-center gap-2">
                                {/* Level Chip */}
                                <div className="flex h-6 items-center justify-center rounded-full bg-surface-dark border border-white/10 px-2.5">
                                    <span className="text-xs font-bold text-white tracking-wide">LVL 12</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Streak */}
                    <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1.5">
                        <span className="material-symbols-outlined text-orange-500 text-lg">local_fire_department</span>
                        <p className="text-orange-400 text-sm font-bold leading-none tracking-wide">45</p>
                    </div>
                </div>
            </header>

            {/* Sidebar Navigation */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center gap-3 mb-8 px-2">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="Avatar" className="size-12 rounded-full border border-white/10" />
                        ) : (
                            <div className="size-12 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-primary font-bold text-xl">
                                {user?.displayName?.[0] || "U"}
                            </div>
                        )}
                        <div>
                            <h3 className="text-white font-bold leading-none">{user?.displayName || "User"}</h3>
                            <span className="text-xs text-slate-400">Cadet Level 12</span>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 space-y-2">
                        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white group">
                            <span className="material-symbols-outlined text-xl group-hover:text-primary transition-colors">person</span>
                            <span className="font-bold tracking-wide">Profile</span>
                        </button>
                        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white group">
                            <span className="material-symbols-outlined text-xl group-hover:text-primary transition-colors">settings</span>
                            <span className="font-bold tracking-wide">Settings</span>
                        </button>
                        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white group">
                            <span className="material-symbols-outlined text-xl group-hover:text-primary transition-colors">help</span>
                            <span className="font-bold tracking-wide">Help Center</span>
                        </button>
                    </nav>

                    {/* Logout */}
                    <div className="mt-auto pt-4 border-t border-white/10">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-red-500/10 text-slate-300 hover:text-red-400 transition-colors group"
                        >
                            <span className="material-symbols-outlined text-xl group-hover:text-red-400 transition-colors">logout</span>
                            <span className="font-bold tracking-wide">Log Out</span>
                        </button>
                    </div>
                </div>
            </Sidebar>

            {/* Hero Section: Mastery Queue */}
            <section className="flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-white text-lg font-bold tracking-tight flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">target</span>
                        MASTERY QUEUE
                    </h2>
                    <span className="text-xs font-mono text-slate-400">PRIORITY ALPHA</span>
                </div>
                {/* Hero Card */}
                <div className="group relative rounded-xl bg-surface-dark border border-white/5 shadow-glow overflow-hidden">
                    {/* Image Area */}
                    <div className="relative w-full h-48 bg-center bg-cover" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCmEAIGkhw9trLXTV-v1BKAiIneV8xDbOVPQpn8xe8tFrO9toLg1YnGwnKuYDoLYW4SyB3zJPUcQ3cjowYiWbuBtgi-tg_atx2sDKOJuU0zEEBe-uWbQRBPS7Q5EV37wyER-uqf0X80VyzntMLuiMssBbA2Ibg1zFMwRpM1A1hEpPsQH-3pK8gy-82Vwkb5yGSt1M9EWb_Ignu_iiojlyoZw68_roNUeRvbqvmhGzvMbkE-s1g4hSHLnUfLRv5BZzJsdgpjgSvuINE")' }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-primary/20 text-primary border border-primary/20 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Physics</span>
                                <span className="bg-white/10 text-white border border-white/10 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Module 4</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white leading-tight mb-1">QUANTUM PHYSICS 101</h3>
                            <p className="text-slate-400 text-sm">Obj: Wave-Particle Duality</p>
                        </div>
                    </div>
                    {/* Stats & Action */}
                    <div className="p-4 pt-2">
                        {/* Progress Bar Custom Neon */}
                        <div className="mb-4">
                            <div className="flex justify-between items-end mb-1.5">
                                <span className="text-xs font-bold text-neon-green tracking-wider uppercase">Mastery Progress</span>
                                <span className="text-sm font-bold text-white">82%</span>
                            </div>
                            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-neon-green shadow-glow-green" style={{ width: '82%' }}></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Potential XP</span>
                                <span className="text-primary font-bold text-lg">+450 XP</span>
                            </div>
                            <button
                                onClick={() => navigate("/mission-briefing")}
                                className="flex-1 bg-primary hover:bg-primary/90 active:scale-95 transition-all text-white font-bold text-sm h-10 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/25 group"
                            >
                                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">rocket_launch</span>
                                START NEW MISSION
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Section: In-Progress Missions */}
            <section className="flex flex-col gap-3 pb-24">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-white text-lg font-bold tracking-tight">ACTIVE MISSIONS</h2>
                    <button className="text-primary text-xs font-bold tracking-wider hover:text-white transition-colors">VIEW ALL</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {/* Knowledge Map Card */}
                    <div
                        onClick={() => navigate('/knowledge-map')}
                        className="flex flex-col bg-surface-dark rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-colors group cursor-pointer"
                    >
                        <div className="h-24 w-full bg-cover bg-center relative" style={{ backgroundImage: 'url("https://gamify.keep.edu.hk/asset-v1:CUHK+CSCI2100A+2021_02+type@asset+block@Data-structures.jpg")' }}>
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur rounded px-1.5 py-0.5">
                                <span className="text-[10px] font-bold text-white">LVL 3</span>
                            </div>
                        </div>
                        <div className="p-3 flex flex-col flex-1">
                            <h4 className="text-white font-bold text-sm leading-snug mb-1">Data Structures</h4>
                            <p className="text-slate-500 text-xs mb-3 truncate">Knowledge Map</p>
                            <div className="mt-auto">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                                    <span>STATUS</span>
                                    <span className="text-primary">70%</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card 1 */}
                    <div className="flex flex-col bg-surface-dark rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-colors group">
                        <div className="h-24 w-full bg-cover bg-center relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXEGENszpnFrltra6nrFHSmJ-tDsycE8h2acUmackYGw4GBbfF8RAddewyfD_WvLG0vYUs0FRR_boHU4ptjmhDJ5NutTcZNfCCQa3M-AIOLaaqJ_hiQamIGgfPFvB-V5gYiXxai84Pxrf_zqZf-Ne3Mrbpper0-bC_i16yNIQwe5xWi9WLKmAqcO9xtq1AOLRBKim4dclN0Cv-Ng2jhe8-JZsgL7fncBQtZIZtJ7jA9sRYYtQB0kpr6x94r_Owl8-pQY_padEfrBw")' }}>
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur rounded px-1.5 py-0.5">
                                <span className="text-[10px] font-bold text-white">LVL 4</span>
                            </div>
                        </div>
                        <div className="p-3 flex flex-col flex-1">
                            <h4 className="text-white font-bold text-sm leading-snug mb-1">Galactic History</h4>
                            <p className="text-slate-500 text-xs mb-3 truncate">Era: World War II</p>
                            <div className="mt-auto">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                                    <span>SYNC</span>
                                    <span className="text-primary">45%</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: '45%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="flex flex-col bg-surface-dark rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-colors group">
                        <div className="h-24 w-full bg-cover bg-center relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDIzj1LLeYYKc3gMGIsXiFok2_3wNYQWlfc_Kh8zjX5kn0oM1WnEs1ngx2yeV43xGmvDrstha06wxTgtg28CpvcelwccBSlidPxPovXsqwgi0ZkAWWomYHaqlaGoR-7BbcBGzObQrcdGu206QxRh7IEUTrBRIkpfDXE1tt5r7vpOSzKzcnsrBoEJS2Y0g_7m5IizP0By6Ai5VIpVv9W7opHuhdWQxanf6u0BsZ3gF4PhMKxb2P8vUNAgoLZreoaNMx4Oj8t8HTUlOg")' }}>
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur rounded px-1.5 py-0.5">
                                <span className="text-[10px] font-bold text-white">LVL 2</span>
                            </div>
                        </div>
                        <div className="p-3 flex flex-col flex-1">
                            <h4 className="text-white font-bold text-sm leading-snug mb-1">Cyber-Biology</h4>
                            <p className="text-slate-500 text-xs mb-3 truncate">Sub: Anatomy 101</p>
                            <div className="mt-auto">
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                                    <span>SYNC</span>
                                    <span className="text-orange-400">12%</span>
                                </div>
                                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-400" style={{ width: '12%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
