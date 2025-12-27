import { Outlet } from "react-router-dom";

export function MainLayout() {
    return (
        <div className="min-h-screen bg-background-dark text-white font-display relative overflow-hidden">
            {/* Background Pattern */}
            <div className="fixed inset-0 pointer-events-none cyber-grid-bg z-0 opacity-20"></div>

            {/* Main Content */}
            <div className="relative z-10">
                <Outlet />
            </div>
        </div>
    );
}
