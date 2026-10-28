import { useState, useEffect } from "react";
import api from "../../utils/api.js";
import toast from "react-hot-toast";
import {
    HiCollection, HiTag, HiPlus, HiSearch, HiPencil,
    HiTrash, HiCheck, HiX, HiRefresh, HiCube, HiExternalLink,
} from "react-icons/hi";

/* ── Pre-seeded initial categories ── */
const DEFAULT_CATEGORIES = [
    { id: "cat-1", name: "Laptops", slug: "laptops", icon: "💻", description: "Gaming laptops, creator notebooks, and ultrabooks", active: true },
    { id: "cat-2", name: "Desktops & PCs", slug: "desktops-pcs", icon: "🖥️", description: "Pre-built gaming rigs, custom workstation PCs", active: true },
    { id: "cat-3", name: "Graphics Cards", slug: "graphics-cards", icon: "⚡", description: "NVIDIA GeForce RTX and AMD Radeon GPUs", active: true },
    { id: "cat-4", name: "Processors (CPUs)", slug: "processors", icon: "🔲", description: "Intel Core Ultra/i9 and AMD Ryzen 9 chips", active: true },
    { id: "cat-5", name: "Monitors & Displays", slug: "monitors", icon: "📺", description: "High-refresh OLED, 4K UHD, and curved displays", active: true },
    { id: "cat-6", name: "PC Components", slug: "components", icon: "⚙️", description: "Motherboards, DDR5 RAM, PCIe 5.0 SSDs, and PSUs", active: true },
    { id: "cat-7", name: "Peripherals & Audio", slug: "peripherals", icon: "🎧", description: "Mechanical keyboards, optical mice, and studio headsets", active: true },
    { id: "cat-8", name: "Networking & Accessories", slug: "accessories", icon: "🌐", description: "Wi-Fi 7 routers, gaming chairs, cables & cooling", active: true },
];

/* ── Pre-seeded initial brands ── */
const DEFAULT_BRANDS = [
    { id: "br-1", name: "ASUS ROG", origin: "Taiwan", specialty: "Laptops, GPUs, Motherboards", website: "https://rog.asus.com", active: true },
    { id: "br-2", name: "Dell Alienware", origin: "USA", specialty: "High-end Gaming Laptops & PCs", website: "https://alienware.com", active: true },
    { id: "br-3", name: "MSI Gaming", origin: "Taiwan", specialty: "Laptops, Graphics Cards, Monitors", website: "https://msi.com", active: true },
    { id: "br-4", name: "Razer", origin: "USA / Singapore", specialty: "Gaming Laptops & Pro Peripherals", website: "https://razer.com", active: true },
    { id: "br-5", name: "Corsair", origin: "USA", specialty: "DDR5 Memory, PSUs, Liquid Coolers", website: "https://corsair.com", active: true },
    { id: "br-6", name: "Logitech G", origin: "Switzerland", specialty: "Esports Mice, Keyboards & Headsets", website: "https://logitechg.com", active: true },
    { id: "br-7", name: "Apple", origin: "USA", specialty: "MacBook Pro, Studio & Pro Displays", website: "https://apple.com", active: true },
    { id: "br-8", name: "Lenovo Legion", origin: "China", specialty: "Gaming Laptops & Towers", website: "https://lenovo.com", active: true },
];

