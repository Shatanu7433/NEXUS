"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { ACCOUNT_NAV, WORKSPACE_NAV, type NavItem } from "@/lib/nav";
import { Logo } from "@/components/ui/Logo";

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = pathname === item.href;
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex h-8 items-center gap-2.5 rounded-md px-2.5 text-sm transition-colors",
        active ? "bg-raised text-fg" : "text-muted hover:bg-raised/60 hover:text-fg",
      )}
    >
      {active && <span className="absolute -left-3 h-4 w-0.5 rounded-full bg-accent" aria-hidden="true" />}
      <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
      {item.label}
    </Link>
  );
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Main" className="flex h-full flex-col border-r border-line bg-panel px-3 py-4">
      <div className="px-2.5 pb-5"><Logo href="/dashboard" /></div>
      <p className="px-2.5 pb-1.5 text-xs text-faint">Workspace</p>
      <ul className="flex flex-col gap-0.5">
        {WORKSPACE_NAV.map((item) => (
          <li key={item.href}><NavLink item={item} onNavigate={onNavigate} /></li>
        ))}
      </ul>
      <ul className="mt-auto flex flex-col gap-0.5 border-t border-line pt-3">
        {ACCOUNT_NAV.map((item) => (
          <li key={item.href}><NavLink item={item} onNavigate={onNavigate} /></li>
        ))}
      </ul>
    </nav>
  );
}
