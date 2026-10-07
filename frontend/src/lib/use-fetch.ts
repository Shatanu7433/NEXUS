"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError, apiGet } from "@/lib/api";

interface FetchState<T> {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
}

export function useFetch<T>(path: string) {
  const [state, setState] = useState<FetchState<T>>({ data: null, error: null, loading: true });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    apiGet<T>(path, ctrl.signal)
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((err: unknown) => {
        if (ctrl.signal.aborted) return;
        const error = err instanceof ApiError ? err : new ApiError("Unexpected error.", 0, "unknown");
        setState({ data: null, error, loading: false });
      });
    return () => ctrl.abort();
  }, [path, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, reload };
}
