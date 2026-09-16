"use client";
import Link from "next/link";
import SmoothScroll from "./smooth-scroll";
import RepairCoupon from "./repair-coupon";
import Chatbot from "./chatbot";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/content";
import { serviceDetails } from "@/lib/service-details";
import {
  FiArrowUpRight,
  FiPhone,
  FiMenu,
  FiX,
  FiPrinter,
  FiMapPin,
  FiArrowRight,
  FiChevronDown,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
export const phone = "+44 7441448082";
export const whatsapp =
  "https://wa.me/447441448082?text=Hello%20Pinterok%2C%20I%20need%20help%20with%20my%20printer.";
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Pinterok home">
      <span className="logo-icon">
        <FiPrinter />
      </span>
      pinterok<span className="logo-dot">.</span>
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [publishedServices, setPublishedServices] = useState(services);
  const serviceMenu = useRef<HTMLDivElement>(null);
  const serviceToggle = useRef<HTMLButtonElement>(null);
  const serviceLinks = [
    ...publishedServices,
    ...serviceDetails.map((s) => ({ title: s.label, slug: s.slug })),
  ].filter(
    (s, index, all) => all.findIndex((item) => item.slug === s.slug) === index,
  );
  const closeNavigation = () => {
    setOpen(false);
    setServicesOpen(false);
  };
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/public/services", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((items) => {
        if (Array.isArray(items)) setPublishedServices(items);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (!servicesOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (!serviceMenu.current?.contains(event.target as Node))
        setServicesOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        serviceToggle.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [servicesOpen]);
  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>
            <span className="green-dot" /> Your printer. Our expertise.
          </span>
          <span>
            <FiMapPin /> Serving homes & businesses across the UK{" "}
            <span className="top-divider">|</span> Independent printer
            specialists
          </span>
        </div>
      </div>
      <header>
        <div className="container nav">
          <Logo />
          <nav className={open ? "nav-links open" : "nav-links"}>
            {[
              ["Home", "/"],
              ["Services", "/services"],
              ["Guides", "/guides"],
              ["About Us", "/about"],
              ["Blog", "/blog"],
              ["Contact", "/contact"],
            ].map(([label, href]) =>
              label === "Services" ? (
                <div
                  key={href}
                  className="nav-services"
                  ref={serviceMenu}
                  onMouseEnter={() => {
                    if (
                      window.matchMedia("(hover: hover) and (min-width: 761px)")
                        .matches
                    )
                      setServicesOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (
                      window.matchMedia("(hover: hover) and (min-width: 761px)")
                        .matches
                    )
                      setServicesOpen(false);
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget))
                      setServicesOpen(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      event.preventDefault();
                      setServicesOpen(false);
                      serviceToggle.current?.focus();
                    }
                  }}
                >
                  <button
                    className="services-toggle"
                    type="button"
                    ref={serviceToggle}
                    aria-expanded={servicesOpen}
                    aria-controls="nav-service-list"
                    onClick={() => setServicesOpen(!servicesOpen)}
                  >
                    Services <FiChevronDown aria-hidden="true" />
                  </button>
                  <div
                    className="services-dropdown"
                    id="nav-service-list"
                    hidden={!servicesOpen}
                  >
                    <Link
                      className="services-overview"
                      href="/services"
                      onClick={closeNavigation}
                    >
                      Explore all services <FiArrowUpRight aria-hidden="true" />
                    </Link>
                    <ul>
                      {serviceLinks.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            onClick={closeNavigation}
                          >
                            {service.title}
                            <FiArrowUpRight aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      className="services-overview"
                      href="/locations"
                      onClick={closeNavigation}
                    >
                      See areas we cover <FiArrowUpRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ) : (
                <Link key={href} href={href} onClick={closeNavigation}>
                  {label}
                </Link>
              ),
            )}
          </nav>
          <div className="nav-actions">
            <a className="nav-phone" href="tel:+447441448082">
              <FiPhone />
              {phone}
            </a>
            <a
              className="nav-whatsapp"
              href={whatsapp}
              aria-label="Enquire on WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <Link className="button small" href="/book">
              Book a repair <FiArrowUpRight />
            </Link>
          </div>
          <button
            className="menu-toggle"
            onClick={() => {
              setOpen(!open);
              setServicesOpen(false);
            }}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <>
      <section className="footer-cta">
        <div className="container">
          <div>
            <span className="eyebrow light">LET’S GET YOU PRINTING AGAIN</span>
            <h2>
              A printer problem?
              <br />
              Consider it our problem.
            </h2>
          </div>
          <Link href="/book" className="button white">
            Book your repair <FiArrowUpRight />
          </Link>
        </div>
      </section>
      <footer>
        <div className="container footer-grid">
          <div>
            <Logo />
            <p>
              Expert care for your printer.
              <br />
              Less downtime for your day.
            </p>
            <a href={whatsapp} className="text-link">
              <FaWhatsapp /> Let’s talk on WhatsApp
            </a>
          </div>
          <div>
            <h4>Explore</h4>
            <Link href="/services">Our services</Link>
            <Link href="/locations">Areas we cover</Link>
            <Link href="/guides">Troubleshooting guides</Link>
            <Link href="/about">About Pinterok</Link>
            <Link href="/blog">Advice & insights</Link>
            <Link href="/book">Book a repair</Link>
          </div>
          <div>
            <h4>Get in touch</h4>
            <a href="tel:+447441448082">{phone}</a>
            <a href="mailto:printerok9@gmail.com">printerok9@gmail.com</a>
            <span>Homes & offices across the UK</span>
          </div>
          <div>
            <h4>Printer not cooperating?</h4>
            <p>
              Tell us what’s wrong.
              <br />
              We’ll take it from there.
            </p>
            <Link className="text-link" href="/contact">
              Contact our team <FiArrowRight />
            </Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Pinterok. All rights reserved.
          </span>
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms & conditions</Link>
          <span>Independent service. Dependable support.</span>
        </div>
      </footer>
      <a
        href={whatsapp}
        className="floating-whatsapp"
        aria-label="Chat with Pinterok on WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <Chatbot />
    </>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <RepairCoupon />
    </>
  );
}
