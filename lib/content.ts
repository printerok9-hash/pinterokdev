export const services = [
  {
    title: "Printer repair",
    slug: "printer-repair",
    description:
      "From paper jams to complex faults. Expert diagnostics that get you back to printing.",
    
  },
  {
    title: "Cartridge refilling",
    slug: "cartridge-refilling",
    description:
      "More pages, less waste. Affordable ink cartridge refills for your everyday printing.",
   
  },
  {
    title: "Toner refilling",
    slug: "toner-refilling",
    description:
      "Keep your office running with professional toner refill and maintenance solutions.",
    
  },
  {
    title: "Scanner repair",
    slug: "scanner-repair",
    description:
      "Clear scans. Seamless workflows. Troubleshooting and repairs for your scanner.",
    
  },
];
export const faqs = [
  [
    "How quickly can you repair my printer?",
    "We aim to offer same-day appointments where technician availability, your location and parts allow. We will confirm timing and an estimate before you book.",
  ],
  [
    "Do you provide home service?",
    "Yes. We arrange doorstep printer diagnostics and repairs for homes and offices. Contact us with your postcode to confirm coverage.",
  ],
  [
    "Which printer brands do you repair?",
    "We work with HP, Canon, Epson, Brother, Xerox, Ricoh, Lexmark, Samsung, Kyocera and other major brands, subject to model and parts availability.",
  ],
  [
    "Do you repair office printers?",
    "Yes. We troubleshoot and maintain office printers and multifunction devices, helping reduce disruption to your business.",
  ],
  [
    "Can you fix WiFi printer issues?",
    "We can diagnose wireless connectivity, printer offline messages, network configuration and computer or mobile printing issues.",
  ],
  [
    "Do you provide cartridge refilling?",
    "Yes, for compatible cartridges and toner units. Tell us your printer model so we can check suitability and provide an estimate.",
  ],
  [
    "How can I book a repair?",
    "Call +44 7441448082, send us a WhatsApp message, or submit the online repair request. We will contact you to confirm your appointment.",
  ],
  [
    "Are you connected with HP or Canon?",
    "No. Pinterok is an independent third-party repair provider. We are not authorised, affiliated, endorsed or sponsored by HP, Canon or any other manufacturer. Brand names and trademarks belong to their respective owners and are used only for identification.",
  ],
];
export const posts = [
  {
    slug: "how-to-fix-hp-printer-not-printing",
    title: "How to fix an HP printer that’s not printing",
    category: "TROUBLESHOOTING",
    description:
      "A practical checklist to help you find out what is holding up your print queue.",
    content:
      "Start with the basics\nCheck that your printer is powered on and has paper. Look at the display for a specific error message. Never open powered internal components.\n\nCheck your print queue\nOpen your computer’s printer settings, select the correct printer and cancel stuck jobs. Confirm it is not set to pause or work offline.\n\nCheck the connection\nFor USB printers, check the cable connection. For wireless printers, confirm the computer and printer are on the same network.\n\nWhen to ask for help\nIf the problem continues, note the printer model and error code and contact Pinterok. We provide independent repair services and are not affiliated with HP.",
  },
  {
    slug: "canon-printer-error-codes-explained",
    title: "Canon printer error codes, explained",
    category: "PRINTER CARE",
    description:
      "What to do when your printer display has something to tell you.",
    content:
      "Find the exact code\nWrite down the full error code and model number. Codes vary by model, so check the manual supplied with your printer or the manufacturer’s support page.\n\nLook for simple causes\nCheck for empty paper trays, an open cover or a cartridge that is not seated correctly. Follow your model’s instructions and do not force stuck parts.\n\nGet expert help\nPersistent errors may need a technician. Share the code with Pinterok so we can help assess the next step. We are an independent provider, not affiliated with Canon.",
  },
  {
    slug: "why-printer-shows-offline",
    title: "Why does your printer keep going offline?",
    category: "CONNECTIVITY",
    description:
      "Reconnect your printer and get your home office back on track.",
    content:
      "Check the network\nMake sure your printer and computer are connected to the same WiFi network. A guest network may isolate devices.\n\nRestart and reconnect\nSave your work, restart the printer and check its network status. Consult the device manual before resetting any network settings.\n\nSelect the right printer\nRemove stuck print jobs and choose the correct printer in your system settings. Multiple saved copies of the same printer can cause confusion.\n\nStill offline?\nPinterok can help with connectivity and setup for homes and offices. Tell us your printer model and what you have tried.",
  },
];
export async function publicContent(kind: string) {
  try {
    const r = await fetch(
      `${process.env.API_URL || "http://127.0.0.1:4000"}/api/public/${kind}`,
      { cache: "no-store", signal: AbortSignal.timeout(2000) },
    );
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}
