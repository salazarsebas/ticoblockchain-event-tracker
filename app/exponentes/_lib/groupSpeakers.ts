import type { Speaker } from "../../data/types";
import { findSessionByTimeStage } from "../../lib/session-time";

// Each appearance is one speaker. When 2+ speakers share `time + stage`,
// they're treated as panelists on the same session and each carries a
// `panelContext` so the card can render the panel chip + visual band that
// ties the same-session cards together. Solo talks have no panelContext.
//
// This shape replaces the previous solo|panel discriminated union — the
// page still groups panelists adjacently in the output list (the first
// panelist's position determines the cluster's place), but every panelist
// now gets their own card so all faces are visible on mobile.
export type SpeakerAppearance = {
  speaker: Speaker;
  panelContext?: PanelContext;
  // Surfaces a second appearance of the same person whose slot isn't
  // confirmed yet — typically a "Por anunciar" duplicate row in
  // speakers.ts (e.g. a speaker who's on a confirmed panel AND has
  // a separate solo talk pending a time). The card renders this as a
  // small "También:" line so attendees see both engagements without
  // a duplicate card cluttering the lineup. Speakers whose two slots
  // both have real times (Karla, JM Zamora) render as two cards
  // unchanged — each card has its own live status to track.
  additionalSlot?: AdditionalSlot;
};

export type AdditionalSlot = {
  talk: string;
  time: string;
};

export type PanelContext = {
  // Resolved via time+stage lookup against `sessions.ts`. May be undefined
  // when the speaker's time/stage doesn't match any session row — in that
  // case the chip still renders with the panel title but the link points
  // at /agenda without an anchor (graceful degrade).
  sessionId?: string;
  // Display title for the chip — taken from the lead panelist's `talk`
  // field with the trailing role suffix (" (Moderadora)", " (Panel)")
  // stripped, since panelists share that talk topic verbatim.
  title: string;
  panelSize: number;
  // 0-based — the renderer uses this to apply the full-opacity band on
  // the first card of a panel and a faded variant on the rest.
  indexInPanel: number;
};

export function expandAppearances(
  speakers: readonly Speaker[],
): SpeakerAppearance[] {
  // First pass: group by time+stage to find which slots have multiple
  // speakers (i.e. panels).
  type Group = { speakers: Speaker[]; lead: Speaker };
  const groups = new Map<string, Group>();
  const orderedKeys: string[] = [];

  for (const speaker of speakers) {
    // Unscheduled speakers ("Por anunciar") never share a real slot, so
    // each gets its own group keyed by id — no panelContext.
    const key =
      speaker.time === "Por anunciar"
        ? `tba|${speaker.id}`
        : `${speaker.time}|${speaker.stage}`;
    const existing = groups.get(key);
    if (existing) {
      existing.speakers.push(speaker);
    } else {
      groups.set(key, { speakers: [speaker], lead: speaker });
      orderedKeys.push(key);
    }
  }

  // Second pass: emit one appearance per speaker, in original input order
  // but with panelists clustered (first panelist's position wins for the
  // cluster). PanelContext set only when a group has 2+ speakers.
  const result: SpeakerAppearance[] = [];
  for (const key of orderedKeys) {
    const group = groups.get(key)!;
    if (group.speakers.length === 1) {
      result.push({ speaker: group.speakers[0] });
      continue;
    }
    const lead = group.lead;
    const session = findSessionByTimeStage(lead.time, lead.stage);
    const title = lead.talk.replace(/\s*\(.*\)\s*$/, "").trim();
    group.speakers.forEach((speaker, indexInPanel) => {
      result.push({
        speaker,
        panelContext: {
          sessionId: session?.id,
          title,
          panelSize: group.speakers.length,
          indexInPanel,
        },
      });
    });
  }
  return mergeTbaDuplicates(result);
}

// When the same person shows up with both a scheduled slot and a "Por
// anunciar" placeholder (data drift / pending confirmation), collapse
// the duplicate: the TBA entry's talk + time get attached to the
// scheduled appearance as `additionalSlot`, and the standalone TBA
// appearance is dropped. Speakers with only TBA entries, or with
// multiple real-time slots, are left alone.
function mergeTbaDuplicates(
  appearances: SpeakerAppearance[],
): SpeakerAppearance[] {
  const indicesByName = new Map<string, number[]>();
  appearances.forEach((a, i) => {
    const list = indicesByName.get(a.speaker.name);
    if (list) list.push(i);
    else indicesByName.set(a.speaker.name, [i]);
  });

  const dropIdx = new Set<number>();
  for (const indices of indicesByName.values()) {
    if (indices.length < 2) continue;
    const tba = indices.filter(
      (i) => appearances[i].speaker.time === "Por anunciar",
    );
    const scheduled = indices.filter(
      (i) => appearances[i].speaker.time !== "Por anunciar",
    );
    if (tba.length === 0 || scheduled.length === 0) continue;
    const targetIdx = scheduled[0];
    const sourceIdx = tba[0];
    const source = appearances[sourceIdx];
    appearances[targetIdx] = {
      ...appearances[targetIdx],
      additionalSlot: {
        talk: source.speaker.talk,
        time: source.speaker.time,
      },
    };
    for (const i of tba) dropIdx.add(i);
  }

  return appearances.filter((_, i) => !dropIdx.has(i));
}
