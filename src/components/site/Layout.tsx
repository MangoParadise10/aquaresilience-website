import { Outlet } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

export const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <ScrollToTop />
    <SiteHeader />
    <main className="flex-1 pt-16 md:pt-20">
      <Outlet />
    </main>
    <SiteFooter />
  </div>
);
