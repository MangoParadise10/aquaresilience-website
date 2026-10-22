import { useState } from "react";
import { Check, Linkedin, Plus } from "lucide-react";
import { about, brand, team } from "@/content/site";
import { Noria } from "@/components/site/Art";
import { CtaBand, EmergingNote, Num, PageHero, Section, SectionHead } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";

const failures = about.notEnough.body[0].split(". ").map((s) => s.replace(/\.$/, "") + ".");

const TeamGrid = () => {
  const [open, setOpen] = useState<string | null>(null);
  if (!team.length) return null;
  return (
    <Section>
      <div className="container-page">
        <SectionHead eyebrow="People" title="The team behind Dignoria." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <Reveal key={m.name} className="card-lift overflow-hidden">
              <div className="aspect-[4/5] bg-stone">
                {m.photo && <img src={m.photo} alt={m.name} className="h-full w-full object-cover" />}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.role}</p>
                  </div>
                  {m.linkedin && <a href={m.linkedin} aria-label={`${m.name} on LinkedIn`} className="text-sea-4 hover:text-sea-3"><Linkedin className="h-5 w-5" /></a>}
                </div>
                <button onClick={() => setOpen(open === m.name ? null : m.name)} className="link-arrow mt-4" aria-expanded={open === m.name}>
                  Bio <Plus className={`h-4 w-4 transition-transform ${open === m.name ? "rotate-45" : ""}`} />
                </button>
                {open === m.name && <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};

const About = () => (
  <>
    <PageHero eyebrow={about.title} title={<>{brand.tagline[0]} <span className="literary glow-text !font-medium">{brand.tagline[1]}</span></>} lead={about.lead} />

    <Section>
      <div className="container-page grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Why we exist" title="Dignoria sees another possibility." />
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7 prose-body text-lg leading-relaxed text-foreground/80">
          {about.intro.filter((p) => p !== "Dignoria sees another possibility.").map((p) => <p key={p}>{p}</p>)}
        </Reveal>
      </div>
    </Section>

    <section className="sea-bg text-white py-20 md:py-28">
      <div className="container-page">
        <SectionHead title={about.notEnough.headline} light />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {failures.map((f, i) => (
            <Reveal key={f} delay={i * 100} className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
              <Num n={i + 1} light />
              <p className="mt-4 text-lg leading-relaxed text-white/85">{f}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 max-w-3xl text-lg leading-relaxed text-white/75">{about.notEnough.body[1]}</Reveal>
      </div>
    </section>

    <Section>
      <div className="container-page">
        <SectionHead eyebrow="Origin of the name" title={about.name.headline} />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch">
          <Reveal className="card-lift p-8">
            <div className="eyebrow mb-4">Dignity</div>
            <p className="text-lg leading-relaxed">{about.name.dignity}</p>
          </Reveal>
          <div className="hidden lg:grid place-items-center font-display text-4xl text-sea-4">+</div>
          <Reveal delay={100} className="card-lift p-8 relative overflow-hidden">
            <Noria className="absolute -right-16 -bottom-16 w-56 text-sea-aqua/15" />
            <div className="eyebrow mb-4">Noria</div>
            <p className="relative text-lg leading-relaxed">{about.name.noria}</p>
          </Reveal>
          <div className="hidden lg:grid place-items-center font-display text-4xl text-sea-4">=</div>
          <Reveal delay={200} className="rounded-2xl sea-bg p-8 text-white flex flex-col justify-center">
            <div className="font-display text-4xl">Dignoria</div>
            <p className="mt-4 font-display text-2xl leading-snug">{brand.tagline[0]} <span className="literary glow-text !font-medium">{brand.tagline[1]}</span></p>
          </Reveal>
        </div>
      </div>
    </Section>

    <Section className="bg-stone">
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-3">
          {about.pmv.map((v, i) => (
            <Reveal key={v.title} delay={i * 100} className="card-lift p-8 md:p-10">
              <div className="eyebrow mb-5">{v.title}</div>
              <p className={`leading-relaxed ${i === 0 ? "font-display text-2xl" : "text-foreground/80"}`}>{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>

    <Section>
      <div className="container-page grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Our promise" title={about.promise.headline} intro={about.promise.intro} />
        </div>
        <ol className="lg:col-span-6 lg:col-start-7 border-t border-border">
          {about.promise.items.map((p, i) => (
            <Reveal as="li" key={p} delay={i * 70} className="flex items-baseline gap-6 border-b border-border py-6">
              <Num n={i + 1} />
              <span className="font-display text-2xl">{p}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>

    <Section className="bg-stone">
      <div className="container-page grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <SectionHead eyebrow="Looking ahead" title={about.ambition.headline} intro={about.ambition.intro} />
          <Reveal className="mt-8"><EmergingNote>Dignoria is an emerging venture. These are ambitions, not yet operating results.</EmergingNote></Reveal>
        </div>
        <ul className="lg:col-span-6 lg:col-start-7 space-y-3">
          {about.ambition.items.map((a, i) => (
            <Reveal as="li" key={a} delay={i * 60} className="flex gap-4 rounded-xl bg-background border border-border p-5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-sea-4" />
              <span className="leading-relaxed">{a}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>

    <Section>
      <div className="container-page">
        <SectionHead eyebrow="How we will be measured" title={about.success.headline}
          intro={<>{about.success.intro.map((p) => <p key={p} className="mt-2 first:mt-0">{p}</p>)}</>} />
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border grid-cols-2 lg:grid-cols-4">
          {about.success.items.map((s, i) => (
            <Reveal key={s} delay={(i % 4) * 70} className={`p-8 md:p-10 transition-colors ${i === about.success.items.length - 1 ? "sea-bg text-white" : "bg-background hover:bg-stone"}`}>
              <Num n={i + 1} light={i === about.success.items.length - 1} />
              <p className="mt-6 font-display text-xl md:text-2xl leading-tight">{s}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>

    <TeamGrid />
    <CtaBand />
  </>
);

export default About;
