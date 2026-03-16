"use client";
import { Button, Input, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    signInWithFirebase
} from "@/src/services/auth/auth.firebase.service";
import { setCookie } from "@/src/services/coockies/coockie.service";
import { useRedirect } from "@/src/hooks/router.hooks";
import { authenticateWithAPI } from "@/src/services/api/auth.api";
import MiniLoader from "@/src/components/loaders/MiniLoader";

interface LoginFormData {
    email: string;
    password: string;
}

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const handleLogin = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            const { user, idToken } = await signInWithFirebase(
                data.email,
                data.password
            );

            setCookie("adminToken", idToken, 7);
            console.log("🟢 adminToken:", idToken);
            const res = await authenticateWithAPI();
            message.success("Login successful");
            useRedirect("/dashboard", true);

        } catch (error: any) {
            message.error(error?.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full bg-primary flex">
            {isLoading && <MiniLoader />}
            <div className="h-full flex justify-end">
                <Image
                    src="/images/auth/loginImg.svg"
                    alt="Login background"
                    width={800}
                    height={600}
                    className="object-contain w-auto h-full"
                />
            </div>
            <form className="flex-1 h-full bg-white rounded-tl-4xl rounded-bl-4xl flex items-center justify-center">

                <div className="w-[90%] sm:w-[80%] md:w-[60%] xl:w-[50%] h-full overflow-y-auto scrollbar-hide py-10 flex flex-col justify-center gap-8">

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-medium">
                                Email Address
                            </label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        placeholder="Enter your email address"
                                        className="bg-[#F5F5F5]! border-none! h-[40px] rounded-xl! px-3 py-2 focus:border-none! focus:outline-none! shadow-none!"
                                    />
                                )}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="font-medium">
                                Password
                            </label>
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: "Password is required",
                                }}
                                render={({ field }) => (
                                    <Input.Password
                                        {...field}
                                        placeholder="Enter your password"
                                        className="bg-[#F5F5F5]! border-none! h-[40px] rounded-xl! px-3 py-2 focus:border-none! focus:outline-none! shadow-none!"
                                    />
                                )}
                            />
                            <div className="w-full flex gap-2 justify-between items-center">
                                <p className="text-red-500 text-xs">
                                    {errors?.password?.message || ""}
                                </p>
                                <Link href="/forgot-password" className="text-primary text-sm">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                onClick={handleSubmit(handleLogin)}
                                className="mt-6 w-[90%] h-[40px]! bg-primary! text-white! border-none! py-2 px-4 rounded-xl! hover:bg-primary/90! transition-all"
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
