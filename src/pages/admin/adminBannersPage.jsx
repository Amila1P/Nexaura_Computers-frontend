import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
    HiPhotograph, HiPlus, HiPencil, HiTrash, HiEye,
    HiCheck, HiX, HiExternalLink, HiArrowRight, HiSparkles,
} from "react-icons/hi";

/* ── Pre-seeded initial banners ── */
const DEFAULT_BANNERS = [
    {
        id: "bn-1",
        title: "Unleash Ultimate Gaming Dominance",
        subtitle: "Next-Gen Intel Core Ultra & NVIDIA RTX 50-Series Rigs Engineered for Extreme Performance",
        badge: "NEW GENERATION 2026",
        placement: "hero", // 'hero' | 'promo' | 'announcement'
        ctaText: "Explore Battle Stations",
        ctaLink: "/products",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
        order: 1,
        active: true,
    },
    {
        id: "bn-2",
        title: "Pro Workstation & Creator Laptops",
        subtitle: "Calibrated 4K OLED Displays, DDR5 RAM & M.2 NVMe storage designed for heavy 3D rendering",
        badge: "PRO WORKSTATIONS",
        placement: "hero",
        ctaText: "View Creator Laptops",
        ctaLink: "/products",
        imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80",
        order: 2,
        active: true,
    },
    {
        id: "bn-3",
        title: "Mid-Season Upgrade Fest — Up to 30% Off",
        subtitle: "Liquid AIO Coolers, 850W Platinum PSUs, and High-Speed PCIe 5.0 SSDs on special sale",
        badge: "LIMITED TIME SALE",
        placement: "promo",
        ctaText: "Shop Hardware Deals",
        ctaLink: "/products",
        imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80",
        order: 3,
        active: true,
    },
];

