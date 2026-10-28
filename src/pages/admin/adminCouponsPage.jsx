import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
    HiTicket, HiPlus, HiSearch, HiPencil, HiTrash,
    HiCheck, HiX, HiDuplicate, HiCalendar, HiSparkles,
} from "react-icons/hi";

/* ── Pre-seeded coupons ── */
const DEFAULT_COUPONS = [
    {
        id: "cp-1",
        code: "NEXA10",
        title: "10% Off Storewide Gaming Rig Promo",
        type: "percentage", // 'percentage' | 'fixed'
        value: 10,
        minSpend: 50000,
        maxDiscount: 15000,
        usedCount: 28,
        usageLimit: 100,
        expiryDate: "2026-12-31",
        active: true,
    },
    {
        id: "cp-2",
        code: "GAMER25K",
        title: "Flat LKR 25,000 Off RTX Workstations",
        type: "fixed",
        value: 25000,
        minSpend: 250000,
        maxDiscount: 25000,
        usedCount: 14,
        usageLimit: 50,
        expiryDate: "2026-11-30",
        active: true,
    },
    {
        id: "cp-3",
        code: "WELCOME5K",
        title: "New Customer Welcome Discount",
        type: "fixed",
        value: 5000,
        minSpend: 35000,
        maxDiscount: 5000,
        usedCount: 89,
        usageLimit: 500,
        expiryDate: "2027-01-01",
        active: true,
    },
    {
        id: "cp-4",
        code: "PROAUDIO15",
        title: "15% Off Studio Headphones & Peripherals",
        type: "percentage",
        value: 15,
        minSpend: 20000,
        maxDiscount: 8000,
        usedCount: 42,
        usageLimit: 150,
        expiryDate: "2026-10-15",
        active: false,
    },
];

