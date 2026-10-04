import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { Mark } from "./Art";

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

  const solid = scrolled || open || pathname === "/join";
  const links = nav.filter((n) => n.to !== "/contact");

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"}`}>
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link to="/" className={`flex items-center gap-2.5 ${solid ? "text-primary" : "text-white"}`} aria-label="Dignoria home">
          <Mark className="h-8 w-8" />
          <span className="font-display text-2xl tracking-tight">Dignoria</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1" aria-label="Main">
          {links.map((n) => (
            <NavLink key={n.to} to={n.to} end
              className={({ isActive }) =>
                `relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-px after:origin-left after:transition-transform after:duration-300 ${
                  solid ? "text-foreground/75 hover:text-foreground after:bg-sea-4" : "text-white/75 hover:text-white after:bg-sea-aqua"
                } ${isActive ? (solid ? "!text-foreground after:scale-x-100" : "!text-white after:scale-x-100") : "after:scale-x-0 hover:after:scale-x-100"}`
              }>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contact" className={`hidden sm:inline-flex ${solid ? "btn-dark" : "btn-primary"} !py-2.5`}>Contact</Link>
          <button className={`xl:hidden p-2 -mr-2 ${solid ? "text-foreground" : "text-white"}`} onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className={`xl:hidden overflow-hidden transition-[max-height] duration-500 ${open ? "max-h-[80vh]" : "max-h-0"}`}>
        <nav className="container-page pb-8 pt-2 flex flex-col" aria-label="Mobile">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end
              className={({ isActive }) => `py-3 border-b border-border font-display text-2xl ${isActive ? "text-sea-4" : "text-foreground"}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
