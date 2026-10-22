import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Seo } from "./Seo";
import { Ocean } from "./Ocean";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

export const Layout = () => (
  <div className="relative min-h-screen flex flex-col isolate">
    <Ocean />
    <ScrollToTop />
    <Seo />
    <SiteHeader />
    <main className="flex-1 pt-20">
      <Outlet />
    </main>
    <SiteFooter />
  </div>
);
