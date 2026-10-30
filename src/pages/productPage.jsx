import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/productCard";
import { HiSearch } from "react-icons/hi";

export default function ProductPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // Initialize search from URL ?q= param (set by the header search widget)
    const [search, setSearch] = useState(() => searchParams.get("q") || "");
    const [activeCategory, setActiveCategory] = useState("All");

    // Sync search input whenever the URL ?q= query param changes (e.g. searching from Header while already on /products)
    useEffect(() => {
        const urlQ = searchParams.get("q") || "";
        if (urlQ !== search) {
            setSearch(urlQ);
        }
    }, [searchParams]);

    // Keep the URL ?q= param in sync when typing in the search box
    useEffect(() => {
        const currentQ = searchParams.get("q") || "";
        if (search !== currentQ) {
            const nextParams = new URLSearchParams(searchParams);
            if (search.trim()) {
                nextParams.set("q", search);
            } else {
                nextParams.delete("q");
            }
            setSearchParams(nextParams, { replace: true });
        }
    }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/products")
            .then((response) => {
                setProducts(response.data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    /* Derive categories from fetched products */
    const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

    const filtered = products.filter(p => {
        const matchCat = activeCategory === "All" || p.category === activeCategory;
        const q = search.trim().toLowerCase();
        const matchSearch = !q ||
            p.name?.toLowerCase().includes(q) ||
            p.brand?.toLowerCase().includes(q) ||
            p.category?.toLowerCase().includes(q) ||
            p.model?.toLowerCase().includes(q);
        return matchCat && matchSearch;
    });

    /* Skeleton loader */
    if (isLoading) {
        return (
            <div className="w-full min-h-screen px-4 py-10" style={{ background: "#080C14" }}>
                <div className="max-w-7xl mx-auto">
                    <div className="skeleton h-10 w-48 mb-8 rounded-xl" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "#151D2E", border: "1px solid #1E2D45" }}>
                                <div className="skeleton" style={{ aspectRatio: "1/1" }} />
                                <div className="p-4 flex flex-col gap-2">
                                    <div className="skeleton h-4 rounded w-full" />
                                    <div className="skeleton h-4 rounded w-2/3" />
                                    <div className="skeleton h-5 rounded w-1/2 mt-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen" style={{ background: "#080C14" }}>
            {/* Page header */}
            <div style={{ background: "#0F1623", borderBottom: "1px solid #1E2D45" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    <h1 className="text-3xl font-black mb-1" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                        All Products
                    </h1>
                    <p className="text-sm" style={{ color: "#7A8BA3" }}>
                        {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Search + Filters row */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                        {/* Magnification icon with generous visual clearance */}
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
                            <HiSearch className="text-xl" style={{ color: "#7A8BA3" }} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products or brands…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="form-input"
                            style={{ paddingLeft: "3.25rem", paddingRight: search ? "2.5rem" : "1rem" }}
                            id="product-search"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#7A8BA3] hover:text-[#E8EDF5] transition-colors"
                                aria-label="Clear product search"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Category chips */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                                style={{
                                    background: activeCategory === cat ? "rgba(79,142,247,0.15)" : "rgba(30,45,69,0.5)",
                                    color: activeCategory === cat ? "#4F8EF7" : "#7A8BA3",
                                    border: `1px solid ${activeCategory === cat ? "#4F8EF7" : "rgba(30,45,69,0.8)"}`,
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product grid */}
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <span className="text-6xl">🔍</span>
                        <h2 className="text-xl font-bold" style={{ color: "#E8EDF5" }}>No products found</h2>
                        <p className="text-sm" style={{ color: "#7A8BA3" }}>Try adjusting your search or category filters.</p>
                        <button className="btn-secondary mt-2" onClick={() => { setSearch(""); setActiveCategory("All"); setSearchParams({}); }}>
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-28">
                        {filtered.map((item) => (
                            <ProductCard key={item.productId} product={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}