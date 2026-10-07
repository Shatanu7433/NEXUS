import { Activity, FlaskConical, FolderGit2, Gauge, GitPullRequest, type LucideIcon, Settings, ShieldAlert, Sparkles, UserRound, FileCode2 } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  phase: number;
  summary: string;
}

export const WORKSPACE_NAV: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: Gauge, phase: 1, summary: "What NEXUS found across your projects." },
  { href: "/repositories", label: "Repositories", icon: FolderGit2, phase: 2, summary: "Upload a ZIP or open the demo repository, then watch NEXUS index it." },
  { href: "/codebase", label: "Codebase", icon: FileCode2, phase: 4, summary: "Browse files, search symbols and jump to definitions in an editor." },
  { href: "/ai-engineer", label: "AI Engineer", icon: Sparkles, phase: 5, summary: "Ask questions about a repository and get answers grounded in its code." },
  { href: "/reviews", label: "Reviews", icon: GitPullRequest, phase: 7, summary: "Review a file or diff for bugs, performance and maintainability." },
  { href: "/security", label: "Security", icon: ShieldAlert, phase: 7, summary: "Potential vulnerabilities with evidence, confidence and remediation." },
  { href: "/tests", label: "Tests", icon: FlaskConical, phase: 7, summary: "Generate tests that match the framework your repository already uses." },
  { href: "/activity", label: "Activity", icon: Activity, phase: 7, summary: "A log of analyses, patches and approvals." },
];

export const ACCOUNT_NAV: NavItem[] = [
  { href: "/settings", label: "Settings", icon: Settings, phase: 9, summary: "Workspace, AI provider and security preferences." },
  { href: "/account", label: "Account", icon: UserRound, phase: 8, summary: "Your profile and connected GitHub account." },
];

export const ALL_NAV = [...WORKSPACE_NAV, ...ACCOUNT_NAV];
