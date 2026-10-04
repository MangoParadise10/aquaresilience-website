import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { why } from "@/content/site";
import { CtaBand, Num, PageHero, Section } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { Ancient } from "./Index";

const WhyDignoria = () => (
  <>
    <PageHero eyebrow={why.title} title={why.headline} />

    <Section>
      <div className="container-page grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3 hidden lg:block">
          <nav className="sticky top-32 space-y-1" aria-label="On this page">
            {why.problems.map((p, i) => (
              <a key={p.title} href={`#problem-${i + 1}`} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-stone hover:text-foreground transition-colors">
                <Num n={i + 1} /> {p.title.replace("The ", "")}
              </a>
            ))}
          </nav>
        </aside>
        <div className="lg:col-span-8 lg:col-start-5 space-y-20">
          {why.problems.map((p, i) => (
            <Reveal as="article" key={p.title} className="scroll-mt-28" >
              <div id={`problem-${i + 1}`} className="scroll-mt-28 flex items-center gap-4 mb-5">
                <Num n={i + 1} />
                <span className="h-px flex-1 bg-border" />
              </div>
              <h2 className="display-sm">{p.title}</h2>
              <div className="mt-6 prose-body text-lg leading-relaxed text-foreground/80">
                {p.body.map((b, j) => (
                  <p key={b} className={j === p.body.length - 1 ? "font-display text-2xl leading-snug text-foreground !mt-8 border-l-4 border-sea-aqua pl-5" : ""}>{b}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>

    <section className="sea-bg-soft text-white py-24 md:py-32">
      <Reveal className="container-page max-w-4xl text-center">
        <p className="font-display text-2xl md:text-3xl text-white/70">{why.closing[0]}</p>
        <p className="mt-6 display-sm text-white">{why.closing[1]}</p>
        <Link to="/our-approach" className="btn-primary mt-12">See our approach <ArrowRight className="h-4 w-4" /></Link>
      </Reveal>
    </section>

    <Ancient />
    <CtaBand />
  </>
);

export default WhyDignoria;
