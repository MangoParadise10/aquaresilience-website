import { ArrowUpRight } from "lucide-react";
import { metrics, partners, projects } from "@/content/site";
import { Section, SectionHead } from "./Blocks";
import { Reveal } from "./Reveal";

/** Verified projects, metrics and partners. Renders nothing until src/content/site.ts has real entries. */
export const Evidence = () => {
  if (!projects.length && !metrics.length && !partners.length) return null;
  return (
    <Section className="bg-stone">
      <div className="container-page space-y-16">
        {metrics.length > 0 && (
          <div className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="bg-background p-8">
                <div className="display-sm text-sea-3">{m.value}</div>
                <div className="mt-2 font-medium">{m.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">{m.source}</div>
              </div>
            ))}
          </div>
        )}
        {projects.length > 0 && (
          <div>
            <SectionHead eyebrow="Projects" title="Work in the field." />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <Reveal key={p.title} delay={i * 80} className="card-lift p-8">
                  <div className="eyebrow mb-3">{p.status} · {p.location}</div>
                  <h3 className="font-display text-2xl">{p.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{p.summary}</p>
                  {p.href && <a href={p.href} className="link-arrow mt-6">Read more <ArrowUpRight className="h-4 w-4" /></a>}
                </Reveal>
              ))}
            </div>
          </div>
        )}
        {partners.length > 0 && (
          <div>
            <div className="eyebrow mb-6">Partners</div>
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
              {partners.map((p) => (
                <a key={p.name} href={p.href} className="text-foreground/60 hover:text-foreground transition-colors">
                  {p.logo ? <img src={p.logo} alt={p.name} className="h-10 w-auto" /> : <span className="font-display text-xl">{p.name}</span>}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};
