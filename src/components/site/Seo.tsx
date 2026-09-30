import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { seo } from "@/content/site";

/** Sets the page title and meta description from the content file on each route change. */
export const Seo = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const entry = seo[pathname] ?? seo["/"];
    document.title = entry.title;
    for (const sel of ['meta[name="description"]', 'meta[property="og:description"]']) {
      document.querySelector(sel)?.setAttribute("content", entry.description);
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", entry.title);
  }, [pathname]);
  return null;
};
