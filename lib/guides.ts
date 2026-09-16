export type GuideFaq = { q: string; a: string };
export type GuideSection = { heading: string; answer: string; body: string };
export type Guide = {
  slug: string;
  cluster: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  h1: string;
  intro: string;
  quickAnswer: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  related: string[];
  relatedService: { slug: string; label: string };
};

export const guides: Guide[] = [
  {
    slug: "printer-offline",
    cluster: "Offline printer",
    seoTitle: "Why Is My Printer Offline? How to Get It Back Online",
    metaDescription:
      "Printer showing offline even though it's connected? Here's why it happens and a clear, independent step-by-step guide to getting it back online in the UK.",
    primaryKeyword: "why is my printer offline",
    secondaryKeywords: [
      "printer showing offline",
      "printer offline but connected to wifi",
      "how to get printer back online",
      "printer says offline windows",
      "printer offline mac",
    ],
    h1: "Why is my printer offline, and how do I fix it?",
    intro:
      "“Offline” almost never means your printer is broken. It usually means your computer has lost track of it. Here's how to find out why and reconnect it.",
    quickAnswer:
      "A printer usually shows offline when your computer can't confirm a live connection to it, not because the printer itself has failed. Common causes are a dropped Wi-Fi connection, the printer set to work offline in your operating system, a sleeping printer, or a changed IP address. Restarting both devices and re-selecting the printer fixes most cases.",
    sections: [
      {
        heading: "What does “printer offline” actually mean?",
        answer:
          "It means your computer's print system can't currently reach the printer over USB or the network. The printer's own display may show it is on and ready — the disconnect is happening on the computer's side, not necessarily the printer's.",
        body: "Windows and macOS both keep a saved status for every printer they know about. That status is only updated when the computer successfully checks in with the printer, so if a check-in fails — because the printer went to sleep, changed network address, or the Wi-Fi briefly dropped — the saved status can get stuck on “offline” even after the printer is available again. This is why restarting things so often resolves it: it forces a fresh check-in.",
      },
      {
        heading: "Is your printer set to “work offline” by mistake?",
        answer:
          "Windows has a manual “Use Printer Offline” setting that is sometimes toggled on accidentally, usually after a failed print job. Turning it off is a two-minute fix and solves a large share of offline reports.",
        body: "On Windows, open Settings > Bluetooth & devices > Printers & scanners, select your printer, and open the print queue. Check the Printer menu for “Use Printer Offline” and untick it if it's ticked. On a Mac, open System Settings > Printers & Scanners, select the printer and check it isn't paused. If the printer reappears as ready straight away, the issue was software, not a fault with the printer itself.",
      },
      {
        heading: "Could a network or IP address change be the cause?",
        answer:
          "Yes — if your router assigned your printer a new IP address (which can happen after a power cut or router restart), your computer is still trying to reach the old address and will report the printer as offline.",
        body: "Wireless printers are usually configured with a dynamic IP address that your router can change from time to time. If your printer worked fine yesterday and is offline today with no other changes, this is one of the most common causes. Removing the printer from your computer and re-adding it (letting the operating system rediscover it fresh) usually resolves this, as does giving the printer a fixed (static) IP address or DHCP reservation in your router settings if you're comfortable doing so.",
      },
      {
        heading: "Should I restart the printer, the router, or the computer first?",
        answer:
          "Restart in this order for the best chance of an immediate fix: printer first, then router, then computer. Give each one at least 30 seconds fully powered off before switching back on.",
        body: "Turn the printer off at its own power switch (not just standby), wait 30 seconds, and turn it back on. Do the same with your router if the printer is wireless. Finally, restart the computer you're printing from. This clears temporary memory on all three devices and forces a completely fresh connection, which resolves the majority of offline errors that a simple retry doesn't.",
      },
      {
        heading: "What if the printer still shows offline after restarting everything?",
        answer:
          "Remove the printer from your computer entirely and add it again from scratch, making sure you select the correct connection type (Wi-Fi, USB or network) rather than reusing an old saved entry.",
        body: "Old printer entries can carry over a broken driver or an out-of-date address even after a restart. Delete the printer from your list of devices, then use your operating system's “Add printer or scanner” option to find it again. If it still won't reconnect, the fault may sit with the printer's own network card, an outdated driver, or a hardware issue, and that's a good point to get an independent technician to take a look.",
      },
    ],
    faqs: [
      {
        q: "Why does my printer keep going offline randomly?",
        a: "Repeated offline drops usually point to an unstable Wi-Fi signal, a router that changes your printer's IP address often, or a printer power-saving mode that disconnects it from the network when idle. Moving the printer closer to the router or disabling aggressive sleep settings often helps.",
      },
      {
        q: "Why is my printer offline but connected to Wi-Fi?",
        a: "Being connected to Wi-Fi only confirms the printer can reach the internet or router — it doesn't guarantee your specific computer's print software has an up-to-date connection to it. Re-adding the printer on that computer usually fixes the mismatch.",
      },
      {
        q: "Does an offline printer mean it's broken?",
        a: "No. “Offline” is a software status, not a hardware diagnosis. Most offline printers work perfectly once the connection between the computer and printer is refreshed. A genuine hardware fault usually shows as an error code on the printer's own display instead.",
      },
      {
        q: "How do I get my printer back online on Windows 11?",
        a: "Go to Settings > Bluetooth & devices > Printers & scanners, select the printer, open the queue, and untick “Use Printer Offline” in the Printer menu. If that option isn't ticked, remove and re-add the printer instead.",
      },
      {
        q: "Why does my printer show offline only on one computer?",
        a: "This points to a local software issue on that specific computer, such as an outdated driver or a stuck print queue, rather than a problem with the printer itself, since other devices can still reach it normally.",
      },
    ],
    related: ["printer-not-connecting-to-wifi", "printer-not-printing", "printer-driver-problems"],
    relatedService: { slug: "remote-printer-support", label: "Remote printer support" },
  },
  {
    slug: "printer-not-connecting-to-wifi",
    cluster: "Wi-Fi connection",
    seoTitle: "Printer Not Connecting to Wi-Fi? How to Reconnect It",
    metaDescription:
      "A practical, independent guide to fixing a printer that won't connect to Wi-Fi, keeps dropping the connection, or can't find your network at all.",
    primaryKeyword: "printer not connecting to wifi",
    secondaryKeywords: [
      "printer wifi connection problem",
      "reconnect printer to wifi",
      "wireless printer connection guide",
      "printer can't find wifi network",
      "printer keeps disconnecting from wifi",
    ],
    h1: "Printer not connecting to Wi-Fi? Here's how to reconnect it",
    intro:
      "Wireless printers rely on a stable handshake with your router. When that handshake fails, the fix is usually simple once you know which link in the chain has broken.",
    quickAnswer:
      "Most Wi-Fi connection failures come down to the printer and computer being on different networks, an incorrect Wi-Fi password entered on the printer, a weak signal, or a router setting (like band steering or guest network isolation) blocking the connection. Confirming the network name, re-entering the password, and moving the printer closer to the router resolves the majority of cases.",
    sections: [
      {
        heading: "Are your printer and computer really on the same network?",
        answer:
          "This is the single most common cause of Wi-Fi printing problems. If your router broadcasts more than one network — for example a 2.4GHz and 5GHz band, or a separate guest Wi-Fi — your printer and computer must be joined to the same one.",
        body: "Many printers only support the 2.4GHz band, while phones and laptops often default to 5GHz. If your router shows two similarly named networks, check your printer's own network settings menu to see exactly which one it joined, then connect your computer to that same network. Guest networks are usually deliberately isolated from your main devices for security, so a printer on a guest network typically can't be reached at all.",
      },
      {
        heading: "Is the Wi-Fi password on the printer correct?",
        answer:
          "Printers are usually set up once and rarely reconnected, so an old or mistyped password is easy to overlook — especially if your router password has changed since the printer was first configured.",
        body: "Use the printer's own control panel or touchscreen to open its Wi-Fi setup menu and re-enter the network password carefully, watching for similar-looking characters (such as 0 and O, or 1 and l). Many printers also support WPS (Wi-Fi Protected Setup), a button on the router you can press to connect the printer without typing a password at all, if your router supports it.",
      },
      {
        heading: "Could a weak signal be the problem?",
        answer:
          "Printers often have simpler Wi-Fi antennas than phones or laptops, so they can lose connection at distances or through walls that other devices handle without issue.",
        body: "Check the signal strength shown in the printer's network settings menu. If it's poor, try moving the printer closer to the router, removing obstructions between them, or adding a Wi-Fi extender or mesh access point nearer the printer. A wired Ethernet connection to the router, if your printer supports it, removes Wi-Fi signal issues entirely.",
      },
      {
        heading: "Has your router changed recently?",
        answer:
          "A new router, a firmware update, or a change to router security settings can all silently drop devices that were previously connected, including your printer.",
        body: "If your printer worked fine before a router change and has failed to reconnect since, treat it as a fresh setup rather than trying to “reconnect” it: run the printer's Wi-Fi setup wizard again from scratch and select the current network name and password. Some routers also apply MAC address filtering, which blocks unrecognised devices — check your router's connected devices list to confirm the printer isn't being blocked.",
      },
      {
        heading: "What if the printer connects but printing still fails?",
        answer:
          "A successful Wi-Fi connection only proves the printer can reach the network — it doesn't guarantee your computer has the right driver or a current address for it, which is a separate and equally common issue.",
        body: "If the printer's own display confirms it has an IP address and a good signal, but jobs still won't print, the fault has moved from the network to your computer's print software. See our guide to a printer that's connected but not printing for the next steps.",
      },
    ],
    faqs: [
      {
        q: "Why won't my printer find my Wi-Fi network at all?",
        a: "This usually means the printer only supports the 2.4GHz band and your network name for that band is hidden, disabled, or set to the same name as your 5GHz band in a way the printer can't distinguish. Check your router settings for separate band names.",
      },
      {
        q: "How do I reconnect my printer to Wi-Fi after a router change?",
        a: "Run the printer's built-in wireless setup wizard from its control panel as if setting it up for the first time, then select your current network name and enter the current password.",
      },
      {
        q: "Can a firewall block my printer's Wi-Fi connection?",
        a: "A computer's firewall can block communication with a printer even when the Wi-Fi connection itself is working, particularly on public or work network profiles. Temporarily allow the printer through your firewall to test this.",
      },
      {
        q: "Why does my printer keep dropping off Wi-Fi?",
        a: "Frequent drops usually point to a weak or congested signal, a router that changes channel automatically, or the printer's power-saving mode disconnecting it when idle. Disabling aggressive sleep settings on the printer often helps.",
      },
      {
        q: "Do all printers support 5GHz Wi-Fi?",
        a: "No. Many home and small-office printers only support the older 2.4GHz band, which has better range but is more congested. Check your printer's specification if it can't see your 5GHz network.",
      },
    ],
    related: ["printer-offline", "how-to-set-up-a-wireless-printer", "printer-not-printing"],
    relatedService: { slug: "remote-printer-support", label: "Remote printer support" },
  },
  {
    slug: "printer-not-printing",
    cluster: "Not printing",
    seoTitle: "Printer Not Printing? Common Causes and Fixes",
    metaDescription:
      "Printer connected but nothing comes out? Work through the real causes of a printer that won't print, from stuck queues to paused drivers, step by step.",
    primaryKeyword: "printer not printing",
    secondaryKeywords: [
      "printer connected but not printing",
      "printer won't print documents",
      "print job stuck in queue",
      "printer not responding",
      "nothing happens when i print",
    ],
    h1: "Printer connected but not printing? Here's what to check",
    intro:
      "When a printer looks fine but nothing comes out, the fault is almost always in the print queue or the software connection, not the printer's hardware.",
    quickAnswer:
      "A printer that's on, connected, and still won't print is usually blocked by a stuck job in the print queue, a driver set to “pause printing”, or the wrong printer selected as default. Clearing the queue, checking for a paused printer, and confirming the correct printer is selected resolves most cases within a few minutes.",
    sections: [
      {
        heading: "Is a stuck job blocking your print queue?",
        answer:
          "A single failed print job can jam the entire queue, so every document sent after it also fails to print until the stuck job is removed.",
        body: "Open your printer's queue (Settings > Printers & scanners > your printer > Open print queue on Windows, or System Settings > Printers & Scanners on a Mac) and cancel any jobs listed, especially ones that have been sitting there a while. If a job won't cancel normally, restarting the print spooler service (Windows) or restarting the computer usually clears it.",
      },
      {
        heading: "Is the printer paused or set to work offline?",
        answer:
          "Both Windows and macOS let you pause a printer or a specific queue, and this setting can be toggled without you noticing, especially after a previous failed print.",
        body: "In the print queue window, check the Printer menu for a “Pause Printing” option and make sure it isn't ticked. Also check that “Use Printer Offline” isn't enabled — see our dedicated offline printer guide if it is, since this is one of the most common overlaps between the two problems.",
      },
      {
        heading: "Are you printing to the correct printer?",
        answer:
          "If you have more than one printer installed, or several saved copies of the same one, your document may be sending to the wrong entry — which can look identical to nothing happening at all.",
        body: "Check your default printer in Settings > Printers & scanners and remove any duplicate or outdated entries for the same physical printer. When printing, always confirm the correct device is selected in the print dialog rather than assuming the default is right, particularly on shared office computers.",
      },
      {
        heading: "Could the driver or print spooler be at fault?",
        answer:
          "The print spooler is the background service that manages everything you send to print. If it has crashed or become corrupted, print jobs can disappear without any error message.",
        body: "On Windows, search for “Services”, find “Print Spooler”, and restart it (right-click > Restart). If problems continue, uninstalling and reinstalling the printer driver from the manufacturer's current download page often clears a corrupted installation. Always use the driver version matched to your specific operating system.",
      },
      {
        heading: "Have you checked for a physical fault on the printer itself?",
        answer:
          "If the queue is clear, the printer isn't paused, and the driver is current, check the printer's own display for a hidden error — a paper sensor fault, low toner lockout, or a cover left slightly open can all silently block printing.",
        body: "Open and firmly close all covers, confirm paper is loaded correctly, and check the display for any icon or code, even a subtle one. If the printer accepts jobs into its own memory but never produces a page, and there's no visible error, this is a good point to get an independent technician to check the print engine itself.",
      },
    ],
    faqs: [
      {
        q: "Why does my print job just disappear from the queue?",
        a: "This usually means the print spooler service processed and discarded the job due to a driver mismatch or corrupted spooler file. Restarting the print spooler service and reinstalling the driver typically resolves it.",
      },
      {
        q: "How do I clear a stuck print queue?",
        a: "Open your printer's queue, cancel all listed jobs, then restart the print spooler service (Windows) or restart your Mac. If jobs still won't clear, restart the printer itself as a final step.",
      },
      {
        q: "Why does my printer make noise but not print anything?",
        a: "This usually points to a paper feed or sensor issue rather than a software fault — the printer is attempting the job but failing mechanically. Check for jammed paper, debris in the paper path, or a paper sensor error on the display.",
      },
      {
        q: "Why can I print a test page but not documents?",
        a: "A successful test page confirms the printer and driver connection both work, so the fault likely sits with the specific application you're printing from, its print settings, or the file itself. Try printing a different document to confirm.",
      },
      {
        q: "Should I reinstall my printer driver?",
        a: "It's a reasonable step if restarting the spooler and clearing the queue haven't worked. Uninstall the printer from your device list first, then download and install the current driver from the manufacturer's official support page for your exact model.",
      },
    ],
    related: ["printer-offline", "printer-driver-problems", "printer-paper-jam"],
    relatedService: { slug: "remote-printer-support", label: "Remote printer support" },
  },
  {
    slug: "poor-print-quality",
    cluster: "Print quality",
    seoTitle: "Poor Print Quality: Blank, Faded or Blurry Prints Fixed",
    metaDescription:
      "Printing blank pages, faded text, streaks or blurry output? An independent guide to diagnosing and fixing the most common print quality problems.",
    primaryKeyword: "printer printing blank pages",
    secondaryKeywords: [
      "faded printer output",
      "printer printing lines",
      "blurry printer output",
      "poor print quality",
      "printer streaking",
    ],
    h1: "Blank, faded, streaky or blurry prints: how to fix print quality",
    intro:
      "Print quality problems almost always trace back to the cartridge, the print head, or the paper being used — and each symptom points to a different one.",
    quickAnswer:
      "Blank pages usually mean an empty or unrecognised cartridge or a blocked print head. Faded prints point to low ink or an incorrect print setting. Streaks and lines usually mean a dirty or clogged print head, and blurry output is often the wrong paper type selected in the print settings. Running a built-in nozzle check and cleaning cycle resolves the majority of these.",
    sections: [
      {
        heading: "Why is my printer producing completely blank pages?",
        answer:
          "A blank page usually means either the cartridge is empty or not making contact, or the print head nozzles are fully blocked, so no ink or toner is reaching the page at all.",
        body: "Check the ink or toner level shown on the printer's display or via your computer, and reseat the cartridge by removing and firmly reinserting it. For inkjet printers, run the built-in nozzle check pattern from the maintenance menu — if the pattern itself is blank or has large gaps, run a print head cleaning cycle. For laser printers, check the toner cartridge's sealing tab has been fully removed if it's new.",
      },
      {
        heading: "Why does my printing look faded or patchy?",
        answer:
          "Faded output is usually a genuine low-ink or low-toner situation, but it can also happen when a print setting like “draft” or “ink saver” mode is enabled, or with a partially clogged nozzle.",
        body: "Check your print settings dialog for a quality or draft mode and switch it to normal or best. If ink levels are adequate and quality settings are correct, run a nozzle check and cleaning cycle as above. Patchy fading in specific areas of the page (rather than overall) more often points to a partially blocked nozzle than an empty cartridge.",
      },
      {
        heading: "What causes streaks or lines across the page?",
        answer:
          "Vertical or horizontal lines are a classic sign of a dirty, worn, or partially blocked print head, and on laser printers can also indicate a scratched drum unit.",
        body: "Run your printer's automatic print head cleaning cycle from its maintenance menu, which flushes the nozzles and can resolve minor blockages. If lines persist after two or three cleaning cycles, or the same line appears in the same place on every page (a strong sign of a scratched drum on laser printers), the part itself may need replacing.",
      },
      {
        heading: "Why does my text or image look blurry or smudged?",
        answer:
          "Blurry output is commonly caused by the wrong paper type selected in your print settings, printing on the wrong side of specialist paper, or touching a laser-printed page before the toner has cooled and set.",
        body: "Match the “paper type” setting in your print dialog to the actual paper loaded (plain, photo, glossy, etc.), since this controls how much ink is applied and how it's dried or fused. For laser printers, let pages cool for a few seconds before handling them, especially with heavier or coated paper stock.",
      },
      {
        heading: "When does a print quality issue need a technician?",
        answer:
          "If cleaning cycles, fresh cartridges and correct settings don't resolve the issue after a couple of attempts, the fault is likely mechanical — a worn print head, a damaged drum, or a fuser unit problem — rather than something you can clear yourself.",
        body: "Persistent lines, colours that never align correctly, or quality that degrades again within days of a fix are worth having assessed properly, since continuing to run cleaning cycles on a mechanical fault can waste ink or toner without improving anything.",
      },
    ],
    faqs: [
      {
        q: "Why is my printer printing blank pages after replacing the cartridge?",
        a: "New cartridges sometimes need the protective seal or tab fully removed, or the printer needs a nozzle check and cleaning cycle to draw fresh ink through the print head. Run the cleaning cycle from the maintenance menu after installing a new cartridge.",
      },
      {
        q: "How often should I run a print head cleaning cycle?",
        a: "Only when you notice a quality problem — running cleaning cycles unnecessarily uses up ink. If quality is good, there's no need to clean the print head on a schedule.",
      },
      {
        q: "Why does only one colour print faded or missing?",
        a: "This points to that specific colour cartridge being low, empty, or blocked, rather than a general printer fault. Check that individual cartridge's level and run a nozzle check to confirm which colour is affected.",
      },
      {
        q: "Can bad paper cause print quality problems?",
        a: "Yes. Damp, very thin, or incompatible paper can cause smudging, jams and inconsistent ink absorption. Store paper flat in a dry place and use paper rated for your printer type.",
      },
      {
        q: "Why do my printed colours look wrong?",
        a: "Incorrect colours usually mean a low or empty colour cartridge, an outdated driver, or a colour profile mismatch in your print settings. Try a nozzle check first, then confirm your driver is up to date.",
      },
    ],
    related: ["printer-not-recognising-ink-cartridge", "printer-paper-jam", "printer-troubleshooting-guide"],
    relatedService: { slug: "printer-servicing", label: "Printer servicing" },
  },
  {
    slug: "printer-paper-jam",
    cluster: "Paper jams",
    seoTitle: "Printer Paper Jams: How to Clear and Prevent Them",
    metaDescription:
      "A safe, independent guide to clearing a printer paper jam and stopping it from happening again, including why printers stop picking up paper at all.",
    primaryKeyword: "printer paper jam help",
    secondaryKeywords: [
      "how to clear printer paper jam",
      "printer keeps jamming paper",
      "printer not picking up paper",
      "paper jam error printer",
      "printer feeding multiple pages",
    ],
    h1: "Printer paper jam? How to clear it safely and stop it recurring",
    intro:
      "Most paper jams are caused by the paper itself, the tray, or the rollers rather than a mechanical fault — which is good news, because it usually means an easy fix.",
    quickAnswer:
      "Clear a paper jam by gently pulling stuck paper in the direction it normally travels through the printer, never backwards, and always check for small torn fragments left behind. Jams that keep recurring are usually caused by overfilled trays, worn feed rollers, damp or damaged paper, or paper loaded incorrectly against the tray guides.",
    sections: [
      {
        heading: "How do I safely clear a paper jam without damaging the printer?",
        answer:
          "Always pull jammed paper slowly in the same direction it was already travelling through the printer, using both hands to keep it flat and avoid tearing it.",
        body: "Turn the printer off first for safety, then open every access point the manufacturer provides (rear panel, top cover, tray) rather than forcing paper out through just one opening. Check carefully for small torn corners left behind, since even a tiny fragment left in the paper path will cause the next jam. Never use sharp tools to remove paper, as this can damage internal rollers or sensors.",
      },
      {
        heading: "Why does my printer keep jamming paper repeatedly?",
        answer:
          "Recurring jams almost always point to the paper or the tray rather than the printer's mechanism — overfilled trays, paper of the wrong weight, or humidity affecting the paper are the most common causes.",
        body: "Check that the paper tray isn't overfilled beyond its marked maximum line, and that the paper guides are snug against the stack without squeezing it. Fan the paper stack before loading it to separate any stuck-together sheets. Store paper flat, in its wrapper, away from humidity, since damp paper is significantly more likely to jam or feed multiple sheets at once.",
      },
      {
        heading: "Why is my printer not picking up paper at all?",
        answer:
          "This is usually the opposite problem to a jam — worn or dirty feed rollers can no longer grip the paper firmly enough to pull a sheet in, especially after years of regular use.",
        body: "Check that paper is loaded correctly and not curled or bent. Many printers allow you to clean the feed rollers with a lint-free cloth lightly dampened with water (check your model's manual first). If cleaning doesn't help, the rollers themselves have likely worn smooth and may need replacing — a common wear part on printers that have handled a high volume of pages.",
      },
      {
        heading: "Why does my printer feed multiple pages at once?",
        answer:
          "Multiple-page feeds usually mean the paper wasn't separated properly before loading, the tray is overfilled, or the separation pad (a small rubber pad that holds back extra sheets) has worn down.",
        body: "Always fan a new stack of paper before loading it, and don't exceed the tray's maximum capacity line. If pulling multiple sheets continues with a correctly loaded, undamaged stack, the separation pad may be worn and due for replacement, which is a straightforward maintenance part on most printer models.",
      },
      {
        heading: "When is a paper jam a sign of a bigger problem?",
        answer:
          "If jams happen on almost every print, involve the same spot in the paper path every time, or are accompanied by unusual noise, the cause is likely a worn part rather than the paper itself.",
        body: "A jam in the exact same location repeatedly usually means a specific roller, sensor, or guide has failed at that point, rather than random bad luck with paper. This is worth having checked by a technician, since continuing to force jams clear can cause further damage to the paper path.",
      },
    ],
    faqs: [
      {
        q: "Is it safe to pull jammed paper out myself?",
        a: "Yes, as long as you turn the printer off first, pull gently in the direction the paper was travelling, and check for torn fragments left behind. Never yank paper backwards against the mechanism.",
      },
      {
        q: "Why does my printer say there's a paper jam when there isn't one?",
        a: "This usually means a paper sensor is dirty, misaligned, or faulty, and is falsely triggering even with a clear paper path. Opening and closing all covers firmly, and checking sensors for dust, often resolves a false jam reading.",
      },
      {
        q: "What paper weight should I use to avoid jams?",
        a: "Standard printers are designed for around 80gsm office paper. Very thin, very heavy, glossy, or damp paper is more likely to jam unless your printer's specification confirms it supports that paper type.",
      },
      {
        q: "How do I clean my printer's paper feed rollers?",
        a: "Turn the printer off, locate the feed rollers (check your manual for the exact position), and wipe them gently with a lint-free cloth very lightly dampened with water. Let them dry fully before printing again.",
      },
      {
        q: "Can a paper jam damage my printer permanently?",
        a: "A single jam cleared carefully rarely causes lasting damage. Repeated jams pulled out roughly, or torn fragments left inside, can damage rollers or sensors over time, which is why gentle, careful removal matters.",
      },
    ],
    related: ["poor-print-quality", "printer-not-printing", "printer-troubleshooting-guide"],
    relatedService: { slug: "printer-servicing", label: "Printer servicing" },
  },
  {
    slug: "how-to-set-up-a-wireless-printer",
    cluster: "Printer setup",
    seoTitle: "How to Set Up a Wireless Printer (Windows and Mac)",
    metaDescription:
      "A clear, independent step-by-step guide to setting up a wireless printer on Windows or Mac and adding it to your laptop, desktop or home network.",
    primaryKeyword: "how to set up a wireless printer",
    secondaryKeywords: [
      "connect printer to laptop",
      "add printer to windows",
      "connect printer to mac",
      "wireless printer setup guide",
      "new printer wifi setup",
    ],
    h1: "How to set up a wireless printer on Windows or Mac",
    intro:
      "Setting up a wireless printer properly the first time avoids most of the offline and connection problems that show up later. Here's the process from unboxing to your first print.",
    quickAnswer:
      "To set up a wireless printer: connect it to power, use its control panel to join your Wi-Fi network, then add it on your computer through Settings > Printers & scanners (Windows) or System Settings > Printers & Scanners (Mac), letting the operating system find and install it automatically. Print a test page to confirm the setup worked.",
    sections: [
      {
        heading: "What should I do before connecting the printer to Wi-Fi?",
        answer:
          "Unbox the printer fully, remove all shipping tape and protective packaging from the ink or toner compartment, and load paper before powering it on, since some printers run a short setup sequence on first power-up.",
        body: "Check your printer's manual or quick-start sheet for any first-time steps specific to that model, such as cartridge installation order. Have your Wi-Fi network name and password ready, since you'll need to enter them on the printer's own control panel or touchscreen during setup.",
      },
      {
        heading: "How do I connect the printer to my Wi-Fi network?",
        answer:
          "Use the printer's own control panel: open its network or Wi-Fi setup menu, select your network name from the list it finds, and enter your Wi-Fi password when prompted.",
        body: "If your printer supports WPS (Wi-Fi Protected Setup), you can often connect it by selecting the WPS option on the printer and pressing the WPS button on your router within about two minutes, without typing a password at all. Once connected, the printer's display should confirm it has an IP address and a Wi-Fi signal.",
      },
      {
        heading: "How do I add the printer on Windows?",
        answer:
          "Go to Settings > Bluetooth & devices > Printers & scanners > Add device, and select your printer once it appears in the list. Windows will usually download and install the correct driver automatically.",
        body: "If the printer doesn't appear automatically, confirm it's fully connected to the same Wi-Fi network as your computer (see our Wi-Fi connection guide if not), and try “The printer that I want isn't listed” for manual setup options, including entering the printer's IP address directly.",
      },
      {
        heading: "How do I add the printer on a Mac?",
        answer:
          "Open System Settings > Printers & Scanners, click Add Printer, Scanner, or Fax, and select your printer from the list once it appears. macOS will typically install the correct driver software automatically via Apple's built-in printer support.",
        body: "If your printer isn't listed, confirm it's connected to the same network, and check for a manufacturer-specific driver download if macOS doesn't detect it automatically, particularly for older or less common printer models.",
      },
      {
        heading: "How do I confirm the setup worked?",
        answer:
          "Print a test page from your computer's printer settings screen once setup is complete, rather than assuming it worked because no error appeared.",
        body: "On Windows, right-click the printer in Printers & scanners and choose “Print a test page”. On a Mac, select the printer in Printers & Scanners and use the Open Print Queue option to send a test job. If the test page prints successfully, your setup is complete and working correctly.",
      },
    ],
    faqs: [
      {
        q: "Do I need a USB cable to set up a wireless printer?",
        a: "No, most modern wireless printers can be fully set up over Wi-Fi using their own control panel, without ever connecting a USB cable. Some printers offer a one-time USB connection as an alternative setup method if you prefer it.",
      },
      {
        q: "Can I set up a printer without a screen or touchpad?",
        a: "Yes. Many simpler printers use WPS (a button-press connection method with your router) or a companion smartphone app to complete Wi-Fi setup without needing a display on the printer itself.",
      },
      {
        q: "Why can't my computer find my new printer?",
        a: "This almost always means the printer hasn't successfully joined your Wi-Fi network yet, or is on a different network to your computer. Confirm the printer's own display shows a connected Wi-Fi status before trying to add it on your computer.",
      },
      {
        q: "Do I need to install software from a CD?",
        a: "Rarely, for modern printers. Windows and macOS both include large built-in driver libraries and will usually install everything needed automatically. If you do need extra software, download it fresh from the manufacturer's official website rather than an old CD.",
      },
      {
        q: "Can I connect the same printer to multiple computers?",
        a: "Yes, as long as each computer is on the same Wi-Fi network, you can add the same wireless printer separately on each one using the same setup process.",
      },
    ],
    related: ["printer-not-connecting-to-wifi", "printer-driver-problems", "printer-offline"],
    relatedService: { slug: "remote-printer-support", label: "Remote printer support" },
  },
  {
    slug: "printer-driver-problems",
    cluster: "Driver issues",
    seoTitle: "Printer Driver Problems: Install, Update and Fix",
    metaDescription:
      "An independent troubleshooting guide to installing, updating and fixing printer driver problems on Windows and Mac, and when a driver isn't the real cause.",
    primaryKeyword: "printer driver installation guide",
    secondaryKeywords: [
      "update printer driver",
      "printer driver not working",
      "printer driver troubleshooting",
      "printer driver unavailable",
      "wrong printer driver",
    ],
    h1: "Printer driver problems: how to install, update and troubleshoot them",
    intro:
      "A driver is the translator between your computer and your printer. When it's missing, outdated, or mismatched, printing can fail in ways that look like a hardware problem but aren't.",
    quickAnswer:
      "Install or update a printer driver from the printer manufacturer's official support page, matched exactly to your printer model and operating system version. If a driver is already installed but printing still fails, remove the printer entirely and reinstall it from scratch rather than trying to repair the existing installation.",
    sections: [
      {
        heading: "Where should I download a printer driver from?",
        answer:
          "Always use the manufacturer's official support or downloads page for your exact printer model, rather than a generic driver download site, which can carry outdated or incorrect files.",
        body: "Search for your printer's exact model number plus “support” or “drivers”, find the manufacturer's own page, and select the driver matched precisely to your operating system version (for example, a specific Windows or macOS release). Installing a driver meant for a different model or OS version is one of the most common causes of print quality problems and failures that seem to appear from nowhere.",
      },
      {
        heading: "How do I update an existing printer driver?",
        answer:
          "On Windows, use Windows Update or the Device Manager's “Update driver” option; on a Mac, driver updates are usually delivered through macOS's own software update system rather than manually.",
        body: "In Windows, open Device Manager, find your printer under “Print queues” or “Printers”, right-click and choose Update driver, then “Search automatically”. For a more thorough update, download the latest version directly from the manufacturer's site instead. On macOS, checking for system software updates usually covers printer driver updates for supported models automatically.",
      },
      {
        heading: "What are the signs a driver is the actual problem?",
        answer:
          "Symptoms like garbled text, printing the wrong page size by default, missing print options, or the printer working on one computer but not another, all point towards the driver rather than the printer's hardware.",
        body: "If the printer's own display and lights show it is fully healthy, but printed output is corrupted, incomplete, or the print dialog is missing options your printer should support, a mismatched or corrupted driver is the most likely cause, and reinstalling it is the right next step.",
      },
      {
        heading: "How do I completely reinstall a printer driver?",
        answer:
          "Remove the printer entirely from your device list first, restart your computer, then add the printer again as if it were brand new, allowing the operating system to install a clean driver from scratch.",
        body: "On Windows, go to Settings > Bluetooth & devices > Printers & scanners, select the printer, and choose Remove device. On a Mac, select the printer in Printers & Scanners and click the minus button. After restarting, add the printer again through the normal setup process, which avoids leftover corrupted driver files that a simple update can sometimes miss.",
      },
      {
        heading: "When is the problem not actually the driver?",
        answer:
          "If reinstalling the driver doesn't change anything at all, the fault has likely moved to the network connection, the print queue, or a genuine hardware issue rather than the driver software.",
        body: "Rule out a stuck print queue and an offline status first (see our related guides), since these are frequently mistaken for driver problems. If the driver is confirmed current and correctly matched, and the queue and connection are both clear, a persistent fault points towards the printer's own hardware.",
      },
    ],
    faqs: [
      {
        q: "Do I need a different driver for every Windows version?",
        a: "Sometimes. Drivers are often built for specific Windows versions (such as Windows 10 versus Windows 11), so always check the manufacturer's compatibility list rather than assuming an older driver will work fine on a newer system.",
      },
      {
        q: "Why does Windows say “driver is unavailable”?",
        a: "This usually means Windows can't currently communicate with the printer to confirm driver details, often because the printer is offline, asleep, or disconnected. Confirm the printer is powered on and connected before troubleshooting the driver itself.",
      },
      {
        q: "Can an outdated driver cause a printer to print slowly?",
        a: "Yes, outdated drivers can lack performance improvements and compatibility fixes included in newer releases, which can show up as slower processing or print speeds, particularly with large or complex documents.",
      },
      {
        q: "Is a generic driver as good as the manufacturer's own driver?",
        a: "Generic or universal drivers can get basic printing working, but usually lack features like specific paper settings, scanning support, or ink-level reporting. The manufacturer's own driver is normally the better choice.",
      },
      {
        q: "Do Mac computers need printer drivers installed manually?",
        a: "Often not — macOS includes built-in support for many printer brands and installs the correct driver automatically when you add the printer. Manual installation is mainly needed for less common or older printer models.",
      },
    ],
    related: ["printer-not-printing", "how-to-set-up-a-wireless-printer", "printer-offline"],
    relatedService: { slug: "remote-printer-support", label: "Remote printer support" },
  },
  {
    slug: "printer-not-recognising-ink-cartridge",
    cluster: "Ink and toner",
    seoTitle: "Printer Not Recognising Ink or Toner Cartridge?",
    metaDescription:
      "Independent fixes for a printer that won't recognise a new ink or toner cartridge, shows a false low-ink warning, or rejects a replacement unit.",
    primaryKeyword: "printer not recognising ink cartridge",
    secondaryKeywords: [
      "printer not recognising toner",
      "low ink warning after replacement",
      "printer says cartridge not installed",
      "printer rejects new cartridge",
      "cartridge chip error",
    ],
    h1: "Printer not recognising your ink or toner cartridge? Try this",
    intro:
      "A printer that rejects a brand-new cartridge is frustrating, but the cause is almost always a contact, chip, or seal issue rather than a faulty cartridge.",
    quickAnswer:
      "If your printer won't recognise a new cartridge, remove it and firmly reinsert it, checking the electrical contacts and any protective tape or seal have been fully removed. Persistent errors after reseating usually mean a dirty contact, a chip communication issue, or a cartridge that isn't genuinely compatible with your exact printer model.",
    sections: [
      {
        heading: "Have you removed all the protective seals and tape?",
        answer:
          "New cartridges often ship with tape over the print head or a pull-tab seal over the ink or toner outlet, and leaving either in place is one of the most common reasons a printer refuses to recognise a cartridge.",
        body: "Remove the cartridge and check every surface for orange or clear tape, plastic clips, or a pull-tab, particularly around the underside and the electrical contact strip. These are easy to miss on some cartridge designs. Refit the cartridge only once every piece of packaging has been removed.",
      },
      {
        heading: "Are the electrical contacts clean and properly seated?",
        answer:
          "The gold or copper contact strip on a cartridge communicates its ink level and identity to the printer. Dust, a fingerprint smudge, or the cartridge not clicking fully into place can all break that communication.",
        body: "Remove the cartridge and gently wipe the contact strip with a dry, lint-free cloth (never a wet one, and never touch the contacts with bare fingers if avoidable). Reinsert the cartridge firmly until you feel or hear it click into place, and close the access door completely, since some printers won't read a cartridge until the door is fully shut.",
      },
      {
        heading: "Why does my printer show a low-ink warning right after I replaced the cartridge?",
        answer:
          "This is usually a false reading caused by the printer not yet re-reading the new cartridge's chip, rather than the new cartridge genuinely being low.",
        body: "Remove and reinsert the cartridge to force a fresh read, and check the printer's own menu for an option to reset or confirm ink levels after a cartridge change. If the warning persists across a printer restart, and you're confident the cartridge is genuinely new and correctly seated, the printer's chip reader may need attention.",
      },
      {
        heading: "Does the cartridge need to match my exact printer model?",
        answer:
          "Yes — cartridges are model- and sometimes region-specific, and a cartridge designed for a similar but different model can be physically compatible while still being rejected by the printer's software.",
        body: "Double-check the cartridge part number against your printer's exact model number, including any regional variant. Compatible (non-original) cartridges can also occasionally have chip compatibility issues with certain printer firmware versions; if a compatible cartridge is rejected, try a genuine cartridge to confirm whether the cartridge or the printer is at fault.",
      },
      {
        heading: "What if a genuine, correctly seated cartridge still isn't recognised?",
        answer:
          "If you've confirmed the cartridge is correct, properly seated, and the contacts are clean, but the printer still won't recognise it, the fault is likely with the printer's own contact pins or chip reader rather than the cartridge.",
        body: "This is a hardware-level issue inside the printer itself and is a sensible point to get an independent technician to check the cartridge bay and contact pins, rather than continuing to buy replacement cartridges that are unlikely to solve it.",
      },
    ],
    faqs: [
      {
        q: "Why does my printer say “cartridge not installed” when it is?",
        a: "This almost always means the printer isn't making a clean electrical connection with the cartridge's chip. Remove and firmly reseat the cartridge, checking the contacts are clean and the access door is fully closed.",
      },
      {
        q: "Can I clean printer cartridge contacts myself?",
        a: "Yes, gently wiping the gold or copper contact strip with a dry, lint-free cloth is safe and often resolves recognition issues. Avoid water, solvents, or anything abrasive on the contacts.",
      },
      {
        q: "Why does my printer reject compatible (non-original) cartridges?",
        a: "Some printer firmware is designed to check for a manufacturer-specific chip signature, which certain compatible cartridges may not fully replicate, leading to a rejection or error message even though the cartridge is otherwise fine.",
      },
      {
        q: "Is it normal for a new cartridge to show as low on ink?",
        a: "No, a genuinely new cartridge should show as full. A low reading straight after installation is usually a chip-reading glitch rather than an accurate level, and often clears after removing and reinserting the cartridge.",
      },
      {
        q: "Can a cartridge error damage my printer?",
        a: "A cartridge that simply isn't recognised won't damage the printer. Forcing a cartridge that doesn't fit correctly, or ignoring repeated errors and continuing to print, can occasionally strain the cartridge bay mechanism over time.",
      },
    ],
    related: ["poor-print-quality", "printer-not-printing", "business-printer-support-uk"],
    relatedService: { slug: "toner-contracts", label: "Toner and cartridge supply" },
  },
  {
    slug: "business-printer-support-uk",
    cluster: "Business & office",
    seoTitle: "Business Printer Support & Maintenance in the UK",
    metaDescription:
      "Independent business and office printer support across the UK: troubleshooting, maintenance and repair guidance to help reduce printer downtime.",
    primaryKeyword: "business printer support uk",
    secondaryKeywords: [
      "office printer support uk",
      "managed printer support uk",
      "business printer maintenance uk",
      "office printer troubleshooting",
      "multifunction printer support",
    ],
    h1: "Business and office printer support: keeping your team printing",
    intro:
      "Office printers face heavier daily use than home devices, so small issues turn into repeated downtime faster. Here's how to keep shared and multifunction printers running reliably.",
    quickAnswer:
      "Business printer downtime is usually caused by heavy shared usage wearing feed rollers and drums faster than expected, print queues backing up across multiple users, and toner or parts running out without anyone tracking usage. A basic maintenance routine and a clear point of contact for faults reduces most repeat disruption.",
    sections: [
      {
        heading: "Why do office printers break down more often than home printers?",
        answer:
          "Shared office printers handle a far higher page volume per week than a home device, so parts rated for a certain page count — rollers, drums, fusers — wear out proportionally faster and need replacing on a schedule rather than only when they fail.",
        body: "A device used by one person at home might print a few hundred pages a month, while a shared office printer can handle that many pages in a single day. Planning for scheduled servicing and consumable replacement, rather than waiting for a breakdown, is the main difference between managing a business printer well and managing a home one.",
      },
      {
        heading: "How do I stop print queues backing up with multiple users?",
        answer:
          "Queue backups in an office are usually caused by one stuck job from any single user blocking the shared queue for everyone else behind it, exactly as with a single-user printer but with more people affected at once.",
        body: "Make sure whoever manages your office network knows how to access and clear the shared print queue, and consider print management software for larger teams, which can track jobs, users, and costs, and often flags stuck jobs automatically rather than leaving the whole team unable to print.",
      },
      {
        heading: "How can we track toner and consumable usage across the office?",
        answer:
          "Most business-grade printers report toner, drum and maintenance kit levels through their built-in web interface or management software, which is worth checking regularly rather than waiting for a low-ink warning during a busy period.",
        body: "If your printer supports it, set up email or dashboard alerts for low consumables so replacements can be ordered before they run out completely. For offices managing several printers, a toner supply and maintenance plan removes the need to track this manually per device.",
      },
      {
        heading: "What basic maintenance should an office printer have?",
        answer:
          "Regular cleaning of paper paths and rollers, checking for worn separation pads, and periodic print head or drum checks all help prevent the jams and quality issues that account for most office printer support calls.",
        body: "A simple internal cleaning cycle run monthly, alongside keeping paper stored correctly and not overfilled in trays, prevents a large share of avoidable faults. For higher-volume offices, a scheduled service visit every few months catches wear before it causes a breakdown during business hours.",
      },
      {
        heading: "When should an office printer issue go to a technician rather than IT?",
        answer:
          "IT teams can usually resolve driver, network, and print queue issues, but mechanical problems — paper feed faults, worn drums, print head issues, or unusual noises — need a printer technician rather than software troubleshooting.",
        body: "If a fault returns repeatedly despite clearing queues and restarting devices, or involves a physical noise, smell, or visible damage, that's the point to bring in independent printer repair support rather than continuing to work around it, which usually costs more in lost time than an early repair would.",
      },
    ],
    faqs: [
      {
        q: "What's the difference between managed print services and one-off repairs?",
        a: "Managed print services cover ongoing maintenance, consumable supply and monitoring across your printer fleet under one plan, while one-off repairs address a specific fault as it happens. Offices with several printers often find a plan reduces overall downtime and admin.",
      },
      {
        q: "How often should office printers be serviced?",
        a: "This depends on print volume, but a general guide is every three to six months for moderately used shared printers, or based on the manufacturer's recommended page count between services for your specific model.",
      },
      {
        q: "Can a printer maintenance plan cover multiple brands?",
        a: "Yes, an independent printer support provider can typically service and maintain multiple printer brands under a single plan, rather than requiring a separate contract per manufacturer.",
      },
      {
        q: "What causes most office printer downtime?",
        a: "Worn consumable parts (rollers, drums, separation pads) from high page volumes, stuck print queues affecting multiple users, and running out of toner or parts without warning are the most common causes of office printer downtime.",
      },
      {
        q: "Should a business use compatible or genuine toner?",
        a: "Both can work well, but compatibility varies by printer model and firmware. An independent supplier can advise on which compatible options are reliable for your specific printer, alongside genuine options.",
      },
    ],
    related: ["printer-not-recognising-ink-cartridge", "printer-paper-jam", "printer-troubleshooting-guide"],
    relatedService: { slug: "copier-maintenance", label: "Copier and office maintenance" },
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
