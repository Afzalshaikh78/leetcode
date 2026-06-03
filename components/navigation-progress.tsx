"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  minimum: 0.12,
  easing: "ease",
  speed: 300,
});

function NavigationProgressInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleDone = () => {
      NProgress.done();
    };

    window.addEventListener("beforeunload", handleStart);
    window.addEventListener("load", handleDone);

    return () => {
      window.removeEventListener("beforeunload", handleStart);
      window.removeEventListener("load", handleDone);
    };
  }, []);

  return null;
}

export default NavigationProgressInner;
