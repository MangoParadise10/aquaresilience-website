import { ArrowUpRight } from "lucide-react";
import { insights, insightsPage } from "@/content/site";
import { CtaBand, PageHero, Section } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";

const Insights = () => (
  <>
    <PageHero eyebrow="Research and water intelligence" title={insightsPage.title} lead={insightsPage.lead} />
    <Section>
      <div className="container-page">
        <div className="flex flex-wrap gap-2 mb-12">
          {insightsPage.topics.map((t) => (
            <span key={t} className="rounded-full border border-border bg-stone px-4 py-1.5 text-sm text-foreground/80">{t}</span>
          ))}
        </div>
        {insights.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((p, i) => (
              <Reveal key={p.href} delay={(i % 3) * 80}>
                <a href={p.href} className="card-lift block p-8 h-full">
                  <div className="eyebrow mb-3">{p.date}</div>
                  <h2 className="font-display text-2xl leading-tight">{p.title}</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{p.summary}</p>
                  <span className="link-arrow mt-6">Read <ArrowUpRight className="h-4 w-4" /></span>
                </a>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="rounded-3xl border border-dashed border-border p-12 md:p-16 text-center">
            <p className="font-display text-2xl md:text-3xl max-w-2xl mx-auto">{insightsPage.empty}</p>
          </Reveal>
        )}
      </div>
    </Section>
    <CtaBand />
  </>
);

export default Insights;
