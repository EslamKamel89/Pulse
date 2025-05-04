export type ApiError = {
  statusCode?: number;
  statusMessage: string;
  message: string;
  data?: Record<string, string>;
};

export type NavRoute = {
  label: string;
  href: string;
  icon: string;
  active: boolean;
  onClick: (() => void) | null;
};
