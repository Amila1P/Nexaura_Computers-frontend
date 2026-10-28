import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
    HiChartBar, HiClipboardList, HiCube, HiUsers, HiStar,
    HiCollection, HiTicket, HiPhotograph, HiCog,
    HiChevronLeft, HiMenuAlt3, HiX,
} from "react-icons/hi";
import { useState } from "react";
import AdminDashboardPage   from "./admin/adminDashboardPage.jsx";
import AdminProductPage     from "./admin/adminProductPage.jsx";
import AdminAddProductPage  from "./admin/adminAddProductPage.jsx";
import AdminEditProductPage from "./admin/adminEditProductPage.jsx";
import AdminOrdersPage      from "./admin/adminOrdersPage.jsx";
import AdminCategoriesPage  from "./admin/adminCategoriesPage.jsx";
import AdminCouponsPage     from "./admin/adminCouponsPage.jsx";
import AdminBannersPage     from "./admin/adminBannersPage.jsx";
import AdminSettingsPage    from "./admin/adminSettingsPage.jsx";
import AdminUsersPage       from "./admin/adminUsersPage.jsx";
import AdminReviewsPage     from "./admin/adminReviewsPage.jsx";

/* ── Structured Sidebar Navigation ── */
const NAV_SECTIONS = [
    {
        title: "Overview",
        items: [
            { label: "Dashboard",   to: "/admin",            icon: HiChartBar, exact: true },
        ],
    },
    {
        title: "Commerce & Catalog",
        items: [
            { label: "Orders",      to: "/admin/orders",     icon: HiClipboardList },
            { label: "Products",    to: "/admin/products",   icon: HiCube },
            { label: "Categories",  to: "/admin/categories", icon: HiCollection },
            { label: "Coupons",     to: "/admin/coupons",    icon: HiTicket },
            { label: "Banners",     to: "/admin/banners",    icon: HiPhotograph },
        ],
    },
    {
        title: "Platform & System",
        items: [
            { label: "Users",       to: "/admin/users",      icon: HiUsers },
            { label: "Reviews",     to: "/admin/reviews",    icon: HiStar },
            { label: "Settings",    to: "/admin/settings",   icon: HiCog },
        ],
    },
];

/* ── Sidebar link component ── */
function SidebarLink({ to, icon: Icon, label, isActive, onNavigate }) {
    return (
        <Link
            to={to}
            onClick={onNavigate}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 group"
            style={{
                background : isActive ? "rgba(79,142,247,0.14)" : "transparent",
                color      : isActive ? "#4F8EF7" : "#7A8BA3",
                border     : isActive ? "1px solid rgba(79,142,247,0.25)" : "1px solid transparent",
                textDecoration: "none",
            }}
            onMouseEnter={e => {
                if (!isActive) {
                    e.currentTarget.style.color      = "#E8EDF5";
                    e.currentTarget.style.background = "rgba(30,45,69,0.5)";
                }
            }}
            onMouseLeave={e => {
                if (!isActive) {
                    e.currentTarget.style.color      = "#7A8BA3";
                    e.currentTarget.style.background = "transparent";
                }
            }}
        >
            <Icon className="text-base shrink-0" />
            <span className="flex-1 truncate">{label}</span>
            {isActive && (
                <span className="w-1.5 h-1.5 rounded-full shrink-0 shadow-sm" style={{ background: "#4F8EF7" }} />
            )}
        </Link>
    );
}

