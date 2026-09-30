import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { whoWeServe } from "@/content/site";
import { CtaBand, PageHero, Section } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";
import { audienceIcons } from "@/lib/icons";

const WhoWeServe = () => (
  <>
    <PageHero eyebrow="Who we serve" title={whoWeServe.headline} />
    <Section>
      <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {whoWeServe.audiences.map((a, i) => {
          const Icon = audienceIcons[i];
          const wide = i === whoWeServe.audiences.length - 1;
          return (
            <Reveal key={a.title} delay={(i % 3) * 90}
              className={`card-lift group p-8 md:p-10 flex flex-col ${wide ? "md:col-span-2 lg:col-span-3 lg:flex-row lg:items-center lg:gap-12 sea-bg text-white !border-transparent" : ""}`}>
              <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${wide ? "bg-sea-aqua text-primary" : "bg-stone text-sea-3 group-hover:bg-sea-aqua group-hover:text-primary transition-colors"}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className={wide ? "mt-8 lg:mt-0 flex-1" : "mt-8"}>
                <h2 className={`font-display text-2xl leading-tight ${wide ? "text-white md:text-3xl" : ""}`}>{a.title}</h2>
                <p className={`mt-4 leading-relaxed ${wide ? "text-white/75 text-lg" : "text-muted-foreground"}`}>{a.text}</p>
              </div>
              {wide && <Link to="/contact?topic=partner" className="btn-primary mt-8 lg:mt-0 shrink-0">Collaborate with us <ArrowRight className="h-4 w-4" /></Link>}
            </Reveal>
          );
        })}
      </div>
    </Section>
    <CtaBand />
  </>
);

export default WhoWeServe;
