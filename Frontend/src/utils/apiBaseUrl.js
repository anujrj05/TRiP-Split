export const getApiBaseUrl = () => {
  const configuredUrl = import.meta.env.REACT_APP_BASE_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  // Production: same domain serves frontend + API (single Vercel deploy)
  if (import.meta.env.PROD) {
    return "";
  }

  // Local dev fallback
  return "http://localhost:4000";
};
