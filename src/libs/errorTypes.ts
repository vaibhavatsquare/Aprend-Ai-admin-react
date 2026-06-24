export enum ErrorType {
  NETWORK_UNAVAILABLE = "NETWORK_UNAVAILABLE",
  TIMEOUT = "TIMEOUT",
  CONNECTION_REFUSED = "CONNECTION_REFUSED",
  DNS_RESOLUTION_FAILED = "DNS_RESOLUTION_FAILED",
  SERVER_ERROR = "SERVER_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  BAD_REQUEST = "BAD_REQUEST",
  RATE_LIMITED = "RATE_LIMITED",
  AUTH_FAILED = "AUTH_FAILED",
  UNKNOWN = "UNKNOWN",
}

export interface NetworkError extends Error {
  type: ErrorType;
  statusCode?: number;
  isRetryable: boolean;
  originalError?: any;
}

export const getErrorMessage = (errorType: ErrorType): string => {
  const messages: Record<ErrorType, string> = {
    [ErrorType.NETWORK_UNAVAILABLE]: "No internet connection.",
    [ErrorType.TIMEOUT]: "Request took too long.",
    [ErrorType.CONNECTION_REFUSED]: "Unable to connect to server.",
    [ErrorType.DNS_RESOLUTION_FAILED]: "Unable to reach the server.",
    [ErrorType.SERVER_ERROR]: "Server is having issues.",
    [ErrorType.SERVICE_UNAVAILABLE]: "Service is temporarily unavailable.",
    [ErrorType.UNAUTHORIZED]: "Your session has expired.",
    [ErrorType.FORBIDDEN]: "You don't have permission.",
    [ErrorType.NOT_FOUND]: "Resource not found.",
    [ErrorType.BAD_REQUEST]: "Invalid request.",
    [ErrorType.RATE_LIMITED]: "Too many requests.",
    [ErrorType.AUTH_FAILED]: "Authentication failed.",
    [ErrorType.UNKNOWN]: "Something went wrong.",
  };
  return messages[errorType] || "An error occurred.";
};

export const isRetryableError = (errorType: ErrorType): boolean => {
  const retryable = [
    ErrorType.NETWORK_UNAVAILABLE,
    ErrorType.TIMEOUT,
    ErrorType.CONNECTION_REFUSED,
    ErrorType.DNS_RESOLUTION_FAILED,
    ErrorType.SERVER_ERROR,
    ErrorType.SERVICE_UNAVAILABLE,
    ErrorType.RATE_LIMITED,
  ];
  return retryable.includes(errorType);
};

export const createNetworkError = (
  type: ErrorType,
  message: string,
  statusCode?: number,
  originalError?: any
): NetworkError => {
  const error = new Error(message) as NetworkError;
  error.type = type;
  error.statusCode = statusCode;
  error.isRetryable = isRetryableError(type);
  error.originalError = originalError;
  return error;
};