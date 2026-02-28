const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") ||
  "https://vercel.com/vishwashkamals-projects/hire-me-backend/HZMGtaFPdoPRgEUkRJ7kodCoBFSz";
// "http://localhost:4000";

export function apiUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
}

export const requestOptions = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};
