"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { serviceDetails } from "@/lib/service-details";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiPrinter,
  FiWifi,
  FiDroplet,
  FiMaximize,
  FiLayers,
  FiCheck,
  FiArrowUpRight,
  FiPhone,
} from "react-icons/fi";

const icons = [FiPrinter, FiWifi, FiDroplet, FiMaximize, FiLayers];
const options = serviceDetails.map((service, index) => ({
  ...service,
  icon: icons[index],
}));

export default function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  return (
    <section
      className="section container service-explorer"
      aria-label="Printer support services"
    >
      <div className="service-explorer-shell">
        <div
          className="service-tabs"
          role="tablist"
          aria-orientation="vertical"
          aria-label="Printer support services"
        >
          {options.map((option, index) => (
            <button
              key={option.label}
              ref={(node) => {
                buttons.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${index}`}
              aria-selected={active === index}
              aria-controls={`${id}-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowDown" || event.key === "ArrowRight")
                  next = (index + 1) % options.length;
                else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
                  next = (index - 1 + options.length) % options.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = options.length - 1;
                else return;
                event.preventDefault();
                setActive(next);
                buttons.current[next]?.focus();
              }}
            >
              <option.icon aria-hidden="true" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
        {options.map((option, index) => (
          <div
            key={option.label}
            role="tabpanel"
            id={`${id}-panel-${index}`}
            aria-labelledby={`${id}-tab-${index}`}
            hidden={active !== index}
            tabIndex={0}
          >
            {active === index && (
              <motion.div
                className="service-detail"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="service-detail-visual">
                  <Image
                    src={option.image}
                    alt={option.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 65vw, 30vw"
                  />
                  <div className="service-detail-caption">
                    <span>INDEPENDENT PRINTER SPECIALISTS</span>
                    <strong>Care in every detail.</strong>
                  </div>
                </div>
                <div className="service-detail-copy">
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                  <ul>
                    {option.points.map(([title, description]) => (
                      <li key={title}>
                        <FiCheck aria-hidden="true" />
                        <div>
                          <strong>{title}</strong>
                          <p>{description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="service-detail-actions">
                    <Link href="/book" className="button">
                      Book a consultation
                      <FiArrowUpRight aria-hidden="true" />
                    </Link>
                    <a href="tel:+447441448082">
                      <FiPhone aria-hidden="true" /> +44 7441448082
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
