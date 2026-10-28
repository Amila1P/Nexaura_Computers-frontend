import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api.js";
import getFormattedPrice from "../../utils/priceFormat.js";
import {
    HiChartBar, HiClipboardList, HiCube, HiCurrencyRupee,
    HiTrendingUp, HiArrowRight, HiRefresh,
} from "react-icons/hi";
import LoadingAnimation from "../../components/loadingAnimation.jsx";

/* ── Accent colours for category bars ── */
const CAT_COLORS = ["#4F8EF7", "#9D6FFF", "#10B981", "#F59E0B", "#F04E37", "#06B6D4"];

export default function AdminDashboardPage() {

    const [stats,        setStats]        = useState({ revenue: 0, orders: 0, products: 0, avgOrder: 0 });
    const [recentOrders, setRecentOrders] = useState([]);
    const [salesData,    setSalesData]    = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [statusData,   setStatusData]   = useState([]);
    const [isLoading,    setIsLoading]    = useState(true);
    const [lastUpdated,  setLastUpdated]  = useState(null);

    async function loadDashboard() {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");

            /* ── Fetch products (public endpoint) ── */
            const prodRes  = await api.get("/products");
            const products = Array.isArray(prodRes.data) ? prodRes.data : [];

            /* ── Fetch recent orders (admin endpoint) ── */
            const ordRes = await api.get("/orders/100/1", {
                headers: { Authorization: "Bearer " + token },
            });
            const orders      = Array.isArray(ordRes.data.orders) ? ordRes.data.orders : [];
            const totalOrders = ordRes.data.total || ordRes.data.totalOrders || orders.length;

            /* ── Aggregate stats ── */
            const revenue  = orders.reduce((s, o) => s + (o.total || 0), 0);
            const avgOrder = orders.length > 0 ? revenue / orders.length : 0;
            setStats({ revenue, orders: totalOrders, products: products.length, avgOrder });

            /* ── Recent 5 orders ── */
            setRecentOrders(orders.slice(0, 5));

            /* ── Last 7-day sales velocity ── */
            const last7 = [];
            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const dayStr = d.toISOString().split("T")[0];
                const dayOrders = orders.filter(o => {
                    const od = new Date(o.date).toISOString().split("T")[0];
                    return od === dayStr;
                });
                last7.push({
                    day    : d.toLocaleDateString("en-GB", { weekday: "short" }),
                    date   : dayStr,
                    count  : dayOrders.length,
                    revenue: dayOrders.reduce((s, o) => s + (o.total || 0), 0),
                });
            }
            setSalesData(last7);

            /* ── Category breakdown from products ── */
            const catMap = {};
            products.forEach(p => { if (p.category) catMap[p.category] = (catMap[p.category] || 0) + 1; });
            setCategoryData(
                Object.entries(catMap)
                    .map(([name, count]) => ({ name, count }))
                    .sort((a, b) => b.count - a.count)
            );

            /* ── Order status breakdown ── */
            const statusMap = {};
            orders.forEach(o => { if (o.status) statusMap[o.status] = (statusMap[o.status] || 0) + 1; });
            setStatusData(Object.entries(statusMap).map(([name, count]) => ({ name, count })));

            setLastUpdated(new Date());
        } catch (err) {
            console.error("Dashboard load error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => { loadDashboard(); }, []);

    /* ── Status badge colours ── */
    const STATUS_COLOR = {
        Pending     : "#F59E0B",
        "In Progress": "#4F8EF7",
        Completed   : "#10B981",
        Shipped     : "#9D6FFF",
        Delivered   : "#10B981",
        Cancelled   : "#F04E37",
    };

    /* ── Stat card ── */
    function StatCard({ icon: Icon, label, value, sub, color, prefix }) {
        return (
            <div className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200"
                style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.3)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1E2D45"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}1A`, border: `1px solid ${color}33` }}>
                    <Icon className="text-2xl" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#7A8BA3" }}>{label}</p>
                    <p className="text-2xl font-black truncate" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                        {prefix && <span className="text-base mr-0.5" style={{ color: "#7A8BA3" }}>{prefix}</span>}
                        {value}
                    </p>
                    {sub && <p className="text-xs mt-0.5" style={{ color: "#7A8BA3" }}>{sub}</p>}
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="w-full min-h-full flex items-center justify-center p-6" style={{ background: "#080C14" }}>
                <LoadingAnimation />
            </div>
        );
    }

    const maxBar = Math.max(...salesData.map(d => d.count), 1);

    return (
        <div className="w-full min-h-full p-6" style={{ background: "#080C14" }}>

            {/* ── Page header ── */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(79,142,247,0.12)", border: "1px solid rgba(79,142,247,0.2)" }}>
                        <HiChartBar className="text-lg" style={{ color: "#4F8EF7" }} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Dashboard
                        </h1>
                        {lastUpdated && (
                            <p className="text-xs" style={{ color: "#7A8BA3" }}>
                                Last updated: {lastUpdated.toLocaleTimeString()}
                            </p>
                        )}
                    </div>
                </div>
                <button
                    id="dashboard-refresh"
                    onClick={loadDashboard}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{ background: "#151D2E", color: "#7A8BA3", border: "1px solid #1E2D45" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#E8EDF5"; e.currentTarget.style.borderColor = "#4F8EF7"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; e.currentTarget.style.borderColor = "#1E2D45"; }}
                >
                    <HiRefresh className="text-base" /> Refresh
                </button>
            </div>

            {/* ── Stat cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                    icon={HiCurrencyRupee} label="Total Revenue" color="#10B981"
                    value={`LKR ${(stats.revenue / 1000).toFixed(0)}K`}
                    sub={`From ${stats.orders} orders`}
                />
                <StatCard
                    icon={HiClipboardList} label="Total Orders" color="#4F8EF7"
                    value={stats.orders.toLocaleString()}
                    sub="All time orders"
                />
                <StatCard
                    icon={HiCube} label="Products" color="#9D6FFF"
                    value={stats.products.toLocaleString()}
                    sub="In catalogue"
                />
                <StatCard
                    icon={HiTrendingUp} label="Avg Order Value" color="#F59E0B"
                    value={`LKR ${Math.round(stats.avgOrder / 1000)}K`}
                    sub="Per transaction"
                />
            </div>

            {/* ── Middle row: Sales Velocity + Status Breakdown ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

                {/* Sales velocity bar chart */}
                <div className="lg:col-span-2 rounded-2xl p-5"
                    style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-base font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                                Sales Velocity
                            </h2>
                            <p className="text-xs mt-0.5" style={{ color: "#7A8BA3" }}>Orders per day — last 7 days</p>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-lg font-semibold"
                            style={{ background: "rgba(79,142,247,0.1)", color: "#4F8EF7", border: "1px solid rgba(79,142,247,0.2)" }}>
                            Live Data
                        </span>
                    </div>

                    {/* Bar chart */}
                    <div className="flex items-end gap-2 h-36">
                        {salesData.map((d, i) => {
                            const pct = maxBar > 0 ? (d.count / maxBar) * 100 : 0;
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full mb-2 px-2.5 py-1.5 rounded-lg text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap"
                                        style={{ background: "#1C2740", border: "1px solid #1E2D45", boxShadow: "0 8px 20px rgba(0,0,0,0.4)" }}>
                                        <p className="text-xs font-bold" style={{ color: "#E8EDF5" }}>{d.count} orders</p>
                                        {d.revenue > 0 && <p className="text-[10px]" style={{ color: "#10B981" }}>LKR {d.revenue.toLocaleString()}</p>}
                                    </div>
                                    {/* Bar */}
                                    <div className="w-full rounded-t-lg transition-all duration-300 group-hover:opacity-80"
                                        style={{
                                            height   : `${Math.max(pct, 4)}%`,
                                            minHeight: "6px",
                                            background: d.count > 0
                                                ? "linear-gradient(180deg,#4F8EF7,rgba(79,142,247,0.4))"
                                                : "rgba(30,45,69,0.5)",
                                        }} />
                                    {/* Label */}
                                    <span className="text-[10px] font-semibold" style={{ color: "#7A8BA3" }}>{d.day}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Order status doughnut-style breakdown */}
                <div className="rounded-2xl p-5" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                    <h2 className="text-base font-bold mb-1" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                        Order Status
                    </h2>
                    <p className="text-xs mb-4" style={{ color: "#7A8BA3" }}>Breakdown by current status</p>
                    <div className="flex flex-col gap-3">
                        {statusData.length > 0 ? statusData.map(({ name, count }) => {
                            const color = STATUS_COLOR[name] || "#7A8BA3";
                            const total = statusData.reduce((s, d) => s + d.count, 0);
                            const pct   = total > 0 ? Math.round((count / total) * 100) : 0;
                            return (
                                <div key={name}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span style={{ color: "#E8EDF5" }}>{name}</span>
                                        <span style={{ color }}>{count} ({pct}%)</span>
                                    </div>
                                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1E2D45" }}>
                                        <div className="h-full rounded-full transition-all duration-500"
                                            style={{ width: `${pct}%`, background: color }} />
                                    </div>
                                </div>
                            );
                        }) : (
                            <p className="text-sm text-center py-6" style={{ color: "#7A8BA3" }}>No order data yet</p>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Bottom row: Category breakdown + Recent orders ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Category breakdown */}
                <div className="rounded-2xl p-5" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Categories
                        </h2>
                        <Link to="/admin/categories"
                            className="flex items-center gap-1 text-xs font-medium transition-colors"
                            style={{ color: "#4F8EF7" }}>
                            Manage <HiArrowRight />
                        </Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        {categoryData.length > 0 ? categoryData.slice(0, 6).map(({ name, count }, i) => {
                            const maxCat = categoryData[0].count;
                            const color  = CAT_COLORS[i % CAT_COLORS.length];
                            const pct    = Math.round((count / maxCat) * 100);
                            return (
                                <div key={name}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="font-medium" style={{ color: "#E8EDF5" }}>{name}</span>
                                        <span style={{ color }}>{count} products</span>
                                    </div>
                                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1E2D45" }}>
                                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                                    </div>
                                </div>
                            );
                        }) : (
                            <p className="text-sm text-center py-6" style={{ color: "#7A8BA3" }}>No products yet</p>
                        )}
                    </div>
                </div>

                {/* Recent orders */}
                <div className="lg:col-span-2 rounded-2xl overflow-hidden"
                    style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                    <div className="flex items-center justify-between px-5 py-4"
                        style={{ borderBottom: "1px solid #1E2D45" }}>
                        <h2 className="text-base font-bold" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Recent Orders
                        </h2>
                        <Link to="/admin/orders"
                            className="flex items-center gap-1 text-xs font-medium"
                            style={{ color: "#4F8EF7" }}>
                            View All <HiArrowRight />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr style={{ borderBottom: "1px solid #1E2D45", background: "#151D2E" }}>
                                    {["Order", "Customer", "Total", "Status"].map(h => (
                                        <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider"
                                            style={{ color: "#7A8BA3" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.length > 0 ? recentOrders.map((o, idx) => (
                                    <tr key={o.orderId}
                                        style={{ borderBottom: "1px solid #1E2D45", background: idx % 2 === 0 ? "transparent" : "rgba(21,29,46,0.3)" }}
                                        onMouseEnter={e => e.currentTarget.style.background = "rgba(79,142,247,0.04)"}
                                        onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? "transparent" : "rgba(21,29,46,0.3)"}
                                    >
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md"
                                                style={{ background: "rgba(30,45,69,0.6)", color: "#4F8EF7" }}>
                                                #{o.orderId?.slice(-6)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="text-sm font-medium" style={{ color: "#E8EDF5" }}>
                                                {o.firstName} {o.lastName}
                                            </p>
                                            <p className="text-xs" style={{ color: "#7A8BA3" }}>{o.email}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-bold" style={{ color: "#10B981" }}>
                                            {getFormattedPrice(o.total)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs font-bold px-2.5 py-1 rounded-lg"
                                                style={{
                                                    background: `${STATUS_COLOR[o.status] || "#7A8BA3"}1A`,
                                                    color     : STATUS_COLOR[o.status] || "#7A8BA3",
                                                    border    : `1px solid ${STATUS_COLOR[o.status] || "#7A8BA3"}33`,
                                                }}>
                                                {o.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-10 text-sm" style={{ color: "#7A8BA3" }}>
                                            No orders found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
