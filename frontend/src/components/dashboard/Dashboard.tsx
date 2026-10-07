"use client";

import { useEffect, useState } from "react";
import { RotateCw } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useWorkspace } from "@/components/shell/WorkspaceProvider";
import { cn } from "@/lib/cn";
import type { WorkspaceStats } from "@/lib/types";

const STATS: Array<{ key: keyof WorkspaceStats; label: string }> = [
  { key: "repositories_analyzed", label: "Repositories analyzed" },
  { key: "issues_detected", label: "Issues detected" },
  { key: "security_findings", label: "Security findings" },
  { key: "code_reviews", label: "Code reviews" },
  { key: "tests_generated", label: "Tests generated" },
];

function greeting(): string {
  const h = new Date().getHours();
  return h < 12 ? "Good morning." : h < 18 ? "Good afternoon." : "Good evening.";
}

function Panel({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-xl border border-line bg-panel", className)}>
      <h2 className="border-b border-line px-5 py-3 text-sm font-medium">{title}</h2>
      <div className="px-5 py-1">{children}</div>
    </section>
  );
}

export function Dashboard() {
  const { summary, health } = useWorkspace();
  const [hello, setHello] = useState("Welcome back.");
  useEffect(() => setHello(greeting()), []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{hello}</h1>
        <p className="mt-1 text-muted">Here&apos;s what NEXUS found across your projects.</p>
      </div>

      {summary.error && (
        <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-danger/40 bg-danger/5 px-5 py-4">
          <div>
            <p className="text-sm font-medium">Couldn&apos;t load your workspace</p>
            <p className="mt-0.5 text-sm text-muted">{summary.error.message}</p>
            {summary.error.requestId && <p className="mt-1 font-mono text-xs text-faint">Request {summary.error.requestId}</p>}
          </div>
          <Button onClick={() => { summary.reload(); health.reload(); }}><RotateCw size={14} aria-hidden="true" />Retry</Button>
        </div>
      )}

      <dl className="grid grid-cols-2 divide-x divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0 [&>div]:px-5 [&>div]:py-4">
        {STATS.map(({ key, label }) => (
          <div key={key}>
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="mt-2 font-mono text-2xl tabular-nums">
              {summary.loading ? <span className="inline-block h-7 w-8 animate-pulse rounded bg-raised" aria-label="Loading" /> : summary.data ? summary.data.stats[key] : "–"}
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Recent repositories">
          <EmptyState title="No repositories yet" body="Add a repository and NEXUS will index it, map its architecture and start looking for problems." action={<ButtonLink href="/repositories" variant="primary">Add a repository</ButtonLink>} />
        </Panel>
        <Panel title="Recent activity">
          <EmptyState title="No activity yet" body="Analyses, reviews and approved patches will be listed here as they happen." />
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="AI recommendations">
          <EmptyState title="Nothing to recommend yet" body="Once a repository is analyzed, NEXUS will flag authentication issues, risky dependencies and complex functions here." />
        </Panel>
        <Panel title="System status">
          {health.loading && <p className="py-4 text-sm text-muted">Checking services…</p>}
          {health.error && <p className="py-4 text-sm text-danger">{health.error.message}</p>}
          {health.data && (
            <ul className="divide-y divide-line">
              {health.data.components.map((c) => (
                <li key={c.name} className="flex items-start justify-between gap-4 py-3">
                  <div>
                    <p className="font-mono text-sm">{c.name}</p>
                    {c.detail && <p className="mt-0.5 text-xs text-muted">{c.detail}</p>}
                  </div>
                  <span className={cn("inline-flex items-center gap-1.5 text-xs", c.status === "ok" ? "text-ok" : "text-warn")}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", c.status === "ok" ? "bg-ok" : "bg-warn")} aria-hidden="true" />
                    {c.status === "ok" ? "Healthy" : "Unavailable"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
