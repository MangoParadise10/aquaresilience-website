import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  ancient, approach, brand, challenge, coreBelief, ethos, hero, humanOutcome, meaning, partnerships, persia, principles, whatWeDo, whoWeServe,
} from "@/content/site";
import { Girih, Mark, Noria, Qanat } from "@/components/site/Art";
import { CtaBand, EmergingNote, Floor, Num, Section, SectionHead } from "@/components/site/Blocks";
import { Evidence } from "@/components/site/Evidence";
import { Reveal } from "@/components/site/Reveal";
import { audienceIcons, serviceIcons } from "@/lib/icons";

const Hero = () => (
  <section className="relative -mt-20 pt-20 min-h-[100svh] flex flex-col overflow-hidden">
    <Noria className="pointer-events-none absolute -right-[18vw] top-1/2 -translate-y-1/2 w-[78vw] max-w-[1100px] opacity-[0.16]" />
    <div className="container-page relative flex-1 flex flex-col justify-center py-16">
      <div className="animate-fade-up">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-white/80 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-clay shadow-[0_0_10px_hsl(var(--clay))]" /> An emerging water-resilience venture
        </div>
        <div className="eyebrow mb-6">{hero.eyebrow}</div>
        <h1>
          <span className="display block silver-text drop-shadow-[0_4px_30px_rgba(120,180,255,0.35)]">{brand.tagline[0]}</span>
          <span className="literary block text-[3.25rem] sm:text-8xl lg:text-[8.5rem] leading-[0.95] glow-text mt-2">{brand.tagline[1]}</span>
        </h1>
      </div>
      <div className="mt-12 grid lg:grid-cols-12 gap-6 items-end">
        <Reveal className="lg:col-span-6 glass rounded-3xl p-7 md:p-8">
          <p className="text-lg leading-relaxed text-white/85">{hero.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/why-dignoria" className="btn-primary">{hero.primaryCta} <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/contact" className="btn-ghost-light">{hero.secondaryCta}</Link>
          </div>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-5 lg:col-start-8">
          <p className="literary text-2xl md:text-3xl text-white/85 leading-snug">{hero.supporting}</p>
        </Reveal>
      </div>
    </div>
    <a href="#descend" className="relative mx-auto mb-8 flex flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.4em] text-white/60 hover:text-white transition-colors">
      Descend <ArrowDown className="h-4 w-4 animate-bounce" />
    </a>
  </section>
);

const Marquee = () => {
  const row = [...ethos.marquee, ...ethos.marquee];
  return (
    <div id="descend" className="relative border-y border-white/15 bg-white/[0.03] backdrop-blur-md py-6 overflow-hidden">
      <div className="marquee items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className={`font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tight ${i % 2 ? "outline-text" : "silver-text"}`}>{t}</span>
            <Mark ring={false} className="h-9 w-9 shrink-0 opacity-80" />
          </span>
        ))}
      </div>
    </div>
  );
};

const Challenge = () => (
  <Section>
    <div className="container-page">
      <Floor className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="The challenge" title={challenge.headline} />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal className="prose-body text-lg leading-relaxed text-white/80">
            {challenge.body.map((p) => <p key={p}>{p}</p>)}
          </Reveal>
          <Reveal delay={120} className="mt-10 rounded-2xl border-l-2 border-sea-aqua bg-sea-aqua/[0.06] p-7">
            <p className="literary text-3xl leading-snug text-white">{challenge.callout}</p>
          </Reveal>
        </div>
      </Floor>
    </div>
  </Section>
);

const Meaning = () => (
  <Section>
    <div className="container-page">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="What Dignoria means for water" title={meaning.headline} />
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7 glass rounded-3xl p-8 prose-body text-lg leading-relaxed text-white/80">
          {meaning.body.map((p) => <p key={p}>{p}</p>)}
        </Reveal>
      </div>
      <Reveal className="mt-24 text-center">
        <div className="eyebrow mb-4">Our core belief</div>
        <p className="display-md silver-text max-w-4xl mx-auto">{coreBelief.headline}</p>
        <p className="mt-6 text-white/75 max-w-2xl mx-auto leading-relaxed text-lg">{coreBelief.body}</p>
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {coreBelief.pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 100} className="card-lift p-10 text-center">
            <div className="font-display text-7xl font-extrabold outline-text">{String(i + 1).padStart(2, "0")}</div>
            <h3 className="mt-4 font-display text-3xl uppercase tracking-tight silver-text">{p.title}</h3>
            <p className="mt-3 text-white/70 leading-relaxed">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </Section>
);

