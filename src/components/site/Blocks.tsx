import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Girih, Noria } from "./Art";
import { Reveal } from "./Reveal";
import { finalCta } from "@/content/site";

export const Section = ({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`relative py-16 md:py-24 ${className}`}>{children}</section>
);

/** A glass floor: a translucent slab floating over the water. */
export const Floor = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <Reveal className={`glass-strong rounded-[2rem] p-7 sm:p-10 md:p-14 ${className}`}>{children}</Reveal>
);

/** Hero used at the top of every inner page: the ocean shows through. */
export const PageHero = ({ eyebrow, title, lead, children }: {
  eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode;
}) => (
  <section className="relative overflow-hidden -mt-20 pt-20">
    <Noria className="pointer-events-none absolute -right-40 -top-20 w-[640px] opacity-[0.12] hidden md:block" />
    <div className="container-page relative pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="max-w-5xl animate-fade-up">
        <div className="eyebrow mb-6">{eyebrow}</div>
        <h1 className="display-md silver-text drop-shadow-[0_4px_30px_rgba(120,180,255,0.3)]">{title}</h1>
        {lead && <div className="mt-8 max-w-3xl glass rounded-3xl p-6 md:p-8 text-lg md:text-xl leading-relaxed text-white/85">{lead}</div>}
        {children}
      </div>
    </div>
    <div className="aqua-rule" />
  </section>
);

export const SectionHead = ({ eyebrow, title, intro, center = false }: {
  eyebrow?: string; title: ReactNode; intro?: ReactNode; center?: boolean; light?: boolean;
}) => (
  <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
    {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
    <h2 className="display-sm text-white">{title}</h2>
    {intro && <div className="mt-6 text-lg leading-relaxed text-white/75">{intro}</div>}
  </Reveal>
);

/** Emerging-venture label, shown wherever capabilities are described. */
export const EmergingNote = ({ children }: { children: ReactNode; light?: boolean }) => (
  <div className="flex gap-3 items-start rounded-xl border border-clay/40 bg-clay/[0.08] backdrop-blur-md px-5 py-4 text-sm leading-relaxed text-white/80">
    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-clay shadow-[0_0_10px_hsl(var(--clay))]" />
    <span>{children}</span>
  </div>
);

/** Closing call to action shared by every page. */
export const CtaBand = () => (
  <section className="py-20 md:py-28">
    <div className="container-page">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] glass-strong px-8 py-16 md:px-16 md:py-24">
        <Girih className="absolute inset-0" opacity={0.12} />
        <Noria className="absolute -right-24 -bottom-48 w-[560px] opacity-25" />
        <div className="relative max-w-3xl">
          <h2 className="display-md silver-text">{finalCta.headline}</h2>
          <p className="mt-6 text-lg text-white/80 leading-relaxed">{finalCta.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">{finalCta.primary} <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/contact?topic=partner" className="btn-ghost-light">{finalCta.secondary}</Link>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export const Num = ({ n }: { n: number; light?: boolean }) => (
  <span className="font-display text-sm font-bold tabular-nums text-sea-aqua">{String(n).padStart(2, "0")}</span>
);
