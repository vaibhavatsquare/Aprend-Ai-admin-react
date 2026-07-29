"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "../services/coockies/coockie.service";
import { getCookie } from "../services/coockies/coockie.service";
import { clearData, waitForAuthState } from "../libs/helpers";
import { authenticateWithAPI } from "../services/api/auth.api";
import FullScreenLoader from "../components/loaders/fullScreenLoader";

const withAuth = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => {
    const AuthenticatedComponent = (props: P) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        const checkAuthState = async () => {
    try {
        const user = await waitForAuthState();

        if (!user) {
            clearData();
            router.replace("/login");
            return;
        }

        if (!user.email) {
            clearData();
            router.replace("/login");
            return;
        }

        const freshToken = await user.getIdToken(true);

        if (!freshToken) {
            clearData();
            router.replace("/login");
            return;
        }

        const storedAdmin = localStorage.getItem("admin");
        if (!storedAdmin) {
            await authenticateWithAPI(); // re-fetches and stores sessionId, userId, admin
        }

        setCookie("adminToken", freshToken, 10);
        setLoading(false);

    } catch (error) {
        clearData();
        router.replace("/login");
    }
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
