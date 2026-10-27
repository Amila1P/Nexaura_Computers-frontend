import { useEffect, useState, useRef } from "react";
import api from "../utils/api.js";
import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { HiOutlineShoppingBag, HiOutlineCog, HiOutlineLogout } from "react-icons/hi";

export default function UserData({ user, setUser }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    /* ── Token validation & user fetch ── */
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) { setUser(null); return; }
        if (user) return;

        try {
            const payloadBase64 = token.split(".")[1];
            const payload = JSON.parse(atob(payloadBase64));
            if (payload?.exp && Date.now() >= payload.exp * 1000) {
                localStorage.removeItem("token");
                setUser(null);
                return;
            }
        } catch {
            localStorage.removeItem("token");
            setUser(null);
            return;
        }

        api.get("/users/me", {
            headers: { Authorization: "Bearer " + token },
        }).then((res) => {
            setUser(res.data);
        }).catch((err) => {
            if (err?.response?.status === 401) localStorage.removeItem("token");
            setUser(null);
        });
    }, [user, setUser]);

    /* ── Close dropdown on outside click ── */
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        setUser(null);
        setOpen(false);
        navigate("/login");
    }

    /* ── Logged-in view ── */
    if (user) {
        return (
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setOpen(o => !o)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all duration-200"
                    style={{
                        background: open ? "rgba(79,142,247,0.1)" : "rgba(30,45,69,0.6)",
                        border: `1px solid ${open ? "#4F8EF7" : "rgba(30,45,69,0.9)"}`,
                    }}
                >
                    <img
                        src={user.profilePicture}
                        referrerPolicy="no-referrer"
                        alt="Profile"
                        className="w-7 h-7 rounded-lg object-cover"
                        onError={e => { e.currentTarget.src = "/images/default-profile.jpg"; }}
                    />
                    <span className="hidden lg:block text-sm font-medium" style={{ color: "#E8EDF5" }}>
                        {user.firstName}
                    </span>
                    <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} style={{ color: "#7A8BA3" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>

                {/* Dropdown */}
                {open && (
                    <div
                        className="absolute right-0 mt-2 w-52 rounded-xl overflow-hidden animate-fade-in"
                        style={{ background: "#1C2740", border: "1px solid #1E2D45", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}
                    >
                        {/* User Info */}
                        <div className="px-4 py-3" style={{ borderBottom: "1px solid #1E2D45" }}>
                            <p className="text-sm font-semibold" style={{ color: "#E8EDF5" }}>
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs mt-0.5 truncate" style={{ color: "#7A8BA3" }}>
                                {user.email}
                            </p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                            {[
                                { icon: HiOutlineShoppingBag, label: "My Orders", to: "/my-orders" },
                                { icon: HiOutlineCog,         label: "Settings",  to: "/settings" },
                            ].map(({ icon: Icon, label, to }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150"
                                    style={{ color: "#7A8BA3" }}
                                    onMouseEnter={e => { e.currentTarget.style.color = "#E8EDF5"; e.currentTarget.style.background = "rgba(79,142,247,0.07)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; e.currentTarget.style.background = "transparent"; }}
                                >
                                    <Icon className="text-base" style={{ color: "#4F8EF7" }} />
                                    {label}
                                </Link>
                            ))}

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150"
                                style={{ color: "#F04E37" }}
                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(240,78,55,0.07)"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                            >
                                <HiOutlineLogout className="text-base" />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    /* ── Logged-out view ── */
    return (
        <div className="flex items-center gap-2">
            <Link
                to="/login"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ color: "#7A8BA3", background: "rgba(30,45,69,0.6)", border: "1px solid rgba(30,45,69,0.9)" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#E8EDF5"; e.currentTarget.style.borderColor = "#4F8EF7"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; e.currentTarget.style.borderColor = "rgba(30,45,69,0.9)"; }}
            >
                <CiUser className="text-base" /> Sign In
            </Link>
            <Link
                to="/register"
                className="hidden lg:flex items-center px-3 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200"
                style={{ background: "linear-gradient(135deg,#4F8EF7,#3B7EE8)", boxShadow: "0 4px 12px rgba(79,142,247,0.25)" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(79,142,247,0.4)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(79,142,247,0.25)"}
            >
                Register
            </Link>
        </div>
    );
}
