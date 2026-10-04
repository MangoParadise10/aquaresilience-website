import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  ancient, approach, challenge, coreBelief, hero, humanOutcome, meaning, partnerships, principles, whatWeDo, whoWeServe, brand,
} from "@/content/site";
import { Aqueduct, FlowLines, Noria } from "@/components/site/Art";
import { CtaBand, EmergingNote, Num, Section, SectionHead } from "@/components/site/Blocks";
import { Evidence } from "@/components/site/Evidence";
import { Reveal } from "@/components/site/Reveal";
import { audienceIcons, serviceIcons } from "@/lib/icons";

const Hero = () => (
  <section className="relative overflow-hidden sea-bg text-white -mt-20 pt-20 min-h-[100svh] flex flex-col">
    <div className="absolute inset-0 grain opacity-60" />
    <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[70vw] max-w-[820px] aspect-square rounded-full bg-sea-aqua/10 blur-3xl" />
    <div className="container-page relative flex-1 grid lg:grid-cols-12 items-center gap-10 py-16">
      <div className="lg:col-span-7 animate-fade-up">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-clay" /> An emerging water-resilience venture
        </div>
        <div className="eyebrow-light mb-6">{hero.eyebrow}</div>
        <h1 className="display text-white">
          {brand.tagline[0]}<br />
          <span className="italic text-sea-aqua">{brand.tagline[1]}</span>
        </h1>
        <p className="lede mt-8 text-white/75 max-w-2xl">{hero.description}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/why-dignoria" className="btn-primary">{hero.primaryCta} <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/contact" className="btn-ghost-light">{hero.secondaryCta}</Link>
        </div>
      </div>
      <div className="lg:col-span-5 relative hidden md:flex justify-center">
        <Noria className="w-full max-w-[480px] text-sea-aqua/70 drop-shadow-[0_0_40px_hsl(var(--sea-aqua)/0.25)]" />
      </div>
    </div>
    <div className="relative">
      <FlowLines className="absolute inset-x-0 bottom-0 h-40 w-full text-sea-aqua/50" />
      <div className="container-page relative pb-10">
        <p className="font-display italic text-lg md:text-xl text-white/80 max-w-2xl">{hero.supporting}</p>
      </div>
    </div>
    <div className="aqua-rule" />
  </section>
);

const Challenge = () => (
  <Section>
    <div className="container-page grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <SectionHead eyebrow="The challenge" title={challenge.headline} />
        </div>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <Reveal className="prose-body text-lg leading-relaxed text-foreground/80">
          {challenge.body.map((p) => <p key={p}>{p}</p>)}
        </Reveal>
        <Reveal delay={120} className="mt-10 rounded-2xl bg-stone border-l-4 border-sea-aqua p-8">
          <p className="font-display text-2xl leading-snug text-foreground">{challenge.callout}</p>
        </Reveal>
      </div>
    </div>
  </Section>
);

