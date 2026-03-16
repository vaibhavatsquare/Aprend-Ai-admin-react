"use client";
import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { message, Tooltip } from "antd";
import { useSidebarContext } from "@/src/context/sidebar.context";
import { UserOutlined } from "@ant-design/icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { GoHome } from "react-icons/go";
import { TbCards } from "react-icons/tb";
import { useRouter } from "next/navigation";
import ConfirmModal from "./confirmModal";
import { signOutUser } from "@/src/services/auth/auth.firebase.service";

const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
});

const Sidebar = () => {
    const path = usePathname();
    const [selectedItem, setSelectedItem] = useState("");
    const [logoutOpen, setLogoutOpen] = useState(false);

    const { isCollapsed, setIsCollapsed, setIsTabChangeLoading } =
        useSidebarContext();

    const handleLogout = async () => {
        try {
            await signOutUser();
            message.success("Logged out successfully");
            router.replace("/login");
        } catch {
            message.error("Logout failed");
        }
    };

    // Menu config for future scalability - moved inside component
    const menuItems = [
        {
            key: "dashboard",
            label: "Dashboard",
            icon: GoHome,
            href: "/dashboard",
        },
        {
            key: "content",
            label: "Content Library",
            icon: TbCards,
            href: "/library",
        },
    ];

    useEffect(() => {
        const page = path.split("/")[1];
        if (page) setSelectedItem(page);
    }, [path]);

    const handleNavigation = (key: string) => {
        if (selectedItem !== key) {
            setSelectedItem(key);
            setIsTabChangeLoading(true);
        }
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
        localStorage.setItem("sidebarCollapsed", (!isCollapsed).toString());
    };

    const router = useRouter();

    return (
        <div
            className={`h-screen bg-white shadow-xl lg:shadow-none
      ${poppins.className} flex flex-col transition-all duration-500
      ${isCollapsed ? "w-[60px]" : "w-[230px]"}
    `}
            style={{
                boxShadow: "0px 0px 10px 0px #0000001A inset",
            }}
        >
            {/* Logo */}
            <Link href="/dashboard" className={`flex flex-col items-center`}>
                <Image src="/images/appLogo.svg" alt="Loading" width={90} height={90} />
                <p className="text-primary font-bold">MESTRE.IA</p>
            </Link>

            {/* Menu */}
            <div className="flex flex-col justify-center flex-1 gap-2 mt-[-60]">
                {menuItems.map((item) => {
                    const isActive = selectedItem === item.key;
                    const Icon = item.icon;
                    return (
                        <Tooltip
                            key={item.key}
                            title={isCollapsed ? item.label : ""}
                            placement="right"
                        >
                            <Link
                                href={item.href}
                                onClick={() => handleNavigation(item.key)}
                                className={`flex items-center cursor-pointer
                  border border-transparent hover:border-white
                  transition-all duration-300
                  gap-2 pl-8 h-[50px] relative
                  ${isActive ? "bg-primary" : ""}
                `}
                            >
                                <Image src="/images/sidebar/curv.svg" alt="Loading" width={12} height={50} className="absolute left-0" />

                                <Icon
                                    className={`${isActive ? "text-white" : "text-secondary"} text-xl`}
                                />

                                {!isCollapsed && (
                                    <span
                                        className={`${isActive
                                            ? "text-white"
                                            : "text-secondary"
                                            } text-[12px] truncate font-medium`}
                                    >
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        </Tooltip>
                    );
                })}
            </div>

            {/* LOGOUT */}
            <div className="pb-10">

                <div
                    onClick={() => setLogoutOpen(true)}
                    className="
                        flex items-center gap-3
                        h-[40px]
                        rounded-[4px]
                        cursor-pointer
                        bg-[#F342351A]
                        mx-[12px]
                        "
                >

                    <Image
                        className="ml-4"
                        src="/images/auth/logout.svg"
                        alt="logout"
                        width={24}
                        height={24}
                    />

                    <span className="text-[16px] font-medium text-[#F34235]">
                        Logout
                    </span>

                </div>

            </div>

            {logoutOpen && (
                <ConfirmModal
                    type="logout"
                    onClose={() => setLogoutOpen(false)}
                    onConfirm={handleLogout}
                />
            )}

        </div>
    );
};

export default Sidebar;
