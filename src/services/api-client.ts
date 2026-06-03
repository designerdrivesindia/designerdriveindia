/**
 * Reusable API client for the Elysia backend.
 *
 * - Reads the base URL from NEXT_PUBLIC_API_URL.
 * - Sends credentials so HTTP-only refresh cookies flow automatically.
 * - Centralises error handling into a typed ApiError.
 * - Single-flight token refresh on 401 (for authenticated/admin calls).
 */

// Same-origin Next.js API routes by default; override for an external API.
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Skip the automatic refresh-on-401 retry (e.g. for the refresh call itself). */
  skipRefresh?: boolean;
}

let refreshPromise: Promise<boolean> | null = null;

async function refreshTokens(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then((r) => r.ok)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

export async function apiFetch<T>(
  path: string,
  { body, headers, skipRefresh, ...init }: RequestOptions = {},
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_URL}${path}`;

  const doFetch = () =>
    fetch(url, {
      ...init,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

  let res = await doFetch();

  // Attempt a single token refresh on unauthorized.
  if (res.status === 401 && !skipRefresh) {
    const refreshed = await refreshTokens();
    if (refreshed) res = await doFetch();
  }

  const isJson = res.headers
    .get("content-type")
    ?.includes("application/json");
  const payload = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const message =
      (payload && typeof payload === "object" && "message" in payload
        ? String((payload as { message: unknown }).message)
        : null) ?? `Request failed (${res.status})`;
    throw new ApiError(message, res.status, payload);
  }

  return payload as T;
}
