import { Check, GitBranch, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-panel">
      <p className="border-b border-line px-4 py-2.5 font-mono text-xs text-muted">{title}</p>
      <div className="p-5">{children}</div>
    </div>
  );
}

const SEV: Record<string, string> = { CRITICAL: "bg-danger/20 text-danger", HIGH: "bg-danger/15 text-danger", MEDIUM: "bg-warn/15 text-warn", LOW: "bg-accent/15 text-accent", INFO: "bg-raised text-muted" };
const Sev = ({ level }: { level: string }) => <span className={cn("rounded px-1.5 py-0.5 font-mono text-xs", SEV[level])}>{level}</span>;

function SecurityPanel() {
  return (
    <Frame title="Security finding">
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted"><Sev level="HIGH" /><span>Requires verification</span><span>Confidence 74%</span></div>
      <p className="mt-3 font-medium">Potential SQL injection</p>
      <pre className="mt-3 overflow-x-auto rounded-md bg-canvas p-3 font-mono text-[12.5px] leading-6 text-muted"><span className="text-faint">84  </span>{'db.execute(f"SELECT * FROM users WHERE id = {user_id}")'}</pre>
      <p className="mt-3 text-sm leading-relaxed text-muted">The query is built from a request value. Evidence shows no parameterization on this path; exploitability depends on upstream validation.</p>
      <p className="mt-3 font-mono text-xs text-faint">backend/users.py, line 84</p>
    </Frame>
  );
}

function DebugPanel() {
  const steps = ["Parsing error", "Searching authentication flow", "Tracing token lifecycle", "Inspecting middleware", "Checking storage"];
  return (
    <Frame title="Debugging: users are randomly logged out">
      <ul className="flex flex-col gap-2 text-sm text-muted">{steps.map((s) => <li key={s} className="flex items-center gap-2.5"><Check size={14} className="text-ok" aria-hidden="true" />{s}</li>)}</ul>
      <div className="mt-5 border-t border-line pt-4">
        <p className="text-xs text-faint">Most likely root cause</p>
        <p className="mt-1 font-medium">Token expiry is calculated incorrectly</p>
        <div className="mt-3 flex items-center gap-3"><div className="h-1 flex-1 rounded-full bg-raised"><div className="h-1 w-[87%] rounded-full bg-accent" /></div><span className="font-mono text-xs text-muted">87%</span></div>
      </div>
    </Frame>
  );
}

function ReviewPanel() {
  const rows = [["HIGH", "Potential SQL injection", "backend/users.py:84"], ["MEDIUM", "Unbounded query inside a loop", "backend/reports.py:131"], ["LOW", "Function has 14 branches", "backend/billing.py:52"], ["INFO", "Public function has no docstring", "backend/utils.py:9"]];
  return (
    <Frame title="Review of 4 changed files">
      <ul className="divide-y divide-line">
        {rows.map(([lvl, msg, loc]) => (
          <li key={msg} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"><span className="w-[4.5rem] shrink-0"><Sev level={lvl ?? "INFO"} /></span><span className="min-w-0 flex-1 text-sm">{msg}</span><span className="hidden font-mono text-xs text-faint sm:inline">{loc}</span></li>
        ))}
      </ul>
    </Frame>
  );
}

function GitHubPanel() {
  return (
    <Frame title="Pull request draft">
      <p className="flex items-center gap-2 font-medium"><GitBranch size={15} className="text-accent" aria-hidden="true" />Fix token expiry calculation</p>
      <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
        {[["Files changed", "2"], ["Tests added", "1"], ["Security impact", "None"]].map(([k, v]) => <div key={k}><dt className="text-xs text-faint">{k}</dt><dd className="mt-1 font-mono">{v}</dd></div>)}
      </dl>
      <p className="mt-5 flex items-center gap-2 rounded-md border border-line bg-canvas px-3 py-2.5 text-sm text-muted"><ShieldCheck size={15} className="text-ok" aria-hidden="true" />Nothing is pushed until you approve.</p>
    </Frame>
  );
}

const BLOCKS = [
  { id: "security", title: "Security analysis that says what it knows", body: "Hardcoded secrets, injection risks, unsafe auth and more, reported with evidence, affected lines and a confidence level. Findings are worded as potential until the evidence supports more.", panel: <SecurityPanel /> },
  { id: "debugging", title: "Debugging that shows its work", body: "Describe a symptom or paste a stack trace. NEXUS searches the repository, traces the flow, ranks causes, and proposes a patch with a test.", panel: <DebugPanel /> },
  { id: "review", title: "Code review with severity", body: "Review a file, a diff or a pull request across bugs, performance, maintainability and edge cases. Each result links to the code and a suggested fix.", panel: <ReviewPanel /> },
  { id: "github", title: "A GitHub workflow you control", body: "Select a repository, analyze it, and when you approve a change NEXUS creates the branch, commits and drafts the pull request description.", panel: <GitHubPanel /> },
];

export function Showcases() {
  return (
    <>
      {BLOCKS.map((b, i) => (
        <section key={b.id} id={b.id} className="scroll-mt-16 border-t border-line py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
            <div className={cn(i % 2 === 1 && "lg:order-2")}>
              <h2 className="text-3xl font-semibold tracking-tight">{b.title}</h2>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-muted">{b.body}</p>
            </div>
            <div className={cn(i % 2 === 1 && "lg:order-1")}>{b.panel}</div>
          </div>
        </section>
      ))}
    </>
  );
}
