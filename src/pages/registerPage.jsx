import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function RegisterPage({ setUser }) {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleRegister() {
        if (!email || !firstName || !lastName || !password || !confirmPassword) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        api.post("/users", { email, password, firstName, lastName })
            .then(() => {
                toast.success("Account created! Please sign in.");
                navigate("/login");
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Registration failed.");
            })
            .finally(() => setLoading(false));
    }

    return (
        <div
            className="w-full min-h-screen flex items-center justify-center px-4 py-16"
            style={{ background: "linear-gradient(135deg,#080C14 0%,#0F1623 60%,#080C14 100%)" }}
        >
            {/* Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(79,142,247,0.08),transparent 70%)" }} />

            <div className="w-full max-w-md">
                <div
                    className="rounded-2xl p-8 sm:p-10"
                    style={{ background: "#151D2E", border: "1px solid #1E2D45", boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
                >
                    {/* Header */}
                    <div className="flex flex-col items-center mb-8">
                        <img src="/NexAura Logo.png" alt="NexAura" className="h-12 mb-5" />
                        <h1 className="text-3xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Create an Account
                        </h1>
                        <p className="text-sm mt-1" style={{ color: "#7A8BA3" }}>
                            Join NexAura Computers today
                        </p>
                    </div>

                    {/* Form Fields */}
                    <div className="flex flex-col gap-4">
                        {/* Name row */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>First Name</label>
                                <input
                                    placeholder="John"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    className="form-input"
                                    id="reg-firstname"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>Last Name</label>
                                <input
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    className="form-input"
                                    id="reg-lastname"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="form-input"
                                id="reg-email"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>Password</label>
                            <div className="relative">
                                <input
                                    type={showPwd ? "text" : "password"}
                                    placeholder="Min. 6 characters"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="form-input pr-12"
                                    id="reg-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd(p => !p)}
                                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#7A8BA3", background: "transparent", border: "none", cursor: "pointer", fontSize: "1.1rem" }}
                                >
                                    {showPwd ? <HiEyeOff /> : <HiEye />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Re-enter your password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="form-input"
                                id="reg-confirm-password"
                            />
                        </div>

                        <button
                            onClick={handleRegister}
                            disabled={loading}
                            className="btn-primary w-full mt-2"
                            style={{ opacity: loading ? 0.7 : 1 }}
                            id="reg-submit"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" strokeWidth="3" strokeLinecap="round" /></svg>
                                    Creating account…
                                </>
                            ) : "Create Account"}
                        </button>
                    </div>

                    <p className="text-sm text-center mt-6" style={{ color: "#7A8BA3" }}>
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold" style={{ color: "#4F8EF7" }}>Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
