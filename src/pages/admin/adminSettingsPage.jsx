import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
    HiCog, HiTruck, HiCreditCard, HiCheck, HiRefresh,
    HiShieldCheck, HiCurrencyRupee, HiOfficeBuilding, HiMail,
    HiPhone, HiGlobe, HiInformationCircle,
} from "react-icons/hi";

const DEFAULT_SETTINGS = {
    /* Store Profile */
    storeName: "NexAura Computers",
    tagline: "Unleash Ultimate Computing Performance",
    supportEmail: "support@nexauracomputers.com",
    contactPhone: "+94 11 234 5678",
    storeAddress: "No. 42, Galle Road, Colombo 03, Sri Lanka",
    currency: "LKR",
    logoUrl: "/NexAura Logo.png",

    /* Shipping Rates */
    standardShippingFee: 500,
    expressShippingFee: 1500,
    freeShippingThreshold: 75000,
    estimatedStandardDays: "2 - 4 business days",
    estimatedExpressDays: "24 hours (Same-Day Colombo)",

    /* Payment Gateways */
    codEnabled: true,
    codFee: 0,

    bankTransferEnabled: true,
    bankName: "Commercial Bank of Ceylon",
    accountName: "NexAura Computers (Pvt) Ltd",
    accountNumber: "800192847101",
    branchName: "Kollupitiya Branch",

    onlineCardEnabled: true,
    paymentMode: "sandbox", // 'sandbox' | 'live'
    merchantId: "MERCHANT_NEXA_7894",
    publishableKey: "pk_test_51NexaSampleKeySecureToken9901",
};

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem("nexa_store_settings");
        return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    });

    const [isSaving, setIsSaving] = useState(false);
    const [activeSection, setActiveSection] = useState("general"); // 'general' | 'shipping' | 'payments'

    function handleFieldChange(field, value) {
        setSettings(prev => ({
            ...prev,
            [field]: value,
        }));
    }

    function handleSave(e) {
        if (e) e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            localStorage.setItem("nexa_store_settings", JSON.stringify(settings));
            setIsSaving(false);
            toast.success("Store settings saved successfully!");
        }, 400);
    }

    function handleResetDefaults() {
        if (window.confirm("Are you sure you want to reset all store settings back to default values?")) {
            setSettings(DEFAULT_SETTINGS);
            localStorage.setItem("nexa_store_settings", JSON.stringify(DEFAULT_SETTINGS));
            toast.success("Settings restored to factory defaults");
        }
    }

    return (
        <div className="w-full min-h-full p-6" style={{ background: "#080C14" }}>

            {/* ── Page Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(79,142,247,0.12)", border: "1px solid rgba(79,142,247,0.2)" }}>
                        <HiCog className="text-xl" style={{ color: "#4F8EF7" }} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                            Store Settings
                        </h1>
                        <p className="text-xs" style={{ color: "#7A8BA3" }}>
                            Configure store identity, regional shipping rates, and payment gateway rules
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleResetDefaults}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                        style={{ background: "#151D2E", color: "#7A8BA3", border: "1px solid #1E2D45" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "#E8EDF5"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "#7A8BA3"; }}
                    >
                        <HiRefresh className="text-sm" /> Reset Defaults
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-all"
                        style={{
                            background: "linear-gradient(135deg, #4F8EF7, #2563EB)",
                            boxShadow: "0 4px 15px rgba(79,142,247,0.3)",
                            opacity: isSaving ? 0.7 : 1,
                        }}
                    >
                        <HiCheck className="text-base" />
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            {/* ── Section Navigation Tabs ── */}
            <div className="flex gap-2 p-1.5 rounded-2xl mb-8 max-w-xl"
                style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                {[
                    { id: "general",  label: "Store Identity", icon: HiOfficeBuilding },
                    { id: "shipping", label: "Shipping & Delivery", icon: HiTruck },
                    { id: "payments", label: "Payment Gateways", icon: HiCreditCard },
                ].map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveSection(id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all"
                        style={{
                            background: activeSection === id ? "rgba(79,142,247,0.15)" : "transparent",
                            color: activeSection === id ? "#4F8EF7" : "#7A8BA3",
                            border: activeSection === id ? "1px solid rgba(79,142,247,0.3)" : "1px solid transparent",
                        }}
                    >
                        <Icon className="text-sm" />
                        <span>{label}</span>
                    </button>
                ))}
            </div>

            <form onSubmit={handleSave} className="space-y-6">

                {/* ══════════════════════════════════════
                    SECTION 1: Store Identity
                ══════════════════════════════════════ */}
                {activeSection === "general" && (
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: "#1E2D45" }}>
                                <HiOfficeBuilding className="text-lg" style={{ color: "#4F8EF7" }} />
                                <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#E8EDF5" }}>
                                    Brand & Store Profile
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Store Brand Name
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.storeName}
                                        onChange={e => handleFieldChange("storeName", e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Brand Tagline
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.tagline}
                                        onChange={e => handleFieldChange("tagline", e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Store Logo Path / URL
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.logoUrl}
                                        onChange={e => handleFieldChange("logoUrl", e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Default Base Currency
                                    </label>
                                    <select
                                        value={settings.currency}
                                        onChange={e => handleFieldChange("currency", e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    >
                                        <option value="LKR">LKR (Sri Lankan Rupee)</option>
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: "#1E2D45" }}>
                                <HiMail className="text-lg" style={{ color: "#9D6FFF" }} />
                                <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#E8EDF5" }}>
                                    Contact & Support Details
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Customer Support Email
                                    </label>
                                    <input
                                        type="email"
                                        value={settings.supportEmail}
                                        onChange={e => handleFieldChange("supportEmail", e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Customer Care Hotline
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.contactPhone}
                                        onChange={e => handleFieldChange("contactPhone", e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Store Head Office / Pickup Address
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.storeAddress}
                                        onChange={e => handleFieldChange("storeAddress", e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ══════════════════════════════════════
                    SECTION 2: Shipping & Delivery
                ══════════════════════════════════════ */}
                {activeSection === "shipping" && (
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl" style={{ background: "#0F1623", border: "1px solid #1E2D45" }}>
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: "#1E2D45" }}>
                                <HiTruck className="text-lg" style={{ color: "#10B981" }} />
                                <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#E8EDF5" }}>
                                    Shipping Methods & Rates
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Standard Courier Rate (LKR)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={settings.standardShippingFee}
                                        onChange={e => handleFieldChange("standardShippingFee", Number(e.target.value))}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                    <p className="text-[11px] mt-1" style={{ color: "#7A8BA3" }}>
                                        Applied by default to islandwide deliveries
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Standard Delivery Window
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.estimatedStandardDays}
                                        onChange={e => handleFieldChange("estimatedStandardDays", e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Express / Same-Day Courier Rate (LKR)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={settings.expressShippingFee}
                                        onChange={e => handleFieldChange("expressShippingFee", Number(e.target.value))}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                        Express Delivery Window
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.estimatedExpressDays}
                                        onChange={e => handleFieldChange("estimatedExpressDays", e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                                        style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                    />
                                </div>

                                <div className="md:col-span-2 pt-2">
                                    <div className="p-4 rounded-xl" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#10B981" }}>
                                            Free Shipping Minimum Order Qualifying Threshold (LKR)
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="number"
                                                min="0"
                                                value={settings.freeShippingThreshold}
                                                onChange={e => handleFieldChange("freeShippingThreshold", Number(e.target.value))}
                                                className="w-full max-w-xs px-3 py-2.5 rounded-xl text-xs outline-none"
                                                style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                            />
                                            <span className="text-xs" style={{ color: "#7A8BA3" }}>
                                                Orders above LKR {settings.freeShippingThreshold.toLocaleString()} automatically receive free shipping.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ══════════════════════════════════════
                    SECTION 3: Payment Gateways
                ══════════════════════════════════════ */}
                {activeSection === "payments" && (
                    <div className="space-y-6">

                        {/* Gateway 1: Cash on Delivery (COD) */}
                        <div className="p-6 rounded-2xl transition-all"
                            style={{
                                background: "#0F1623",
                                border: settings.codEnabled ? "1px solid rgba(79,142,247,0.3)" : "1px solid #1E2D45",
                            }}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                                        style={{ background: "rgba(79,142,247,0.12)", color: "#4F8EF7" }}>
                                        COD
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold" style={{ color: "#E8EDF5" }}>
                                            Cash on Delivery (COD)
                                        </h3>
                                        <p className="text-xs" style={{ color: "#7A8BA3" }}>
                                            Collect cash payment when product is delivered to customer's door
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleFieldChange("codEnabled", !settings.codEnabled)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        settings.codEnabled ? "bg-blue-600" : "bg-gray-700"
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            settings.codEnabled ? "translate-x-6" : "translate-x-1"
                                        }`}
                                    />
                                </button>
                            </div>

                            {settings.codEnabled && (
                                <div className="pt-3 border-t grid grid-cols-1 md:grid-cols-2 gap-4" style={{ borderColor: "#1E2D45" }}>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                            COD Handling Surcharge (LKR)
                                        </label>
                                        <input
                                            type="number"
                                            value={settings.codFee}
                                            onChange={e => handleFieldChange("codFee", Number(e.target.value))}
                                            placeholder="0 for free"
                                            className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                                            style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                        />
                                    </div>
                                    <div className="flex items-center text-xs" style={{ color: "#10B981" }}>
                                        ✓ Currently active and available on checkout
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Gateway 2: Direct Bank Transfer */}
                        <div className="p-6 rounded-2xl transition-all"
                            style={{
                                background: "#0F1623",
                                border: settings.bankTransferEnabled ? "1px solid rgba(157,111,255,0.3)" : "1px solid #1E2D45",
                            }}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                                        style={{ background: "rgba(157,111,255,0.12)", color: "#9D6FFF" }}>
                                        BANK
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold" style={{ color: "#E8EDF5" }}>
                                            Direct Bank Wire Transfer / Deposit
                                        </h3>
                                        <p className="text-xs" style={{ color: "#7A8BA3" }}>
                                            Customers transfer directly to your corporate bank account and upload receipt
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleFieldChange("bankTransferEnabled", !settings.bankTransferEnabled)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        settings.bankTransferEnabled ? "bg-purple-600" : "bg-gray-700"
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            settings.bankTransferEnabled ? "translate-x-6" : "translate-x-1"
                                        }`}
                                    />
                                </button>
                            </div>

                            {settings.bankTransferEnabled && (
                                <div className="pt-3 border-t grid grid-cols-1 md:grid-cols-2 gap-4" style={{ borderColor: "#1E2D45" }}>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                            Bank Name
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.bankName}
                                            onChange={e => handleFieldChange("bankName", e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                                            style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                            Account Holder Name
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.accountName}
                                            onChange={e => handleFieldChange("accountName", e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                                            style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                            Account Number
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.accountNumber}
                                            onChange={e => handleFieldChange("accountNumber", e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                                            style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                            Branch
                                        </label>
                                        <input
                                            type="text"
                                            value={settings.branchName}
                                            onChange={e => handleFieldChange("branchName", e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                                            style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Gateway 3: Online Card Payment / Gateway */}
                        <div className="p-6 rounded-2xl transition-all"
                            style={{
                                background: "#0F1623",
                                border: settings.onlineCardEnabled ? "1px solid rgba(16,185,129,0.3)" : "1px solid #1E2D45",
                            }}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                                        style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}>
                                        CARD
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold" style={{ color: "#E8EDF5" }}>
                                            Online Card Gateway (Visa / Mastercard / Amex)
                                        </h3>
                                        <p className="text-xs" style={{ color: "#7A8BA3" }}>
                                            Instant card processing via PayHere / Stripe gateway
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleFieldChange("onlineCardEnabled", !settings.onlineCardEnabled)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        settings.onlineCardEnabled ? "bg-emerald-600" : "bg-gray-700"
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            settings.onlineCardEnabled ? "translate-x-6" : "translate-x-1"
                                        }`}
                                    />
                                </button>
                            </div>

                            {settings.onlineCardEnabled && (
                                <div className="pt-3 border-t space-y-4" style={{ borderColor: "#1E2D45" }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                                Environment Mode
                                            </label>
                                            <select
                                                value={settings.paymentMode}
                                                onChange={e => handleFieldChange("paymentMode", e.target.value)}
                                                className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                                                style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                            >
                                                <option value="sandbox">Sandbox / Test Mode</option>
                                                <option value="live">Live Production Mode</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                                Merchant ID / Client App Key
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.merchantId}
                                                onChange={e => handleFieldChange("merchantId", e.target.value)}
                                                className="w-full px-3 py-2 rounded-xl text-xs outline-none font-mono"
                                                style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#7A8BA3" }}>
                                                Public Publishable API Token
                                            </label>
                                            <input
                                                type="password"
                                                value={settings.publishableKey}
                                                onChange={e => handleFieldChange("publishableKey", e.target.value)}
                                                className="w-full px-3 py-2 rounded-xl text-xs outline-none font-mono"
                                                style={{ background: "#080C14", color: "#E8EDF5", border: "1px solid #1E2D45" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}
