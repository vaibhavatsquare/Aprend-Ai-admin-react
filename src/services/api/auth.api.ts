import { fetch } from "@/src/libs/helpers";
import { AdminDetail, UserSession } from "@/src/libs/types/admin";

export const backendLogin = async () => {
    return await fetch<AdminDetail>({
        url: "/admin/auth/login",
        method: "POST",
    });
};

export const backendLogout = async (sessionId: string) => {
    try {
        return await fetch({
            url: `/admin/auth/${sessionId}`,
            method: "PUT",
        });
    } catch {
        return null;
    }
};

export const authenticateWithAPI = async () => {
    const res = await backendLogin();

    localStorage.setItem("sessionId", res.userSession?.id || "");
    localStorage.setItem("userId", res.id);

    localStorage.setItem("admin", JSON.stringify(res));
    return res;
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
        const res = await fetch<{ exists: boolean }>({
            url: `/admin/auth/check-email-exists?email=${encodeURIComponent(email)}`,
            method: "PUT",
        });
        return res?.exists === true;
    } catch {
        return false;
    }
};

export const logoutUser = async (): Promise<void> => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) return;

    try {
        await backendLogout(sessionId);
    } catch (e) {
        console.warn("Session already closed");
    }

    localStorage.removeItem("sessionId");
    localStorage.removeItem("userId");
    localStorage.removeItem("admin");
};