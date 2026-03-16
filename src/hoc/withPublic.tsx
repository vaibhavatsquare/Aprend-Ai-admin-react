"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "../services/coockies/coockie.service";
import { clearData, waitForAuthState } from "../libs/helpers";
import FullScreenLoader from "../components/loaders/fullScreenLoader";

function withPublic<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    const PublicComponent = (props: P) => {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        const checkAuthState = () => {
            const adminToken = getCookie("adminToken");
            waitForAuthState().then((user) => {
                if (user && adminToken) {
                    router.replace("/dashboard");
                } else {
                    clearData();
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

    return PublicComponent;
}

export default withPublic;
