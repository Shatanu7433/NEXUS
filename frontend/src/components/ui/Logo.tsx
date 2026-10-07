import Link from "next/link";

export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 18V6l14 12V6" stroke="rgb(var(--accent))" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" />
      <circle cx="5" cy="6" r="1.8" fill="rgb(var(--fg))" />
      <circle cx="19" cy="18" r="1.8" fill="rgb(var(--fg))" />
    </svg>
  );
}

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 font-semibold tracking-tight" aria-label="NEXUS home">
      <LogoMark />
      <span className="text-[15px]">NEXUS</span>
    </Link>
  );
}