const Meaning = () => (
  <Section className="bg-stone">
    <div className="container-page">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="What Dignoria means for water" title={meaning.headline} />
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7 prose-body text-lg leading-relaxed text-foreground/80">
          {meaning.body.map((p) => <p key={p}>{p}</p>)}
        </Reveal>
      </div>
      <Reveal className="mt-20 text-center">
        <div className="eyebrow mb-3">Our core belief</div>
        <p className="display-sm max-w-3xl mx-auto">{coreBelief.headline}</p>
        <p className="mt-5 text-muted-foreground max-w-2xl mx-auto leading-relaxed">{coreBelief.body}</p>
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {coreBelief.pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 100} className="card-lift p-8 text-center">
            <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-sea-aqua/10 text-sea-3">
              <Num n={i + 1} />
            </div>
            <h3 className="font-display text-3xl">{p.title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </Section>
);

const HumanOutcome = () => (
  <section className="relative overflow-hidden sea-bg-soft text-white py-24 md:py-32">
    <Noria className="absolute -left-40 top-1/2 -translate-y-1/2 w-[560px] text-white/[0.05]" spin={false} />
    <div className="container-page relative grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-6">
        <SectionHead eyebrow="The human outcome" title={humanOutcome.headline} light />
        <Reveal className="mt-8 text-lg leading-relaxed text-white/75">
          <p>{humanOutcome.body[0]}</p>
        </Reveal>
      </div>
      <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
        <blockquote className="font-display text-3xl md:text-4xl leading-tight text-white">
          “{humanOutcome.body[1].split(". ")[0]}. <span className="italic text-sea-aqua">{humanOutcome.body[1].split(". ")[1]}</span>”
        </blockquote>
        <p className="mt-8 text-white/65 leading-relaxed">{humanOutcome.body[2]}</p>
      </Reveal>
    </div>
  </section>
);

const Services = () => (
  <Section>
    <div className="container-page">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <SectionHead eyebrow="What we do" title={whatWeDo.headline} intro={whatWeDo.intro} />
        <Reveal><Link to="/what-we-do" className="btn-ghost shrink-0">Explore our capabilities <ArrowRight className="h-4 w-4" /></Link></Reveal>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {whatWeDo.services.map((s, i) => {
          const Icon = serviceIcons[i];
          return (
            <Reveal key={s.title} delay={(i % 3) * 90} className="card-lift group p-8 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-sea-aqua transition-colors group-hover:bg-sea-aqua group-hover:text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <Num n={i + 1} />
              </div>
              <h3 className="mt-8 font-display text-2xl leading-tight">{s.title}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed text-[0.95rem]">{s.text}</p>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="mt-10"><EmergingNote>{whatWeDo.disclaimer}</EmergingNote></Reveal>
    </div>
  </Section>
);

const Audiences = () => {
  const [active, setActive] = useState(0);
  const a = whoWeServe.audiences[active];
  const Icon = audienceIcons[active];
  return (
    <Section className="sea-bg text-white relative overflow-hidden">
      <div className="container-page relative">
        <SectionHead eyebrow="Who we serve" title={whoWeServe.headline} light />
        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          <ul className="lg:col-span-6 border-t border-white/10" role="tablist" aria-label="Who we serve">
            {whoWeServe.audiences.map((x, i) => (
              <li key={x.title}>
                <button role="tab" aria-selected={i === active} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
                  className={`w-full flex items-center justify-between gap-4 border-b border-white/10 py-5 text-left transition-colors ${i === active ? "text-white" : "text-white/50 hover:text-white/80"}`}>
                  <span className="flex items-center gap-5">
                    <Num n={i + 1} light />
                    <span className="font-display text-xl md:text-2xl">{x.title}</span>
                  </span>
                  <ArrowRight className={`h-5 w-5 shrink-0 transition-all ${i === active ? "text-sea-aqua translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} />
                </button>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-5 lg:col-start-8">
            <div key={active} className="lg:sticky lg:top-32 rounded-3xl border border-white/10 bg-white/[0.04] p-10 animate-fade-up">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-sea-aqua text-primary"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-8 font-display text-3xl text-white">{a.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-white/75">{a.text}</p>
              <Link to="/who-we-serve" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sea-aqua hover:text-white transition-colors">
                See everyone we serve <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export const Steps = () => (
  <Section>
    <div className="container-page">
      <SectionHead eyebrow="Our approach" title={approach.headline} />
      <div className="relative mt-16">
        <div className="absolute left-0 right-0 top-6 hidden lg:block h-px bg-gradient-to-r from-sea-aqua via-sea-4 to-transparent" />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          {approach.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className="relative">
              <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-background border-2 border-sea-aqua font-display text-lg text-sea-3">
                {i + 1}
              </div>
              <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  </Section>
);

export const Ancient = () => (
  <Section className="bg-stone overflow-hidden">
    <div className="container-page grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-6">
        <SectionHead eyebrow="Ancient intelligence" title={ancient.headline} />
        <Reveal className="mt-8 prose-body text-lg leading-relaxed text-foreground/80">
          {ancient.body.map((p) => <p key={p}>{p}</p>)}
        </Reveal>
      </div>
      <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
        <Aqueduct className="w-full text-sea-4/70" />
        <blockquote className="mt-10 border-l-4 border-clay pl-6 font-display text-3xl md:text-4xl leading-tight italic">
          {ancient.quote}
        </blockquote>
      </Reveal>
    </div>
  </Section>
);

export const Principles = () => (
  <Section>
    <div className="container-page">
      <SectionHead eyebrow="Principles" title={principles.headline} />
      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {principles.items.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 80} className="group bg-background p-10 transition-colors hover:bg-stone">
            <Num n={i + 1} />
            <h3 className="mt-5 font-display text-2xl leading-tight">{p.title}</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </Section>
);

export const Partnerships = () => (
  <Section className="!pt-0">
    <div className="container-page">
      <div className="grid lg:grid-cols-12 gap-12 rounded-3xl bg-stone p-8 md:p-14">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Partnerships" title={partnerships.headline} />
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7 prose-body text-lg leading-relaxed text-foreground/80">
          {partnerships.body.map((p) => <p key={p}>{p}</p>)}
          <Link to="/contact" className="btn-dark mt-8">{partnerships.cta} <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
      </div>
    </div>
  </Section>
);

const Index = () => (
  <>
    <Hero />
    <Challenge />
    <Meaning />
    <HumanOutcome />
    <Services />
    <Audiences />
    <Steps />
    <Evidence />
    <Ancient />
    <Principles />
    <Partnerships />
    <CtaBand />
  </>
);

export default Index;
