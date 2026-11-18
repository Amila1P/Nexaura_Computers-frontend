import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    HiMap,
    HiShoppingBag,
    HiCube,
    HiUserCircle,
    HiCog,
    HiShieldCheck,
    HiSearch,
    HiChevronRight,
    HiExternalLink,
} from "react-icons/hi";
import api from "../utils/api";
import Footer from "../components/footer.jsx";

export default function SitemapPage() {
    const [search, setSearch] = useState("");
    const [liveCategories, setLiveCategories] = useState([]);

    // Fetch live product categories to make the sitemap dynamic
    useEffect(() => {
        window.scrollTo(0, 0)
        api.get("/products")
            .then((res) => {
                if (Array.isArray(res.data)) {
                    const uniqueCats = Array.from(
                        new Set(res.data.map((p) => p.category).filter(Boolean))
                    );
                    setLiveCategories(uniqueCats);
                }
            })
            .catch(() => { });
    }, []);

    // Standard fallback categories if catalog is still loading
    const defaultCategories = [
        "Gaming PCs",
        "Laptops",
        "Graphics Cards",
        "Processors",
        "Monitors",
        "Components",
        "Peripherals",
        "Accessories",
    ];

    const allCategories = liveCategories.length > 0 ? liveCategories : defaultCategories;

    const SITEMAP_SECTIONS = [
        {
            title: "Main Storefront",
            icon: HiShoppingBag,
            color: "#4F8EF7",
            description: "Core browsing, deals, and communication hubs",
            links: [
                { label: "Home Page", path: "/", desc: "Hero promotions, featured rigs, and trust benefits" },
                { label: "Product Catalog", path: "/products", desc: "Full inventory with category filtering and live search" },
                { label: "Contact Us & Support", path: "/contact-us", desc: "Inquiry submission, Colombo store location, and FAQs" },
                { label: "Shopping Cart", path: "/cart", desc: "Active items review, quantity controls, and subtotal calculation" },
                { label: "Checkout & Shipping", path: "/checkout", desc: "Shipping address entry and order placement" },
            ],
        },
        {
            title: "Hardware Categories",
            icon: HiCube,
            color: "#9D6FFF",
            description: "Filtered catalog links by hardware classification",
            links: allCategories.map((cat) => ({
                label: cat,
                path: `/products?q=${encodeURIComponent(cat)}`,
                desc: `Browse all available ${cat} products and stock`,
            })),
        },
        {
            title: "Customer Account Portal",
            icon: HiUserCircle,
            color: "#10B981",
            description: "User authentication, personal orders, and profile management",
            links: [
                { label: "Sign In", path: "/login", desc: "Email/password login and Google OAuth authorization" },
                { label: "Create Account", path: "/register", desc: "Customer registration with instant credential setup" },
                { label: "My Orders", path: "/my-orders", desc: "Customer order history and status tracking" },
                { label: "Account Settings", path: "/settings", desc: "Profile name, avatar upload, and password change" },
            ],
        },
        {
            title: "Admin Suite (Authorized)",
            icon: HiCog,
            color: "#F59E0B",
            description: "Protected administrative management and analytics portal",
            links: [
                { label: "Admin Dashboard", path: "/admin", desc: "KPI metrics, sales velocity charts, and order breakdown" },
                { label: "Manage Products", path: "/admin/products", desc: "Complete inventory list with edit and delete controls" },
                { label: "Add New Product", path: "/admin/add-products", desc: "Create product entry with Supabase media uploads" },
                { label: "Order Fulfillment", path: "/admin/orders", desc: "Storewide customer orders, status changes, and notes" },
                { label: "Categories & Brands", path: "/admin/categories", desc: "Catalog taxonomy and brand partner configuration" },
                { label: "Discount Coupons", path: "/admin/coupons", desc: "Percentage and fixed promo code management" },
                { label: "Marketing Banners", path: "/admin/banners", desc: "Hero slider and promotional callout banner setup" },
                { label: "Store Settings", path: "/admin/settings", desc: "Shipping tiers, business profile, and payment sandbox" },
            ],
        },
        {
            title: "Legal & Information",
            icon: HiShieldCheck,
            color: "#06B6D4",
            description: "Legal agreements, terms, and website governance",
            links: [
                { label: "Privacy Policy", path: "/privacy-policy", desc: "Data protection, cookies, and privacy rights" },
                { label: "Terms of Service", path: "/terms-of-service", desc: "Store policies, warranties, returns, and governing law" },
                { label: "Website Sitemap", path: "/sitemap", desc: "Complete structured index of NexAura web pages" },
            ],
        },
    ];

    // Filter links based on user query
    const filteredSections = SITEMAP_SECTIONS.map((section) => {
        const matchingLinks = section.links.filter(
            (link) =>
                link.label.toLowerCase().includes(search.toLowerCase()) ||
                link.desc.toLowerCase().includes(search.toLowerCase()) ||
                link.path.toLowerCase().includes(search.toLowerCase())
        );
        return { ...section, links: matchingLinks };
    }).filter((section) => section.links.length > 0);

    return (
        <div className="w-full min-h-screen flex flex-col justify-between" style={{ background: "#080C14" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">

                {/* ── HEADER ── */}
                <div className="text-center mb-10">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
                        style={{
                            background: "rgba(79,142,247,0.12)",
                            color: "#4F8EF7",
                            border: "1px solid rgba(79,142,247,0.25)",
                        }}
                    >
                        <HiMap className="text-base" /> Complete Architecture Directory
                    </div>
                    <h1
                        className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3"
                        style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}
                    >
                        Website Sitemap
                    </h1>
                    <p className="text-sm sm:text-base max-w-2xl mx-auto mb-6" style={{ color: "#7A8BA3" }}>
                        Explore the complete structure of NexAura Computers. Easily navigate between our customer storefront, hardware catalog categories, customer accounts, and legal terms.
                    </p>

                    {/* Interactive Filter Bar */}
                    <div className="max-w-md mx-auto relative">
                        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lg" style={{ color: "#7A8BA3" }} />
                        <input
                            type="text"
                            placeholder="Filter sitemap pages, categories, or links..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm transition-all outline-none"
                            style={{
                                background: "#0F1623",
                                border: "1px solid #1E2D45",
                                color: "#E8EDF5",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#4F8EF7")}
                            onBlur={(e) => (e.target.style.borderColor = "#1E2D45")}
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-0.5 rounded-md hover:text-white"
                                style={{ background: "#1E2D45", color: "#7A8BA3" }}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* ── SITEMAP GRIDS ── */}
                <div className="space-y-10">
                    {filteredSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <section
                                key={section.title}
                                className="p-6 sm:p-8 rounded-3xl"
                                style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: `${section.color}1A`, border: `1px solid ${section.color}33` }}
                                    >
                                        <Icon className="text-xl" style={{ color: section.color }} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                            {section.title}
                                        </h2>
                                        <p className="text-xs" style={{ color: "#7A8BA3" }}>
                                            {section.description} ({section.links.length} destination{section.links.length !== 1 ? "s" : ""})
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-6">
                                    {section.links.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className="p-4 rounded-2xl flex flex-col justify-between transition-all duration-200 group"
                                            style={{
                                                background: "#151D2E",
                                                border: "1px solid #1E2D45",
                                                textDecoration: "none",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = section.color;
                                                e.currentTarget.style.transform = "translateY(-2px)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = "#1E2D45";
                                                e.currentTarget.style.transform = "translateY(0)";
                                            }}
                                        >
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <p className="text-sm font-bold group-hover:text-[#4F8EF7] transition-colors" style={{ color: "#E8EDF5" }}>
                                                    {link.label}
                                                </p>
                                                <HiChevronRight className="text-base shrink-0 group-hover:translate-x-1 transition-transform" style={{ color: "#7A8BA3" }} />
                                            </div>
                                            <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: "#7A8BA3" }}>
                                                {link.desc}
                                            </p>
                                            <div className="mt-auto pt-2 border-t flex items-center justify-between" style={{ borderColor: "rgba(30,45,69,0.6)" }}>
                                                <span className="text-[11px] font-mono" style={{ color: "#4F8EF7" }}>
                                                    {link.path}
                                                </span>
                                                <HiExternalLink className="text-xs" style={{ color: "#7A8BA3" }} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        );
                    })}

                    {filteredSections.length === 0 && (
                        <div
                            className="p-12 rounded-3xl text-center"
                            style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                        >
                            <p className="text-lg font-bold" style={{ color: "#E8EDF5" }}>
                                No sitemap pages match "{search}"
                            </p>
                            <p className="text-sm mt-1 mb-4" style={{ color: "#7A8BA3" }}>
                                Try searching for another keyword or browse the full structure.
                            </p>
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="btn-primary text-xs"
                            >
                                Reset Search
                            </button>
                        </div>
                    )}
                </div>

            </div>
            <Footer />
        </div>
    );
}

