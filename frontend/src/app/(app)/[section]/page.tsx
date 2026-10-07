import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_NAV } from "@/lib/nav";

type Props = { params: Promise<{ section: string }> };

const SECTIONS = ALL_NAV.filter((n) => n.href !== "/dashboard");
const find = (slug: string) => SECTIONS.find((n) => n.href === `/${slug}`);

export function generateStaticParams() {
  return SECTIONS.map((n) => ({ section: n.href.slice(1) }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = find((await params).section);
  return { title: item?.label ?? "Not found" };
}

export default async function SectionPage({ params }: Props) {
  const item = find((await params).section);
  if (!item) notFound();
  const Icon = item.icon;
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{item.label}</h1>
        <p className="mt-1 text-muted">{item.summary}</p>
      </div>
      <div className="flex items-start gap-4 rounded-xl border border-line bg-panel p-6">
        <Icon size={20} strokeWidth={1.5} className="mt-0.5 text-faint" aria-hidden="true" />
        <div>
          <p className="text-sm font-medium">Built in Phase {item.phase}</p>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">
            The navigation is in place so routes and layout are settled. This screen gets its real data and actions in Phase {item.phase}.
          </p>
        </div>
      </div>
    </div>
  );
}
