import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#security", label: "Security" },
  { href: "#architecture", label: "Architecture" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm text-muted md:flex">
          {LINKS.map((l) => <a key={l.href} href={l.href} className="transition-colors hover:text-fg">{l.label}</a>)}
        </nav>
        <ButtonLink href="/dashboard">Open workspace</ButtonLink>
      </div>
    </header>
  );
}
