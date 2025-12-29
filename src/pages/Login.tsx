import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Login() {
    // Destructure signInWithEmail from the updated AuthContext
    const { user, signInWithGoogle, signInWithEmail } = useAuth();
    const navigate = useNavigate();

    // State for UI loading and form inputs
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // If already logged in, redirect
    if (user) {
        navigate("/dashboard");
    }

    // Handler for Email/Password Login
    const handleEmailLogin = async () => {
        if (!email || !password) return;

        setIsLoading(true);
        try {
            await signInWithEmail(email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
            // Optional: Add a toast notification or alert here for user feedback
            alert("Access Denied: Invalid Credentials");
        } finally {
            setIsLoading(false);
        }
    };

    // Handler for Google Login
    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await signInWithGoogle();
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative w-full max-w-[420px] p-4 mx-auto">
            {/* The Portal Card */}
            <div className="glass-panel w-full rounded-[2.5rem] p-6 pb-10 sm:p-10 relative overflow-hidden flex flex-col items-center">
                {/* Tech Accent Lines (Corners) */}
                <div className="absolute top-6 left-6 w-3 h-3 border-l-2 border-t-2 border-primary/30 rounded-tl-sm"></div>
                <div className="absolute top-6 right-6 w-3 h-3 border-r-2 border-t-2 border-primary/30 rounded-tr-sm"></div>
                <div className="absolute bottom-6 left-6 w-3 h-3 border-l-2 border-b-2 border-primary/30 rounded-bl-sm"></div>
                <div className="absolute bottom-6 right-6 w-3 h-3 border-r-2 border-b-2 border-primary/30 rounded-br-sm"></div>

                {/* Hero: Mastery Orb */}
                <div className="relative mb-6 mt-2">
                    {/* The glowing orb visual */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-primary to-indigo-900 shadow-inner flex items-center justify-center orb-glow floating relative z-10 border border-white/20">
                        <span className="material-symbols-outlined text-[40px] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">hexagon</span>
                    </div>
                    {/* Orbital Ring */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-dashed border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                </div>

                {/* Header Text */}
                <div className="text-center mb-8 space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg font-display">ENGAGEX</h1>
                    <p className="text-primary/80 text-sm font-semibold tracking-[0.2em] uppercase">Initiate Learning Sequence</p>
                </div>

                {/* Login Form */}
                <div className="w-full space-y-5">
                    {/* Cadet ID / Email Input */}
                    <div className="space-y-2 group">
                        <label className="block text-xs font-bold text-gray-400 ml-4 uppercase tracking-widest group-focus-within:text-primary transition-colors">Cadet ID / Email</label>
                        <div className="relative flex items-center">
                            <div className="absolute left-0 top-0 bottom-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">badge</span>
                            </div>
                            <input
                                className="w-full bg-[#1a2632]/80 border-2 border-transparent focus:border-primary/60 text-white placeholder-gray-500 rounded-full py-3.5 pl-12 pr-4 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(19,127,236,0.3)] focus:bg-[#1a2632]"
                                placeholder="Enter Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Access Code / Password Input */}
                    <div className="space-y-2 group">
                        <div className="flex justify-between items-center ml-4 mr-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-primary transition-colors">Access Code</label>
                        </div>
                        <div className="relative flex items-center">
                            <div className="absolute left-0 top-0 bottom-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">vpn_key</span>
                            </div>
                            <input
                                className="w-full bg-[#1a2632]/80 border-2 border-transparent focus:border-primary/60 text-white placeholder-gray-500 rounded-full py-3.5 pl-12 pr-12 outline-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(19,127,236,0.3)] focus:bg-[#1a2632]"
                                placeholder="Enter Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleEmailLogin()}
                            />
                            <button className="absolute right-0 top-0 bottom-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors focus:outline-none">
                                <span className="material-symbols-outlined">visibility</span>
                            </button>
                        </div>
                    </div>

                    {/* Primary Action Button */}
                    <button
                        onClick={handleEmailLogin}
                        disabled={isLoading || !email || !password}
                        className="w-full bg-primary hover:bg-[#0f6bd0] text-white font-bold py-4 rounded-full mt-2 shadow-[0_0_20px_rgba(19,127,236,0.4)] hover:shadow-[0_0_30px_rgba(19,127,236,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <span>{isLoading ? "Authenticating..." : "Enter System"}</span>
                        {!isLoading && <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 py-2 opacity-50">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                        <span className="text-xs font-mono text-gray-400">OR</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                    </div>

                    {/* Social Login */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full bg-transparent border border-white/20 hover:border-primary text-white font-semibold py-3.5 rounded-full hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-50 disabled:cursor-wait"
                    >
                        <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        <div className="relative flex items-center gap-3">
                            {isLoading ? (
                                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                </svg>
                            )}
                            <span>{isLoading ? "Authenticating..." : "Sign in with Google"}</span>
                        </div>
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-400">
                        New Recruit?
                        <a className="text-primary hover:text-blue-400 font-bold ml-1 transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform" href="#">Create Account</a>
                    </p>
                </div>
            </div>

            {/* Bottom Status Bar (Decor) */}
            <div className="flex justify-between items-center px-6 pt-4 opacity-30">
                <div className="text-[10px] font-mono text-white tracking-widest">SYS.VER.4.2</div>
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse delay-75"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse delay-150"></div>
                </div>
            </div>
        </div>
    );
}