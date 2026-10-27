import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/productCard";
import { HiSearch } from "react-icons/hi";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

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
        const matchSearch = !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.brand?.toLowerCase().includes(search.toLowerCase());
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
                        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-lg" style={{ color: "#7A8BA3" }} />
                        <input
                            type="text"
                            placeholder="Search products or brands…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="form-input pl-10"
                            id="product-search"
                        />
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
                        <button className="btn-secondary mt-2" onClick={() => { setSearch(""); setActiveCategory("All"); }}>
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