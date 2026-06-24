"use client";
import { useEffect, useState, useCallback } from "react";

interface NetworkStatus {
  isOnline: boolean;
  isSlowConnection: boolean;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [status, setStatus] = useState<NetworkStatus>({
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    isSlowConnection: false,
  });

  const handleOnline = useCallback(() => {
    setStatus((prev) => ({ ...prev, isOnline: true }));
  }, []);

  const handleOffline = useCallback(() => {
    setStatus((prev) => ({ ...prev, isOnline: false }));
  }, []);

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return status;
};

export const isNetworkAvailable = (): boolean => {
  if (typeof navigator === "undefined") return true;
  return navigator.onLine;
};