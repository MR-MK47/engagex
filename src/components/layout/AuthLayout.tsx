import { Outlet } from "react-router-dom";
// Removed Container wrapper to allow full-screen immersive design for the portal
export function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background-dark font-display text-white relative overflow-hidden">
            {/* Ambient Background Space Effects (Global for Auth) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#101922]">
                {/* Blue Nebula Glow */}
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-primary/10 blur-[100px] opacity-60"></div>
                {/* Secondary Ambient Glow */}
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/20 blur-[80px] opacity-40"></div>
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"></div>
                {/* Starfield Noise (CSS approximation) */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full">
                <Outlet />
            </div>
        </div>
    );
}
