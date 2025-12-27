import { Outlet } from "react-router-dom";
import { BottomNav } from "../ui/BottomNav";

export function MainLayout() {
    return (
        <div className="min-h-screen bg-background-dark text-white font-display relative overflow-hidden">
            {/* Background Pattern */}
            <div className="fixed inset-0 pointer-events-none cyber-grid-bg z-0 opacity-20"></div>

            {/* Main Content */}
            <div className="relative z-10 pb-24">
                <Outlet />
            </div>

            {/* Floating Bottom Nav */}
            <BottomNav />
        </div>
    );
}
