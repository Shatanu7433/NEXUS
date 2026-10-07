import { ButtonLink } from "@/components/ui/Button";

export function Cta() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">Point NEXUS at a repository.</h2>
        <p className="mt-4 max-w-md text-[17px] text-muted">Start with the built-in demo, or upload your own project.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/repositories" variant="primary" size="lg">Analyze a Repository</ButtonLink>
          <ButtonLink href="/dashboard" size="lg">Open workspace</ButtonLink>
        </div>
      </div>
    </section>
  );
}