const Ethos = () => (
  <section className="relative py-28 md:py-40 overflow-hidden">
    <div className="container-page relative">
      <Reveal>
        <p className="font-display font-extrabold uppercase tracking-tight leading-[0.9] text-[1.95rem] sm:text-7xl lg:text-[6.2rem] outline-text">{ethos.impossible[0]}</p>
      </Reveal>
      <Reveal delay={150}>
        <p className="font-display font-extrabold uppercase tracking-tight leading-[0.9] text-[1.95rem] sm:text-7xl lg:text-[6.2rem] silver-text mt-2">{ethos.impossible[1]}</p>
      </Reveal>
      <Reveal delay={300}>
        <p className="literary text-3xl sm:text-4xl lg:text-[3.4rem] leading-[1.08] glow-text mt-6 max-w-5xl">{ethos.impossible[2]}</p>
      </Reveal>

      <div className="mt-20 grid lg:grid-cols-12 gap-6">
        <Reveal className="lg:col-span-7 glass-strong rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
          <Girih className="absolute inset-0" opacity={0.14} />
          <div className="relative">
            <div className="eyebrow mb-5">Interdependence</div>
            <p className="literary text-3xl md:text-[2.6rem] leading-[1.15] text-white">“{ethos.collective}”</p>
            <p className="mt-6 text-white/70 leading-relaxed">{ethos.unthinkable}</p>
          </div>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-5 glass rounded-[2rem] p-8 md:p-12">
          <div className="eyebrow mb-5">The angle</div>
          <p className="font-display text-2xl md:text-3xl font-bold leading-tight">{ethos.crisis}</p>
          <p className="mt-6 text-white/70">{ethos.doorsLead}</p>
          <ul className="mt-4 space-y-2">
            {ethos.doors.map((d, i) => (
              <li key={d} className="flex items-center gap-4 border-b border-white/10 py-2.5 font-display text-lg">
                <span className="text-sea-aqua text-sm tabular-nums">{String(i + 1).padStart(2, "0")}</span>{d}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);

const HumanOutcome = () => (
  <Section>
    <div className="container-page">
      <Floor className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <SectionHead eyebrow="The human outcome" title={humanOutcome.headline} />
          <Reveal className="mt-8 text-lg leading-relaxed text-white/75"><p>{humanOutcome.body[0]}</p></Reveal>
        </div>
        <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
          <blockquote className="literary text-4xl md:text-5xl leading-[1.1] text-white">
            {humanOutcome.body[1].split(". ")[0]}. <span className="glow-text">{humanOutcome.body[1].split(". ")[1]}</span>
          </blockquote>
          <p className="mt-8 text-white/65 leading-relaxed">{humanOutcome.body[2]}</p>
        </Reveal>
      </Floor>
    </div>
  </Section>
);

export const ServiceCards = () => (
  <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {whatWeDo.services.map((s, i) => {
      const Icon = serviceIcons[i];
      return (
        <Reveal key={s.title} delay={(i % 3) * 90} className="card-lift group p-8 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/25 bg-white/10 text-sea-aqua transition-all group-hover:bg-white group-hover:text-[hsl(224_80%_6%)] group-hover:shadow-[0_0_30px_hsl(188_100%_72%/0.6)]">
              <Icon className="h-5 w-5" />
            </div>
            <span className="font-display text-4xl font-extrabold outline-text">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="mt-8 font-display text-2xl leading-tight">{s.title}</h3>
          <p className="mt-4 text-white/70 leading-relaxed text-[0.95rem]">{s.text}</p>
        </Reveal>
      );
    })}
  </div>
);

const Services = () => (
  <Section>
    <div className="container-page">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <SectionHead eyebrow="What we do" title={whatWeDo.headline} intro={whatWeDo.intro} />
        <Reveal><Link to="/what-we-do" className="btn-ghost shrink-0">Explore our capabilities <ArrowRight className="h-4 w-4" /></Link></Reveal>
      </div>
      <ServiceCards />
      <Reveal className="mt-10"><EmergingNote>{whatWeDo.disclaimer}</EmergingNote></Reveal>
    </div>
  </Section>
);

const Audiences = () => {
  const [active, setActive] = useState(0);
  const a = whoWeServe.audiences[active];
  const Icon = audienceIcons[active];
  return (
    <Section>
      <div className="container-page">
        <Floor>
          <SectionHead eyebrow="Who we serve" title={whoWeServe.headline} />
          <div className="mt-14 grid lg:grid-cols-12 gap-10">
            <ul className="lg:col-span-6 border-t border-white/10" role="tablist" aria-label="Who we serve">
              {whoWeServe.audiences.map((x, i) => (
                <li key={x.title}>
                  <button role="tab" aria-selected={i === active} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
                    className={`w-full flex items-center justify-between gap-4 border-b border-white/10 py-5 text-left transition-all ${i === active ? "text-white pl-3" : "text-white/45 hover:text-white/80"}`}>
                    <span className="flex items-center gap-5">
                      <Num n={i + 1} light />
                      <span className="font-display text-xl md:text-2xl">{x.title}</span>
                    </span>
                    <ArrowRight className={`h-5 w-5 shrink-0 transition-all ${i === active ? "text-sea-aqua opacity-100" : "-translate-x-2 opacity-0"}`} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="lg:col-span-5 lg:col-start-8">
              <div key={active} className="lg:sticky lg:top-32 glass rounded-3xl p-10 animate-fade-up">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[hsl(224_80%_6%)] shadow-[0_0_30px_hsl(188_100%_72%/0.6)]"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-8 font-display text-3xl">{a.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-white/75">{a.text}</p>
                <Link to="/who-we-serve" className="link-arrow mt-8">See everyone we serve <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </Floor>
      </div>
    </Section>
  );
};

/** Persian water history: the qanat, Shushtar, the āb anbār and the yakhchāl. */
export const Ancient = () => (
  <section className="relative py-24 md:py-32 overflow-hidden">
    <Girih className="absolute inset-0" opacity={0.1} />
    <div className="container-page relative">
      <div className="grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-7">
          <SectionHead eyebrow={persia.eyebrow} title={<span className="silver-text">{persia.headline}</span>} />
        </div>
        <Reveal className="lg:col-span-5 glass rounded-3xl p-7 text-lg leading-relaxed text-white/80">{persia.intro}</Reveal>
      </div>

      <Reveal className="mt-14 glass-strong rounded-[2rem] p-6 md:p-10">
        <Qanat className="w-full" />
      </Reveal>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {persia.systems.map((s, i) => (
          <Reveal key={s.name} delay={i * 90} className="card-lift p-7">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl">{s.name}</h3>
              <span dir="rtl" lang="fa" className="text-2xl text-sea-aqua/90" style={{ fontFamily: "'Noto Naskh Arabic', 'Geeza Pro', 'Tahoma', serif" }}>{s.fa}</span>
            </div>
            <p className="mt-4 text-white/70 leading-relaxed text-[0.95rem]">{s.text}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 prose-body text-lg leading-relaxed text-white/75">
          <SectionHead eyebrow="Ancient intelligence" title={ancient.headline} />
          <Reveal className="mt-8">{ancient.body.map((p) => <p key={p}>{p}</p>)}</Reveal>
        </div>
        <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
          <blockquote className="literary text-[1.7rem] md:text-[2.5rem] leading-[1.12] glow-text">“{ancient.quote}”</blockquote>
        </Reveal>
      </div>
    </div>
  </section>
);

export const Steps = () => (
  <Section>
    <div className="container-page">
      <SectionHead eyebrow="Our approach" title={approach.headline} />
      <div className="relative mt-16">
        <div className="absolute left-0 right-0 top-7 hidden lg:block aqua-rule" />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {approach.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className="relative">
              <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full glass-strong font-display text-xl font-extrabold text-white shadow-[0_0_30px_hsl(188_100%_72%/0.45)]">
                {i + 1}
              </div>
              <div className="mt-6 glass rounded-2xl p-5 h-[calc(100%-5rem)]">
                <h3 className="font-display text-xl">{s.title}</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  </Section>
);

export const Principles = () => (
  <Section>
    <div className="container-page">
      <SectionHead eyebrow="Principles" title={principles.headline} />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {principles.items.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 80} className="card-lift p-9">
            <span className="font-display text-5xl font-extrabold outline-text">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-5 font-display text-2xl leading-tight">{p.title}</h3>
            <p className="mt-4 text-white/70 leading-relaxed">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </Section>
);

export const Partnerships = () => (
  <Section>
    <div className="container-page">
      <Floor className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Partnerships" title={partnerships.headline} />
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7 prose-body text-lg leading-relaxed text-white/80">
          {partnerships.body.map((p) => <p key={p}>{p}</p>)}
          <Link to="/contact" className="btn-primary mt-8">{partnerships.cta} <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </Floor>
    </div>
  </Section>
);

const Index = () => (
  <>
    <Hero />
    <Marquee />
    <Challenge />
    <Meaning />
    <Ethos />
    <HumanOutcome />
    <Services />
    <Audiences />
    <Ancient />
    <Steps />
    <Evidence />
    <Principles />
    <Partnerships />
    <CtaBand />
  </>
);

export default Index;
