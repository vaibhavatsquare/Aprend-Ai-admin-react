"use client";

import React, { useEffect, useState } from "react";
import { getGreeting } from "@/src/libs/helpers";

const Navbar = () => {

    const [greeting, setGreeting] = useState("");

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    const displayName = "Admin";

    useEffect(() => {
        setGreeting(getGreeting());
    }, []);

    return (
        <div
            // className="w-full h-[80px] px-8 flex items-center justify-between bg-white relative z-10 shadow-[0_4px_10px_rgba(0,0,0,0.06)]"
            className="w-full h-[80px] px-8 flex items-center justify-between bg-white relative z-10"
        >
            {/* LEFT SIDE */}
            <div className="flex flex-col gap-1">

                <h1 className="text-[18px] font-medium">
                    {greeting}
                    {", " + displayName + "!"} 👋
                </h1>

                <p className="text-[12px] text-gray-500 mt-1">
                    {today}
                </p>

            </div>

        </div>
    );


};

export default Navbar;