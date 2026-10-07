import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

export function buttonClass(variant: Variant = "secondary", size: Size = "md") {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 disabled:opacity-50",
    size === "lg" ? "h-11 px-5 text-[15px]" : "h-9 px-3.5 text-sm",
    variant === "primary" && "bg-accent text-accent-ink hover:bg-accent/90",
    variant === "secondary" && "border border-line-strong bg-raised text-fg hover:border-faint",
    variant === "ghost" && "text-muted hover:bg-raised hover:text-fg",
  );
}

interface LinkProps { href: string; variant?: Variant; size?: Size; children: ReactNode; className?: string }

export function ButtonLink({ href, variant, size, children, className }: LinkProps) {
  const external = href.startsWith("http");
  return external ? (
    <a href={href} className={cn(buttonClass(variant, size), className)} target="_blank" rel="noreferrer">{children}</a>
  ) : (
    <Link href={href} className={cn(buttonClass(variant, size), className)}>{children}</Link>
  );
}

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; size?: Size }

export function Button({ variant, size, className, ...rest }: BtnProps) {
  return <button className={cn(buttonClass(variant, size), className)} {...rest} />;
}
