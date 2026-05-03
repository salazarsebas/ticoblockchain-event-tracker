import { VENUE_DIRECTIONS } from "../data/home-content";
import { SPEAKERS } from "../data/speakers";
import { VENUE } from "../data/venue";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ticoblockchain.cr";

// Event window in America/Costa_Rica (UTC-6, no DST). Registration opens at
// 08:00 CRT and the closing cocktail wraps around 20:00 — covering both ends
// generously since Google uses these to power the SERP event card.
const START_ISO = `${VENUE.eventDateISO}T08:00:00-06:00`;
const END_ISO = `${VENUE.eventDateISO}T20:00:00-06:00`;

// Server-rendered JSON-LD for the conference. Emitted as a <script> tag
// inside the home page so Google's Event rich result + AI search engines
// have a canonical, machine-readable description of TicoBlockchain 2026.
//
// Validate at: https://search.google.com/test/rich-results
export default function EventJsonLd() {
  const performers = SPEAKERS.map((speaker) => ({
    "@type": "Person",
    name: speaker.name,
    jobTitle: speaker.org,
    image: speaker.imageUrl,
  }));

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "BusinessEvent",
    name: "TicoBlockchain 2026",
    description:
      "Evento blockchain anual de Costa Rica. Charlas, paneles y workshops sobre Web3, fintech, regulación y RWA en dos escenarios paralelos.",
    startDate: START_ISO,
    endDate: END_ISO,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: "es-CR",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    location: {
      "@type": "Place",
      name: VENUE_DIRECTIONS.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Robledal de La Uruca",
        addressLocality: "San José",
        postalCode: "1150",
        addressRegion: "San José",
        addressCountry: "CR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: VENUE_DIRECTIONS.gps.lat,
        longitude: VENUE_DIRECTIONS.gps.lng,
      },
      hasMap: VENUE.mapsUrl,
    },
    organizer: {
      "@type": "Organization",
      name: "TicoBlockchain",
      url: SITE_URL,
    },
    performer: performers,
  };

  return (
    <script
      type="application/ld+json"
      // Schema is built from typed const data above — no user input, no
      // injection vector. dangerouslySetInnerHTML is the canonical pattern
      // for emitting JSON-LD in Next.js App Router.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }}
    />
  );
}
