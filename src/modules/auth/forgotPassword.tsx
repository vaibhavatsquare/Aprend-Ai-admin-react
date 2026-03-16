"use client";
import { useRedirect } from "@/src/hooks/router.hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoArrowLeft } from "react-icons/go";
import { forgotPasswordFirebase } from "@/src/services/auth/auth.firebase.service";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!email) {
            setError("Email required");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        const response = await forgotPasswordFirebase(email);

        setLoading(false);

        if (!response.success) {
            setError(response.message || "Failed");
            return;
        }

        setSuccess(response.message || "Reset email sent");
    };

    return (
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
                            placeholder="alexexample@gmail.com"
                            className="bg-[#F5F5F5]! w-full border-none! h-[40px] rounded-xl! px-3 py-2 focus:border-none! focus:outline-none! shadow-none!"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-10 w-full h-[40px]! bg-primary! text-white! border-none! py-2 px-4 rounded-xl! hover:bg-primary/90! transition-all"
                    >
                        {loading ? "Sending..." : "Continue"}
                    </button>

                    {success && (
                        <p className="text-green-600 text-sm text-center mt-4">
                            {success}
                        </p>
                    )}

                </form>

            </div>



        </div>
    );
};

export default ForgotPassword;