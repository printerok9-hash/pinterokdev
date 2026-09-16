export type LocationFaq = { q: string; a: string };
export type Location = {
  slug: string;
  city: string;
  region: string;
  nearbyAreas: string[];
  localContext: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
};

export const locations: Location[] = [
  {
    slug: "london",
    city: "London",
    region: "Greater London",
    nearbyAreas: ["Croydon", "Ealing", "Romford", "Enfield", "Bromley", "Kingston upon Thames"],
    localContext:
      "From small home offices to busy commercial buildings across London's boroughs, printer downtime is rarely convenient. We arrange visits and remote sessions around your schedule, including outside standard office hours where possible.",
    seoTitle: "Printer Repair in London | Onsite & Remote Support",
    metaDescription:
      "Independent printer repair in London. Onsite visits arranged across Greater London, plus remote support for HP, Canon, Epson, Brother and other brands.",
    h1: "Printer repair in London",
    intro:
      "Independent printer repair and support for homes and businesses in London, with onsite visits arranged across Greater London and remote help available immediately.",
  },
  {
    slug: "manchester",
    city: "Manchester",
    region: "Greater Manchester",
    nearbyAreas: ["Salford", "Stockport", "Bolton", "Oldham", "Trafford", "Wigan"],
    localContext:
      "Manchester's mix of city-centre offices and surrounding boroughs means printer setups vary a lot, from single home printers to shared office multifunction devices. We tailor the visit or remote session to what you're actually running.",
    seoTitle: "Printer Repair in Manchester | Onsite & Remote Support",
    metaDescription:
      "Independent printer repair in Manchester. Onsite visits arranged across Greater Manchester, plus remote support for HP, Canon, Epson, Brother and more.",
    h1: "Printer repair in Manchester",
    intro:
      "Independent printer repair and support for homes and businesses in Manchester, with onsite visits arranged across Greater Manchester and remote troubleshooting available now.",
  },
  {
    slug: "birmingham",
    city: "Birmingham",
    region: "West Midlands",
    nearbyAreas: ["Solihull", "Wolverhampton", "Dudley", "Sandwell", "Walsall", "West Bromwich"],
    localContext:
      "As one of the UK's largest business hubs, Birmingham has no shortage of office printers and copiers under daily pressure. We support both single-printer households and multi-device offices across the wider West Midlands.",
    seoTitle: "Printer Repair in Birmingham | Onsite & Remote Support",
    metaDescription:
      "Independent printer repair in Birmingham. Onsite visits arranged across the West Midlands, plus remote support for HP, Canon, Epson, Brother and more.",
    h1: "Printer repair in Birmingham",
    intro:
      "Independent printer repair and support for homes and businesses in Birmingham, with onsite visits arranged across the West Midlands and remote help available immediately.",
  },
  {
    slug: "leeds",
    city: "Leeds",
    region: "West Yorkshire",
    nearbyAreas: ["Bradford", "Wakefield", "Huddersfield", "Halifax", "Pudsey", "Morley"],
    localContext:
      "Leeds' financial, legal and professional services offices rely heavily on shared office printers staying online, while many households nearby run smaller inkjet setups. We support both.",
    seoTitle: "Printer Repair in Leeds | Onsite & Remote Support",
    metaDescription:
      "Independent printer repair in Leeds. Onsite visits arranged across West Yorkshire, plus remote support for HP, Canon, Epson, Brother and other brands.",
    h1: "Printer repair in Leeds",
    intro:
      "Independent printer repair and support for homes and businesses in Leeds, with onsite visits arranged across West Yorkshire and remote troubleshooting available now.",
  },
  {
    slug: "liverpool",
    city: "Liverpool",
    region: "Merseyside",
    nearbyAreas: ["Wirral", "St Helens", "Sefton", "Knowsley", "Bootle", "Southport"],
    localContext:
      "Liverpool and the wider Merseyside area cover everything from waterfront offices to residential streets across the Wirral. We arrange appointments around your side of the Mersey and your printer's exact fault.",
    seoTitle: "Printer Repair in Liverpool | Onsite & Remote Support",
    metaDescription:
      "Independent printer repair in Liverpool. Onsite visits arranged across Merseyside, plus remote support for HP, Canon, Epson, Brother and other brands.",
    h1: "Printer repair in Liverpool",
    intro:
      "Independent printer repair and support for homes and businesses in Liverpool, with onsite visits arranged across Merseyside and remote help available immediately.",
  },
  {
    slug: "glasgow",
    city: "Glasgow",
    region: "Scotland",
    nearbyAreas: ["Paisley", "East Kilbride", "Hamilton", "Cumbernauld", "Motherwell", "Clydebank"],
    localContext:
      "Glasgow sits at the centre of Scotland's Central Belt, so our appointments and remote sessions cover both the city and the surrounding towns that commute in and out of it daily.",
    seoTitle: "Printer Repair in Glasgow | Onsite & Remote Support",
    metaDescription:
      "Independent printer repair in Glasgow. Onsite visits arranged across the Central Belt, plus remote support for HP, Canon, Epson, Brother and more.",
    h1: "Printer repair in Glasgow",
    intro:
      "Independent printer repair and support for homes and businesses in Glasgow, with onsite visits arranged across the Central Belt and remote troubleshooting available now.",
  },
  {
    slug: "bristol",
    city: "Bristol",
    region: "South West England",
    nearbyAreas: ["Bath", "Weston-super-Mare", "Yate", "Keynsham", "Portishead", "Nailsea"],
    localContext:
      "Bristol's mix of independent businesses, creative studios and home offices means printer needs range from occasional home use to daily commercial printing. We scope each visit to match.",
    seoTitle: "Printer Repair in Bristol | Onsite & Remote Support",
    metaDescription:
      "Independent printer repair in Bristol. Onsite visits arranged across the South West, plus remote support for HP, Canon, Epson, Brother and other brands.",
    h1: "Printer repair in Bristol",
    intro:
      "Independent printer repair and support for homes and businesses in Bristol, with onsite visits arranged across the wider South West and remote help available immediately.",
  },
  {
    slug: "sheffield",
    city: "Sheffield",
    region: "South Yorkshire",
    nearbyAreas: ["Rotherham", "Barnsley", "Chesterfield", "Dronfield", "Worksop", "Doncaster"],
    localContext:
      "Sheffield and its neighbouring South Yorkshire towns include a steady mix of home offices and small business premises, all of which we support with the same appointment process.",
    seoTitle: "Printer Repair in Sheffield | Onsite & Remote Support",
    metaDescription:
      "Independent printer repair in Sheffield. Onsite visits arranged across South Yorkshire, plus remote support for HP, Canon, Epson, Brother and more.",
    h1: "Printer repair in Sheffield",
    intro:
      "Independent printer repair and support for homes and businesses in Sheffield, with onsite visits arranged across South Yorkshire and remote troubleshooting available now.",
  },
  {
    slug: "nottingham",
    city: "Nottingham",
    region: "East Midlands",
    nearbyAreas: ["Derby", "Mansfield", "Loughborough", "Ilkeston", "Beeston", "West Bridgford"],
    localContext:
      "Nottingham and the wider East Midlands cover a broad spread of home printer setups and small business offices, from the city centre out to surrounding towns.",
    seoTitle: "Printer Repair in Nottingham | Onsite & Remote Support",
    metaDescription:
      "Independent printer repair in Nottingham. Onsite visits arranged across the East Midlands, plus remote support for HP, Canon, Epson, Brother and more.",
    h1: "Printer repair in Nottingham",
    intro:
      "Independent printer repair and support for homes and businesses in Nottingham, with onsite visits arranged across the East Midlands and remote help available immediately.",
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}
