import { describe, expect, test } from "vitest";
import { SPEAKERS } from "../../data/speakers";
import { expandAppearances } from "./groupSpeakers";

// Counts speakers whose name appears with both a "Por anunciar" entry and
// at least one entry with a real time — these are the ones the merge pass
// drops from the output.
function countTbaScheduledDuplicates(): number {
  const byName = new Map<string, { tba: number; scheduled: number }>();
  for (const s of SPEAKERS) {
    const slot = byName.get(s.name) ?? { tba: 0, scheduled: 0 };
    if (s.time === "Por anunciar") slot.tba += 1;
    else slot.scheduled += 1;
    byName.set(s.name, slot);
  }
  let dropped = 0;
  for (const { tba, scheduled } of byName.values()) {
    if (tba > 0 && scheduled > 0) dropped += tba;
  }
  return dropped;
}

describe("expandAppearances", () => {
  test("returns one appearance per speaker, minus same-name TBA duplicates that merge into a scheduled card", () => {
    const appearances = expandAppearances(SPEAKERS);
    // Gianina has both a confirmed panel slot and a "Por anunciar" entry —
    // those collapse into one card carrying additionalSlot. Nobody else
    // currently has this duplicate shape.
    const tbaDuplicateCount = countTbaScheduledDuplicates();
    expect(appearances).toHaveLength(SPEAKERS.length - tbaDuplicateCount);
  });

  test("Gianina renders as a single card with the TBA slot folded in as additionalSlot", () => {
    const appearances = expandAppearances(SPEAKERS);
    const gianinaAppearances = appearances.filter(
      (a) => a.speaker.name === "Gianina Redondo",
    );
    // Single card after merge.
    expect(gianinaAppearances).toHaveLength(1);
    // The kept card is the scheduled panel slot.
    expect(gianinaAppearances[0].speaker.id).toBe("gianina-redondo-agentes");
    // additionalSlot mirrors the TBA entry's talk + time.
    expect(gianinaAppearances[0].additionalSlot).toEqual({
      talk: "Agentes Autónomos y Dinero Digital",
      time: "Por anunciar",
    });
  });

  test("Karla and José Miguel Zamora keep two cards (both slots have real times — no merge)", () => {
    const appearances = expandAppearances(SPEAKERS);
    const karla = appearances.filter(
      (a) => a.speaker.name === "Karla Córdoba Brenes",
    );
    const jmz = appearances.filter(
      (a) => a.speaker.name === "José Miguel Zamora Barquero",
    );
    expect(karla.length).toBeGreaterThanOrEqual(2);
    expect(jmz.length).toBeGreaterThanOrEqual(2);
    // Neither carries an additionalSlot — the merge rule only fires when
    // one of the slots is "Por anunciar".
    for (const a of [...karla, ...jmz]) {
      expect(a.additionalSlot).toBeUndefined();
    }
  });

  test("solo speakers have no panelContext", () => {
    const appearances = expandAppearances(SPEAKERS);
    const visa = appearances.find(
      (a) => a.speaker.id === "rodrigo-barros-de-paula",
    );
    expect(visa).toBeDefined();
    expect(visa?.panelContext).toBeUndefined();
  });

  test("panelists share a panelContext with the right size, sessionId, and indices", () => {
    const appearances = expandAppearances(SPEAKERS);
    // Perspectivas de Inversión 2026 — 5 panelists, lead is Karla (Moderadora).
    const perspectivasIds = [
      "karla-cordoba-brenes",
      "walter-montes",
      "carlo-blasio",
      "ileana-atan-chan",
      "jose-miguel-alfaro",
    ];
    const panelMembers = perspectivasIds.map((id) => {
      const a = appearances.find((x) => x.speaker.id === id);
      if (!a) throw new Error(`missing ${id}`);
      return a;
    });

    for (const member of panelMembers) {
      expect(member.panelContext).toBeDefined();
      expect(member.panelContext?.sessionId).toBe("perspectivas-inversion-main");
      expect(member.panelContext?.panelSize).toBe(5);
      // Title trims the role suffix (" (Moderadora)") off the lead's talk.
      expect(member.panelContext?.title).not.toMatch(/\(/);
      expect(member.panelContext?.title.length).toBeGreaterThan(0);
    }

    // First panelist (Karla) gets indexInPanel = 0; the rest follow input order.
    expect(panelMembers[0].panelContext?.indexInPanel).toBe(0);
    expect(panelMembers[4].panelContext?.indexInPanel).toBe(4);
  });

  test("panelists are emitted contiguously in output order", () => {
    const appearances = expandAppearances(SPEAKERS);
    const start = appearances.findIndex(
      (a) => a.speaker.id === "karla-cordoba-brenes",
    );
    expect(start).toBeGreaterThanOrEqual(0);
    // The 5 panelists occupy positions [start, start+4].
    const slice = appearances
      .slice(start, start + 5)
      .map((a) => a.speaker.id);
    expect(slice).toEqual([
      "karla-cordoba-brenes",
      "walter-montes",
      "carlo-blasio",
      "ileana-atan-chan",
      "jose-miguel-alfaro",
    ]);
  });

  test("'Por anunciar' speakers each get their own appearance with no panelContext", () => {
    const appearances = expandAppearances(SPEAKERS);
    const tba = appearances.filter(
      (a) => a.speaker.time === "Por anunciar",
    );
    expect(tba.length).toBeGreaterThan(0);
    for (const a of tba) {
      expect(a.panelContext).toBeUndefined();
    }
  });

  test("panel sessionId resolves for every panel session that exists", () => {
    const appearances = expandAppearances(SPEAKERS);
    const panelSessionIds = new Set<string>();
    for (const a of appearances) {
      if (a.panelContext?.sessionId) panelSessionIds.add(a.panelContext.sessionId);
    }
    // 5 known panels: perspectivas, pagos, agentes, panel-fia, ecosistemas-crtw.
    expect(panelSessionIds).toContain("perspectivas-inversion-main");
    expect(panelSessionIds).toContain("pagos-stablecoins-main");
    expect(panelSessionIds).toContain("agentes-autonomos-main");
    expect(panelSessionIds).toContain("panel-fia-ecosistemas-main");
    expect(panelSessionIds).toContain("ecosistemas-crtw-main");
  });
});
