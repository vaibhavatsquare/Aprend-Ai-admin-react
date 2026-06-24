"use client";
import React from "react";
import { FiAlertCircle, FiWifiOff, FiRefreshCw, FiClock } from "react-icons/fi";
import { ErrorType, getErrorMessage } from "@/src/libs/errorTypes";

interface NetworkErrorProps {
  errorType: ErrorType;
  onRetry?: () => void;
  isRetrying?: boolean;
  customMessage?: string;
}

const getErrorIcon = (errorType: ErrorType) => {
  switch (errorType) {
    case ErrorType.NETWORK_UNAVAILABLE:
    case ErrorType.CONNECTION_REFUSED:
    case ErrorType.DNS_RESOLUTION_FAILED:
      return <FiWifiOff className="text-5xl text-orange-400" />;
    case ErrorType.TIMEOUT:
      return <FiClock className="text-5xl text-yellow-400" />;
    case ErrorType.UNAUTHORIZED:
    case ErrorType.AUTH_FAILED:
      return <FiAlertCircle className="text-5xl text-red-400" />;
    case ErrorType.SERVER_ERROR:
    case ErrorType.SERVICE_UNAVAILABLE:
      return <FiAlertCircle className="text-5xl text-red-500" />;
    default:
      return <FiAlertCircle className="text-5xl text-gray-400" />;
  }
};

export const NetworkError: React.FC<NetworkErrorProps> = ({
  errorType,
  onRetry,
  isRetrying = false,
  customMessage,
}) => {
  const errorMessage = customMessage || getErrorMessage(errorType);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-6">
      <div className="flex items-center justify-center w-16 h-16">
        {getErrorIcon(errorType)}
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-[#0F3057] mb-2">
          {errorType === ErrorType.NETWORK_UNAVAILABLE && "No Internet Connection"}
          {errorType === ErrorType.TIMEOUT && "Request Timeout"}
          {errorType === ErrorType.CONNECTION_REFUSED && "Cannot Connect"}
          {errorType === ErrorType.UNAUTHORIZED && "Session Expired"}
          {errorType === ErrorType.SERVER_ERROR && "Server Error"}
          {errorType === ErrorType.SERVICE_UNAVAILABLE && "Service Unavailable"}
          {!["NETWORK_UNAVAILABLE", "TIMEOUT", "CONNECTION_REFUSED", "UNAUTHORIZED", "SERVER_ERROR", "SERVICE_UNAVAILABLE"].includes(errorType) && "Something Went Wrong"}
        </h3>

        <p className="text-sm text-[#555555] max-w-md">{errorMessage}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          disabled={isRetrying}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            isRetrying
              ? "bg-gray-200 text-gray-600 cursor-not-allowed"
              : "bg-[#0F3057] text-white hover:opacity-90 active:scale-95"
          }`}
        >
          <FiRefreshCw className={`text-base ${isRetrying ? "animate-spin" : ""}`} />
          {isRetrying ? "Retrying..." : "Try Again"}
        </button>
      )}
    </div>
  );
};

export default NetworkError;