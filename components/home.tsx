"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  animate,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  A11y,
  Keyboard,
} from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiPhone,
  FiShield,
  FiClock,
  FiCheck,
  FiPrinter,
  FiTool,
  FiHome,
  FiDroplet,
  FiLayers,
  FiMaximize,
  FiWifi,
  FiFileText,
  FiAlertTriangle,
  FiCpu,
  FiZap,
  FiChevronDown,
  FiMapPin,
  FiMail,
  FiCheckCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Shell, whatsapp } from "./site";
import { services, faqs, posts } from "@/lib/content";
import ContactForm from "./contact-form";
import ServiceExplorer from "./service-explorer";
const serviceIcons = [FiPrinter, FiDroplet, FiLayers, FiMaximize];
function Counter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}+`);
  useEffect(() => {
    if (!visible) return;
    const controls = animate(count, value, {
      duration: reduced ? 0 : 1.2,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [visible, value, count, reduced]);
  return (
    <div ref={ref} className="scope-counter" aria-label={`${value} plus ${label}`}>
      <motion.strong aria-hidden="true">{rounded}</motion.strong>
      <span>{label}</span>
    </div>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.div>
  );
}
export function ServiceGrid() {
  const [items, setItems] = useState(services);
  useEffect(() => {
    fetch("/api/public/services")
      .then((r) => (r.ok ? r.json() : null))
      .then((v) => {
        if (v) setItems(v);
      })
      .catch(() => {});
  }, []);
  return (
    <div className="service-grid">
      {items.map((s, i) => {
        const Icon = serviceIcons[i % 4];
        return (
          <Link
            href={`/services/${s.slug}`}
            className="service-card"
            key={s.slug}
          >
            <span className="service-icon">
              <Icon />
            </span>
            <span className="card-arrow">
              <FiArrowUpRight />
            </span>
            {/* <span className="card-kicker">
              {s.label || "EXPERT PRINTER SUPPORT"}
            </span> */}
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <span className="service-link">
              Explore service <FiArrowRight />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
export function FAQ() {
  const [items, setItems] = useState(faqs);
  useEffect(() => {
    fetch("/api/public/faqs")
      .then((r) => (r.ok ? r.json() : null))
      .then((v) => {
        if (v)
          setItems(
            v.map((f: { title: string; content: string }) => [
              f.title,
              f.content,
            ]),
          );
      })
      .catch(() => {});
  }, []);
  return (
    <div className="faq-list">
      {items.map(([q, a], i) => (
        <details key={q}>
          <summary>
            <span className="faq-number">0{i + 1}</span>
            {q}
            <FiChevronDown />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function Notice() {
  return (
    <div className="notice">
      <FiShield />
      <div>
        <strong>Independent expertise. Complete transparency.</strong>
        <p>
          <b>Important notice:</b> We are an independent third-party printer
          repair service provider. We are not authorised, affiliated, endorsed
          or sponsored by HP®, Canon®, Epson®, Brother®, Xerox®, Ricoh®,
          Lexmark®, Samsung®, Kyocera® or any other printer manufacturer. All
          trademarks and brand names belong to their respective owners and are
          used for identification purposes only.
        </p>
      </div>
    </div>
  );
}
function Reviews() {
  const [reviews, setReviews] = useState<
    {
      _id: string;
      title: string;
      content: string;
      location: string;
      rating: number;
      image?: string;
    }[]
  >([]);
  useEffect(() => {
    fetch("/api/public/reviews")
      .then((r) => (r.ok ? r.json() : null))
      .then((v) => {
        if (v) setReviews(v);
      })
      .catch(() => {});
  }, []);
  if (!reviews.length) return null;
  return (
    <section className="section pale">
      <div className="container">
        <span className="eyebrow">CUSTOMER EXPERIENCES</span>
        <h2>Good service. In their words.</h2>
        <Swiper
          modules={[Navigation, Pagination, A11y, Keyboard]}
          keyboard={{ enabled: true, onlyInViewport: true }}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={24}
          breakpoints={{ 768: { slidesPerView: 2 } }}
        >
          {reviews.map((r) => (
            <SwiperSlide key={r._id}>
              <blockquote className="review">
                <span
                  className="stars"
                  aria-label={`${r.rating} out of 5 stars`}
                >
                  {"?".repeat(r.rating)}
                </span>
                <p>“{r.content}”</p>
                <div className="review-person">
                  {r.image && (
                    <Image src={r.image} alt="" width={44} height={44} />
                  )}
                  <strong>{r.title}</strong>
                  <span>{r.location}</span>
                </div>
              </blockquote>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
export default function Home({
  blogPosts = posts,
}: {
  blogPosts?: typeof posts;
}) {
  const reducedMotion = useReducedMotion();
  const sliderRef = useRef<SwiperInstance | null>(null);
  const [paused, setPaused] = useState(false);
  const [brandsPaused, setBrandsPaused] = useState(false);
  return (
    <Shell>
      <section className="hero">
        {/* <div className="hero-grid-lines" /> */}
        <div className="container hero-inner">
          <Reveal className="hero-copy">
            <div className="hero-eyebrow">
              <span className="green-dot" /> EXPERT REPAIRS. RIGHT AT YOUR DOOR.
            </div>
            <h1>
              Back to printing.
              <br />
              Back to <span>business.</span>
            </h1>
            <h2>Professional printer repair across the UK.</h2>
            <p>
              Printer problems shouldn’t slow you down. Get fast,
              <br className="desktop-break" /> reliable repairs for your home or
              office — without
              <br className="desktop-break" /> the hassle of leaving your
              doorstep.
            </p>
            <div className="hero-buttons">
              <Link href="/book" className="button">
                Book a printer repair <FiArrowUpRight />
              </Link>
              <a href="tel:+447441448082" className="button outline">
                <FiPhone /> +44 7441448082
              </a>
            </div>
            <div className="hero-checks">
              <span>
                <FiCheck /> Clear, upfront pricing
              </span>
              <span>
                <FiCheck /> All major brands
              </span>
              <span>
                <FiCheck /> Doorstep service
              </span>
            </div>
            <div className="hero-footnote">
              <FiShield />
              <span>
                Independent specialists. Personal service. <b>Peace of mind.</b>
              </span>
            </div>
          </Reveal>
          <Reveal className="hero-visual">
            {/* <div className="image-label">
              <span className="green-dot" /> PRINTING, SORTED.
            </div> */}
            <Image
              src="/image/heroimage2.jpg"
              alt="Technician using a screwdriver to repair a printer's internal gears"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 800px) 100vw, 50vw"
              className="hero-printer"
            />
            <div className="visual-overlay" />
            <div className="floating-card">
              <span className="floating-icon">
                <FiTool />
              </span>
              <div>
                <strong>
                  A little expertise.
                  <br />A lot less downtime.
                </strong>
                <span>HOME & OFFICE PRINTER SPECIALISTS</span>
              </div>
              <FiCheckCircle className="blue-check" />
            </div>
            {/* <div className="visual-caption">
              <span>HOME & OFFICE PRINTER SPECIALISTS</span>
              <span>01 / 03</span>
            </div> */}
          </Reveal>
        </div>
      </section>
      <div className="benefit-strip">
        <div className="container">
          {[
            [FiClock, "Same-day appointments", "Subject to local availability"],
            [FiTool, "Experienced technicians", "Care for every component"],
            [FiShield, "Honest, upfront advice", "No unnecessary replacements"],
            [FiHome, "We come to you", "Home & office service"],
          ].map(([Icon, title, desc]) => {
            const I = Icon as typeof FiClock;
            return (
              <div className="benefit" key={String(title)}>
                <I />
                <div>
                  <strong>{String(title)}</strong>
                  <span>{String(desc)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <section className="brands container">
        <span className="eyebrow muted">
          BIG BRANDS. ONE TRUSTED REPAIR PARTNER.
        </span>
        <div
          className="brand-marquee"
          role="region"
          aria-label="Printer brands we service"
          tabIndex={0}
        >
          <div className={`brand-track${brandsPaused ? " is-paused" : ""}`}>
            {[0, 1].map((copy) => (
              <div
                className="brand-row"
                key={copy}
                role="list"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {[
                  "hp",
                  "Canon",
                  "EPSON",
                  "brother",
                  "SAMSUNG",
                  "RICOH",
                  "Xerox",
                  "Kyocera",
                  "Lexmark",
                  "Zebronics",
                ].map((brand) => (
                  <span
                    role="listitem"
                    key={brand}
                    className={`brand brand-${brand.toLowerCase()}`}
                  >
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* <button
          type="button"
          className="brand-toggle"
          aria-pressed={brandsPaused}
          onClick={() => setBrandsPaused(!brandsPaused)}
        >
          {brandsPaused ? "Resume brand scrolling" : "Pause brand scrolling"}
        </button> */}
        {/* <p>
          Also supporting Kyocera, Lexmark & Zebronics. Independent repair
          services. No manufacturer affiliation.
        </p> */}
      </section>
      <section className="section pale" id="services">
        <div className="container">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">WHAT WE DO</span>
              <h2>
                Small glitch or big breakdown.
                <br />
                We’ve got you covered.
              </h2>
            </div>
            <div>
              <p>
                Complete printer care, from the first diagnosis
                <br />
                to the final test print.
              </p>
              <Link href="/services" className="text-link">
                View all services <FiArrowUpRight />
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <ServiceGrid />
          </Reveal>
        </div>
      </section>
      <ServiceExplorer />
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LESS DOWNTIME. MORE DONE.</span>
            <h2>Expert care. Wherever you print.</h2>
          </div>
          <p>
            Practical solutions for the printers
            <br />
            you depend on every day.
          </p>
        </div>
        <Swiper
          className="feature-slider"
          modules={[Autoplay, Navigation, Pagination, A11y, Keyboard]}
          keyboard={{ enabled: true, onlyInViewport: true }}
          onSwiper={(instance) => {
            sliderRef.current = instance;
          }}
          autoplay={
            reducedMotion
              ? false
              : {
                  delay: 5500,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: true,
                }
          }
          navigation
          pagination={{ clickable: true }}
          loop
        >
          {[
            [
              "Same-day printer repair service",
              "Expert diagnostics and fast doorstep repair. Ask us about availability in your area.",
              "/image/printerrepair1.jpg",
              "Technician repairing an open printer on an office desk",
              "55% 50%",
            ],
            [
              "All major brands supported",
              "HP, Canon, Epson, Brother, Xerox, Ricoh and more. Independent expertise across leading brands.",
              "/image/printerrepair3.jpg",
              "Open printer with diagnostic equipment and exposed components",
              "55% 50%",
            ],
            [
              "Home & office printer solutions",
              "Complete printer installation, repair and maintenance. A reliable partner for your working day.",
              "/image/printerrepair2.jpg",
              "Close-up of a technician carefully repairing a printer mechanism",
              "50% 48%",
            ],
            [
              "Friendly support, from the first call",
              "Tell us what is happening with your printer. We will help you understand the next step and arrange a convenient appointment.",
              "/image/customer_care.jpg",
              "Customer support representative wearing a headset",
              "60% 32%",
            ],
            [
              "Good service starts with trust",
              "Clear advice, upfront pricing and repair options explained before work begins. Printer care with your needs at heart.",
              "/image/shaking_hand.jpg",
              "A handshake representing a dependable service partnership",
              "55% 50%",
            ],
          ].map(([title, desc, src, alt, position], i) => (
            <SwiperSlide key={title}>
              <div className="feature-slide">
                <Image
                  src={src}
                  alt={alt}
                  style={{ objectPosition: position }}
                  fill
                  sizes="(max-width: 760px) 100vw, 65vw"
                />
                <div className="slide-shade" />
                <div className="slide-copy">
                  <span className="eyebrow light">
                    THE PINTEROK APPROACH / 0{i + 1}
                  </span>
                  <h2>{title}</h2>
                  <p>{desc}</p>
                  <Link className="button white" href="/book">
                    Let’s get it sorted <FiArrowUpRight />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* {!reducedMotion && (
          <button
            className="carousel-toggle"
            onClick={() => {
              if (paused) sliderRef.current?.autoplay.start();
              else sliderRef.current?.autoplay.stop();
              setPaused(!paused);
            }}
          >
            {paused ? "Play slideshow" : "Pause slideshow"}
          </button>
        )} */}
      </section>
      <section className="section pale">
        <div className="container">
          <div className="center-heading">
            <span className="eyebrow">SIMPLE FROM START TO FINISH</span>
            <h2>Three steps. One working printer.</h2>
            <p>No complicated process. Just the help you need.</p>
          </div>
          <div className="steps">
            {[
              [
                FiPhone,
                "Book a repair",
                "Call, WhatsApp or book online. Tell us what’s wrong and we’ll arrange the next step.",
              ],
              [
                FiTool,
                "Expert diagnosis",
                "We find the fault, explain the solution and agree the cost with you before starting.",
              ],
              [
                FiCheckCircle,
                "Back to printing",
                "We repair and test your printer, so you can get back to the things that matter.",
              ],
            ].map(([Icon, title, desc], i) => {
              const I = Icon as typeof FiPhone;
              return (
                <Reveal className="step" key={String(title)}>
                  <span className="step-number">0{i + 1}</span>
                  <span className="step-icon">
                    <I />
                  </span>
                  <h3>{String(title)}</h3>
                  <p>{String(desc)}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section container about-grid" id="about">
        <Reveal className="about-image">
          <Image
            src="/technician.png"
            alt="Illustrative photograph of a printer technician inspecting a paper feed compartment"
            fill
            sizes="(max-width:800px) 100vw, 50vw"
          />
          <div className="about-image-tag">
            <FiHome />
            <span>
              Expert care.
              <br />
              <strong>At your doorstep.</strong>
            </span>
          </div>
        </Reveal>
        <Reveal className="about-copy">
          <span className="eyebrow">GOOD SERVICE IS PERSONAL</span>
          <h2>
            Your printer. <br />
            In capable hands.
          </h2>
          <p>
            Professional home service printer repair that fits around your day.
            Our technicians provide doorstep support for homes and offices, with
            practical advice you can understand.
          </p>
          <p>
            We diagnose problems quickly and recommend a sensible solution —
            without unnecessary replacement costs.
          </p>
          <ul className="checklist">
            {[
              "Care for inkjet, laser & multifunction printers",
              "Clear diagnosis and pricing before repairs",
              "Convenient home and office appointments",
              "Support that puts your needs first",
            ].map((x) => (
              <li key={x}>
                <FiCheckCircle />
                {x}
              </li>
            ))}
          </ul>
          <Link href="/about" className="text-link">
            Meet your repair partner <FiArrowUpRight />
          </Link>
          <div className="scope-counters">
            <Counter value={20} label="Major brands" />
            <Counter value={35} label="Common issues" />
            <Counter value={3} label="Simple steps" />
          </div>
        </Reveal>
      </section>
      <section className="section navy-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow light">SOUND FAMILIAR?</span>
              <h2>
                Whatever the problem.
                <br />
                Let’s find the solution.
              </h2>
            </div>
            <p>
              From the everyday frustrating to the
              <br />
              unexpected. We’re here to help.
            </p>
          </div>
          <div className="problem-grid">
            {[
              [
                FiPrinter,
                "Printer not printing",
                "Stuck queues & unresponsive printers",
              ],
              [FiFileText, "Paper jams", "Feeds, rollers & stubborn jams"],
              [
                FiAlertTriangle,
                "Error codes",
                "Diagnosis for persistent warnings",
              ],
              [
                FiDroplet,
                "Cartridge problems",
                "Cartridge detection & ink issues",
              ],
              [FiFileText, "Blank pages", "Missing ink & empty output"],
              [
                FiLayers,
                "Poor print quality",
                "Streaks, smudges & faded pages",
              ],
              [FiClock, "Slow printing", "Performance & queue issues"],
              [
                FiWifi,
                "WiFi connection issues",
                "Offline printers & network setup",
              ],
              [FiTool, "Roller problems", "Paper pickup & feed faults"],
              [FiTool, "Fuser problems", "Toner bonding & heat faults"],
              [
                FiDroplet,
                "Ink system failure",
                "Blocked ink flow & delivery faults",
              ],
              [FiZap, "Power issues", "Printers that will not switch on"],
              [
                FiWifi,
                "PC / mobile connections",
                "Device setup & driver issues",
              ],
              [FiCpu, "Motherboard faults", "Electronic diagnosis & repair"],
              [FiDroplet, "Ink leakage", "Leaks & cartridge seals"],
              [FiMaximize, "Scanner problems", "Scan errors & image quality"],
            ].map(([Icon, title, desc]) => {
              const I = Icon as typeof FiPrinter;
              return (
                <Link href="/book" className="problem" key={String(title)}>
                  <I />
                  <h3>{String(title)}</h3>
                  <p>{String(desc)}</p>
                  <FiArrowUpRight className="problem-arrow" />
                </Link>
              );
            })}
          </div>
          <div className="problem-bottom">
            <span>Not sure what’s wrong? That’s what we’re here for.</span>
            <a className="text-link" href={whatsapp}>
              Tell us about your printer <FiArrowRight />
            </a>
          </div>
        </div>
      </section>
      <Reviews />
      <section className="section container faq-grid">
        <div>
          <span className="eyebrow">A LITTLE CLARITY</span>
          <h2>
            Questions? <br />
            We’re glad you asked.
          </h2>
          <p>
            Everything you need to know
            <br />
            before booking a repair.
          </p>
          <a className="text-link" href={whatsapp}>
            <FaWhatsapp /> Ask us on WhatsApp <FiArrowUpRight />
          </a>
        </div>
        <FAQ />
      </section>
      <section className="section pale">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE PRINT ROOM</span>
              <h2>A little know-how goes a long way.</h2>
            </div>
            <Link className="text-link" href="/blog">
              All advice & insights <FiArrowUpRight />
            </Link>
          </div>
          <div className="blog-grid">
            {blogPosts.map((p, i) => (
              <Link href={`/blog/${p.slug}`} className="blog-card" key={p.slug}>
                <div className={`blog-visual blog-visual-${i}`}>
                  <FiPrinter />
                  <span>
                    {i === 0
                      ? "PRINT. RESTART."
                      : i === 1
                        ? "ERROR? EXPLAINED."
                        : "LET’S RECONNECT."}
                  </span>
                  {i === 2 && <FiWifi />}
                </div>
                <div className="blog-copy">
                  <span className="eyebrow">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <span className="text-link">
                    Read article <FiArrowUpRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container contact-grid" id="contact">
        <div>
          <span className="eyebrow">LET’S TALK PRINTERS</span>
          <h2>Get in touch with us.</h2>
          <p>
            Tell us what’s happening. We’ll help you
            <br />
            find the right next step.
          </p>
          <a className="contact-method" href="tel:+447441448082">
            <FiPhone />
            <span>
              <small>GIVE US A CALL</small>+44 7441448082
            </span>
            <FiArrowUpRight />
          </a>
          <a className="contact-method" href="mailto:printerok9@gmail.com">
            <FiMail />
            <span>
              <small>DROP US AN EMAIL</small>printerok9@gmail.com
            </span>
            <FiArrowUpRight />
          </a>
          <a className="contact-method" href={whatsapp}>
            <FaWhatsapp />
            <span>
              <small>A QUICK CHAT?</small>Message us on WhatsApp
            </span>
            <FiArrowUpRight />
          </a>
          <div className="local-note">
            <FiMapPin />
            <div>
              <h3>Looking for printer repair near me?</h3>
              <p>
                We arrange local printer support across the UK. Share your
                postcode to check availability for your home or office.
              </p>
            </div>
          </div>
        </div>
        <ContactForm />
      </section>
      <section className="container notice-wrap">
        <Notice />
      </section>
    </Shell>
  );
}
