"use client";

import { useEffect, useRef } from "react";
import { Bell, ChevronsUpDown, Menu, Search } from "lucide-react";
import { Popover } from "@/components/ui/Popover";
import { cn } from "@/lib/cn";
import { useWorkspace } from "./WorkspaceProvider";

export function Header({ onMenu }: { onMenu: () => void }) {
  const { summary, health } = useWorkspace();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const workspaceName = summary.data?.workspace.name ?? "Workspace";
  const userName = summary.data?.user.name ?? "Account";
  const apiState = health.loading ? "checking" : health.error ? "offline" : health.data?.status === "ok" ? "ok" : "degraded";

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line bg-canvas/80 px-4 backdrop-blur">
      <button type="button" onClick={onMenu} aria-label="Open navigation" className="-ml-1 rounded-md p-2 text-muted hover:bg-raised hover:text-fg lg:hidden">
        <Menu size={18} />
      </button>

      <Popover label="Workspace selector" align="left" triggerClassName="h-8 px-2.5 text-sm" trigger={<><span className="font-medium">{workspaceName}</span><ChevronsUpDown size={14} className="text-faint" aria-hidden="true" /></>}>
        <p className="px-2 py-1.5 text-xs text-faint">Workspaces</p>
        <div className="flex items-center justify-between rounded-md bg-raised px-2 py-2 text-sm">
          <span>{workspaceName}</span><span className="text-xs text-accent">Current</span>
        </div>
        <p className="px-2 pb-1 pt-3 text-xs leading-relaxed text-muted">Team workspaces arrive with GitHub sign-in.</p>
      </Popover>

      <div className="relative mx-auto hidden w-full max-w-md md:block">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" aria-hidden="true" />
        <input ref={searchRef} type="search" aria-label="Search" placeholder="Search files, symbols and findings" className="h-8 w-full rounded-md border border-line bg-panel pl-9 pr-12 text-sm placeholder:text-faint focus:border-line-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
        <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-line px-1.5 font-mono text-[11px] text-faint">Ctrl K</kbd>
      </div>

      <div className="ml-auto flex items-center gap-1 md:ml-0">
        <span className="mr-2 hidden items-center gap-1.5 text-xs text-muted sm:inline-flex" role="status">
          <span className={cn("h-1.5 w-1.5 rounded-full", apiState === "ok" && "bg-ok", apiState === "degraded" && "bg-warn", apiState === "offline" && "bg-danger", apiState === "checking" && "bg-faint")} aria-hidden="true" />
          {apiState === "ok" ? "API online" : apiState === "checking" ? "Connecting" : apiState === "degraded" ? "API degraded" : "API offline"}
        </span>

        <Popover label="Notifications" triggerClassName="h-8 w-8 justify-center text-muted hover:text-fg" trigger={<Bell size={16} aria-hidden="true" />}>
          <p className="px-2 py-1.5 text-xs text-faint">Notifications</p>
          <p className="px-2 pb-2 text-sm leading-relaxed text-muted">Nothing new. Findings and finished analyses will show up here.</p>
        </Popover>

        <Popover label="Profile menu" triggerClassName="h-8 w-8 justify-center" trigger={<span className="flex h-6 w-6 items-center justify-center rounded-full bg-raised text-xs font-medium ring-1 ring-line-strong">{userName.slice(0, 1).toUpperCase()}</span>}>
          <div className="px-2 py-2">
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-muted">{summary.data?.user.email ?? "Signed in with the local dev provider"}</p>
          </div>
        </Popover>
      </div>
    </header>
  );
}
