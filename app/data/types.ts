// Shared data types for sessions, speakers, and event content.
// Used by home, agenda, and exponentes pages.

export type SessionStatus = "past" | "live" | "next" | "scheduled";

export type Session = {
  id: string;
  time: string; // "10:30" or "10:00 — 10:45"
  title: string;
  speakerName?: string;
  speakerOrg?: string;
  room: string; // always "SALA GRECO" for this event
  status: SessionStatus;
};

export type Speaker = {
  id: string;
  name: string;
  org: string;
  talk: string;
  time: string;
  room: string;
  status: SessionStatus;
  imageUrl: string;
};

export type BentoHighlight = {
  id: string;
  kind: "recap" | "stats" | "gallery" | "location";
  label: string;
  title?: string;
  body?: string;
  statValue?: string;
  statLabel?: string;
  imageUrl?: string;
  imageAlt?: string;
};
