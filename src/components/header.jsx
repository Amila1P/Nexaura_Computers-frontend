import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiCart, BiSearch } from "react-icons/bi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useState, useRef } from "react";
import UserData from "./userData";

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Contact Us", to: "/contact-us" },
];

export default function Header({ user, setUser }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);
    const searchInputRef = useRef(null);

    /** Navigate to /products with the search query as a URL param */
    function handleSearch(e) {
        e.preventDefault();
        const q = searchQuery.trim();
        navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
        setSearchQuery("");
        setSearchFocused(false);
        setMenuOpen(false);
        searchInputRef.current?.blur();
    }

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

                    {/* ── Search widget (desktop) ── */}
                    <form
                        id="header-search-form"
                        onSubmit={handleSearch}
                        className="hidden lg:flex items-center rounded-lg transition-all duration-300 overflow-hidden"
                        style={{
                            background: "rgba(30,45,69,0.6)",
                            border: `1px solid ${searchFocused ? "#4F8EF7" : "rgba(30,45,69,0.9)"}`,
                            boxShadow: searchFocused ? "0 0 0 3px rgba(79,142,247,0.12)" : "none",
                            width: searchFocused ? "240px" : "180px",
                            transition: "width 0.3s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                        }}
                    >
                        {/* Search icon — also acts as submit button */}
                        <button
                            type="submit"
                            id="header-search-submit"
                            aria-label="Search products"
                            className="flex items-center justify-center px-3 py-2 shrink-0 transition-colors duration-200"
                            style={{ color: searchFocused ? "#4F8EF7" : "#7A8BA3", background: "transparent", border: "none", cursor: "pointer" }}
                        >
                            <BiSearch className="text-lg" />
                        </button>

                        <input
                            ref={searchInputRef}
                            id="header-search-input"
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                            placeholder="Browse products…"
                            aria-label="Browse products search"
                            className="flex-1 bg-transparent outline-none border-none text-sm pr-3 py-2"
                            style={{
                                color: "#E8EDF5",
                                fontFamily: "'Inter', sans-serif",
                                caretColor: "#4F8EF7",
                            }}
                        />
                        {/* Clear button — shown when there's text */}
                        {searchQuery && (
                            <button
                                type="button"
                                id="header-search-clear"
                                aria-label="Clear search"
                                onClick={() => { setSearchQuery(""); searchInputRef.current?.focus(); }}
                                className="flex items-center justify-center pr-2 shrink-0"
                                style={{ color: "#7A8BA3", background: "transparent", border: "none", cursor: "pointer" }}
                            >
                                <HiX className="text-sm" />
                            </button>
                        )}
                    </form>

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

                    {/* Mobile search bar */}
                    <form
                        id="mobile-search-form"
                        onSubmit={handleSearch}
                        className="flex items-center rounded-lg mt-1"
                        style={{ background: "rgba(30,45,69,0.6)", border: "1px solid rgba(30,45,69,0.9)" }}
                    >
                        <button type="submit" aria-label="Search" className="px-3 py-2.5" style={{ color: "#7A8BA3", background: "transparent", border: "none", cursor: "pointer" }}>
                            <BiSearch className="text-lg" />
                        </button>
                        <input
                            id="mobile-search-input"
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search products…"
                            className="flex-1 bg-transparent outline-none border-none text-sm py-2.5 pr-3"
                            style={{ color: "#E8EDF5", fontFamily: "'Inter', sans-serif", caretColor: "#4F8EF7" }}
                        />
                    </form>

                    <div className="mt-2 pt-2" style={{ borderTop: "1px solid rgba(30,45,69,0.6)" }}>
                        <UserData user={user} setUser={setUser} />
                    </div>
                </div>
            )}
        </header>
    );
}
