import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-sm text-faint">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">That page doesn&apos;t exist</h1>
      <p className="max-w-sm text-muted">The link may be out of date, or the page hasn&apos;t been built yet.</p>
      <ButtonLink href="/dashboard" variant="primary">Go to your workspace</ButtonLink>
    </main>
  );
}
