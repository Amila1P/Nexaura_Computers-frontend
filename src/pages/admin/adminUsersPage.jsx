import { HiUsers, HiLockClosed, HiCheckCircle, HiXCircle, HiMail } from "react-icons/hi";

/**
 * Admin Users Page
 *
 * The current backend has no "list all users" endpoint (only /users/me for the
 * logged-in user). This page is designed and ready — as soon as a GET /users
 * admin endpoint is added to the backend, replace the placeholder UI below
 * with a real fetch (same pattern as adminOrdersPage / adminProductPage).
 */
export default function AdminUsersPage() {
    return (
        <div className="w-full min-h-full p-6" style={{ background: "#080C14" }}>

            {/* ── Page header ── */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(79,142,247,0.12)", border: "1px solid rgba(79,142,247,0.2)" }}>
                    <HiUsers className="text-lg" style={{ color: "#4F8EF7" }} />
                </div>
                <div>
                    <h1 className="text-2xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                        Users
                    </h1>
                    <p className="text-xs" style={{ color: "#7A8BA3" }}>Manage customer accounts and permissions</p>
                </div>
            </div>

            {/* ── Feature preview cards (shows the planned columns/actions) ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                    { icon: HiUsers,       label: "Total Users",    value: "—", color: "#4F8EF7" },
                    { icon: HiCheckCircle, label: "Verified",        value: "—", color: "#10B981" },
                    { icon: HiLockClosed,  label: "Blocked",         value: "—", color: "#F04E37" },
                ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="flex items-center gap-4 p-5 rounded-2xl"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: `${color}1A`, border: `1px solid ${color}33` }}>
                            <Icon className="text-xl" style={{ color }} />
                        </div>
                        <div>
                            <p className="text-2xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>{value}</p>
                            <p className="text-xs" style={{ color: "#7A8BA3" }}>{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Table preview skeleton (shows the planned table structure) ── */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>

                {/* Table header */}
                <div style={{ background: "#151D2E", borderBottom: "1px solid #1E2D45" }}>
                    <div className="flex gap-0">
                        {["Avatar", "Name", "Email", "Role", "Email Verified", "Status", "Actions"].map(h => (
                            <div key={h} className="flex-1 px-4 py-3.5 text-xs font-bold uppercase tracking-wider"
                                style={{ color: "#7A8BA3" }}>
                                {h}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Coming-soon callout */}
                <div className="flex flex-col items-center justify-center py-20 gap-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background: "rgba(79,142,247,0.08)", border: "1px solid rgba(79,142,247,0.2)" }}>
                        <HiUsers className="text-3xl" style={{ color: "#4F8EF7" }} />
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold mb-1" style={{ color: "#E8EDF5" }}>User List Coming Soon</p>
                        <p className="text-sm max-w-sm" style={{ color: "#7A8BA3" }}>
                            A backend endpoint <code className="px-1.5 py-0.5 rounded text-xs"
                                style={{ background: "rgba(79,142,247,0.1)", color: "#4F8EF7" }}>
                                GET /api/users
                            </code> needs to be added to fetch all users.
                            The UI is fully designed and ready to connect.
                        </p>
                    </div>

                    {/* Feature preview chips */}
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {[
                            { icon: HiMail,         label: "Email verification status" },
                            { icon: HiLockClosed,   label: "Block / unblock accounts" },
                            { icon: HiCheckCircle,  label: "Admin role toggle" },
                        ].map(({ icon: Icon, label }) => (
                            <span key={label}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                                style={{ background: "rgba(79,142,247,0.06)", color: "#7A8BA3", border: "1px solid #1E2D45" }}>
                                <Icon className="text-sm" style={{ color: "#4F8EF7" }} />
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
