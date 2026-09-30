import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { FlowLines, Noria } from "./Art";
import { Reveal } from "./Reveal";
import { finalCta } from "@/content/site";

export const Section = ({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-20 md:py-28 ${className}`}>{children}</section>
);

/** Dark hero used at the top of every inner page. */
export const PageHero = ({ eyebrow, title, lead, children }: {
  eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode;
}) => (
  <section className="relative overflow-hidden sea-bg text-primary-foreground -mt-20 pt-20">
    <FlowLines className="absolute inset-x-0 bottom-0 h-48 w-full text-sea-aqua/40" />
    <Noria className="absolute -right-32 -top-24 w-[520px] text-white/[0.06] hidden md:block" />
    <div className="container-page relative py-20 md:py-28">
      <div className="max-w-4xl animate-fade-up">
        <div className="eyebrow-light mb-6">{eyebrow}</div>
        <h1 className="display-md text-white">{title}</h1>
        {lead && <div className="lede mt-7 text-white/75 max-w-3xl">{lead}</div>}
        {children}
      </div>
    </div>
    <div className="aqua-rule" />
  </section>
);

export const SectionHead = ({ eyebrow, title, intro, center = false, light = false }: {
  eyebrow?: string; title: ReactNode; intro?: ReactNode; center?: boolean; light?: boolean;
}) => (
  <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
    {eyebrow && <div className={`${light ? "eyebrow-light" : "eyebrow"} mb-4`}>{eyebrow}</div>}
    <h2 className={`display-sm ${light ? "text-white" : ""}`}>{title}</h2>
    {intro && <div className={`mt-6 text-lg leading-relaxed ${light ? "text-white/75" : "text-muted-foreground"}`}>{intro}</div>}
  </Reveal>
);

/** Emerging-venture label, shown wherever capabilities are described. */
export const EmergingNote = ({ children, light = false }: { children: ReactNode; light?: boolean }) => (
  <div className={`flex gap-3 items-start rounded-xl border px-5 py-4 text-sm leading-relaxed ${light ? "border-white/15 text-white/70 bg-white/[0.03]" : "border-clay/30 bg-clay/[0.06] text-foreground/75"}`}>
    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-clay" />
    <span>{children}</span>
  </div>
);

/** Closing call to action shared by every page. */
export const CtaBand = () => (
  <section className="py-20 md:py-28">
    <div className="container-page">
      <Reveal className="relative overflow-hidden rounded-3xl sea-bg text-white px-8 py-14 md:px-16 md:py-20">
        <Noria className="absolute -right-24 -bottom-40 w-[480px] text-white/[0.07]" />
        <div className="relative max-w-2xl">
          <h2 className="display-sm text-white">{finalCta.headline}</h2>
          <p className="mt-6 text-lg text-white/75 leading-relaxed">{finalCta.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">{finalCta.primary} <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/contact?topic=partner" className="btn-ghost-light">{finalCta.secondary}</Link>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export const Num = ({ n, light = false }: { n: number; light?: boolean }) => (
  <span className={`font-display text-sm tabular-nums ${light ? "text-sea-aqua" : "text-sea-4"}`}>{String(n).padStart(2, "0")}</span>
);
