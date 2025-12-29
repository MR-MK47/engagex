import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

// --- Types ---
interface Player {
    rank: number;
    name: string;
    avatar: string;
    score: number;
    title: string;
    isUser?: boolean;
    trend?: "up" | "down" | "neutral";
    trendValue?: number;
}

// --- Mock Data ---
const TOP_MOVERS: Player[] = [
    { rank: 12, name: "@CyberKid", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiEuB2q_tHoCMkRkAhkx8J-gyahVlnmmjoy6hSa9xjQ1RQqtaRysKj0mH9jNLbUymQ0RP5hzuWBQlLmmW5O9wqNb-gbcjowx7l-maBTrTBC_PsvZ71aOLr5H9PIZUrtPeOZPWlIpGIfGd4MSIqLlGdEBVxlxl1tOw20bUQFPYogyNkhqWF086jA1XJogH_eJ5PCe45Oh-kDSMt2pZ7McaO5PQrBPHKrdJhEnvhCKeNBgMELAWwemznaUpwpYE5jgKGwWXRRlkVYVg", score: 500, title: "Rookie", trend: "up", trendValue: 500 },
    { rank: 15, name: "@NeuralNet", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3Xj1O7FXAx9cNHSoKbQ4H65NCtjJ6eFjpzk9VM86Lr-yhgpha4kJxMK20nlCD04TW903_mPXyyl5kEs-IAvBA0yuhgJQseTBZQ5zaqCy8qR4YKcjfq71PfrgbG8eZ7i4gFnpbrw4SCp6T9Lu80LB2QA7n9VO64jqTxhUcbt2cFdW087rq2VcGosEwpZ3uVpPrkmLdX_zIt_kbx_Mi8FoK3yqWIAQJD8zsrzgaFLtJDs6B-7PgFhy_Yn2DREHVyePgdZEQoBnTX58", score: 450, title: "Rookie", trend: "up", trendValue: 450 },
    { rank: 8, name: "@DataDr", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuADA4rV2gHjH49bRq1GvyIvO6aFhYBXXbwHg5eGp07DA00t-51fV1JhUOtlOf8Ii_dSvzlq-0L8tD7VKdFHqy_gj-obeamVgW1EAoSrxw2VXV1Ee4QgjMuL1TC4oZHC5qqWH3QHGkPfWb53yXYxeDI9ZWshXYf6iGwYPMsyNnYvA-UHqU6yFQCIjiDjsWfu9hia776OqPQAjQnyTbcvoZIzJANBU3xWITvO0moeh_1MG7Wi3T4sJWwlMh9WhB5xFdRFH3nFrQKfJGI", score: 410, title: "Specialist", trend: "up", trendValue: 410 },
    { rank: 22, name: "@Pixel8", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY2BWCwZwTFlFYJTnOWMAH95tHpMSX0rNuBFHDdV_J0Z8wlmyJ9m86HheG4SsO86XGFBr8TOkm5J-V7aA97fa0DDsUtZZAy8QPoW4Fn9NlWZYt5C_qYb50mMpkFVJK5PWcEQW0LNT8tO_y9iTmPjT1X6cKl4puchpjw65eJ37nOFzZfTh5obiDbH3uh0or38n-HcF5UJd058_yJzE86p0GOneFeKBc-iV-l-Juv26xdKjUNIeB8NwsObc1e6IlJlEbYcQpqEiDv2E", score: 320, title: "Apprentice", trend: "up", trendValue: 320 },
    { rank: 25, name: "@CodeX", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvSzHPXfaaid06cpzSLEFVyMdC2kUJrqX0XxCoXgfgf9jHYsTe7R_35SLDk3BlaxtKksV15yVMoIVLSeZxwTColapA_VLXuAk2D5YTPCCjbHv5LmzihFFZmVeQlnpeSrUBoT7rC_JYj6XambJD6VpL8bm-xdZm_-sikx-ak8HpAjPPgOSFPigomy3-W_jUmVFAhTihwKirGJRC_AX7GQv0lT9E3AY3hLqoPfNUiZKA88Z5-KQJ3BYWA7SBfHQIGPxe7MbRsHOpneI", score: 290, title: "Apprentice", trend: "up", trendValue: 290 },
];

const LEADERBOARD: Player[] = [
    { rank: 1, name: "CyberStudent", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaM2-RjDwK9spXJgeGFNnGJ2R8Fd8X5FZN1Ouh6WQWhwDU6vaP8DDl6IMjrwczapgMeVbHj1NS4wErBkMD9xVkYmW0oySfPuI0_BDH910zm5OTs-td4Xvf9xn8DGdvEZSmSN0mrc8X_6CL3wA-kV5EmCGEJFPINYFpaUOIlbyTFcgWHNkqL2s2YxMFL5eiprQuSgyg3gBgC7un7Lqm5H-TZV3X8TERQXbrziFd6jHx1VckeGOq2rDPtB_dgGiZEpUzeZFa2bRlAts", score: 1450, title: "Grandmaster" },
    { rank: 2, name: "CodeWizard", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuANVKlDFTYzjbnpGV7ptfNjKj_CQNVru0xPlUaQJ8k5-dgXUi0_DHN6D2guusw1F9eEi8C-4fsw0c6jHsLEgIeJFkF-hUFiYeYZhtx98NfyI3Qw9KM0TEsrSKj2tL9uEv2ZLQFnUrPbtIBrME1D25seEMb__mWL2YctXvNlKa9OFg5h9sYLT7MLtWcl0thxF7XKeooe9JhFzk2sqnxiWR_oOq_THp_ZzEDkUddp2y8zS5yRKXE-LIDX4FUnJKceq2aLoOcQC-0EERw", score: 1320, title: "Master" },
    { rank: 3, name: "TechnoNovice", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYDVRSSmYkqJB5zX-RtsNC_rvfgei9-1vZQliSgMz2SW7-Pg24wz0zJqWS2H3WckSGUv93idevuLz-NtG_f-UY9tgf1eDBkXl88pA8ApfKrOYbofwrnjASDHxda_jgX68cN_uFLeBVfyRJJJOGmtuClEzLX_MMwSc-yR8Dgt-TGJgXQ_CykdYLhdf4P11zf5Ug42Ew5yQw8wwdOYHW_KrbhXuCZjmDrsecWpx9FfH5tSqbrVaLpGwK2Tiypr7xHrnTZWXhMdadlps", score: 900, title: "Specialist" },
    { rank: 4, name: "BitStream", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD14CIZJh5XLro_DQxpJD-DWeURq9dVDHvm-Np4eWjvyFzU-3OJeNmPxjQIQmoIPcEwyM1kfhZkQmV-5tKwN2T6sc0hyKmlDZaQWd1WoB2t6fhs-_ExJf9DsFvIkdAwAt598ePJRl_Tpvzyle1Wl5p1JpzRF1SCkbj3znMrkxx8kQpkCwd6DYLM29oQ8vWrsDLf__Dz-xis906JGaJ8rxK6Sg2f5Mlcgr80QJdU78HxNZfEIi01jwWSDRNBR3sWpQXkSvRgWWdLudk", score: 875, title: "Expert" },
    { rank: 5, name: "Glitch", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVUnVBpmgquaR8wuaSXGYTk7ZRBCHh0Dau1m4RUxnghZICU9ljL0TLSW195g38NJNrOXdPv3ojRB54j8EqlpHxrDrOjs1SfyK_PjmkTXon3E0YCleYg5o11ptGlVfdQxw1yPGAxh1zc1rIDfvTRp6ObeRk36X2-O7GbE85xb9mABUyeXgmD47s_hB7fc_dRA2PCTUM-nBF-u-DmdWjs-eHUaGuWdCpCJ4UncYGfSOMwPNSK4qcYUEOgBXZ1fuo9szmyb5EU4wbsPc", score: 840, title: "Expert" },
];

const USER_STATS: Player = {
    rank: 42,
    name: "You",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsdgGtgv488SI5JzuxH_nz41-qBFDjc-xPtWjvFpFuSyDKcezZffWCYNuRiVEG2YtY8_M6fHorvd7-uivSZ_xitegw7pD8RL4eOu0nTQQj3U6YePgZizirWiqj7bUdx5emjd0yBwTfml4yI1lfc9YqMixGxDl5I2WVCwOBEcvQ9B60qTQlLvVQyY9n0ifQdDC4YDowcDyvbHVuqmP7P8g7hYD-ZYtyQCyxSyn1nDCv96bXU4gJlAvk3oFra3svd8ROvG6POFLpMqA",
    score: 450,
    title: "Apprentice",
    isUser: true
};

export default function HallOfFame() {
    const [filter, setFilter] = useState<"Global" | "Friends" | "Squads">("Global");

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display flex flex-col pb-24 selection:bg-primary selection:text-white">

            {/* Top App Bar */}
            <div className="sticky top-0 z-50 bg-[#101922]/90 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between">
                <Link to="/dashboard" className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </Link>
                <h2 className="text-lg font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Hall of Fame</h2>
                <button className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white">
                    <span className="material-symbols-outlined text-2xl">search</span>
                </button>
            </div>

            {/* Segmented Filter Buttons */}
            <div className="px-4 py-4 w-full">
                <div className="flex h-12 w-full items-center justify-center rounded-xl bg-[#192633] p-1">
                    {["Global", "Friends", "Squads"].map((option) => (
                        <button
                            key={option}
                            onClick={() => setFilter(option as any)}
                            className={cn(
                                "flex-1 h-full flex items-center justify-center rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300",
                                filter === option
                                    ? "bg-primary text-white shadow-md"
                                    : "text-slate-400 hover:text-white"
                            )}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Top Team Spotlight (Apex Fusion) */}
            <div className="px-4 mb-6">
                <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-[#192633] shadow-[0_0_20px_rgba(19,127,236,0.15)] group">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <div className="h-full w-full bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-700"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCortvHfEbdA5jf2u2gDb8NYA-UISh_joVB5fsD03XEMGcxCELOEIjQg8RUdeGek8tCKDVfuM0U3xi2Dm2NXYvdAEg6g8hg3AgzeruewjjM3x1HLEOaEbkD31kwYEh35-e2pFy5cF6jIv0bkjjVFWrJUdeMjII35mNUscHm7HA1wLPnkICE7G-abx5CWuVG6ht5DuPp1loIdZs62xSnRwrJNJFFtr2lQWjw7kl3gYuKGs1gdwk_6Iq0j_uwhpguQPHkuAkm9SNxWmY')" }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#101922] via-[#101922]/80 to-transparent"></div>
                    </div>

                    <div className="relative z-10 flex flex-row items-center justify-between p-5">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="flex items-center justify-center size-5 rounded bg-primary/20 text-primary">
                                    <span className="material-symbols-outlined text-[16px]">trophy</span>
                                </span>
                                <p className="text-primary text-xs font-bold uppercase tracking-widest glow-text">Current Champions</p>
                            </div>
                            <h3 className="text-white text-2xl font-bold leading-tight tracking-tight">APEX FUSION</h3>
                            <p className="text-slate-400 text-sm font-medium">Dominating the Arena</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="size-16 rounded-full border-2 border-primary p-1 shadow-[0_0_15px_rgba(19,127,236,0.6)] bg-black/50 backdrop-blur-sm">
                                <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBf-hGmXmeZ3QeOTfyvpbqyFqIW0nAPd8VyRSQBh9GvccXbPwDSzyHgwUjiS4Tki8Cy3vzMPTb2AWPTIF5wMMVsrAFrsQEPoAEn3_zpecNOUb1p4HyxsmYLEHlTxquAudzYMuu-fmeoiGg1At1e8XTYIquDFqEIs75v82smx-J83WHRjG-jEaRrNaHgQhOhlFzCve8YXxEdhkno1AaL_lOLXxentFb-wBxUdI83MTyUtdhb7TTegvieBPZihdGUS_QqbTUq8Z_mx28')" }}></div>
                            </div>
                        </div>
                    </div>
                    {/* Decorative light bar */}
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary via-blue-400 to-transparent opacity-70"></div>
                </div>
            </div>

            {/* Daily Top 10 Ticker Header */}
            <div className="flex items-center justify-between px-4 mb-3">
                <h2 className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg animate-pulse">bolt</span>
                    Daily Top Movers
                </h2>
                <span className="text-xs text-slate-500">Reset in 4h 12m</span>
            </div>

            {/* Carousel (Horizontal Scroll) */}
            <div className="w-full overflow-x-auto no-scrollbar pb-6 px-4">
                <div className="flex gap-4 w-max">
                    {TOP_MOVERS.map((mover, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 w-20 group cursor-pointer hover:scale-105 transition-transform">
                            <div className="relative">
                                <div className="size-16 rounded-full p-0.5 bg-gradient-to-b from-green-400 to-transparent">
                                    <div className="w-full h-full rounded-full bg-[#192633] bg-cover bg-center border-2 border-[#101922]" style={{ backgroundImage: `url('${mover.avatar}')` }}></div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-[#192633] rounded-full p-0.5">
                                    <span className="material-symbols-outlined text-green-400 text-sm bg-green-400/10 rounded-full p-0.5">arrow_upward</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-white text-xs font-bold truncate w-20">{mover.name}</p>
                                <p className="text-green-400 text-[10px] font-mono font-bold">+{mover.trendValue}xp</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Leaderboard List */}
            <div className="flex flex-col px-4 gap-3 relative z-0">
                {/* List Header */}
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 px-4 mb-1">
                    <span className="w-8 text-center">#</span>
                    <span className="flex-1 pl-4">Player / Rank</span>
                    <span className="w-20 text-right">Mastered</span>
                </div>

                {LEADERBOARD.map((player) => (
                    <div
                        key={player.rank}
                        className={cn(
                            "relative flex items-center justify-between p-3 rounded-xl backdrop-blur-md border",
                            player.rank === 1 ? "bg-gradient-to-r from-[#192633]/90 to-[#192633]/40 border-yellow-500/30 shadow-[0_4px_12px_rgba(0,0,0,0.2)]" :
                                player.rank === 2 ? "bg-[#192633]/40 border-slate-400/20" :
                                    player.rank === 3 ? "bg-[#192633]/40 border-orange-700/20" :
                                        "bg-[#192633]/20 border-white/5"
                        )}
                    >
                        {/* Rank Strip */}
                        {player.rank <= 3 && (
                            <div className={cn(
                                "absolute left-0 top-0 bottom-0 w-1 rounded-l-xl",
                                player.rank === 1 ? "bg-yellow-400" :
                                    player.rank === 2 ? "bg-slate-300" :
                                        "bg-orange-700"
                            )}></div>
                        )}

                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            <span className={cn(
                                "w-6 text-xl font-bold text-center font-mono",
                                player.rank === 1 ? "text-yellow-400" :
                                    player.rank === 2 ? "text-slate-300" :
                                        player.rank === 3 ? "text-orange-600" :
                                            "text-slate-500"
                            )}>
                                {player.rank}
                            </span>

                            <div className="relative shrink-0">
                                <div className={cn(
                                    "size-12 rounded-full p-0.5",
                                    player.rank === 1 ? "border-2 border-yellow-400" :
                                        player.rank === 2 ? "border border-slate-300" :
                                            player.rank === 3 ? "border border-orange-700" :
                                                "size-10 border border-white/10 grayscale opacity-70"
                                )}>
                                    <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${player.avatar}')` }}></div>
                                </div>

                                {player.rank === 1 && (
                                    <div className="absolute -top-1 -right-1 bg-yellow-400 text-black rounded-full p-0.5">
                                        <span className="material-symbols-outlined text-[12px] font-bold block">crown</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col min-w-0">
                                <p className={cn("font-bold truncate", player.rank > 3 ? "text-slate-300 text-sm" : "text-white text-base")}>
                                    {player.name}
                                </p>
                                <div className={cn(
                                    "flex items-center gap-1",
                                    player.rank === 1 ? "text-yellow-400/80" :
                                        player.rank === 2 ? "text-slate-300" :
                                            player.rank === 3 ? "text-orange-400" :
                                                "text-slate-500"
                                )}>
                                    <span className="material-symbols-outlined text-[12px]">{player.rank === 1 ? "military_tech" : player.rank === 2 ? "workspace_premium" : player.rank === 3 ? "stars" : "verified"}</span>
                                    <span className="text-[10px] uppercase tracking-wide font-medium">{player.title}</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-right pl-2">
                            <p className={cn(
                                "font-bold font-mono",
                                player.rank <= 3 ? "text-xl text-white" : "text-lg text-slate-300"
                            )}>
                                {player.score}
                            </p>
                            {player.rank <= 3 && <p className="text-[10px] text-slate-500 uppercase font-bold">Concepts</p>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Sticky User Stats Bar */}
            <div className="fixed bottom-0 left-0 w-full z-40 px-4 pb-6 pt-2">
                <div className="absolute inset-0 bg-gradient-to-t from-[#101922] via-[#101922]/95 to-transparent pointer-events-none"></div>
                <div className="relative flex items-center justify-between p-3 rounded-xl bg-primary/10 backdrop-blur-xl border border-primary/50 shadow-[0_0_20px_rgba(19,127,236,0.25)]">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        <span className="w-6 text-xl font-bold text-primary text-center font-mono">{USER_STATS.rank}</span>
                        <div className="relative shrink-0">
                            <div className="size-12 rounded-full border-2 border-primary p-0.5 shadow-[0_0_8px_rgba(19,127,236,0.5)]">
                                <div className="w-full h-full rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${USER_STATS.avatar}')` }}></div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1 border-2 border-[#101922]">
                                <span className="material-symbols-outlined text-[10px] font-bold block">person</span>
                            </div>
                        </div>
                        <div className="flex flex-col min-w-0">
                            <p className="text-white font-bold text-base truncate">{USER_STATS.name}</p>
                            <div className="flex items-center gap-1 text-primary">
                                <span className="material-symbols-outlined text-[14px]">shield</span>
                                <span className="text-xs uppercase tracking-wide font-medium">{USER_STATS.title}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right pl-2">
                        <p className="text-xl font-bold text-primary font-mono glow-text">{USER_STATS.score}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Concepts</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
