// Mirrors backend/app/schemas. Keep in sync until OpenAPI codegen is added.
export type ComponentStatus = "ok" | "unavailable";

export interface ComponentHealth {
  name: string;
  status: ComponentStatus;
  detail: string | null;
}

export interface HealthResponse {
  status: "ok" | "degraded";
  version: string;
  environment: string;
  components: ComponentHealth[];
}

export interface WorkspaceStats {
  repositories_analyzed: number;
  issues_detected: number;
  security_findings: number;
  code_reviews: number;
  tests_generated: number;
}

export interface WorkspaceSummary {
  workspace: { id: string; name: string };
  user: { id: string; name: string; email: string | null };
  stats: WorkspaceStats;
}
