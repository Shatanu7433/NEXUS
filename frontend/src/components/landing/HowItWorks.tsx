import { Section } from "./Section";

const STEPS = [
  { title: "Connect a repository", body: "Upload a ZIP or open the built-in demo. GitHub connection follows the same path." },
  { title: "NEXUS builds an index", body: "Files are parsed into functions and classes, embedded, and stored so questions are answered from your actual code." },
  { title: "Ask, debug and review", body: "Paste a stack trace or ask where something lives. Every answer links to the exact lines it used." },
  { title: "Approve and ship", body: "Review the diff and generated tests. Nothing changes in your repository, or on GitHub, without your approval." },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" title="From repository to reviewed fix">
      <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className="bg-canvas p-6">
            <span className="font-mono text-sm text-accent">{i + 1}</span>
            <h3 className="mt-6 font-medium">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
