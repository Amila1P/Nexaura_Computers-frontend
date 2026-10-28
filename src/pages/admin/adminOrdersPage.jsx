import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { HiClipboardList, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import LoadingAnimation from "../../components/LoadingAnimation.jsx";
import OrderDetailsModal from "../../components/orderDetailsModal.jsx";
import getFormattedPrice from "../../utils/priceFormat.js";

/* ── Helper: colour-code order status badges ── */
function StatusBadge({ status }) {
    const map = {
        Pending     : { bg: "rgba(245,158,11,0.12)",  color: "#F59E0B", border: "rgba(245,158,11,0.3)"  },
        "In Progress": { bg: "rgba(79,142,247,0.12)", color: "#4F8EF7", border: "rgba(79,142,247,0.3)"  },
        Completed   : { bg: "rgba(16,185,129,0.12)",  color: "#10B981", border: "rgba(16,185,129,0.3)"  },
        Shipped     : { bg: "rgba(157,111,255,0.12)", color: "#9D6FFF", border: "rgba(157,111,255,0.3)" },
        Delivered   : { bg: "rgba(16,185,129,0.12)",  color: "#10B981", border: "rgba(16,185,129,0.3)"  },
        Cancelled   : { bg: "rgba(240,78,55,0.12)",   color: "#F04E37", border: "rgba(240,78,55,0.3)"   },
    };
    const s = map[status] ?? { bg: "rgba(122,139,163,0.12)", color: "#7A8BA3", border: "rgba(122,139,163,0.3)" };
    return (
        <span
            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold"
            style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
        >
            {status}
        </span>
    );
}

export default function AdminOrdersPage() {

    /* ══ LOGIC — unchanged ══ */
    const [orders,             setOrders]             = useState([]);
    const [pageSize,           setPageSize]           = useState(10);
    const [currentPage,        setCurrentPage]        = useState(1);
    const [totalPages,         setTotalPages]         = useState(1);
    const [totalOrders,        setTotalOrders]        = useState(0);
    const [isOrdersAreLoaded,  setIsOrdersAreLoaded]  = useState(false);

    useEffect(() => {
        if (!isOrdersAreLoaded) {
            const token = localStorage.getItem("token");
            axios.get(
                import.meta.env.VITE_API_URL + "/orders/" + pageSize + "/" + currentPage,
                { headers: { "Authorization": "Bearer " + token } }
            ).then(response => {
                console.log("API Response Data:", response.data);
                setOrders(Array.isArray(response.data.orders) ? response.data.orders : []);
                setTotalPages(response.data.totalPages);
                setTotalOrders(response.data.total || response.data.totalOrders || 0);
                setIsOrdersAreLoaded(true);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [isOrdersAreLoaded]);
    /* ══ end LOGIC ══ */

    return (
        <div className="w-full min-h-full p-6" style={{ background: "#080C14" }}>

            {/* ── Page header ── */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: "rgba(79,142,247,0.12)", border: "1px solid rgba(79,142,247,0.2)" }}>
                            <HiClipboardList className="text-lg" style={{ color: "#4F8EF7" }} />
                        </div>
                        <h1 className="text-2xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Orders
                        </h1>
                    </div>
                    <p className="text-sm pl-12" style={{ color: "#7A8BA3" }}>
                        {totalOrders} total order{totalOrders !== 1 ? "s" : ""} in the system
                    </p>
                </div>
            </div>

            {/* ── Content ── */}
            {isOrdersAreLoaded ? (
                <>
                    {/* Table card */}
                    <div className="rounded-2xl overflow-hidden"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr style={{ background: "#151D2E", borderBottom: "1px solid #1E2D45" }}>
                                        {["Order ID", "Customer", "Phone", "Date", "Total", "Status", "Actions"].map(h => (
                                            <th key={h}
                                                className="text-left px-4 py-3.5 text-xs font-bold uppercase tracking-wider"
                                                style={{ color: "#7A8BA3" }}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(orders) && orders.map((item, idx) => (
                                        <tr
                                            key={item.orderId}
                                            className="transition-colors duration-150"
                                            style={{
                                                borderBottom: "1px solid #1E2D45",
                                                background: idx % 2 === 0 ? "transparent" : "rgba(21,29,46,0.4)",
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = "rgba(79,142,247,0.05)"}
                                            onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? "transparent" : "rgba(21,29,46,0.4)"}
                                        >
                                            {/* Order ID */}
                                            <td className="px-4 py-3.5">
                                                <span className="text-xs font-mono font-semibold px-2 py-1 rounded-md"
                                                    style={{ background: "rgba(30,45,69,0.6)", color: "#4F8EF7" }}>
                                                    #{item.orderId}
                                                </span>
                                            </td>

                                            {/* Customer */}
                                            <td className="px-4 py-3.5">
                                                <p className="text-sm font-semibold" style={{ color: "#E8EDF5" }}>
                                                    {item.firstName} {item.lastName}
                                                </p>
                                                <p className="text-xs mt-0.5" style={{ color: "#7A8BA3" }}>
                                                    {item.email}
                                                </p>
                                            </td>

                                            {/* Phone */}
                                            <td className="px-4 py-3.5 text-sm" style={{ color: "#7A8BA3" }}>
                                                {item.phone}
                                            </td>

                                            {/* Date */}
                                            <td className="px-4 py-3.5 text-sm whitespace-nowrap" style={{ color: "#7A8BA3" }}>
                                                {new Date(item.date).toLocaleDateString("en-GB", {
                                                    day: "2-digit", month: "short", year: "numeric"
                                                })}
                                            </td>

                                            {/* Total */}
                                            <td className="px-4 py-3.5">
                                                <span className="text-sm font-bold" style={{ color: "#10B981" }}>
                                                    {getFormattedPrice(item.total)}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-3.5">
                                                <StatusBadge status={item.status} />
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3.5">
                                                <OrderDetailsModal order={item} refresh={() => setIsOrdersAreLoaded(false)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty state */}
                        {orders.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 gap-3">
                                <span className="text-5xl">📋</span>
                                <p className="font-semibold" style={{ color: "#E8EDF5" }}>No orders found</p>
                                <p className="text-sm" style={{ color: "#7A8BA3" }}>Orders will appear here once customers start purchasing.</p>
                            </div>
                        )}
                    </div>

                    {/* ── Pagination bar ── */}
                    <div className="flex items-center justify-between mt-4 flex-wrap gap-3">

                        {/* Page info */}
                        <span className="text-sm" style={{ color: "#7A8BA3" }}>
                            Page <span style={{ color: "#E8EDF5", fontWeight: 600 }}>{currentPage}</span> of{" "}
                            <span style={{ color: "#E8EDF5", fontWeight: 600 }}>{totalPages}</span>
                        </span>

                        <div className="flex items-center gap-2">
                            {/* Rows per page */}
                            <select
                                id="admin-orders-page-size"
                                value={pageSize}
                                onChange={e => { setPageSize(parseInt(e.target.value)); setIsOrdersAreLoaded(false); }}
                                className="text-sm px-3 py-1.5 rounded-lg outline-none"
                                style={{
                                    background: "#151D2E", color: "#E8EDF5",
                                    border: "1px solid #1E2D45", cursor: "pointer",
                                }}
                            >
                                {[2, 5, 10, 20, 50].map(v => (
                                    <option key={v} value={v}>{v} / page</option>
                                ))}
                            </select>

                            {/* Prev */}
                            <button
                                id="admin-orders-prev"
                                onClick={() => { if (currentPage > 1) { setCurrentPage(currentPage - 1); setIsOrdersAreLoaded(false); } }}
                                disabled={currentPage <= 1}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                                style={{
                                    background: currentPage <= 1 ? "rgba(30,45,69,0.3)" : "#151D2E",
                                    color: currentPage <= 1 ? "#3A4A60" : "#E8EDF5",
                                    border: "1px solid #1E2D45",
                                    cursor: currentPage <= 1 ? "not-allowed" : "pointer",
                                }}
                            >
                                <HiChevronLeft /> Prev
                            </button>

                            {/* Next */}
                            <button
                                id="admin-orders-next"
                                onClick={() => { setCurrentPage(currentPage + 1); setIsOrdersAreLoaded(false); }}
                                disabled={currentPage >= totalPages}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                                style={{
                                    background: currentPage >= totalPages ? "rgba(30,45,69,0.3)" : "#151D2E",
                                    color: currentPage >= totalPages ? "#3A4A60" : "#E8EDF5",
                                    border: "1px solid #1E2D45",
                                    cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
                                }}
                            >
                                Next <HiChevronRight />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-64">
                    <LoadingAnimation />
                </div>
            )}
        </div>
    );
}
