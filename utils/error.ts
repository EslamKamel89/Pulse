import type { ApiError } from "~/types";

export function handleApiError(error: any): ApiError {
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Internal Server Error";
  const message = error.message || "Something went wrong";
  const data = error.data || null;
  pr(error.response, "handleApiError - error response");
  return {
    statusCode,
    statusMessage,
    message,
    data,
  };
}
