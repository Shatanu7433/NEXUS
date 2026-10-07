import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 text-sm text-muted sm:px-8">
        <Logo />
        <p>Your AI Software Engineer.</p>
        <p className="font-mono text-xs text-faint">v0.1.0</p>
      </div>
    </footer>
  );
}
