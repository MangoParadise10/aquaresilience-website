import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { boilerplate, brand, nav } from "@/content/site";
import { Mark } from "./Art";

const columns = [
  { title: "Explore", links: nav.filter((n) => ["/", "/why-dignoria", "/about", "/insights"].includes(n.to)) },
  { title: "Our work", links: nav.filter((n) => ["/what-we-do", "/who-we-serve", "/our-approach"].includes(n.to)) },
  {
    title: "Get involved",
    links: [
      { to: "/contact", label: "Bring us a water challenge" },
      { to: "/contact?topic=partner", label: "Partner with Dignoria" },
      { to: "/join", label: "Join us" },
    ],
  },
];

export const SiteFooter = () => (
  <footer className="sea-bg text-white/70 mt-auto">
    <div className="container-page pt-20 pb-10">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link to="/" className="flex items-center gap-2.5 text-white">
            <Mark className="h-9 w-9" />
            <span className="font-display text-3xl">Dignoria</span>
          </Link>
          <p className="mt-6 font-display text-2xl text-white leading-snug">
            {brand.tagline[0]} <span className="italic text-sea-aqua">{brand.tagline[1]}</span>
          </p>
          <p className="mt-5 text-sm leading-relaxed max-w-md">{boilerplate.fiftyWord}</p>
          <Link to="/contact" className="btn-primary mt-8">Start a Conversation <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="lg:col-span-7 grid gap-10 sm:grid-cols-3">
          {columns.map((c) => (
            <div key={c.title}>
              <div className="eyebrow-light mb-5">{c.title}</div>
              <ul className="space-y-3 text-sm">
                {c.links.map((l) => (
                  <li key={l.to}><Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="aqua-rule mt-16 mb-8 opacity-40" />
      <div className="flex flex-col md:flex-row gap-3 justify-between text-xs text-white/50">
        <p>© {new Date().getFullYear()} Dignoria. {brand.descriptor}.</p>
        <p>Dignoria is an emerging venture in its development stage.</p>
      </div>
    </div>
  </footer>
);
