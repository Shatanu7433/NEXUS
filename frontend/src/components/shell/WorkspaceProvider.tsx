"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ApiError } from "@/lib/api";
import type { HealthResponse, WorkspaceSummary } from "@/lib/types";
import { useFetch } from "@/lib/use-fetch";

interface Resource<T> { data: T | null; error: ApiError | null; loading: boolean; reload: () => void }
interface WorkspaceContextValue { summary: Resource<WorkspaceSummary>; health: Resource<HealthResponse> }

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const summary = useFetch<WorkspaceSummary>("/api/workspace/summary");
  const health = useFetch<HealthResponse>("/api/health");
  return <WorkspaceContext.Provider value={{ summary, health }}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used inside WorkspaceProvider");
  return ctx;
}
