"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scroller: Lenis | undefined;
    const configure = () => {
      scroller?.destroy();
      scroller = undefined;
      if (preference.matches) return;
      scroller = new Lenis({
        autoRaf: true,
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        // Keep native anchor focus/history and Next.js navigation behaviour.
        anchors: false,
        prevent: (node) =>
          node.matches(
            "textarea, select, input, [contenteditable], .services-dropdown, .nav-links.open, .calendly-frame",
          ),
      });
    };
    configure();
    preference.addEventListener("change", configure);
    return () => {
      preference.removeEventListener("change", configure);
      scroller?.destroy();
    };
  }, [pathname]);

  return null;
}
