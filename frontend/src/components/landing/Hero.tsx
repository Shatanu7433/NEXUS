import { ButtonLink } from "@/components/ui/Button";
import { WorkspacePreview } from "./WorkspacePreview";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
      <p className="font-mono text-sm text-muted">Understand. Debug. Improve. Ship.</p>
      <h1 className="mt-5 text-[clamp(3.5rem,11vw,8rem)] font-semibold leading-[0.9] tracking-[-0.045em]">NEXUS</h1>
      <p className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">Your AI Software Engineer.</p>
      <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
        Understand your codebase, debug complex problems, review changes, and ship better software with an AI engineer that works alongside you.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/repositories" variant="primary" size="lg">Analyze a Repository</ButtonLink>
        <ButtonLink href="#preview" size="lg">View Demo</ButtonLink>
      </div>
      <div id="preview" className="mt-16 scroll-mt-20"><WorkspacePreview /></div>
    </section>
  );
}
