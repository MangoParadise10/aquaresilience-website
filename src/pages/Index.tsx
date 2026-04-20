import { Link } from "react-router-dom";
import { ArrowRight, Database, Layers, ShieldAlert, Sparkles, Upload, Wand2 } from "lucide-react";

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-20 md:py-28 ${className}`}>{children}</section>
);

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden sea-bg text-primary-foreground">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 0%, hsl(var(--sea-aqua) / 0.35), transparent 50%), radial-gradient(ellipse at 80% 100%, hsl(var(--sea-3) / 0.6), transparent 60%)",
          }}
        />
        <div className="container-page relative pt-24 pb-28 md:pt-36 md:pb-40">
          <div className="max-w-4xl animate-fade-up">
            <div className="eyebrow-light mb-6">AquaResilience · Early stage</div>
            <h1 className="display text-primary-foreground">
              Turning fragmented water data into{" "}
              <span className="italic text-sea-aqua">reporting readiness</span>.
            </h1>
            <p className="lede mt-8 text-primary-foreground/75 max-w-2xl">
              We help industrial facilities — starting with food &amp; beverage manufacturers —
              turn messy water and wastewater data into structured, usable, reporting-ready workflows.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sea-aqua text-sea-1 font-medium hover:bg-sea-aqua/90 transition-colors"
              >
                Talk to us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/join"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/5 transition-colors"
              >
                Join us
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-primary-foreground/80 hover:text-sea-aqua transition-colors"
              >
                Become a pilot partner
              </Link>
            </div>
          </div>
        </div>
        <div className="aqua-rule" />
      </section>

      {/* Problem */}
      <Section>
        <div className="container-page grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="eyebrow mb-4">The problem</div>
            <h2 className="display-sm">The data isn't missing. It's unusable.</h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-6 text-foreground/80 text-lg leading-relaxed">
            <p>
              Industrial facilities — especially food and beverage manufacturers — depend heavily on
              water. But their water-related data is scattered across spreadsheets, owned by
              different teams, manually entered, and inconsistently formatted.
            </p>
            <p>
              The result is last-minute reporting stress, wasted time cleaning data, unreliable
              records, poor internal visibility, and avoidable compliance risk.
            </p>
            <p className="font-display text-2xl text-foreground italic">
              The problem is fragmented data that must be turned into reporting-ready outputs.
            </p>
          </div>
        </div>
      </Section>

      {/* Insight */}
      <Section className="bg-secondary/40">
        <div className="container-page">
          <div className="eyebrow mb-4">The insight</div>
          <h2 className="display-sm max-w-3xl">
            The same pattern appears across industries: water data is collected in pieces, owned by
            different teams, and only cleaned up when deadlines approach.
          </h2>
        </div>
      </Section>

      {/* Solution */}
      <Section>
        <div className="container-page grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="eyebrow mb-4">The solution</div>
            <h2 className="display-sm">A focused workflow, not another platform.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Not a broad ESG tool. A narrow, practical solution designed to fix one recurring
              problem well.
            </p>
            <Link to="/solution" className="inline-flex items-center gap-2 mt-6 text-sea-3 hover:text-sea-aqua transition-colors">
              See how it works <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-px bg-border">
            {[
              { icon: Upload, t: "Collect", d: "Pull fragmented water data from spreadsheets, CSVs, manual entries." },
              { icon: Layers, t: "Organize", d: "Normalize units, formats, and time-series data into one structure." },
              { icon: Database, t: "Map", d: "Align data with reporting structures and internal categories." },
              { icon: ShieldAlert, t: "Detect", d: "Flag missing fields, duplicates, inconsistencies, and anomalies." },
              { icon: Sparkles, t: "Prepare", d: "Generate reporting-ready datasets and plain-language summaries." },
              { icon: Wand2, t: "Iterate", d: "Build readiness habits, not just last-minute cleanup sprints." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="bg-background p-6 hover:bg-secondary/40 transition-colors">
                <Icon className="h-5 w-5 text-sea-3 mb-3" />
                <div className="font-medium mb-1">{t}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Before / After */}
      <Section className="sea-bg-soft text-primary-foreground">
        <div className="container-page">
          <div className="eyebrow-light mb-4">Before · After</div>
          <h2 className="display-sm text-primary-foreground max-w-2xl mb-14">
            From scattered spreadsheets to reporting-ready datasets.
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-primary-foreground/10">
            <div className="p-8 md:p-10 bg-sea-1/40">
              <div className="eyebrow-light mb-6 text-primary-foreground/60">Before</div>
              <ul className="space-y-3 text-primary-foreground/80">
                {[
                  "Fragmented spreadsheets",
                  "Mixed units across sites",
                  "Missing or inconsistent data",
                  "Manual reconciliation",
                  "Last-minute reporting scramble",
                ].map((x) => (
                  <li key={x} className="flex gap-3"><span className="text-primary-foreground/30">—</span>{x}</li>
                ))}
              </ul>
            </div>
            <div className="p-8 md:p-10 bg-sea-3/40">
              <div className="eyebrow-light mb-6">After</div>
              <ul className="space-y-3 text-primary-foreground">
                {[
                  "Structured, unified dataset",
                  "Standardized units",
                  "Clear issue detection",
                  "Organized reporting workflow",
                  "Reporting-ready outputs",
                ].map((x) => (
                  <li key={x} className="flex gap-3"><span className="text-sea-aqua">+</span>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Who it's for */}
      <Section>
        <div className="container-page grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="eyebrow mb-4">Who it's for</div>
            <h2 className="display-sm">Operators, not analysts.</h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 grid sm:grid-cols-2 gap-6">
            {[
              { t: "Primary users", items: ["Environmental / EHS managers", "Plant managers", "Wastewater & utilities leads", "Operations leaders", "Compliance teams"] },
              { t: "Industries", items: ["Food & beverage manufacturing", "Water-intensive industrial ops", "Facilities with discharge reporting"] },
            ].map(({ t, items }) => (
              <div key={t}>
                <div className="font-medium mb-3">{t}</div>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  {items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Vision */}
      <Section className="bg-secondary/40">
        <div className="container-page max-w-4xl">
          <div className="eyebrow mb-4">Vision</div>
          <p className="font-display text-3xl md:text-4xl leading-snug text-foreground">
            Start narrow with reporting readiness. Expand intentionally into multi-site standardization,
            benchmarking, wastewater cost visibility, and water resilience planning.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="container-page">
          <div className="border border-border p-10 md:p-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="display-sm">We're talking to operators now.</h2>
              <p className="lede mt-4">
                If you work in industrial water, wastewater, environmental compliance, or plant
                operations — we want to hear from you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/contact" className="px-6 py-3 bg-primary text-primary-foreground hover:bg-sea-2 transition-colors">
                Talk to us
              </Link>
              <Link to="/join" className="px-6 py-3 border border-border hover:border-foreground transition-colors">
                Join us
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Index;
