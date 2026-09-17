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
    nearbyAreas: [
      "Croydon",
      "Ealing",
      "Romford",
      "Enfield",
      "Bromley",
      "Kingston upon Thames",
    ],
    localContext:
      "We arrange printer repair visits for business and organisational customers. Share your business postcode, printer model and fault so we can confirm local engineer and parts availability before booking.",
    seoTitle: "Business Printer Repair in London | Office Printer Servicing",
    metaDescription:
      "Independent business printer repair in London. Office printer diagnosis and maintenance for organisations. Contact us with your postcode to check availability.",
    h1: "Business printer repair in London",
    intro:
      "Independent printer repair and support for businesses and organisations in London, with onsite visits arranged across Greater London and business remote assistance subject to availability.",
  },
  {
    slug: "manchester",
    city: "Manchester",
    region: "Greater Manchester",
    nearbyAreas: [
      "Salford",
      "Stockport",
      "Bolton",
      "Oldham",
      "Trafford",
      "Wigan",
    ],
    localContext:
      "We arrange printer repair visits for business and organisational customers. Share your business postcode, printer model and fault so we can confirm local engineer and parts availability before booking.",
    seoTitle:
      "Business Printer Repair in Manchester | Office Printer Servicing",
    metaDescription:
      "Independent business printer repair in Manchester. Office printer diagnosis and maintenance for organisations. Contact us with your postcode to check availability.",
    h1: "Business printer repair in Manchester",
    intro:
      "Independent printer repair and support for businesses and organisations in Manchester, with onsite visits arranged across Greater Manchester and business remote assistance subject to availability.",
  },
  {
    slug: "birmingham",
    city: "Birmingham",
    region: "West Midlands",
    nearbyAreas: [
      "Solihull",
      "Wolverhampton",
      "Dudley",
      "Sandwell",
      "Walsall",
      "West Bromwich",
    ],
    localContext:
      "We arrange printer repair visits for business and organisational customers. Share your business postcode, printer model and fault so we can confirm local engineer and parts availability before booking.",
    seoTitle:
      "Business Printer Repair in Birmingham | Office Printer Servicing",
    metaDescription:
      "Independent business printer repair in Birmingham. Office printer diagnosis and maintenance for organisations. Contact us with your postcode to check availability.",
    h1: "Business printer repair in Birmingham",
    intro:
      "Independent printer repair and support for businesses and organisations in Birmingham, with onsite visits arranged across the West Midlands and business remote assistance subject to availability.",
  },
  {
    slug: "leeds",
    city: "Leeds",
    region: "West Yorkshire",
    nearbyAreas: [
      "Bradford",
      "Wakefield",
      "Huddersfield",
      "Halifax",
      "Pudsey",
      "Morley",
    ],
    localContext:
      "We arrange printer repair visits for business and organisational customers. Share your business postcode, printer model and fault so we can confirm local engineer and parts availability before booking.",
    seoTitle: "Business Printer Repair in Leeds | Office Printer Servicing",
    metaDescription:
      "Independent business printer repair in Leeds. Office printer diagnosis and maintenance for organisations. Contact us with your postcode to check availability.",
    h1: "Business printer repair in Leeds",
    intro:
      "Independent printer repair and support for businesses and organisations in Leeds, with onsite visits arranged across West Yorkshire and business remote assistance subject to availability.",
  },
  {
    slug: "liverpool",
    city: "Liverpool",
    region: "Merseyside",
    nearbyAreas: [
      "Wirral",
      "St Helens",
      "Sefton",
      "Knowsley",
      "Bootle",
      "Southport",
    ],
    localContext:
      "We arrange printer repair visits for business and organisational customers. Share your business postcode, printer model and fault so we can confirm local engineer and parts availability before booking.",
    seoTitle: "Business Printer Repair in Liverpool | Office Printer Servicing",
    metaDescription:
      "Independent business printer repair in Liverpool. Office printer diagnosis and maintenance for organisations. Contact us with your postcode to check availability.",
    h1: "Business printer repair in Liverpool",
    intro:
      "Independent printer repair and support for businesses and organisations in Liverpool, with onsite visits arranged across Merseyside and business remote assistance subject to availability.",
  },
  {
    slug: "glasgow",
    city: "Glasgow",
    region: "Scotland",
    nearbyAreas: [
      "Paisley",
      "East Kilbride",
      "Hamilton",
      "Cumbernauld",
      "Motherwell",
      "Clydebank",
    ],
    localContext:
      "We arrange printer repair visits for business and organisational customers. Share your business postcode, printer model and fault so we can confirm local engineer and parts availability before booking.",
    seoTitle: "Business Printer Repair in Glasgow | Office Printer Servicing",
    metaDescription:
      "Independent business printer repair in Glasgow. Office printer diagnosis and maintenance for organisations. Contact us with your postcode to check availability.",
    h1: "Business printer repair in Glasgow",
    intro:
      "Independent printer repair and support for businesses and organisations in Glasgow, with onsite visits arranged across the Central Belt and business remote assistance subject to availability.",
  },
  {
    slug: "bristol",
    city: "Bristol",
    region: "South West England",
    nearbyAreas: [
      "Bath",
      "Weston-super-Mare",
      "Yate",
      "Keynsham",
      "Portishead",
      "Nailsea",
    ],
    localContext:
      "We arrange printer repair visits for business and organisational customers. Share your business postcode, printer model and fault so we can confirm local engineer and parts availability before booking.",
    seoTitle: "Business Printer Repair in Bristol | Office Printer Servicing",
    metaDescription:
      "Independent business printer repair in Bristol. Office printer diagnosis and maintenance for organisations. Contact us with your postcode to check availability.",
    h1: "Business printer repair in Bristol",
    intro:
      "Independent printer repair and support for businesses and organisations in Bristol, with onsite visits arranged across the wider South West and business remote assistance subject to availability.",
  },
  {
    slug: "sheffield",
    city: "Sheffield",
    region: "South Yorkshire",
    nearbyAreas: [
      "Rotherham",
      "Barnsley",
      "Chesterfield",
      "Dronfield",
      "Worksop",
      "Doncaster",
    ],
    localContext:
      "We arrange printer repair visits for business and organisational customers. Share your business postcode, printer model and fault so we can confirm local engineer and parts availability before booking.",
    seoTitle: "Business Printer Repair in Sheffield | Office Printer Servicing",
    metaDescription:
      "Independent business printer repair in Sheffield. Office printer diagnosis and maintenance for organisations. Contact us with your postcode to check availability.",
    h1: "Business printer repair in Sheffield",
    intro:
      "Independent printer repair and support for businesses and organisations in Sheffield, with onsite visits arranged across South Yorkshire and business remote assistance subject to availability.",
  },
  {
    slug: "nottingham",
    city: "Nottingham",
    region: "East Midlands",
    nearbyAreas: [
      "Derby",
      "Mansfield",
      "Loughborough",
      "Ilkeston",
      "Beeston",
      "West Bridgford",
    ],
    localContext:
      "We arrange printer repair visits for business and organisational customers. Share your business postcode, printer model and fault so we can confirm local engineer and parts availability before booking.",
    seoTitle:
      "Business Printer Repair in Nottingham | Office Printer Servicing",
    metaDescription:
      "Independent business printer repair in Nottingham. Office printer diagnosis and maintenance for organisations. Contact us with your postcode to check availability.",
    h1: "Business printer repair in Nottingham",
    intro:
      "Independent printer repair and support for businesses and organisations in Nottingham, with onsite visits arranged across the East Midlands and business remote assistance subject to availability.",
  },
];

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}