export default function AdminCouponsPage() {
    const [coupons, setCoupons] = useState(() => {
        const saved = localStorage.getItem("nexa_admin_coupons");
        return saved ? JSON.parse(saved) : DEFAULT_COUPONS;
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'active' | 'inactive' | 'expired'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);

    const [form, setForm] = useState({
        code: "",
        title: "",
        type: "percentage",
        value: 10,
        minSpend: 25000,
        maxDiscount: 10000,
        usageLimit: 100,
        expiryDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
        active: true,
    });

    useEffect(() => {
        localStorage.setItem("nexa_admin_coupons", JSON.stringify(coupons));
    }, [coupons]);

    /* Random coupon code generator */
    function generateRandomCode() {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let res = "NEXA";
        for (let i = 0; i < 4; i++) {
            res += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setForm(prev => ({ ...prev, code: res }));
    }

    function handleOpenModal(coupon = null) {
        if (coupon) {
            setEditingCoupon(coupon);
            setForm({ ...coupon });
        } else {
            setEditingCoupon(null);
            setForm({
                code: "",
                title: "",
                type: "percentage",
                value: 10,
                minSpend: 25000,
                maxDiscount: 10000,
                usageLimit: 100,
                expiryDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
                active: true,
            });
        }
        setIsModalOpen(true);
    }

    function handleSave(e) {
        e.preventDefault();
        const codeClean = form.code.trim().toUpperCase();
        if (!codeClean) {
            toast.error("Please enter a coupon code");
            return;
        }

        if (editingCoupon) {
            setCoupons(prev => prev.map(c => c.id === editingCoupon.id ? { ...form, id: c.id, code: codeClean } : c));
            toast.success(`Coupon ${codeClean} updated successfully`);
        } else {
            if (coupons.some(c => c.code === codeClean)) {
                toast.error(`Coupon code "${codeClean}" already exists`);
                return;
            }
            const newCoupon = {
                id: `cp-${Date.now()}`,
                ...form,
                code: codeClean,
                usedCount: 0,
            };
            setCoupons(prev => [newCoupon, ...prev]);
            toast.success(`Coupon ${codeClean} created!`);
        }
        setIsModalOpen(false);
    }

    function handleDelete(coupon) {
        if (window.confirm(`Delete coupon "${coupon.code}"?`)) {
            setCoupons(prev => prev.filter(c => c.id !== coupon.id));
            toast.success(`Coupon ${coupon.code} deleted`);
        }
    }

    function handleToggleStatus(couponId) {
        setCoupons(prev => prev.map(c => c.id === couponId ? { ...c, active: !c.active } : c));
        toast.success("Coupon status toggled");
    }

    function handleCopyCode(code) {
        navigator.clipboard.writeText(code);
        toast.success(`Copied "${code}" to clipboard!`);
    }

    function isExpired(expiryDate) {
        return new Date(expiryDate) < new Date(new Date().setHours(0,0,0,0));
    }

    /* Filter coupons */
    const filteredCoupons = coupons.filter(c => {
        const matchesQuery = c.code.toLowerCase().includes(searchQuery.toLowerCase()) || c.title.toLowerCase().includes(searchQuery.toLowerCase());
        const expired = isExpired(c.expiryDate);

        if (!matchesQuery) return false;
        if (statusFilter === "all") return true;
        if (statusFilter === "active") return c.active && !expired;
        if (statusFilter === "inactive") return !c.active && !expired;
        if (statusFilter === "expired") return expired;
        return true;
    });

    return (
        <div className="w-full min-h-full p-6" style={{ background: "#080C14" }}>

            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)" }}>
                        <HiTicket className="text-xl" style={{ color: "#F59E0B" }} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Coupons & Discounts
                        </h1>
                        <p className="text-xs" style={{ color: "#7A8BA3" }}>
                            Manage promotional vouchers, customer incentives, and checkout discounts
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-all"
                    style={{
                        background: "linear-gradient(135deg, #F59E0B, #D97706)",
                        boxShadow: "0 4px 15px rgba(245,158,11,0.3)",
                    }}
                >
                    <HiPlus className="text-base" /> Create Coupon
                </button>
            </div>

            {/* ── Summary Stats ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-2xl" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7A8BA3" }}>Total Vouchers</p>
                    <p className="text-2xl font-black mt-1" style={{ color: "#F59E0B", fontFamily: "'Outfit', sans-serif" }}>
                        {coupons.length}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "#7A8BA3" }}>In promotion database</p>
                </div>
                <div className="p-4 rounded-2xl" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7A8BA3" }}>Active Campaigns</p>
                    <p className="text-2xl font-black mt-1" style={{ color: "#10B981", fontFamily: "'Outfit', sans-serif" }}>
                        {coupons.filter(c => c.active && !isExpired(c.expiryDate)).length}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "#10B981" }}>Ready for redemption</p>
                </div>
                <div className="p-4 rounded-2xl" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7A8BA3" }}>Times Redeemed</p>
                    <p className="text-2xl font-black mt-1" style={{ color: "#4F8EF7", fontFamily: "'Outfit', sans-serif" }}>
                        {coupons.reduce((sum, c) => sum + (c.usedCount || 0), 0)}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "#7A8BA3" }}>Customer checkouts</p>
                </div>
                <div className="p-4 rounded-2xl" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7A8BA3" }}>Expired Codes</p>
                    <p className="text-2xl font-black mt-1" style={{ color: "#F04E37", fontFamily: "'Outfit', sans-serif" }}>
                        {coupons.filter(c => isExpired(c.expiryDate)).length}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "#7A8BA3" }}>Past validity date</p>
                </div>
            </div>

            {/* ── Search & Filter Controls ── */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 p-4 rounded-2xl"
                style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                <div className="relative flex-1 max-w-md">
                    <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg" style={{ color: "#7A8BA3" }} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search promo codes or campaign title..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none transition-all"
                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                        onFocus={e => e.target.style.borderColor = "#F59E0B"}
                        onBlur={e => e.target.style.borderColor = "#1E2D45"}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>Status:</span>
                    {["all", "active", "inactive", "expired"].map(st => (
                        <button
                            key={st}
                            onClick={() => setStatusFilter(st)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                            style={{
                                background: statusFilter === st ? "rgba(245,158,11,0.15)" : "#080C14",
                                color: statusFilter === st ? "#F59E0B" : "#7A8BA3",
                                border: statusFilter === st ? "1px solid rgba(245,158,11,0.3)" : "1px solid #1E2D45",
                            }}
                        >
                            {st}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Coupon Cards Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredCoupons.map(coupon => {
                    const expired = isExpired(coupon.expiryDate);
                    return (
                        <div
                            key={coupon.id}
                            className="relative flex flex-col justify-between p-5 rounded-2xl transition-all duration-200 overflow-hidden"
                            style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "#F59E0B"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1E2D45"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >
                            {/* Decorative ticket notch circles */}
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full" style={{ background: "#080C14" }} />
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full" style={{ background: "#080C14" }} />

                            <div>
                                <div className="flex items-center justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1.5 rounded-xl font-mono text-sm font-black tracking-widest flex items-center gap-1.5"
                                            style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B", border: "1px dashed rgba(245,158,11,0.4)" }}>
                                            {coupon.code}
                                            <button
                                                type="button"
                                                onClick={() => handleCopyCode(coupon.code)}
                                                className="hover:opacity-80 transition-opacity"
                                                title="Copy code"
                                            >
                                                <HiDuplicate className="text-xs" />
                                            </button>
                                        </span>
                                    </div>

                                    {/* Status Badge */}
                                    <button
                                        onClick={() => handleToggleStatus(coupon.id)}
                                        className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all"
                                        style={{
                                            background: expired
                                                ? "rgba(240,78,55,0.12)"
                                                : coupon.active ? "rgba(16,185,129,0.12)" : "rgba(122,139,163,0.15)",
                                            color: expired ? "#F04E37" : coupon.active ? "#10B981" : "#7A8BA3",
                                            border: `1px solid ${expired ? "rgba(240,78,55,0.3)" : coupon.active ? "rgba(16,185,129,0.3)" : "#1E2D45"}`,
                                        }}
                                        title="Click to toggle status"
                                    >
                                        {expired ? "Expired" : coupon.active ? "Active" : "Disabled"}
                                    </button>
                                </div>

                                <h3 className="text-sm font-bold mt-1" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                    {coupon.title}
                                </h3>

                                <div className="mt-3 p-3 rounded-xl space-y-1.5" style={{ background: "#080C14", border: "1px solid #1E2D45" }}>
                                    <div className="flex items-center justify-between text-xs">
                                        <span style={{ color: "#7A8BA3" }}>Discount:</span>
                                        <span className="font-bold text-sm" style={{ color: "#10B981" }}>
                                            {coupon.type === "percentage" ? `${coupon.value}% OFF` : `LKR ${coupon.value.toLocaleString()} OFF`}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span style={{ color: "#7A8BA3" }}>Min Order:</span>
                                        <span style={{ color: "#E8EDF5" }}>LKR {coupon.minSpend.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span style={{ color: "#7A8BA3" }}>Usage:</span>
                                        <span style={{ color: "#E8EDF5" }}>
                                            {coupon.usedCount} / {coupon.usageLimit} redeemed
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: expired ? "#F04E37" : "#7A8BA3" }}>
                                    <HiCalendar className="text-sm" />
                                    <span>Expires: {coupon.expiryDate} {expired && "(Expired)"}</span>
                                </div>
                            </div>

                            {/* Card Footer: actions */}
                            <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t" style={{ borderColor: "#1E2D45" }}>
                                <button
                                    onClick={() => handleOpenModal(coupon)}
                                    className="p-2 rounded-lg text-xs font-medium transition-colors"
                                    style={{ color: "#7A8BA3", background: "#151D2E" }}
                                    onMouseEnter={e => { e.currentTarget.style.color = "#F59E0B"; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; }}
                                    title="Edit Coupon"
                                >
                                    <HiPencil className="text-sm" />
                                </button>
                                <button
                                    onClick={() => handleDelete(coupon)}
                                    className="p-2 rounded-lg text-xs font-medium transition-colors"
                                    style={{ color: "#7A8BA3", background: "#151D2E" }}
                                    onMouseEnter={e => { e.currentTarget.style.color = "#F04E37"; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; }}
                                    title="Delete Coupon"
                                >
                                    <HiTrash className="text-sm" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Empty State ── */}
            {filteredCoupons.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 rounded-2xl text-center"
                    style={{ background: "#0F1623", border: "1px dashed #1E2D45" }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{ background: "rgba(245,158,11,0.08)", color: "#F59E0B" }}>
                        <HiTicket className="text-2xl" />
                    </div>
                    <p className="text-base font-bold" style={{ color: "#E8EDF5" }}>
                        No coupons found
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#7A8BA3" }}>
                        Adjust filters or click "Create Coupon" to start a new campaign.
                    </p>
                </div>
            )}

            {/* ══════════════════════════════════════
                MODAL: Create / Edit Coupon
            ══════════════════════════════════════ */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl p-6"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)" }}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
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
                                    Coupon Code *
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        required
                                        value={form.code}
                                        onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })}
                                        placeholder="e.g. FLASH25"
                                        className="flex-1 px-3 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider outline-none"
                                        style={{ background: "#080C14", color: "#F59E0B", border: "1px solid #1E2D45" }}
                                    />
                                    <button
                                        type="button"
                                        onClick={generateRandomCode}
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
                                        style={{ background: "#151D2E", color: "#7A8BA3", border: "1px solid #1E2D45" }}
                                        title="Generate random code"
                                    >
                                        <HiSparkles className="text-sm" /> Generate
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                    Campaign Title / Description *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    placeholder="e.g. 10% Off Gaming Laptops Promo"
                                    className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                    style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Discount Type
                                    </label>
                                    <select
                                        value={form.type}
                                        onChange={e => setForm({ ...form, type: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    >
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed Amount (LKR)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        {form.type === "percentage" ? "Percentage Value (%)" : "Discount Amount (LKR)"}
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={form.type === "percentage" ? "100" : undefined}
                                        value={form.value}
                                        onChange={e => setForm({ ...form, value: Number(e.target.value) })}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Min Spend (LKR)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.minSpend}
                                        onChange={e => setForm({ ...form, minSpend: Number(e.target.value) })}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Max Usage Limit
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={form.usageLimit}
                                        onChange={e => setForm({ ...form, usageLimit: Number(e.target.value) })}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                    Expiry Date
                                </label>
                                <input
                                    type="date"
                                    value={form.expiryDate}
                                    onChange={e => setForm({ ...form, expiryDate: e.target.value })}
                                    className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                    style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="coupon-active"
                                    checked={form.active}
                                    onChange={e => setForm({ ...form, active: e.target.checked })}
                                    className="rounded accent-amber-500 w-4 h-4 cursor-pointer"
                                />
                                <label htmlFor="coupon-active" className="text-xs font-medium cursor-pointer" style={{ color: "#E8EDF5" }}>
                                    Activate coupon immediately
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
                                    style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
                                >
                                    {editingCoupon ? "Save Changes" : "Create Coupon"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
