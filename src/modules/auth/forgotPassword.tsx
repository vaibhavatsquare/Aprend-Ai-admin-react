"use client";
import { useRedirect } from "@/src/hooks/router.hooks";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { forgotPasswordFirebase } from "@/src/services/auth/auth.firebase.service";
import { checkEmailExists } from "@/src/services/api/auth.api";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [popup, setPopup] = useState<{ type: "error" | "success"; msg: string } | null>(null);

    useEffect(() => {
        if (!popup) return;
        const timer = setTimeout(() => setPopup(null), 4000);
        return () => clearTimeout(timer);
    }, [popup]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!email) {
            setError("Email required");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        const exists = await checkEmailExists(email);

        if (!exists) {
            setPopup({ type: "error", msg: "No account found with this email address." });
            setLoading(false);
            return;
        }

        const response = await forgotPasswordFirebase(email);

        setLoading(false);

        if (!response.success) {
            setPopup({ type: "error", msg: response.message || "Failed" });
            return;
        }

        setPopup({ type: "success", msg: response.message || "Reset email sent" });
    };

    return (
        <>
        <div className="flex items-center justify-center h-screen bg-white">

            <GoArrowLeft
                className="absolute top-10 left-10 cursor-pointer text-3xl"
                onClick={() => useRedirect("/login")}
            />

            <div className="w-[480px] text-center">

                {/* TITLE */}

                <h1 className="text-[44px] font-semibold mb-6 text-[#121212]">
                    Forgot Password
                </h1>

                <p className="text-[18px] text-[#121212] mb-16 leading-relaxed">
                    Enter your email address and we’ll send you a link to reset your password
                </p>

                <form onSubmit={handleSubmit} className="space-y-1 text-left">

                    <div>

                        <label className="text-[18px] text-[#121212] font-medium mb-2 block">
                            Email id
                        </label>

                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            className="bg-[#F5F5F5]! w-full border-none! h-[40px] rounded-xl! px-3 py-2 focus:border-none! focus:outline-none! shadow-none!"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-10 w-full h-[40px]! bg-primary! text-white! border-none! py-2 px-4 rounded-xl! hover:bg-primary/90! transition-all"
                    >
                        {loading ? "Sending..." : "Continue"}
                    </button>

                </form>

            </div>


        </div>

        {popup && (
            <>
                <style>{`
                    @keyframes slideDown {
                        from { transform: translateX(-50%) translateY(-16px); opacity: 0; }
                        to   { transform: translateX(-50%) translateY(0);     opacity: 1; }
                    }
                `}</style>
                <div style={{ position: "fixed", top: "24px", left: "50%", transform: "translateX(-50%)", zIndex: 50, display: "flex", alignItems: "center", gap: "12px", background: "#fff", border: `1px solid ${popup.type === "error" ? "#FEE2E2" : "#DCFCE7"}`,  borderRadius: "10px", padding: "14px 18px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", minWidth: "320px", maxWidth: "420px", animation: "slideDown 0.3s ease" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: popup.type === "error" ? "#FEF2F2" : "#F0FDF4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {popup.type === "error" ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="9 12 11 14 15 10" />
                            </svg>
                        )}
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#1C1B17", margin: "0 0 2px" }}>
                            {popup.type === "error" ? "Error" : "Success"}
                        </p>
                        <p style={{ fontSize: "13px", color: "#64748B", margin: 0 }}>{popup.msg}</p>
                    </div>
                    <button onClick={() => setPopup(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", display: "flex", alignItems: "center", padding: "4px" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
            </>
        )}
</>
    );
};

export default ForgotPassword;