export default function AdminPage() {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    /* Check which nav item is active */
    function isActive(item) {
        if (item.exact) {
            return location.pathname === item.to || location.pathname === `${item.to}/` || location.pathname === "/admin/dashboard";
        }
        return location.pathname.startsWith(item.to);
    }

    return (
        <div className="flex min-h-screen" style={{ background: "#080C14" }}>

            {/* ══════════════════════════════════════
                SIDEBAR  
            ══════════════════════════════════════ */}
            <aside
                className={`fixed top-0 left-0 z-50 flex flex-col transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
                style={{
                    width         : "260px",
                    height        : "100vh",
                    background    : "#0F1623",
                    borderRight   : "1px solid #1E2D45",
                }}
            >
                {/* ── Brand / Logo ── */}
                <div
                    className="flex items-center gap-3 px-5 shrink-0"
                    style={{ height: "68px", borderBottom: "1px solid #1E2D45" }}
                >
                    <img src="/NexAura Logo.png" alt="NexAura" className="h-8 w-auto" />
                    <div>
                        <p className="text-sm font-black leading-none" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            NexAura
                        </p>
                        <p className="text-[10px] mt-0.5 font-semibold uppercase tracking-widest" style={{ color: "#4F8EF7" }}>
                            Admin Suite
                        </p>
                    </div>

                    {/* Mobile close */}
                    <button
                        className="lg:hidden ml-auto p-1.5 rounded-lg transition-colors"
                        style={{ color: "#7A8BA3" }}
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <HiX className="text-xl" />
                    </button>
                </div>

                {/* ── Scrollable Navigation Area ── */}
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
                    {NAV_SECTIONS.map(section => (
                        <div key={section.title} className="space-y-1">
                            <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "#4B5563" }}>
                                {section.title}
                            </p>
                            {section.items.map(item => (
                                <SidebarLink
                                    key={item.to}
                                    to={item.to}
                                    icon={item.icon}
                                    label={item.label}
                                    isActive={isActive(item)}
                                    onNavigate={() => setSidebarOpen(false)}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                {/* ── Sidebar Footer: Back to store + Online status ── */}
                <div className="p-3 shrink-0 border-t space-y-2" style={{ borderColor: "#1E2D45" }}>
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                        style={{ color: "#7A8BA3", textDecoration: "none" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "#E8EDF5"; e.currentTarget.style.background = "rgba(30,45,69,0.5)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; e.currentTarget.style.background = "transparent"; }}
                    >
                        <HiChevronLeft className="text-base" />
                        Back to Store
                    </Link>

                    <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                        style={{ background: "rgba(79,142,247,0.06)", border: "1px solid rgba(79,142,247,0.15)" }}
                    >
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10B981" }} />
                        <span className="text-[11px] font-medium" style={{ color: "#7A8BA3" }}>System Online</span>
                    </div>
                </div>
            </aside>

            {/* ── Mobile overlay ── */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ══════════════════════════════════════
                MAIN CONTENT  
            ══════════════════════════════════════ */}
            <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">

                {/* ── Mobile top-bar ── */}
                <div
                    className="lg:hidden flex items-center gap-3 px-4 shrink-0"
                    style={{ height: "60px", background: "#0F1623", borderBottom: "1px solid #1E2D45" }}
                >
                    <button
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: "#7A8BA3", background: "rgba(30,45,69,0.5)" }}
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open sidebar"
                    >
                        <HiMenuAlt3 className="text-xl" />
                    </button>
                    <img src="/NexAura Logo.png" alt="NexAura" className="h-7 w-auto" />
                    <span className="text-sm font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>Admin Suite</span>
                </div>

                {/* ── Page content ── */}
                <div className="flex-1">
                    <Routes>
                        <Route path="/"              element={<AdminDashboardPage />} />
                        <Route path="/dashboard"     element={<AdminDashboardPage />} />
                        <Route path="/orders"        element={<AdminOrdersPage />} />
                        <Route path="/products"      element={<AdminProductPage />} />
                        <Route path="/add-products"  element={<AdminAddProductPage />} />
                        <Route path="/edit-products" element={<AdminEditProductPage />} />
                        <Route path="/categories"    element={<AdminCategoriesPage />} />
                        <Route path="/coupons"       element={<AdminCouponsPage />} />
                        <Route path="/banners"       element={<AdminBannersPage />} />
                        <Route path="/settings"      element={<AdminSettingsPage />} />
                        <Route path="/users"         element={<AdminUsersPage />} />
                        <Route path="/reviews"       element={<AdminReviewsPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}