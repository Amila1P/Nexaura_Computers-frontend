import { Link } from "react-router-dom";
import { HiArrowRight, HiShieldCheck, HiTruck, HiStar, HiLightningBolt } from "react-icons/hi";
import { BiSupport } from "react-icons/bi";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { getFormattedPrice } from "../utils/priceFormat";

/* ── Category data ── */
const CATEGORIES = [
    { label: "Gaming PCs", icon: "🖥️", query: "Gaming PC" },
    { label: "Laptops", icon: "💻", query: "Laptop" },
    { label: "Components", icon: "⚙️", query: "Component" },
    { label: "Monitors", icon: "🖵", query: "Monitor" },
    { label: "Peripherals", icon: "🎮", query: "Peripheral" },
    { label: "Accessories", icon: "🔌", query: "Accessory" },
];

/* ── Trust badges ── */
const TRUST = [
    { icon: HiTruck, title: "Free Delivery", desc: "On orders over LKR 10,000" },
    { icon: HiShieldCheck, title: "Genuine Products", desc: "100% authentic, warranty included" },
    { icon: BiSupport, title: "24/7 Support", desc: "Expert help, anytime" },
    { icon: HiStar, title: "Top Rated", desc: "Trusted by 50,000+ customers" },
];

/* ── Hero slides ── */
const HERO_SLIDES = [
    {
        tag: "🔥 New Arrivals",
        title: "Unleash Your\nTrue Potential",
        sub: "Premium gaming rigs, ultra-fast laptops & pro components — all at unbeatable prices.",
        cta: "Shop Now",
        ctaLink: "/products",
        accent: "#4F8EF7",
    },
    {
        tag: "⚡ Limited Offer",
        title: "Up to 40% Off\nSelect Items",
        sub: "Grab our best deals on monitors, peripherals, and gaming accessories before they're gone.",
        cta: "View Deals",
        ctaLink: "/products",
        accent: "#F59E0B",
    },
];

