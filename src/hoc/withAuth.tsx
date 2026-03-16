"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "../services/coockies/coockie.service";
import { clearData, waitForAuthState } from "../libs/helpers";
import FullScreenLoader from "../components/loaders/fullScreenLoader";

const withAuth = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => {
    const AuthenticatedComponent = (props: P) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        const checkAuthState = () => {
            const adminToken = getCookie("adminToken");
            waitForAuthState().then((user) => {
                if (!user || !adminToken) {
                    clearData();
                    router.replace("/login"); // Replace with your public login route
                } else {
                    setLoading(false);
                }
            });
        };

        useEffect(() => {
            checkAuthState();
        }, [router]);

        if (loading) return <FullScreenLoader />;
        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export default withAuth;
