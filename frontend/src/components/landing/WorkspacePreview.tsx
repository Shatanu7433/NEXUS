"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";

const STEPS = [
  { id: "repo", label: "Repository", hint: "148 files indexed" },
  { id: "analysis", label: "AI analysis", hint: "Tracing the token lifecycle" },
  { id: "issue", label: "Issue detection", hint: "1 likely root cause" },
  { id: "fix", label: "Suggested fix", hint: "Patch drafted for review" },
  { id: "diff", label: "Code diff", hint: "Waiting for your approval" },
] as const;

const TREE = [
  ["backend/", 0], ["auth/tokens.py", 1], ["api/login.py", 1], ["middleware/auth.py", 1],
  ["frontend/", 0], ["hooks/useAuth.ts", 1], ["auth/session.ts", 1],
] as const;
const LANGS = [["TypeScript", 64], ["Python", 29], ["CSS", 7]] as const;
const CHECKS = ["Parsing error report", "Searching authentication flow", "Tracing token lifecycle", "Inspecting middleware", "Checking storage"];
const DIFF = [
  { t: "ctx", n: 41, s: "def issue_token(user_id: str) -> Token:" },
  { t: "ctx", n: 42, s: "    now = utcnow()" },
  { t: "del", n: 43, s: "    expires = now + timedelta(seconds=settings.TOKEN_TTL_MINUTES)" },
  { t: "add", n: 43, s: "    expires = now + timedelta(minutes=settings.TOKEN_TTL_MINUTES)" },
  { t: "ctx", n: 44, s: "    return Token(user_id=user_id, expires_at=expires)" },
] as const;

function Panel({ step }: { step: number }) {
  const reduce = useReducedMotion();
  if (step === 0)
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        <ul className="font-mono text-[13px] leading-7">
          {TREE.map(([name, depth]) => <li key={name} className={cn(depth ? "pl-5 text-muted" : "text-fg")}>{name}</li>)}
        </ul>
        <div className="flex flex-col gap-3">
          {LANGS.map(([lang, pct]) => (
            <div key={lang}>
              <div className="mb-1 flex justify-between text-xs text-muted"><span>{lang}</span><span className="font-mono">{pct}%</span></div>
              <div className="h-1 rounded-full bg-raised"><div className="h-1 rounded-full bg-accent" style={{ width: `${pct}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    );
  if (step === 1)
    return (
      <ul className="flex flex-col gap-2.5 text-sm">
        {CHECKS.map((c, i) => (
          <motion.li key={c} initial={reduce ? false : { opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduce ? 0 : i * 0.25 }} className="flex items-center gap-2.5 text-muted">
            <Check size={14} className="text-ok" aria-hidden="true" />{c}
          </motion.li>
        ))}
      </ul>
    );
  if (step === 2)
    return (
      <div className="rounded-lg border border-line-strong bg-canvas p-4">
        <div className="flex flex-wrap items-center gap-3 text-xs"><span className="rounded bg-danger/15 px-1.5 py-0.5 font-mono text-danger">HIGH</span><span className="text-muted">Confidence 87%</span></div>
        <p className="mt-3 font-medium">Token expiry is calculated incorrectly</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">The TTL setting is in minutes but is passed as seconds, so sessions end after a fraction of the intended time.</p>
        <p className="mt-3 font-mono text-xs text-faint">backend/auth/tokens.py, line 43</p>
      </div>
    );
  if (step === 3)
    return (
      <div className="text-sm leading-relaxed text-muted">
        <p className="font-medium text-fg">Pass the TTL as minutes</p>
        <p className="mt-2 max-w-md">A one-line change in <span className="font-mono text-fg">issue_token</span>. NEXUS also drafted a regression test that fails on the old code and passes on the new.</p>
        <p className="mt-4 text-xs text-faint">Nothing is applied to your repository until you approve it.</p>
      </div>
    );
  return (
    <div>
      <pre className="overflow-x-auto rounded-lg border border-line bg-canvas py-2 font-mono text-[12.5px] leading-6">
        {DIFF.map((l, i) => (
          <motion.div key={i} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : i * 0.12 }} className={cn("flex px-3", l.t === "add" && "bg-ok/10 text-ok", l.t === "del" && "bg-danger/10 text-danger", l.t === "ctx" && "text-muted")}>
            <span className="w-8 shrink-0 select-none text-faint">{l.n}</span>
            <span className="w-4 shrink-0 select-none">{l.t === "add" ? "+" : l.t === "del" ? "-" : " "}</span>
            <code>{l.s}</code>
          </motion.div>
        ))}
      </pre>
    </div>
  );
}

export function WorkspacePreview() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || reduce) return;
    if (step >= STEPS.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), 3200);
    return () => clearTimeout(t);
  }, [step, auto, reduce]);

  const pick = (i: number) => { setAuto(false); setStep(i); };

  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-panel shadow-2xl shadow-black/50" role="group" aria-label="Interactive NEXUS workspace preview">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <p className="font-mono text-xs text-muted">nexus-demo / backend/auth/tokens.py</p>
        <button type="button" onClick={() => { setAuto(true); setStep(0); }} className="inline-flex items-center gap-1.5 rounded px-1.5 py-1 text-xs text-muted hover:bg-raised hover:text-fg"><RotateCcw size={12} aria-hidden="true" />Replay</button>
      </div>
      <div className="grid md:grid-cols-[220px_1fr]">
        <ol className="flex gap-1 overflow-x-auto border-b border-line p-2 md:flex-col md:border-b-0 md:border-r">
          {STEPS.map((s, i) => (
            <li key={s.id} className="shrink-0">
              <button type="button" onClick={() => pick(i)} aria-current={i === step ? "step" : undefined} className={cn("w-full rounded-md px-3 py-2 text-left transition-colors", i === step ? "bg-raised" : "hover:bg-raised/50")}>
                <span className={cn("flex items-center gap-2 text-sm", i <= step ? "text-fg" : "text-faint")}>
                  <span className={cn("h-1.5 w-1.5 rounded-full", i < step ? "bg-ok" : i === step ? "bg-accent" : "bg-line-strong")} aria-hidden="true" />{s.label}
                </span>
                <span className="mt-0.5 hidden pl-3.5 text-xs text-faint md:block">{s.hint}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="min-h-[300px] p-5 sm:p-6" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.18 }}>
              <Panel step={step} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
