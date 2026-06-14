import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // --- Refresh guard ---
    // While a ScrollTrigger.refresh() is in flight, we must NOT:
    //   1. let wheel/touch input keep firing more refreshes
    //   2. re-init Lenis or re-add the ticker callback
    // A single boolean flag + debounced trailing refresh handles both cases.
    let isRefreshing = false;
    let pendingRefresh = false;
    let refreshDebounce: number | undefined;

    const safeRefresh = () => {
      if (isRefreshing) {
        // Spam during a refresh collapses into one trailing call
        pendingRefresh = true;
        return;
      }
      isRefreshing = true;
      ScrollTrigger.refresh();
    };

    const scheduleRefresh = () => {
      window.clearTimeout(refreshDebounce);
      refreshDebounce = window.setTimeout(safeRefresh, 120);
    };

    ScrollTrigger.addEventListener("refreshInit", () => {
      isRefreshing = true;
      // Stop Lenis from emitting scroll updates mid-measurement
      lenis.stop();
    });
    ScrollTrigger.addEventListener("refresh", () => {
      lenis.start();
      isRefreshing = false;
      if (pendingRefresh) {
        pendingRefresh = false;
        scheduleRefresh();
      }
    });

    // Only forward scroll events to ScrollTrigger when we're not measuring
    lenis.on("scroll", () => {
      if (!isRefreshing) ScrollTrigger.update();
    });

    // Drive Lenis from GSAP's ticker so frames are aligned
    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Initial post-mount refresh
    const initialId = window.setTimeout(safeRefresh, 200);

    // Debounced refresh on resize / font load (common sources of spam)
    window.addEventListener("resize", scheduleRefresh);
    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleRefresh).catch(() => {});
    }

    return () => {
      window.clearTimeout(initialId);
      window.clearTimeout(refreshDebounce);
      window.removeEventListener("resize", scheduleRefresh);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);
}
