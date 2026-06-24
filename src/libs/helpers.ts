
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { app } from "../configs/firebase.config";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { removeCookie, setCookie } from "../services/coockies/coockie.service";
import { AdminDetail } from "./types/admin";
import { ErrorType, createNetworkError } from "./errorTypes";
import { isNetworkAvailable } from "../hooks/useNetworkStatus";

// Axios instance
let axiosInstance: AxiosInstance | null = null;

// Promise to wait for Firebase auth restoration
let authReadyPromise: Promise<User | null> | null = null;

// Wait for Firebase to restore the authentication state
export const waitForAuthState = (): Promise<User | null> => {
    if (!authReadyPromise) {
        authReadyPromise = new Promise((resolve) => {
            const auth = getAuth(app);
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                resolve(user); // Firebase has finished restoring the session
                unsubscribe();
                authReadyPromise = null; // Allow fresh checks on subsequent calls
            });
        });
    }

    return authReadyPromise;
};

// Create an Axios instance with valid token
const createAxiosInstance = async (): Promise<AxiosInstance> => {
    return axios.create({
        baseURL: process.env.NEXT_API_ENDPOINT || "",
        timeout: 15000,
    });
};

// Get the valid Firebase ID token (force refresh if necessary)
const fetchIdToken = async (): Promise<string> => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        throw createNetworkError(
            ErrorType.AUTH_FAILED,
            "User is not authenticated. Please log in."
        );
    }

    return await user.getIdToken(false);
};

// Create or return the Axios instance
const API = async (force = false): Promise<AxiosInstance> => {
    if (axiosInstance && !force) {
        return axiosInstance;
    }

    // Wait for Firebase to restore the authentication state
    await waitForAuthState();

    // Create a new Axios instance with a valid token
    axiosInstance = await createAxiosInstance();
    return axiosInstance;
};

// API call wrapper with token refresh and retry logic
const classifyError = (error: any): ErrorType => {
    if (!error.response) {
        if (error.code === "ECONNABORTED") return ErrorType.TIMEOUT;
        if (!isNetworkAvailable()) return ErrorType.NETWORK_UNAVAILABLE;
        if (error.code === "ECONNREFUSED") return ErrorType.CONNECTION_REFUSED;
        if (error.code === "ENOTFOUND" || error.message?.includes("getaddrinfo")) return ErrorType.DNS_RESOLUTION_FAILED;
        if (error.message?.includes("Network") || error.message?.includes("NETWORK")) return ErrorType.NETWORK_UNAVAILABLE;
        return ErrorType.UNKNOWN;
    }

    const status = error.response?.status;
    if (status === 401) return ErrorType.UNAUTHORIZED;
    if (status === 403) return ErrorType.FORBIDDEN;
    if (status === 404) return ErrorType.NOT_FOUND;
    if (status === 400) return ErrorType.BAD_REQUEST;
    if (status === 429) return ErrorType.RATE_LIMITED;
    if (status === 503) return ErrorType.SERVICE_UNAVAILABLE;
    if (status >= 500) return ErrorType.SERVER_ERROR;

    return ErrorType.UNKNOWN;
};

const extractErrorMessage = (error: any): string => {
    if (error?.response?.data?.message) return error.response.data.message;
    if (error?.message) return error.message;
    return "An unexpected error occurred";
};

const fetch = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
        if (!isNetworkAvailable()) {
            throw createNetworkError(ErrorType.NETWORK_UNAVAILABLE, "No internet connection. Please check your network.");
        }

        const axios = await API();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const idToken = await fetchIdToken();
            setCookie("adminToken", idToken);
            console.log("🟢 adminToken set");
            config.headers = { Authorization: `Bearer ${idToken}` };
        }

        const response: AxiosResponse<T> = await axios.request<T>({
            ...config,
            paramsSerializer: (params) => {
                const searchParams = new URLSearchParams();
                Object.entries(params).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach((v) => searchParams.append(key, v));
                    } else {
                        searchParams.append(key, value as string);
                    }
                });
                return searchParams.toString();
            },
        });

        return response.data;
    } catch (error: any) {
        const errorType = classifyError(error);
        const errorMessage = extractErrorMessage(error);

        if (errorType === ErrorType.UNAUTHORIZED) {
            try {
                console.log("🔑 Token expired, refreshing...");
                const newToken = await fetchIdToken();
                setCookie("adminToken", newToken);
                config.headers = { ...config.headers, Authorization: `Bearer ${newToken}` };

                const axios = await API(true);
                const response: AxiosResponse<T> = await axios.request<T>(config);
                return response.data;
            } catch (refreshError: any) {
                throw createNetworkError(ErrorType.AUTH_FAILED, extractErrorMessage(refreshError), 401, refreshError);
            }
        }

        throw createNetworkError(errorType, errorMessage, error?.response?.status, error);
    }
};

export { API, fetch };

export const getCurrentWeek = () => {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);

    const monday = new Date(today.setDate(diff));

    return Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
    });
};

export const getStoredUser = (): AdminDetail | null => {
    if (typeof window === "undefined") return null;

    const user = localStorage.getItem("admin");
    if (!user) return null;

    try {
        return JSON.parse(user) as AdminDetail;
    } catch {
        return null;
    }
};

export const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
};

export const lightenColor = (hex: string, percent: number) => {
    const num = parseInt(hex.replace("#", ""), 16),
        amt = Math.round(2.3 * percent),
        R = (num >> 16) + amt,
        G = ((num >> 8) & 0x00ff) + amt,
        B = (num & 0x0000ff) + amt;

    return (
        "#" +
        (
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        )
            .toString(16)
            .slice(1)
    );
};

export const darkenColor = (hex: string, percent: number) => {
    return lightenColor(hex, -percent);
};

export const clearData = () => {
    removeCookie("adminToken");
    localStorage.clear();
};

export const getFocusMode = () => {
    if (typeof window === "undefined") return true;

    return localStorage.getItem("focusMode") === "true";
};

export const setFocusMode = (value: boolean) => {
    localStorage.setItem("focusMode", value.toString());
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).replace(",", "   "); // extra spacing
};

export const subjects = [
    { label: "English", value: "ENGLISH" },
    { label: "Mathematics", value: "MATHEMATICS" },
    { label: "Science", value: "SCIENCE" },
    { label: "History", value: "HISTORY" },
    { label: "Geography", value: "GEOGRAPHY" },
    { label: "Computer Science", value: "COMPUTER_SCIENCE" },
    { label: "Business Economics", value: "BUSINESS_ECONOMICS" },
];

export const difficulties = [
    { label: "Easy", value: "EASY" },
    { label: "Medium", value: "MEDIUM" },
    { label: "Hard", value: "HARD" },
    { label: "Mix", value: "MIX" },
];

export enum QuestionSource {
    HOME_PRACTICE_QUESTION = "HOME_PRACTICE_QUESTION",
    HOME_CONCEPT_EXPLANATION = "HOME_CONCEPT_EXPLANATION",
    SIMULADO = "SIMULADO",
    EXPLORE_QUESTION = "EXPLORE_QUESTION",
}

export const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase();
    return (
        parts[0][0].toUpperCase() +
        parts[parts.length - 1][0].toUpperCase()
    );
};

export const educationLevels = [
    {
        label: "Elementary School",
        value: "ELEMENTARY"
    },
    {
        label: "High School",
        value: "HIGH_SCHOOL"
    },
    {
        label: "Pre-Vestibular",
        value: "PRE_VESTIBULAR"
    },
    {
        label: "University",
        value: "UNIVERSITY"
    },
    {
        label: "Competitive Exam",
        value: "COMPETITIVE_EXAMS"
    },
];