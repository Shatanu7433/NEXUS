"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Section } from "./Section";

const SYMBOLS = [
  { name: "issue_token", kind: "function", start: 41, end: 44, code: ["def issue_token(user_id: str) -> Token:", "    now = utcnow()", "    expires = now + timedelta(minutes=settings.TOKEN_TTL_MINUTES)", "    return Token(user_id=user_id, expires_at=expires)"] },
  { name: "verify_token", kind: "function", start: 47, end: 53, code: ["def verify_token(raw: str) -> Token:", "    token = decode(raw)", "    if token.expires_at <= utcnow():", "        raise TokenExpired()", "    if not store.is_active(token.id):", "        raise TokenRevoked()", "    return token"] },
  { name: "TokenStore", kind: "class", start: 58, end: 64, code: ["class TokenStore:", "    def __init__(self, db: Database) -> None:", "        self._db = db", "", "    def is_active(self, token_id: str) -> bool:", "        row = self._db.fetch_one(ACTIVE_QUERY, token_id)", "        return row is not None"] },
] as const;

export function CodeIntelligence() {
  const [i, setI] = useState(0);
  const sym = SYMBOLS[i] ?? SYMBOLS[0];
  return (
    <Section id="intelligence" title="Chunks that follow your code's structure" intro="NEXUS parses each file into functions and classes instead of cutting it every few hundred characters, so retrieved context is whole and traceable.">
      <div className="grid overflow-hidden rounded-xl border border-line-strong bg-panel md:grid-cols-[240px_1fr]">
        <div role="tablist" aria-label="Symbols in backend/auth/tokens.py" className="border-b border-line p-2 md:border-b-0 md:border-r">
          <p className="px-3 py-2 font-mono text-xs text-faint">backend/auth/tokens.py</p>
          {SYMBOLS.map((s, idx) => (
            <button key={s.name} role="tab" aria-selected={idx === i} onClick={() => setI(idx)} className={cn("flex w-full items-baseline justify-between rounded-md px-3 py-2 text-left font-mono text-sm", idx === i ? "bg-raised text-fg" : "text-muted hover:bg-raised/50")}>
              {s.name}<span className="text-xs text-faint">{s.kind}</span>
            </button>
          ))}
        </div>
        <div role="tabpanel" className="grid lg:grid-cols-[1fr_260px]">
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6">
            {sym.code.map((line, n) => (
              <div key={n} className="flex"><span className="w-9 shrink-0 select-none text-faint">{sym.start + n}</span><code className="text-muted">{line}</code></div>
            ))}
          </pre>
          <dl className="border-t border-line p-5 font-mono text-xs leading-7 lg:border-l lg:border-t-0">
            {[["file_path", "backend/auth/tokens.py"], ["language", "python"], ["symbol", sym.name], ["kind", sym.kind], ["line_start", String(sym.start)], ["line_end", String(sym.end)]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3"><dt className="text-faint">{k}</dt><dd className="truncate text-fg">{v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
