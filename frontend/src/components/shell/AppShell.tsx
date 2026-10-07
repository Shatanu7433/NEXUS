"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { WorkspaceProvider } from "./WorkspaceProvider";

export function AppShell({ children }: { children: ReactNode }) {
  const [drawer, setDrawer] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => setDrawer(false), [pathname]);
  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer]);

  return (
    <WorkspaceProvider>
      <div className="flex h-dvh overflow-hidden">
        <aside className="hidden w-60 shrink-0 lg:block"><Sidebar /></aside>

        <AnimatePresence>
          {drawer && (
            <>
              <motion.div className="fixed inset-0 z-40 bg-black/60 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} aria-hidden="true" />
              <motion.aside className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden" initial={reduce ? false : { x: -264 }} animate={{ x: 0 }} exit={reduce ? undefined : { x: -264 }} transition={{ duration: 0.18, ease: "easeOut" }}>
                <button type="button" onClick={() => setDrawer(false)} aria-label="Close navigation" className="absolute right-2 top-3.5 z-10 rounded-md p-1.5 text-muted hover:bg-raised"><X size={16} /></button>
                <Sidebar onNavigate={() => setDrawer(false)} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <div className="flex min-w-0 flex-1 flex-col">
          <Header onMenu={() => setDrawer(true)} />
          <main id="main" className="flex-1 overflow-y-auto">
            <motion.div key={pathname} initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.16 }} className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8">
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </WorkspaceProvider>
  );
}
