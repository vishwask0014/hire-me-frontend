const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
const normalizedApiBaseUrl = rawApiBaseUrl?.replace(/\/+$/, "");

// Vercel dashboard URLs are not API hosts (e.g. vercel.com/...).
const isInvalidDashboardUrl =
  normalizedApiBaseUrl &&
  /https?:\/\/(?:www\.)?vercel\.com\//i.test(normalizedApiBaseUrl);

const API_BASE_URL =
  normalizedApiBaseUrl && !isInvalidDashboardUrl
    ? normalizedApiBaseUrl
    // : "https:/hire-me-backend-gamma.vercel.app/";
    : "http://localhost:4000";

if (typeof window !== "undefined" && isInvalidDashboardUrl) {
  console.error(
    "NEXT_PUBLIC_API_BASE_URL points to a Vercel dashboard URL. Use your deployed backend domain (e.g. https://your-backend.vercel.app).",
  );
}

export function apiUrl(path) {
  const normalizedPath = String(path || "").replace(/^\/+/, "");
  return `${API_BASE_URL}/${normalizedPath}`;
}

export const requestOptions = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};
