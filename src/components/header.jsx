import { Link, useLocation } from "react-router-dom";
import { BiCart, BiSearch } from "react-icons/bi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useState } from "react";
import UserData from "./userData";

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Contact Us", to: "/contact-us" },
];

export default function Header({ user, setUser }) {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 z-50 w-full" style={{ background: "rgba(8,12,20,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(30,45,69,0.8)" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between gap-4">

                {/* ── Logo ── */}
                <Link to="/" className="flex items-center gap-2 shrink-0">
                    <img src="/NexAura Logo.png" alt="NexAura Computers" className="h-10 w-auto" />
                </Link>

                {/* ── Desktop Nav ── */}
                <nav className="hidden lg:flex items-center gap-1">
                    {NAV_LINKS.map(({ label, to }) => {
                        const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
                        return (
                            <Link
                                key={to}
                                to={to}
                                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                                style={{ color: isActive ? "#4F8EF7" : "#7A8BA3" }}
                                onMouseEnter={e => !isActive && (e.currentTarget.style.color = "#E8EDF5")}
                                onMouseLeave={e => !isActive && (e.currentTarget.style.color = "#7A8BA3")}
                            >
                                {label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg,#4F8EF7,#9D6FFF)" }} />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* ── Right Controls ── */}
                <div className="flex items-center gap-3">

                    {/* Search (desktop) */}
                    <Link
                        to="/products"
                        className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                        style={{ background: "rgba(30,45,69,0.6)", color: "#7A8BA3", border: "1px solid rgba(30,45,69,0.9)" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "#4F8EF7"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(30,45,69,0.9)"}
                    >
                        <BiSearch className="text-lg" />
                        <span className="hidden xl:inline">Browse products…</span>
                    </Link>

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
                        style={{ background: "rgba(30,45,69,0.6)", color: "#7A8BA3" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "#4F8EF7"; e.currentTarget.style.background = "rgba(79,142,247,0.1)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; e.currentTarget.style.background = "rgba(30,45,69,0.6)"; }}
                    >
                        <BiCart className="text-xl" />
                    </Link>

                    {/* User */}
                    <div className="hidden lg:block">
                        <UserData user={user} setUser={setUser} />
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
                        style={{ background: "rgba(30,45,69,0.6)", color: "#7A8BA3" }}
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <HiX className="text-xl" /> : <HiMenuAlt3 className="text-xl" />}
                    </button>
                </div>
            </div>

            {/* ── Mobile Drawer ── */}
            {menuOpen && (
                <div
                    className="lg:hidden px-4 pb-6 pt-2 flex flex-col gap-1"
                    style={{ background: "rgba(8,12,20,0.97)", borderTop: "1px solid rgba(30,45,69,0.6)" }}
                >
                    {NAV_LINKS.map(({ label, to }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200"
                            style={{ color: location.pathname === to ? "#4F8EF7" : "#E8EDF5", background: location.pathname === to ? "rgba(79,142,247,0.08)" : "transparent" }}
                        >
                            {label}
                        </Link>
                    ))}
                    <div className="mt-2 pt-2" style={{ borderTop: "1px solid rgba(30,45,69,0.6)" }}>
                        <UserData user={user} setUser={setUser} />
                    </div>
                </div>
            )}
        </header>
    );
}