export default function AdminCategoriesPage() {
    const [activeTab, setActiveTab] = useState("categories"); // 'categories' | 'brands'
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'active' | 'inactive'
    const [products, setProducts] = useState([]);

    /* Category state */
    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem("nexa_admin_categories");
        return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    });

    /* Brand state */
    const [brands, setBrands] = useState(() => {
        const saved = localStorage.getItem("nexa_admin_brands");
        return saved ? JSON.parse(saved) : DEFAULT_BRANDS;
    });

    /* Modal states */
    const [isCatModalOpen, setIsCatModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [catForm, setCatForm] = useState({ name: "", slug: "", icon: "📁", description: "", active: true });

    const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);
    const [brandForm, setBrandForm] = useState({ name: "", origin: "", specialty: "", website: "", active: true });

    /* Fetch products to calculate real live counts */
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await api.get("/products");
                if (Array.isArray(res.data)) {
                    setProducts(res.data);
                }
            } catch (err) {
                console.error("Could not fetch product catalog for counts", err);
            }
        }
        fetchProducts();
    }, []);

    /* Persist categories */
    useEffect(() => {
        localStorage.setItem("nexa_admin_categories", JSON.stringify(categories));
    }, [categories]);

    /* Persist brands */
    useEffect(() => {
        localStorage.setItem("nexa_admin_brands", JSON.stringify(brands));
    }, [brands]);

    /* Helper: count products matching category */
    function getProductCountForCategory(catName) {
        if (!products.length) return 0;
        const normalized = (catName || "").toLowerCase();
        return products.filter(p => (p.category || "").toLowerCase().includes(normalized) || normalized.includes((p.category || "").toLowerCase())).length;
    }

    /* Helper: count products matching brand */
    function getProductCountForBrand(brandName) {
        if (!products.length) return 0;
        const normalized = (brandName || "").toLowerCase();
        return products.filter(p => (p.brand || "").toLowerCase().includes(normalized) || normalized.includes((p.brand || "").toLowerCase())).length;
    }

    /* ── Category Handlers ── */
    function handleOpenCatModal(cat = null) {
        if (cat) {
            setEditingCategory(cat);
            setCatForm({ ...cat });
        } else {
            setEditingCategory(null);
            setCatForm({ name: "", slug: "", icon: "💻", description: "", active: true });
        }
        setIsCatModalOpen(true);
    }

    function handleSaveCategory(e) {
        e.preventDefault();
        if (!catForm.name.trim()) {
            toast.error("Category name is required");
            return;
        }
        const slug = catForm.slug.trim() || catForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

        if (editingCategory) {
            setCategories(prev => prev.map(c => c.id === editingCategory.id ? { ...catForm, id: c.id, slug } : c));
            toast.success(`Category "${catForm.name}" updated successfully`);
        } else {
            const newCat = {
                id: `cat-${Date.now()}`,
                ...catForm,
                slug,
            };
            setCategories(prev => [newCat, ...prev]);
            toast.success(`Category "${catForm.name}" created!`);
        }
        setIsCatModalOpen(false);
    }

    function handleDeleteCategory(cat) {
        if (window.confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
            setCategories(prev => prev.filter(c => c.id !== cat.id));
            toast.success(`Category "${cat.name}" removed`);
        }
    }

    function handleToggleCategoryStatus(catId) {
        setCategories(prev => prev.map(c => c.id === catId ? { ...c, active: !c.active } : c));
        toast.success("Category status updated");
    }

    /* ── Brand Handlers ── */
    function handleOpenBrandModal(brand = null) {
        if (brand) {
            setEditingBrand(brand);
            setBrandForm({ ...brand });
        } else {
            setEditingBrand(null);
            setBrandForm({ name: "", origin: "", specialty: "", website: "", active: true });
        }
        setIsBrandModalOpen(true);
    }

    function handleSaveBrand(e) {
        e.preventDefault();
        if (!brandForm.name.trim()) {
            toast.error("Brand name is required");
            return;
        }

        if (editingBrand) {
            setBrands(prev => prev.map(b => b.id === editingBrand.id ? { ...brandForm, id: b.id } : b));
            toast.success(`Brand "${brandForm.name}" updated`);
        } else {
            const newBrand = {
                id: `br-${Date.now()}`,
                ...brandForm,
            };
            setBrands(prev => [newBrand, ...prev]);
            toast.success(`Brand "${brandForm.name}" created!`);
        }
        setIsBrandModalOpen(false);
    }

    function handleDeleteBrand(brand) {
        if (window.confirm(`Are you sure you want to delete brand "${brand.name}"?`)) {
            setBrands(prev => prev.filter(b => b.id !== brand.id));
            toast.success(`Brand "${brand.name}" removed`);
        }
    }

    function handleToggleBrandStatus(brandId) {
        setBrands(prev => prev.map(b => b.id === brandId ? { ...b, active: !b.active } : b));
        toast.success("Brand status updated");
    }

    /* Filtering */
    const filteredCategories = categories.filter(c => {
        const matchesQuery = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || (statusFilter === "active" ? c.active : !c.active);
        return matchesQuery && matchesStatus;
    });

    const filteredBrands = brands.filter(b => {
        const matchesQuery = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.specialty.toLowerCase().includes(searchQuery.toLowerCase()) || b.origin.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || (statusFilter === "active" ? b.active : !b.active);
        return matchesQuery && matchesStatus;
    });

    return (
        <div className="w-full min-h-full p-6" style={{ background: "#080C14" }}>

            {/* ── Top Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(79,142,247,0.12)", border: "1px solid rgba(79,142,247,0.2)" }}>
                        <HiCollection className="text-xl" style={{ color: "#4F8EF7" }} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Categories & Brands
                        </h1>
                        <p className="text-xs" style={{ color: "#7A8BA3" }}>
                            Manage product taxonomy, classification hierarchy, and brand manufacturers
                        </p>
                    </div>
                </div>

                {/* Tab Switcher & Primary Action */}
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex p-1 rounded-xl" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                        <button
                            onClick={() => { setActiveTab("categories"); setSearchQuery(""); }}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                            style={{
                                background: activeTab === "categories" ? "rgba(79,142,247,0.15)" : "transparent",
                                color: activeTab === "categories" ? "#4F8EF7" : "#7A8BA3",
                                border: activeTab === "categories" ? "1px solid rgba(79,142,247,0.3)" : "1px solid transparent",
                            }}
                        >
                            <HiCollection className="text-sm" />
                            Categories ({categories.length})
                        </button>
                        <button
                            onClick={() => { setActiveTab("brands"); setSearchQuery(""); }}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                            style={{
                                background: activeTab === "brands" ? "rgba(79,142,247,0.15)" : "transparent",
                                color: activeTab === "brands" ? "#4F8EF7" : "#7A8BA3",
                                border: activeTab === "brands" ? "1px solid rgba(79,142,247,0.3)" : "1px solid transparent",
                            }}
                        >
                            <HiTag className="text-sm" />
                            Brands ({brands.length})
                        </button>
                    </div>

                    <button
                        onClick={() => activeTab === "categories" ? handleOpenCatModal() : handleOpenBrandModal()}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-lg"
                        style={{
                            background: "linear-gradient(135deg, #4F8EF7, #2563EB)",
                            boxShadow: "0 4px 15px rgba(79,142,247,0.3)",
                        }}
                    >
                        <HiPlus className="text-base" />
                        Add {activeTab === "categories" ? "Category" : "Brand"}
                    </button>
                </div>
            </div>

            {/* ── Summary Stats ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-2xl" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7A8BA3" }}>Total Categories</p>
                    <p className="text-2xl font-black mt-1" style={{ color: "#4F8EF7", fontFamily: "'Outfit', sans-serif" }}>
                        {categories.length}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "#10B981" }}>
                        {categories.filter(c => c.active).length} Active in store
                    </p>
                </div>
                <div className="p-4 rounded-2xl" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7A8BA3" }}>Total Brands</p>
                    <p className="text-2xl font-black mt-1" style={{ color: "#9D6FFF", fontFamily: "'Outfit', sans-serif" }}>
                        {brands.length}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "#10B981" }}>
                        {brands.filter(b => b.active).length} Active partners
                    </p>
                </div>
                <div className="p-4 rounded-2xl" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7A8BA3" }}>Catalog Products</p>
                    <p className="text-2xl font-black mt-1" style={{ color: "#10B981", fontFamily: "'Outfit', sans-serif" }}>
                        {products.length}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "#7A8BA3" }}>
                        Synced from active stock
                    </p>
                </div>
                <div className="p-4 rounded-2xl" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7A8BA3" }}>Taxonomy Coverage</p>
                    <p className="text-2xl font-black mt-1" style={{ color: "#F59E0B", fontFamily: "'Outfit', sans-serif" }}>
                        100%
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "#7A8BA3" }}>
                        Fully categorized
                    </p>
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
                        placeholder={`Search ${activeTab === "categories" ? "categories by name or description" : "brands by name, origin, or specialty"}...`}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none transition-all"
                        style={{
                            background: "#080C14",
                            color: "#E8EDF5",
                            border: "1px solid #1E2D45",
                        }}
                        onFocus={e => e.target.style.borderColor = "#4F8EF7"}
                        onBlur={e => e.target.style.borderColor = "#1E2D45"}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>Status:</span>
                    {["all", "active", "inactive"].map(st => (
                        <button
                            key={st}
                            onClick={() => setStatusFilter(st)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                            style={{
                                background: statusFilter === st ? "rgba(79,142,247,0.15)" : "#080C14",
                                color: statusFilter === st ? "#4F8EF7" : "#7A8BA3",
                                border: statusFilter === st ? "1px solid rgba(79,142,247,0.3)" : "1px solid #1E2D45",
                            }}
                        >
                            {st}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Tab Content: CATEGORIES ── */}
            {activeTab === "categories" && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredCategories.map(cat => {
                        const count = getProductCountForCategory(cat.name);
                        return (
                            <div
                                key={cat.id}
                                className="flex flex-col justify-between p-5 rounded-2xl transition-all duration-200"
                                style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "#4F8EF7"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1E2D45"; e.currentTarget.style.transform = "translateY(0)"; }}
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                                                style={{ background: "#080C14", border: "1px solid #1E2D45" }}>
                                                {cat.icon || "📁"}
                                            </div>
                                            <div>
                                                <h3 className="text-base font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                                    {cat.name}
                                                </h3>
                                                <span className="text-[11px] font-mono px-2 py-0.5 rounded"
                                                    style={{ background: "rgba(79,142,247,0.08)", color: "#4F8EF7" }}>
                                                    /{cat.slug}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Status badge */}
                                        <button
                                            onClick={() => handleToggleCategoryStatus(cat.id)}
                                            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all"
                                            style={{
                                                background: cat.active ? "rgba(16,185,129,0.12)" : "rgba(240,78,55,0.12)",
                                                color: cat.active ? "#10B981" : "#F04E37",
                                                border: `1px solid ${cat.active ? "rgba(16,185,129,0.3)" : "rgba(240,78,55,0.3)"}`,
                                            }}
                                            title="Click to toggle status"
                                        >
                                            {cat.active ? "Active" : "Inactive"}
                                        </button>
                                    </div>

                                    <p className="text-xs mb-4 line-clamp-2" style={{ color: "#7A8BA3", minHeight: "32px" }}>
                                        {cat.description || "No description provided."}
                                    </p>
                                </div>

                                {/* Card Footer: counts + actions */}
                                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "#1E2D45" }}>
                                    <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#7A8BA3" }}>
                                        <HiCube className="text-sm" style={{ color: "#4F8EF7" }} />
                                        <span>{count} product{count === 1 ? "" : "s"}</span>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() => handleOpenCatModal(cat)}
                                            className="p-2 rounded-lg text-xs font-medium transition-colors"
                                            style={{ color: "#7A8BA3", background: "#151D2E" }}
                                            onMouseEnter={e => { e.currentTarget.style.color = "#4F8EF7"; }}
                                            onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; }}
                                            title="Edit Category"
                                        >
                                            <HiPencil className="text-sm" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCategory(cat)}
                                            className="p-2 rounded-lg text-xs font-medium transition-colors"
                                            style={{ color: "#7A8BA3", background: "#151D2E" }}
                                            onMouseEnter={e => { e.currentTarget.style.color = "#F04E37"; }}
                                            onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; }}
                                            title="Delete Category"
                                        >
                                            <HiTrash className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Tab Content: BRANDS ── */}
            {activeTab === "brands" && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {filteredBrands.map(brand => {
                        const count = getProductCountForBrand(brand.name);
                        return (
                            <div
                                key={brand.id}
                                className="flex flex-col justify-between p-5 rounded-2xl transition-all duration-200"
                                style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "#9D6FFF"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1E2D45"; e.currentTarget.style.transform = "translateY(0)"; }}
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                                            style={{ background: "rgba(157,111,255,0.12)", color: "#9D6FFF", border: "1px solid rgba(157,111,255,0.25)" }}>
                                            {brand.name.substring(0, 2).toUpperCase()}
                                        </div>

                                        <button
                                            onClick={() => handleToggleBrandStatus(brand.id)}
                                            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all"
                                            style={{
                                                background: brand.active ? "rgba(16,185,129,0.12)" : "rgba(240,78,55,0.12)",
                                                color: brand.active ? "#10B981" : "#F04E37",
                                                border: `1px solid ${brand.active ? "rgba(16,185,129,0.3)" : "rgba(240,78,55,0.3)"}`,
                                            }}
                                            title="Click to toggle status"
                                        >
                                            {brand.active ? "Active" : "Inactive"}
                                        </button>
                                    </div>

                                    <h3 className="text-base font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                        {brand.name}
                                    </h3>
                                    <p className="text-xs mt-0.5" style={{ color: "#4F8EF7" }}>
                                        {brand.origin || "Global"}
                                    </p>
                                    <p className="text-xs mt-2 line-clamp-2" style={{ color: "#7A8BA3", minHeight: "32px" }}>
                                        {brand.specialty || "Manufacturer of computer hardware"}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-3 mt-4 border-t" style={{ borderColor: "#1E2D45" }}>
                                    <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#7A8BA3" }}>
                                        <HiCube className="text-sm" style={{ color: "#9D6FFF" }} />
                                        <span>{count} product{count === 1 ? "" : "s"}</span>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        {brand.website && (
                                            <a
                                                href={brand.website}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2 rounded-lg text-xs font-medium transition-colors"
                                                style={{ color: "#7A8BA3", background: "#151D2E" }}
                                                onMouseEnter={e => { e.currentTarget.style.color = "#4F8EF7"; }}
                                                onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; }}
                                                title="Visit Website"
                                            >
                                                <HiExternalLink className="text-sm" />
                                            </a>
                                        )}
                                        <button
                                            onClick={() => handleOpenBrandModal(brand)}
                                            className="p-2 rounded-lg text-xs font-medium transition-colors"
                                            style={{ color: "#7A8BA3", background: "#151D2E" }}
                                            onMouseEnter={e => { e.currentTarget.style.color = "#9D6FFF"; }}
                                            onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; }}
                                            title="Edit Brand"
                                        >
                                            <HiPencil className="text-sm" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBrand(brand)}
                                            className="p-2 rounded-lg text-xs font-medium transition-colors"
                                            style={{ color: "#7A8BA3", background: "#151D2E" }}
                                            onMouseEnter={e => { e.currentTarget.style.color = "#F04E37"; }}
                                            onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; }}
                                            title="Delete Brand"
                                        >
                                            <HiTrash className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Empty State ── */}
            {((activeTab === "categories" && filteredCategories.length === 0) || (activeTab === "brands" && filteredBrands.length === 0)) && (
                <div className="flex flex-col items-center justify-center p-12 rounded-2xl text-center"
                    style={{ background: "#0F1623", border: "1px dashed #1E2D45" }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{ background: "rgba(79,142,247,0.08)", color: "#4F8EF7" }}>
                        <HiSearch className="text-2xl" />
                    </div>
                    <p className="text-base font-bold" style={{ color: "#E8EDF5" }}>
                        No {activeTab} match your criteria
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#7A8BA3" }}>
                        Try searching for a different keyword or reset the status filter.
                    </p>
                </div>
            )}

            {/* ══════════════════════════════════════
                MODAL: Add / Edit Category
            ══════════════════════════════════════ */}
            {isCatModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl p-6"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)" }}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                {editingCategory ? "Edit Category" : "Add New Category"}
                            </h3>
                            <button
                                onClick={() => setIsCatModalOpen(false)}
                                className="p-1 rounded-lg transition-colors"
                                style={{ color: "#7A8BA3" }}
                            >
                                <HiX className="text-xl" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveCategory} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                    Category Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={catForm.name}
                                    onChange={e => setCatForm({ ...catForm, name: e.target.value })}
                                    placeholder="e.g. Gaming Laptops"
                                    className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                    style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        URL Slug
                                    </label>
                                    <input
                                        type="text"
                                        value={catForm.slug}
                                        onChange={e => setCatForm({ ...catForm, slug: e.target.value })}
                                        placeholder="gaming-laptops"
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Icon / Emoji
                                    </label>
                                    <input
                                        type="text"
                                        value={catForm.icon}
                                        onChange={e => setCatForm({ ...catForm, icon: e.target.value })}
                                        placeholder="💻"
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                    Description
                                </label>
                                <textarea
                                    rows="3"
                                    value={catForm.description}
                                    onChange={e => setCatForm({ ...catForm, description: e.target.value })}
                                    placeholder="Brief summary of items in this category"
                                    className="w-full px-3 py-2 rounded-xl text-xs outline-none resize-none"
                                    style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="cat-active"
                                    checked={catForm.active}
                                    onChange={e => setCatForm({ ...catForm, active: e.target.checked })}
                                    className="rounded accent-blue-500 w-4 h-4 cursor-pointer"
                                />
                                <label htmlFor="cat-active" className="text-xs font-medium cursor-pointer" style={{ color: "#E8EDF5" }}>
                                    Visible and active in storefront
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t" style={{ borderColor: "#1E2D45" }}>
                                <button
                                    type="button"
                                    onClick={() => setIsCatModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-bold"
                                    style={{ color: "#7A8BA3", background: "#151D2E" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-lg"
                                    style={{ background: "linear-gradient(135deg, #4F8EF7, #2563EB)" }}
                                >
                                    {editingCategory ? "Save Changes" : "Create Category"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════
                MODAL: Add / Edit Brand
            ══════════════════════════════════════ */}
            {isBrandModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl p-6"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)" }}>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                {editingBrand ? "Edit Brand" : "Add New Brand"}
                            </h3>
                            <button
                                onClick={() => setIsBrandModalOpen(false)}
                                className="p-1 rounded-lg transition-colors"
                                style={{ color: "#7A8BA3" }}
                            >
                                <HiX className="text-xl" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveBrand} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                    Brand Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={brandForm.name}
                                    onChange={e => setBrandForm({ ...brandForm, name: e.target.value })}
                                    placeholder="e.g. ASUS ROG"
                                    className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                    style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Origin Country
                                    </label>
                                    <input
                                        type="text"
                                        value={brandForm.origin}
                                        onChange={e => setBrandForm({ ...brandForm, origin: e.target.value })}
                                        placeholder="Taiwan / USA"
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Website Link
                                    </label>
                                    <input
                                        type="url"
                                        value={brandForm.website}
                                        onChange={e => setBrandForm({ ...brandForm, website: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                    Specialty / Tagline
                                </label>
                                <input
                                    type="text"
                                    value={brandForm.specialty}
                                    onChange={e => setBrandForm({ ...brandForm, specialty: e.target.value })}
                                    placeholder="e.g. Gaming Laptops & Motherboards"
                                    className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                    style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="brand-active"
                                    checked={brandForm.active}
                                    onChange={e => setBrandForm({ ...brandForm, active: e.target.checked })}
                                    className="rounded accent-purple-500 w-4 h-4 cursor-pointer"
                                />
                                <label htmlFor="brand-active" className="text-xs font-medium cursor-pointer" style={{ color: "#E8EDF5" }}>
                                    Mark as active manufacturer partner
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t" style={{ borderColor: "#1E2D45" }}>
                                <button
                                    type="button"
                                    onClick={() => setIsBrandModalOpen(false)}
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
                                    {editingBrand ? "Save Changes" : "Create Brand"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
