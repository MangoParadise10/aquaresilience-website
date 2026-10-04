import { useEffect, useRef, type ReactNode, type ElementType } from "react";

/** Fades content up as it scrolls into view. */
export const Reveal = ({ children, className = "", delay = 0, as: Tag = "div" }: {
  children: ReactNode; className?: string; delay?: number; as?: ElementType;
}) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("is-visible"); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
};
