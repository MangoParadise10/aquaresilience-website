import { Link } from "react-router-dom";

const steps = [
  { n: "01", t: "Upload", d: "Spreadsheets, CSVs, or manual entries from multiple sources and teams." },
  { n: "02", t: "Structure", d: "Normalize units, formats, and time-series data into one consistent shape." },
  { n: "03", t: "Map", d: "Align data with reporting structures and internal categories." },
  { n: "04", t: "Detect", d: "Flag missing data, duplicates, inconsistencies, and anomalies." },
  { n: "05", t: "Prepare", d: "Generate reporting-ready datasets and plain-language summaries." },
];

const features = [
  "Multi-source data ingestion (CSV, Excel, manual)",
  "Data normalization and unit standardization",
  "AI-assisted field mapping and interpretation",
  "Reporting readiness checks",
  "Data issue detection (missing fields, duplicates, anomalies)",
  "Plain-language summaries and reporting drafts",
  "Simple dashboard with readiness indicators",
];

const Solution = () => (
  <>
    <section className="sea-bg text-primary-foreground">
      <div className="container-page py-24 md:py-32">
        <div className="eyebrow-light mb-6">The solution</div>
        <h1 className="display max-w-4xl text-primary-foreground">
          One workflow. <span className="italic text-sea-aqua">Done well.</span>
        </h1>
        <p className="lede mt-6 text-primary-foreground/75 max-w-2xl">
          A narrow, practical solution that turns messy water data into something structured,
          usable, and reporting-ready — not another sprawling ESG platform.
        </p>
      </div>
      <div className="aqua-rule" />
    </section>

    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="eyebrow mb-4">How it works</div>
        <h2 className="display-sm mb-14 max-w-2xl">Five steps from raw data to reporting readiness.</h2>
        <div className="space-y-px bg-border">
          {steps.map((s) => (
            <div key={s.n} className="bg-background grid md:grid-cols-12 gap-6 p-8 hover:bg-secondary/40 transition-colors">
              <div className="md:col-span-2 font-display text-3xl text-sea-3">{s.n}</div>
              <div className="md:col-span-3 font-medium text-lg">{s.t}</div>
              <div className="md:col-span-7 text-muted-foreground leading-relaxed">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-secondary/40">
      <div className="container-page grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="eyebrow mb-4">Core features</div>
          <h2 className="display-sm">Built for early-stage clarity.</h2>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <ul className="divide-y divide-border">
            {features.map((f) => (
              <li key={f} className="py-4 text-foreground/85 flex gap-4">
                <span className="text-sea-aqua">●</span>{f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="eyebrow mb-4">What makes this different</div>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {[
            { t: "Focused", d: "One real workflow — not a broad platform that tries to do everything." },
            { t: "Real-world", d: "Built around messy, operational data as it actually exists in plants." },
            { t: "Practical", d: "Designed for plant and reporting realities, not theoretical frameworks." },
          ].map((x) => (
            <div key={x.t} className="border-t border-border pt-6">
              <div className="font-display text-xl mb-2">{x.t}</div>
              <p className="text-muted-foreground leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 flex gap-3">
          <Link to="/contact" className="px-6 py-3 bg-primary text-primary-foreground hover:bg-sea-2 transition-colors">
            Become a pilot partner
          </Link>
          <Link to="/join" className="px-6 py-3 border border-border hover:border-foreground transition-colors">
            Help build it
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default Solution;
