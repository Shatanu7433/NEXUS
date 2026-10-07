import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({ id, title, intro, children, className }: { id?: string; title: string; intro?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("scroll-mt-16 border-t border-line py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {intro && <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">{intro}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
