export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const TIMEOUT_MS = 8000;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
    readonly requestId?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  signal?.addEventListener("abort", () => ctrl.abort(), { once: true });

  try {
    const res = await fetch(`${API_BASE}${path}`, { signal: ctrl.signal, headers: { Accept: "application/json" } });
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: { code?: string; message?: string; request_id?: string } } | null;
      throw new ApiError(
        body?.error?.message ?? `Request failed (${res.status}).`,
        res.status,
        body?.error?.code ?? "http_error",
        body?.error?.request_id,
      );
    }
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof ApiError || signal?.aborted) throw err;
    const timedOut = ctrl.signal.aborted;
    throw new ApiError(
      timedOut ? "The API took too long to respond." : "Can't reach the NEXUS API. Check that the backend is running.",
      0,
      timedOut ? "timeout" : "network_error",
    );
  } finally {
    clearTimeout(timer);
  }
}
