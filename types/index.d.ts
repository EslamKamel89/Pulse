export type ApiError = {
  statusCode: number;
  statusMessage: string;
  message: string;
  data?: Record<string, string>;
};
