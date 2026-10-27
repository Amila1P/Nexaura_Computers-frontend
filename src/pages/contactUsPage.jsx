import { useState } from "react";
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle } from "react-icons/hi";
import { BiSend } from "react-icons/bi";
import toast from "react-hot-toast";

const CONTACT_INFO = [
    {
        icon: HiMail,
        label: "Email Us",
        value: "support@nexaura.lk",
        href: "mailto:support@nexaura.lk",
    },
    {
        icon: HiPhone,
        label: "Call Us",
        value: "+94 11 234 5678",
        href: "tel:+94112345678",
    },
    {
        icon: HiLocationMarker,
        label: "Visit Us",
        value: "123 Tech Park, Colombo 03, Sri Lanka",
        href: "https://maps.google.com",
    },
];

const FAQ = [
    { q: "What is your return policy?",      a: "We offer a 7-day hassle-free return policy on all products. Items must be in original packaging and unopened." },
    { q: "Do you offer warranty?",           a: "Yes — all products carry the manufacturer's official warranty. We also offer extended warranty plans on select items." },
    { q: "How long does delivery take?",     a: "Standard delivery within Colombo takes 1–2 business days. Island-wide delivery takes 3–5 business days." },
    { q: "Can I build a custom PC?",         a: "Absolutely! Contact us via the form or phone and our expert team will help you build your perfect rig within budget." },
];

export default function ContactUsPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    function handleChange(e) {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setSubmitting(true);
        // Simulate form submission (replace with actual API call if/when backend supports it)
        setTimeout(() => {
            setSubmitting(false);
            setSent(true);
            toast.success("Message sent! We'll get back to you shortly.");
        }, 1500);
    }

    return (
        <div className="w-full min-h-screen" style={{ background: "#080C14" }}>

            {/* ── Page Header ── */}
            <div
                className="relative w-full py-20 text-center overflow-hidden"
                style={{ background: "linear-gradient(135deg,#080C14 0%,#0F1623 100%)", borderBottom: "1px solid #1E2D45" }}
            >
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(79,142,247,0.1),transparent 70%)" }} />
                <div className="relative z-10 max-w-2xl mx-auto px-6">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "rgba(79,142,247,0.1)", border: "1px solid rgba(79,142,247,0.3)", color: "#4F8EF7" }}>
                        ✉️ We'd love to hear from you
                    </span>
                    <h1 className="text-5xl font-black mb-4" style={{ color: "#E8EDF5", fontFamily: "'Outfit', sans-serif" }}>
                        Get in <span className="gradient-text">Touch</span>
                    </h1>
                    <p style={{ color: "#7A8BA3", fontSize: "1.05rem" }}>
                        Have a question, need tech advice, or want a custom quote? Our team typically responds within 2 hours.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">

                {/* ── Contact Cards Row ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
                    {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            className="card flex flex-col items-center text-center gap-3 p-8 group"
                            style={{ textDecoration: "none" }}
                        >
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(79,142,247,0.1)" }}>
                                <Icon className="text-2xl" style={{ color: "#4F8EF7" }} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#7A8BA3" }}>{label}</p>
                                <p className="text-sm font-semibold" style={{ color: "#E8EDF5" }}>{value}</p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* ── Main Grid: Form + FAQ ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="card p-8">
                            <div className="mb-6">
                                <div className="divider" />
                                <h2 className="section-title">Send a Message</h2>
                                <p className="text-sm" style={{ color: "#7A8BA3" }}>Fill in the form and we'll be in touch very soon.</p>
                            </div>

                            {sent ? (
                                /* Success state */
                                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.1)" }}>
                                        <HiCheckCircle className="text-4xl" style={{ color: "#10B981" }} />
                                    </div>
                                    <h3 className="text-2xl font-bold" style={{ color: "#E8EDF5" }}>Message Sent!</h3>
                                    <p style={{ color: "#7A8BA3" }}>Thank you for reaching out. We'll get back to you within 2 business hours.</p>
                                    <button
                                        className="btn-secondary mt-2"
                                        onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>Full Name <span style={{ color: "#F04E37" }}>*</span></label>
                                            <input
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>Email Address <span style={{ color: "#F04E37" }}>*</span></label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                className="form-input"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>Subject</label>
                                        <input
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            placeholder="e.g. Custom PC Build Query"
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold" style={{ color: "#7A8BA3" }}>Message <span style={{ color: "#F04E37" }}>*</span></label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Tell us how we can help you…"
                                            rows={5}
                                            className="form-input resize-none"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="btn-primary self-start px-8"
                                        style={{ opacity: submitting ? 0.7 : 1 }}
                                    >
                                        {submitting ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="3" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" strokeWidth="3" strokeLinecap="round" /></svg>
                                                Sending…
                                            </>
                                        ) : (
                                            <><BiSend /> Send Message</>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* FAQ Column */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="mb-2">
                            <div className="divider" />
                            <h2 className="section-title">FAQs</h2>
                            <p className="text-sm" style={{ color: "#7A8BA3" }}>Quick answers to common questions.</p>
                        </div>

                        {FAQ.map(({ q, a }, i) => (
                            <div
                                key={i}
                                className="card overflow-hidden"
                                style={{ borderColor: openFaq === i ? "#4F8EF7" : "#1E2D45" }}
                            >
                                <button
                                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                >
                                    <span className="text-sm font-semibold" style={{ color: "#E8EDF5" }}>{q}</span>
                                    <svg
                                        className="shrink-0 transition-transform duration-200"
                                        style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", color: "#4F8EF7" }}
                                        width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {openFaq === i && (
                                    <p className="px-5 pb-5 text-sm" style={{ color: "#7A8BA3", borderTop: "1px solid #1E2D45", paddingTop: "12px" }}>
                                        {a}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* ── Footer Strip ── */}
            <footer style={{ background: "#0F1623", borderTop: "1px solid #1E2D45" }}>
                <div className="max-w-7xl mx-auto px-6 py-8 text-center">
                    <p className="text-sm" style={{ color: "#7A8BA3" }}>© 2025 NexAura Computers. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
