"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiX } from "react-icons/fi";

const sessionKey = "pinterok-repair-coupon-shown";

export default function RepairCoupon() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    try {
      if (sessionStorage.getItem(sessionKey)) return;
    } catch {
      /* The popup also works when browser storage is unavailable. */
    }
    let shown = false;
    const checkScroll = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      if (shown || range <= 0 || window.scrollY / range < 0.2) return;
      shown = true;
      setVisible(true);
      try {
        sessionStorage.setItem(sessionKey, "true");
      } catch {}
      window.removeEventListener("scroll", checkScroll);
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    const frame = requestAnimationFrame(checkScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          className="repair-coupon"
          aria-label="Printer repair offer"
          initial={
            reduced
              ? { opacity: 0 }
              : { opacity: 0, y: 36, rotate: -3, scale: 0.96 }
          }
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, y: reduced ? 0 : 16 }}
          transition={{
            duration: reduced ? 0 : 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <button
            type="button"
            className="coupon-close"
            aria-label="Close printer repair offer"
            onClick={() => setVisible(false)}
          >
            <FiX />
          </button>
          <div className="coupon-message">
            <span className="coupon-label">PINTEROK · PRINTER CARE</span>
            <h2 role="status">
              Independent Printer Repair with <strong>Clear Pricing</strong>
            </h2>
            <Link
              href="/book"
              className="coupon-book"
              onClick={() => setVisible(false)}
            >
              Book a repair <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className="coupon-stub" aria-hidden="true">
            <div className="coupon-barcode" />
            <span>PINTEROK</span>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
