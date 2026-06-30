/**
 * Returns the base URL for all API calls.
 *
 * - On Vercel: set VITE_API_BASE_URL to your Railway backend URL
 *   e.g. https://urus-api.up.railway.app/api
 * - On Replit (dev): falls back to the relative /api path served by the proxy
 */
export function getApiBase(): string {
  const explicit = (import.meta.env.VITE_API_BASE_URL as string | undefined);
  if (explicit) return explicit.replace(/\/$/, "");
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  return `${base}/api`;
}
