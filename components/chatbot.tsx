"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiMessageCircle,
  FiX,
  FiSend,
  FiPhoneCall,
  FiArrowRight,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const phone = "+44 7441448082";
const whatsapp =
  "https://wa.me/447441448082?text=Hello%20Pinterok%2C%20I%20need%20help%20with%20my%20printer.";

const topicKeywords = [
  "print",
  "printer",
  "printing",
  "ink",
  "toner",
  "cartridge",
  "scan",
  "scanner",
  "copier",
  "copy",
  "paper",
  "jam",
  "feed",
  "fax",
  "driver",
  "install",
  "setup",
  "wifi",
  "wi-fi",
  "network",
  "offline",
  "spooler",
  "error",
  "fix",
  "repair",
  "broken",
  "streak",
  "smudge",
  "blurry",
  "roller",
  "fuser",
  "3d printer",
  "plotter",
  "label printer",
  "hp",
  "canon",
  "epson",
  "brother",
  "samsung",
  "ricoh",
  "xerox",
  "kyocera",
  "lexmark",
  "zebronics",
];

function isOnTopic(text: string) {
  const lower = text.toLowerCase();
  return topicKeywords.some((word) => lower.includes(word));
}

type Step =
  | "problem"
  | "off-topic"
  | "name"
  | "phone"
  | "address"
  | "submitting"
  | "done"
  | "retry";

type Message = { from: "bot" | "user"; text: string };

const initialMessages: Message[] = [
  {
    from: "bot",
    text: "Hi, I'm the Pinterok assistant. Tell me what's going on with your printer and I'll pass it straight to our team.",
  },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [step, setStep] = useState<Step>("problem");
  const [draft, setDraft] = useState("");
  const [inputError, setInputError] = useState("");
  const [data, setData] = useState({
    problem: "",
    name: "",
    phone: "",
    address: "",
  });
  const reduced = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, step]);

  function addBot(text: string) {
    setMessages((current) => [...current, { from: "bot", text }]);
  }
  function addUser(text: string) {
    setMessages((current) => [...current, { from: "user", text }]);
  }

  async function submitLead(details: typeof data) {
    setStep("submitting");
    addBot("Sending your details to our team…");
    try {
      const r = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details, website: "" }),
      });
      const result = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(result.error || "Please try again.");
      addBot(result.message);
      setStep("done");
    } catch {
      addBot(
        `Sorry, that didn't go through. Please call us on ${phone} or message us on WhatsApp, or try again below.`,
      );
      setStep("retry");
    }
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const value = draft.trim();
    if (step === "problem") {
      if (value.length < 5) {
        setInputError("Please tell us a little more about the problem.");
        return;
      }
      addUser(value);
      setDraft("");
      setInputError("");
      setData((current) => ({ ...current, problem: value }));
      if (isOnTopic(value)) {
        addBot("Got it. What's your name?");
        setStep("name");
      } else {
        addBot(
          `We're printer repair specialists, so we might not be the right fit for that. For anything else, call us on ${phone} or message us on WhatsApp — or continue below and our team will still take a look.`,
        );
        setStep("off-topic");
      }
      return;
    }
    if (step === "name") {
      if (value.length < 2) {
        setInputError("Please enter your name.");
        return;
      }
      addUser(value);
      setDraft("");
      setInputError("");
      setData((current) => ({ ...current, name: value }));
      addBot(`Thanks, ${value}. What's the best phone number to reach you on?`);
      setStep("phone");
      return;
    }
    if (step === "phone") {
      if (!/^[+0-9 ()-]{7,25}$/.test(value)) {
        setInputError(
          "Please enter a valid phone number (7-25 digits, spaces, +, - or () allowed).",
        );
        return;
      }
      addUser(value);
      setDraft("");
      setInputError("");
      setData((current) => ({ ...current, phone: value }));
      addBot("And what's the address where the printer is located?");
      setStep("address");
      return;
    }
    if (step === "address") {
      if (value.length < 4) {
        setInputError("Please enter the address.");
        return;
      }
      addUser(value);
      setDraft("");
      setInputError("");
      const next = { ...data, address: value };
      setData(next);
      void submitLead(next);
    }
  }

  function continueAnyway() {
    addUser("Continue with my request");
    addBot("Got it. What's your name?");
    setStep("name");
  }

  function reset() {
    setMessages(initialMessages);
    setStep("problem");
    setDraft("");
    setInputError("");
    setData({ problem: "", name: "", phone: "", address: "" });
  }

  const placeholders: Record<string, string> = {
    problem: "e.g. My HP printer keeps jamming the paper…",
    name: "Your full name",
    phone: "e.g. 07441 448082",
    address: "House number, street, town",
  };
  const showInput = ["problem", "name", "phone", "address"].includes(step);

  return (
    <>
      <button
        type="button"
        className="chatbot-toggle"
        aria-label={open ? "Close chat" : "Chat with Pinterok"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <FiX /> : <FiMessageCircle />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-panel"
            role="dialog"
            aria-label="Pinterok chat assistant"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : 12 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="chatbot-header">
              <span>
                <FiMessageCircle aria-hidden="true" /> Pinterok Assistant
              </span>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
              >
                <FiX />
              </button>
            </div>
            <div className="chatbot-messages" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`chatbot-message ${m.from}`}>
                  {m.text}
                </div>
              ))}
              {step === "off-topic" && (
                <div className="chatbot-quick-replies">
                  <a
                    className="chatbot-quick-reply"
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                  >
                    <FiPhoneCall /> Call {phone}
                  </a>
                  <a
                    className="chatbot-quick-reply"
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp /> Message on WhatsApp
                  </a>
                  <button
                    type="button"
                    className="chatbot-quick-reply primary"
                    onClick={continueAnyway}
                  >
                    Continue with my request <FiArrowRight />
                  </button>
                </div>
              )}
              {step === "retry" && (
                <div className="chatbot-quick-replies">
                  <a
                    className="chatbot-quick-reply"
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                  >
                    <FiPhoneCall /> Call {phone}
                  </a>
                  <a
                    className="chatbot-quick-reply"
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp /> Message on WhatsApp
                  </a>
                  <button
                    type="button"
                    className="chatbot-quick-reply primary"
                    onClick={() => void submitLead(data)}
                  >
                    Try again
                  </button>
                </div>
              )}
              {step === "done" && (
                <div className="chatbot-quick-replies">
                  <button
                    type="button"
                    className="chatbot-quick-reply primary"
                    onClick={reset}
                  >
                    Start a new conversation
                  </button>
                </div>
              )}
            </div>
            {showInput && (
              <form className="chatbot-input-row" onSubmit={handleSend}>
                {step === "problem" ? (
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={placeholders[step]}
                    rows={2}
                    maxLength={3000}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(e);
                      }
                    }}
                  />
                ) : (
                  <input
                    type={step === "phone" ? "tel" : "text"}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={placeholders[step]}
                    maxLength={step === "address" ? 200 : 100}
                  />
                )}
                <button type="submit" aria-label="Send">
                  <FiSend />
                </button>
              </form>
            )}
            {step === "submitting" && (
              <p className="chatbot-status" role="status">
                Sending…
              </p>
            )}
            {inputError && (
              <p className="chatbot-error" role="alert">
                {inputError}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
