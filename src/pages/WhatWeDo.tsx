import { Check } from "lucide-react";
import { whatWeDo, whatWeDoPage } from "@/content/site";
import { CtaBand, EmergingNote, Num, PageHero, Section, SectionHead } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { serviceIcons } from "@/lib/icons";

const WhatWeDo = () => (
  <>
    <PageHero eyebrow={whatWeDoPage.title} title={whatWeDo.headline}
      lead={<>{whatWeDoPage.intro.map((p) => <p key={p} className="mt-3 first:mt-0">{p}</p>)}</>}>
      <div className="mt-10 flex flex-wrap gap-2">
        {whatWeDo.disciplines.map((d) => (
          <span key={d} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80">{d}</span>
        ))}
      </div>
    </PageHero>

    <Section>
      <div className="container-page">
        <SectionHead eyebrow="Services" title="Six ways we help." intro={whatWeDo.intro} />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.services.map((s, i) => {
            const Icon = serviceIcons[i];
            return (
              <Reveal key={s.title} delay={(i % 3) * 90} className="card-lift group p-8">
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
      </div>
    </Section>

    <Section className="bg-stone">
      <div className="container-page">
        <SectionHead eyebrow="How the work unfolds" title="From discovery to a defined pilot." />
        <div className="mt-14 space-y-6">
          {whatWeDoPage.capabilities.map((c, i) => (
            <Reveal key={c.title} className="grid lg:grid-cols-12 gap-8 rounded-3xl bg-background border border-border p-8 md:p-12">
              <div className="lg:col-span-4">
                <Num n={i + 1} />
                <h3 className="mt-4 font-display text-3xl leading-tight">{c.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{c.lead}</p>
              </div>
              <ul className="lg:col-span-7 lg:col-start-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 content-start">
                {c.items.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-border pb-3 text-foreground/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sea-4" /> {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 space-y-4">
          <EmergingNote><strong className="font-semibold">Important note.</strong> {whatWeDoPage.note}</EmergingNote>
          <EmergingNote>{whatWeDo.disclaimer}</EmergingNote>
        </div>
      </div>
    </Section>

    <CtaBand />
  </>
);

export default WhatWeDo;