export default function LandingPage() {
    const [slide, setSlide] = useState(0);
    const [products, setProducts] = useState([]);

    /* Auto-rotate hero */
    useEffect(() => {
        const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
        return () => clearInterval(t);
    }, []);

    /* Fetch a handful of featured products */
    useEffect(() => {
        api.get("/products").then(res => {
            setProducts(res.data.slice(0, 4));
        }).catch(() => { });
    }, []);

    const hero = HERO_SLIDES[slide];

    return (
        <div className="w-full min-h-screen" style={{ background: "#080C14" }}>

            {/* ─────────────────────────────────────────
                HERO SECTION
            ───────────────────────────────────────── */}
            <section
                className="relative w-full min-h-[calc(100vh-70px)] flex items-center overflow-hidden"
                style={{ background: "linear-gradient(135deg,#080C14 0%,#0F1623 60%,#080C14 100%)" }}
            >
                {/* Decorative glow orbs */}
                <div className="absolute top-[-120px] left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(79,142,247,0.1) 0%,transparent 70%)" }} />
                <div className="absolute bottom-[-80px] right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse,rgba(157,111,255,0.08) 0%,transparent 70%)" }} />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full flex flex-col lg:flex-row items-center gap-16">

                    {/* Text column */}
                    <div className="flex-1 flex flex-col gap-6">
                        {/* Tag */}
                        <span
                            key={`tag-${slide}`}
                            className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full text-sm font-semibold animate-fade-in"
                            style={{ background: "rgba(79,142,247,0.1)", border: "1px solid rgba(79,142,247,0.3)", color: "#4F8EF7" }}
                        >
                            {hero.tag}
                        </span>

                        {/* Headline */}
                        <h1
                            key={`h1-${slide}`}
                            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight animate-fade-in-up"
                            style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif", whiteSpace: "pre-line" }}
                        >
                            {hero.title.split("\n")[0]}{"\n"}
                            <span className="gradient-text">{hero.title.split("\n")[1]}</span>
                        </h1>

                        <p
                            key={`sub-${slide}`}
                            className="text-lg max-w-xl animate-fade-in-up stagger-2"
                            style={{ color: "#7A8BA3", lineHeight: 1.7 }}
                        >
                            {hero.sub}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3 animate-fade-in-up stagger-3">
                            <Link to={hero.ctaLink} className="btn-primary text-base px-8 py-3.5">
                                {hero.cta} <HiArrowRight />
                            </Link>
                            <Link to="/contact-us" className="btn-secondary text-base px-8 py-3.5">
                                Get a Quote
                            </Link>
                        </div>

                        {/* Stats row */}
                        <div className="flex flex-wrap gap-8 mt-4 animate-fade-in-up stagger-4">
                            {[["50K+", "Happy Customers"], ["5K+", "Products Listed"], ["99%", "Positive Reviews"]].map(([num, lbl]) => (
                                <div key={lbl}>
                                    <p className="text-2xl font-black gradient-text">{num}</p>
                                    <p className="text-xs mt-0.5" style={{ color: "#7A8BA3" }}>{lbl}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hero visual column */}
                    <div className="flex-1 flex justify-center items-center">
                        <div className="relative">
                            {/* Glowing ring */}
                            <div
                                className="absolute inset-0 rounded-3xl"
                                style={{ background: "linear-gradient(135deg,rgba(79,142,247,0.2),rgba(157,111,255,0.1))", filter: "blur(40px)", transform: "scale(1.15)" }}
                            />
                            <div
                                className="relative rounded-3xl overflow-hidden flex items-center justify-center"
                                style={{ width: "360px", height: "360px", background: "rgba(21,29,46,0.7)", border: "1px solid rgba(79,142,247,0.2)" }}
                            >
                                <div className="text-center select-none">
                                    <div className="text-9xl mb-4">🖥️</div>
                                    <p className="text-sm font-semibold" style={{ color: "#4F8EF7" }}>NexAura Computers</p>
                                    <p className="text-xs mt-1" style={{ color: "#7A8BA3" }}>Premium Tech. Unbeatable Prices.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    {HERO_SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setSlide(i)}
                            className="rounded-full transition-all duration-300"
                            style={{ width: i === slide ? "24px" : "8px", height: "8px", background: i === slide ? "#4F8EF7" : "rgba(122,139,163,0.4)" }}
                        />
                    ))}
                </div>
            </section>

            {/* ─────────────────────────────────────────
                TRUST BADGES
            ───────────────────────────────────────── */}
            <section style={{ background: "#0F1623", borderTop: "1px solid #1E2D45", borderBottom: "1px solid #1E2D45" }}>
                <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {TRUST.map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(79,142,247,0.1)" }}>
                                <Icon className="text-xl" style={{ color: "#4F8EF7" }} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold" style={{ color: "#E8EDF5" }}>{title}</p>
                                <p className="text-xs" style={{ color: "#7A8BA3" }}>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─────────────────────────────────────────
                SHOP BY CATEGORY
            ───────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <div className="divider" />
                        <h2 className="section-title">Shop by Category</h2>
                        <p className="section-subtitle" style={{ marginBottom: 0 }}>Browse our full range of tech categories</p>
                    </div>
                    <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-medium" style={{ color: "#4F8EF7" }}>
                        View All <HiArrowRight />
                    </Link>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {CATEGORIES.map(({ label, icon }, idx) => (
                        <Link
                            key={label}
                            to="/products"
                            className={`card flex flex-col items-center justify-center gap-3 py-6 px-2 cursor-pointer animate-fade-in-up stagger-${Math.min(idx + 1, 6)}`}
                            style={{ textDecoration: "none" }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = "#4F8EF7"}
                            onMouseLeave={e => e.currentTarget.style.borderColor = "#1E2D45"}
                        >
                            <span className="text-4xl">{icon}</span>
                            <p className="text-xs font-semibold text-center" style={{ color: "#7A8BA3" }}>{label}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ─────────────────────────────────────────
                FEATURED PRODUCTS
            ───────────────────────────────────────── */}
            {products.length > 0 && (
                <section style={{ background: "#0F1623" }}>
                    <div className="max-w-7xl mx-auto px-6 py-16">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <div className="divider" />
                                <h2 className="section-title">Featured Products</h2>
                                <p className="section-subtitle" style={{ marginBottom: 0 }}>Hand-picked top sellers just for you</p>
                            </div>
                            <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-medium" style={{ color: "#4F8EF7" }}>
                                See All <HiArrowRight />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            {products.map((product, idx) => (
                                <Link
                                    key={product.productId}
                                    to={`/overview/${product.productId}`}
                                    state={{ product }}
                                    className={`card overflow-hidden flex flex-col group animate-fade-in-up stagger-${Math.min(idx + 1, 4)}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    {/* Image */}
                                    <div className="relative w-full aspect-square overflow-hidden" style={{ background: "#0F1623" }}>
                                        {product.labelledPrice > product.price && (
                                            <span className="badge badge-sale absolute top-2 left-2 z-10">Sale</span>
                                        )}
                                        <img
                                            src={product.images?.[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="p-4 flex flex-col gap-2">
                                        <p className="text-sm font-semibold line-clamp-2" style={{ color: "#E8EDF5" }}>{product.name}</p>
                                        <div className="flex flex-col gap-0.5">
                                            {product.labelledPrice > product.price && (
                                                <span className="text-xs line-through" style={{ color: "#F04E37" }}>
                                                    {getFormattedPrice(product.labelledPrice)}
                                                </span>
                                            )}
                                            <span className="text-base font-bold" style={{ color: "#10B981" }}>
                                                {getFormattedPrice(product.price)}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="flex justify-center mt-10">
                            <Link to="/products" className="btn-primary px-10">
                                Browse All Products <HiArrowRight />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ─────────────────────────────────────────
                PROMO BANNER
            ───────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div
                    className="relative rounded-2xl overflow-hidden p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8"
                    style={{ background: "linear-gradient(135deg,#111B30 0%,#0F1623 100%)", border: "1px solid #1E2D45" }}
                >
                    {/* Glow */}
                    <div className="absolute right-0 top-0 w-64 h-64 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right,rgba(79,142,247,0.15),transparent 70%)" }} />

                    <div className="flex flex-col gap-3 relative z-10">
                        <span className="flex items-center gap-2 text-sm font-semibold w-fit px-3 py-1 rounded-full" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.3)" }}>
                            <HiLightningBolt /> Flash Sale — Limited Time
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Ready to Build Your<br />
                            <span className="gradient-text">Dream Setup?</span>
                        </h2>
                        <p style={{ color: "#7A8BA3", maxWidth: "480px" }}>
                            Get personalized recommendations from our expert team. We'll help you pick the perfect hardware for your budget and goals.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 relative z-10 shrink-0">
                        <Link to="/contact-us" className="btn-primary px-8 py-3.5">
                            Talk to an Expert <HiArrowRight />
                        </Link>
                        <Link to="/products" className="btn-secondary px-8 py-3.5">
                            Browse Deals
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─────────────────────────────────────────
                FOOTER STRIP
            ───────────────────────────────────────── */}
            <footer style={{ background: "#0F1623", borderTop: "1px solid #1E2D45" }}>
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm" style={{ color: "#7A8BA3" }}>© 2025 NexAura Computers. All rights reserved.</p>
                    <div className="flex gap-6">
                        {["Privacy Policy", "Terms of Service", "Sitemap"].map(l => (
                            <Link key={l} to="/" className="text-xs transition-colors" style={{ color: "#7A8BA3" }}
                                onMouseEnter={e => e.currentTarget.style.color = "#4F8EF7"}
                                onMouseLeave={e => e.currentTarget.style.color = "#7A8BA3"}
                            >{l}</Link>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}
