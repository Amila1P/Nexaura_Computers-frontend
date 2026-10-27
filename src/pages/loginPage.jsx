import axios from "axios";
import api from "../utils/api"; // Bug fix: was missing — caused ReferenceError in Google login handler
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function LoginPage({ setUser }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    /* ── Google OAuth ── */
    const googleLogin = useGoogleLogin({
        onSuccess: (googleResponse) => {
            // Bug fix: renamed outer param to `googleResponse` to avoid shadowing
            // the inner axios response, and removed the stray console.log
            api.post("/users/google-login", {
                token: googleResponse.access_token
            }).then((response) => {
                toast.success("Google login successful.");
                localStorage.setItem("token", response.data.token);
                setUser(response.data); // Populate user state immediately

                if (response.data.isAdmin) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }).catch((error) => {
                const msg = error?.response?.data?.message || "Google login failed.";
                toast.error(msg);
            });
        },
        onError: () => toast.error("Google login failed.")
    });

    /* ── Email / Password login ── */
    function handleLogin() {
        if (!email || !password) {
            toast.error("Please enter your email and password.");
            return;
        }
        setLoading(true);
        axios.post(import.meta.env.VITE_API_URL + "/users/login", { email, password })
            .then((response) => {
                toast.success("Login successful!");
                localStorage.setItem("token", response.data.token);
                setUser(response.data);
                if (response.data.isAdmin) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Login failed. Please try again.");
            })
            .finally(() => setLoading(false));
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") handleLogin();
    }

    return (
        <div
            className="w-full min-h-screen flex items-center justify-center px-4"
            style={{ background: "linear-gradient(135deg,#080C14 0%,#0F1623 60%,#080C14 100%)" }}
        >
            {/* Glow orbs */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(79,142,247,0.08),transparent 70%)" }} />

            <div className="w-full max-w-md">
                {/* Card */}
                <div
                    className="rounded-2xl p-8 sm:p-10"
                    style={{ background: "#151D2E", border: "1px solid #1E2D45", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
                >
                    {/* Logo + Title */}
                    <div className="flex flex-col items-center mb-8">
                        <img src="/NexAura Logo.png" alt="NexAura" className="h-12 mb-5" />
                        <h1 className="text-3xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Welcome back
                        </h1>
                        <p className="text-sm mt-1" style={{ color: "#7A8BA3" }}>
                            Sign in to your NexAura account
                        </p>
                    </div>

                    {/* Google Login */}
                    <button
                        onClick={() => googleLogin()}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-sm mb-6 transition-all duration-200"
                        style={{ background: "#0F1623", border: "1.5px solid #1E2D45", color: "#E8EDF5" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "#4F8EF7"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "#1E2D45"}
                    >
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px" style={{ background: "#1E2D45" }} />
                        <span className="text-xs font-medium" style={{ color: "#7A8BA3" }}>OR</span>
                        <div className="flex-1 h-px" style={{ background: "#1E2D45" }} />
                    </div>

                    {/* Form */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="form-input"
                                id="login-email"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>Password</label>
                                <Link to="/forgot-password" className="text-xs" style={{ color: "#4F8EF7" }}>Forgot password?</Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPwd ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="form-input pr-12"
                                    id="login-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd(p => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
                                    style={{ color: "#7A8BA3", background: "transparent", border: "none", cursor: "pointer" }}
                                >
                                    {showPwd ? <HiEyeOff /> : <HiEye />}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="btn-primary w-full mt-2"
                            style={{ opacity: loading ? 0.7 : 1 }}
                            id="login-submit"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" strokeWidth="3" strokeLinecap="round" /></svg>
                                    Signing in…
                                </>
                            ) : "Sign In"}
                        </button>
                    </div>

                    <p className="text-sm text-center mt-6" style={{ color: "#7A8BA3" }}>
                        Don't have an account?{" "}
                        <Link to="/register" className="font-semibold" style={{ color: "#4F8EF7" }}>Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
