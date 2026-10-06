import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { Mark } from "./Art";

export const Wordmark = ({ className = "" }: { className?: string }) => (
  <span className={`flex items-center gap-3 ${className}`}>
    <Mark className="h-11 w-11 drop-shadow-[0_0_12px_rgba(200,215,240,0.35)]" />
    <span className="font-display text-xl font-extrabold uppercase tracking-[0.24em] silver-text">Dignoria</span>
  </span>
);

export const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || open;
  const links = nav.filter((n) => n.to !== "/contact");

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "glass-strong !rounded-none !border-x-0 !border-t-0" : "bg-transparent"}`}>
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link to="/" aria-label="Dignoria home"><Wordmark /></Link>

        <nav className="hidden xl:flex items-center gap-0.5" aria-label="Main">
          {links.map((n) => (
            <NavLink key={n.to} to={n.to} end
              className={({ isActive }) =>
                `relative whitespace-nowrap px-2.5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.1em] transition-colors after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-px after:bg-sea-aqua after:shadow-[0_0_8px_hsl(var(--sea-aqua))] after:origin-left after:transition-transform after:duration-300 ${
                  isActive ? "text-white after:scale-x-100" : "text-white/65 hover:text-white after:scale-x-0 hover:after:scale-x-100"
                }`
              }>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contact" className="hidden sm:inline-flex btn-primary !py-2.5 !px-5">Contact</Link>
          <button className="xl:hidden p-2 -mr-2 text-white" onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className={`xl:hidden overflow-hidden transition-[max-height] duration-500 ${open ? "max-h-[85vh]" : "max-h-0"}`}>
        <nav className="container-page pb-8 pt-2 flex flex-col" aria-label="Mobile">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end
              className={({ isActive }) => `py-3 border-b border-white/10 font-display text-2xl font-bold uppercase tracking-tight ${isActive ? "glow-text" : "text-white"}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
