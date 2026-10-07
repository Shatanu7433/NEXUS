import { Bug, FlaskConical, GitPullRequest, Search, ShieldAlert, Sparkles, Waypoints, Wrench } from "lucide-react";
import { Section } from "./Section";

const ITEMS = [
  { icon: Search, title: "Explore the codebase", body: "Browse files and search by meaning, keyword, symbol or path, all at once." },
  { icon: Sparkles, title: "Ask about the repository", body: "Find where authentication lives, or how a request travels through the system." },
  { icon: Bug, title: "Debug errors", body: "Paste a stack trace. NEXUS traces execution and ranks the likely causes." },
  { icon: GitPullRequest, title: "Review code", body: "Bugs, performance, readability and edge cases, each with a severity." },
  { icon: ShieldAlert, title: "Detect security issues", body: "Potential vulnerabilities with evidence and confidence, never overclaimed." },
  { icon: Wrench, title: "Generate fixes", body: "Structured patches shown as a diff you accept, reject or regenerate." },
  { icon: FlaskConical, title: "Write tests", body: "Tests that match the framework your project already uses." },
  { icon: Waypoints, title: "Open pull requests", body: "A described, reviewable PR created only after you approve." },
];

export function Capabilities() {
  return (
    <Section id="capabilities" title="Built for working in real codebases" intro="One workspace for reading, questioning and changing code.">
      <ul className="grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, body }) => (
          <li key={title}>
            <Icon size={18} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
            <h3 className="mt-3 font-medium">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