export default function AdminBannersPage() {
    const [banners, setBanners] = useState(() => {
        const saved = localStorage.getItem("nexa_admin_banners");
        return saved ? JSON.parse(saved) : DEFAULT_BANNERS;
    });

    const [placementFilter, setPlacementFilter] = useState("all"); // 'all' | 'hero' | 'promo'
    const [selectedPreview, setSelectedPreview] = useState(banners[0] || null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState(null);

    const [form, setForm] = useState({
        title: "",
        subtitle: "",
        badge: "FEATURED DEAL",
        placement: "hero",
        ctaText: "Explore Now",
        ctaLink: "/products",
        imageUrl: "",
        order: 1,
        active: true,
    });

    useEffect(() => {
        localStorage.setItem("nexa_admin_banners", JSON.stringify(banners));
        if (!selectedPreview && banners.length > 0) {
            setSelectedPreview(banners[0]);
        }
    }, [banners]);

    function handleOpenModal(banner = null) {
        if (banner) {
            setEditingBanner(banner);
            setForm({ ...banner });
        } else {
            setEditingBanner(null);
            setForm({
                title: "",
                subtitle: "",
                badge: "SPECIAL PROMOTION",
                placement: "hero",
                ctaText: "Shop Collection",
                ctaLink: "/products",
                imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80",
                order: banners.length + 1,
                active: true,
            });
        }
        setIsModalOpen(true);
    }

    function handleSave(e) {
        e.preventDefault();
        if (!form.title.trim()) {
            toast.error("Banner title is required");
            return;
        }

        if (editingBanner) {
            setBanners(prev => prev.map(b => b.id === editingBanner.id ? { ...form, id: b.id } : b));
            if (selectedPreview?.id === editingBanner.id) {
                setSelectedPreview({ ...form, id: editingBanner.id });
            }
            toast.success("Banner updated successfully");
        } else {
            const newBanner = {
                id: `bn-${Date.now()}`,
                ...form,
            };
            setBanners(prev => [newBanner, ...prev]);
            setSelectedPreview(newBanner);
            toast.success("New banner created!");
        }
        setIsModalOpen(false);
    }

    function handleDelete(banner) {
        if (window.confirm(`Delete banner "${banner.title}"?`)) {
            setBanners(prev => prev.filter(b => b.id !== banner.id));
            if (selectedPreview?.id === banner.id) {
                const remaining = banners.filter(b => b.id !== banner.id);
                setSelectedPreview(remaining[0] || null);
            }
            toast.success("Banner removed");
        }
    }

    function handleToggleStatus(bannerId) {
        setBanners(prev => prev.map(b => b.id === bannerId ? { ...b, active: !b.active } : b));
        toast.success("Banner status toggled");
    }

    const filteredBanners = banners.filter(b => {
        if (placementFilter === "all") return true;
        return b.placement === placementFilter;
    });

    return (
        <div className="w-full min-h-full p-6" style={{ background: "#080C14" }}>

            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(157,111,255,0.12)", border: "1px solid rgba(157,111,255,0.2)" }}>
                        <HiPhotograph className="text-xl" style={{ color: "#9D6FFF" }} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Banners & Sliders
                        </h1>
                        <p className="text-xs" style={{ color: "#7A8BA3" }}>
                            Control storefront hero banners, promotional cards, and visual marketing assets
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-all"
                    style={{
                        background: "linear-gradient(135deg, #9D6FFF, #7C3AED)",
                        boxShadow: "0 4px 15px rgba(157,111,255,0.3)",
                    }}
                >
                    <HiPlus className="text-base" /> Add New Banner
                </button>
            </div>

            {/* ── Interactive Live Storefront Preview ── */}
            {selectedPreview && (
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: "#7A8BA3" }}>
                            <HiEye className="text-sm" style={{ color: "#4F8EF7" }} />
                            Live Storefront Visual Preview
                        </span>
                        <span className="text-xs font-mono" style={{ color: "#4F8EF7" }}>
                            Placement: {selectedPreview.placement.toUpperCase()}
                        </span>
                    </div>

                    <div
                        className="relative w-full rounded-3xl overflow-hidden p-8 sm:p-12 flex flex-col justify-center min-h-[260px] border shadow-2xl transition-all"
                        style={{
                            borderColor: "#1E2D45",
                            backgroundImage: `linear-gradient(to right, rgba(8,12,20,0.92) 20%, rgba(8,12,20,0.7) 60%, rgba(8,12,20,0.4)), url(${selectedPreview.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="max-w-xl z-10">
                            {selectedPreview.badge && (
                                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3"
                                    style={{
                                        background: "rgba(79,142,247,0.2)",
                                        color: "#4F8EF7",
                                        border: "1px solid rgba(79,142,247,0.35)",
                                    }}>
                                    {selectedPreview.badge}
                                </span>
                            )}
                            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3"
                                style={{ fontFamily: "'Outfit', sans-serif" }}>
                                {selectedPreview.title}
                            </h2>
                            <p className="text-xs sm:text-sm mb-6 max-w-lg leading-relaxed" style={{ color: "#CBD5E1" }}>
                                {selectedPreview.subtitle}
                            </p>
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg pointer-events-none"
                                style={{ background: "linear-gradient(135deg, #4F8EF7, #2563EB)" }}>
                                <span>{selectedPreview.ctaText || "Shop Now"}</span>
                                <HiArrowRight className="text-sm" />
                            </div>
                        </div>

                        {!selectedPreview.active && (
                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-bold"
                                style={{ background: "rgba(240,78,55,0.2)", color: "#F04E37", border: "1px solid rgba(240,78,55,0.4)" }}>
                                Inactive / Draft
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Filter Controls ── */}
            <div className="flex items-center justify-between gap-3 mb-6 p-4 rounded-2xl"
                style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>Placement:</span>
                    {[
                        { id: "all",   label: "All Positions" },
                        { id: "hero",  label: "Hero Sliders" },
                        { id: "promo", label: "Middle Promo" },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setPlacementFilter(tab.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                            style={{
                                background: placementFilter === tab.id ? "rgba(157,111,255,0.15)" : "#080C14",
                                color: placementFilter === tab.id ? "#9D6FFF" : "#7A8BA3",
                                border: placementFilter === tab.id ? "1px solid rgba(157,111,255,0.3)" : "1px solid #1E2D45",
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <span className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>
                    {filteredBanners.length} banners configured
                </span>
            </div>

            {/* ── Banners Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredBanners.map(banner => {
                    const isSelected = selectedPreview?.id === banner.id;
                    return (
                        <div
                            key={banner.id}
                            onClick={() => setSelectedPreview(banner)}
                            className="flex flex-col justify-between rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
                            style={{
                                background: "#0F1623",
                                border: isSelected ? "2px solid #9D6FFF" : "1px solid #1E2D45",
                                boxShadow: isSelected ? "0 0 20px rgba(157,111,255,0.2)" : "none",
                            }}
                        >
                            {/* Thumbnail preview */}
                            <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                                <img
                                    src={banner.imageUrl || "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80"}
                                    alt={banner.title}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1623] via-transparent to-black/30" />

                                <div className="absolute top-3 left-3">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white"
                                        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
                                        {banner.placement}
                                    </span>
                                </div>

                                <div className="absolute top-3 right-3">
                                    <button
                                        type="button"
                                        onClick={e => { e.stopPropagation(); handleToggleStatus(banner.id); }}
                                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                        style={{
                                            background: banner.active ? "rgba(16,185,129,0.85)" : "rgba(240,78,55,0.85)",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        {banner.active ? "Active" : "Inactive"}
                                    </button>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-sm font-bold line-clamp-1" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                        {banner.title}
                                    </h3>
                                    <p className="text-xs mt-1 line-clamp-2" style={{ color: "#7A8BA3" }}>
                                        {banner.subtitle}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-3 mt-3 border-t text-xs" style={{ borderColor: "#1E2D45" }}>
                                    <span style={{ color: "#4F8EF7" }}>
                                        CTA: {banner.ctaText}
                                    </span>

                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={e => { e.stopPropagation(); handleOpenModal(banner); }}
                                            className="p-1.5 rounded-lg transition-colors"
                                            style={{ color: "#7A8BA3", background: "#151D2E" }}
                                            onMouseEnter={e => { e.currentTarget.style.color = "#9D6FFF"; }}
                                            onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; }}
                                            title="Edit Banner"
                                        >
                                            <HiPencil className="text-sm" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={e => { e.stopPropagation(); handleDelete(banner); }}
                                            className="p-1.5 rounded-lg transition-colors"
                                            style={{ color: "#7A8BA3", background: "#151D2E" }}
                                            onMouseEnter={e => { e.currentTarget.style.color = "#F04E37"; }}
                                            onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; }}
                                            title="Delete Banner"
                                        >
                                            <HiTrash className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ══════════════════════════════════════
                MODAL: Add / Edit Banner
            ══════════════════════════════════════ */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl p-6"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)" }}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                {editingBanner ? "Edit Banner" : "Create New Banner"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 rounded-lg transition-colors"
                                style={{ color: "#7A8BA3" }}
                            >
                                <HiX className="text-xl" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                    Main Headline Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    placeholder="e.g. Next-Gen Gaming Battle Stations"
                                    className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                    style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                    Subtitle / Marketing Copy
                                </label>
                                <textarea
                                    rows="2"
                                    value={form.subtitle}
                                    onChange={e => setForm({ ...form, subtitle: e.target.value })}
                                    placeholder="Brief supporting description..."
                                    className="w-full px-3 py-2 rounded-xl text-xs outline-none resize-none"
                                    style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Eyebrow Badge Tag
                                    </label>
                                    <input
                                        type="text"
                                        value={form.badge}
                                        onChange={e => setForm({ ...form, badge: e.target.value })}
                                        placeholder="NEW ARRIVAL"
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Placement Slot
                                    </label>
                                    <select
                                        value={form.placement}
                                        onChange={e => setForm({ ...form, placement: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    >
                                        <option value="hero">Hero Carousel Slider</option>
                                        <option value="promo">Middle Promotional Card</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                    Background Image URL
                                </label>
                                <input
                                    type="url"
                                    value={form.imageUrl}
                                    onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                    style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        CTA Button Text
                                    </label>
                                    <input
                                        type="text"
                                        value={form.ctaText}
                                        onChange={e => setForm({ ...form, ctaText: e.target.value })}
                                        placeholder="Shop Now"
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Target Destination Link
                                    </label>
                                    <input
                                        type="text"
                                        value={form.ctaLink}
                                        onChange={e => setForm({ ...form, ctaLink: e.target.value })}
                                        placeholder="/products"
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="banner-active"
                                    checked={form.active}
                                    onChange={e => setForm({ ...form, active: e.target.checked })}
                                    className="rounded accent-purple-500 w-4 h-4 cursor-pointer"
                                />
                                <label htmlFor="banner-active" className="text-xs font-medium cursor-pointer" style={{ color: "#E8EDF5" }}>
                                    Display banner immediately on live storefront
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t" style={{ borderColor: "#1E2D45" }}>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-bold"
                                    style={{ color: "#7A8BA3", background: "#151D2E" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-lg"
                                    style={{ background: "linear-gradient(135deg, #9D6FFF, #7C3AED)" }}
                                >
                                    {editingBanner ? "Save Changes" : "Create Banner"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
