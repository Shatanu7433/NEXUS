import { Section } from "./Section";

const LAYERS = [
  ["Frontend", "Next.js, TypeScript, Tailwind, Framer Motion, Monaco"],
  ["API", "FastAPI with typed Pydantic contracts and structured errors"],
  ["Application services", "Repository, search, review and patch workflows"],
  ["AI orchestration", "Planner, Repository, Debugger, Reviewer, Security, Test, Fix and Writer agents with explicit tool permissions"],
  ["Code intelligence", "Tree-sitter parsing, symbol extraction, syntax-aware chunking"],
  ["Indexing", "Repository scanning, filtering and embedding"],
  ["Storage", "PostgreSQL with pgvector"],
] as const;

export function Architecture() {
  return (
    <Section id="architecture" title="Every layer is replaceable" intro="AI providers, databases, GitHub and search sit behind interfaces. Swapping one doesn't mean rewriting the app.">
      <ol className="overflow-hidden rounded-xl border border-line">
        {LAYERS.map(([name, detail]) => (
          <li key={name} className="grid gap-1 border-b border-line bg-panel px-5 py-4 last:border-b-0 sm:grid-cols-[200px_1fr] sm:gap-6">
            <span className="font-medium">{name}</span>
            <span className="text-sm text-muted">{detail}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
