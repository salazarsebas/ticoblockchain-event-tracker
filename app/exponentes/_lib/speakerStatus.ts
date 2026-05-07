import { getSessionsAt } from "../../lib/session-time";
import type { Speaker } from "../../data/types";

// Each speaker's live status is derived from the agenda session at the
// matching time + stage, so the speakers page reflects the same live state
// as the agenda. If no matching session exists (speaker time is "Por
// anunciar", or the session row hasn't been added to sessions.ts yet),
// the speaker keeps its literal `status` field as a fallback.
//
// Match rule: speaker.time === session.time AND
// (speaker.stage === session.stage OR session.stage === "both").
// "both"-stage sessions (ceremonies, joint keynotes) light up speakers on
// either physical stage at that moment.
export function applyLiveStatus(
  speakers: readonly Speaker[],
  now: Date,
): Speaker[] {
  const sessions = getSessionsAt(now);
  return speakers.map((speaker) => {
    const match = sessions.find(
      (session) =>
        session.time === speaker.time &&
        (session.stage === speaker.stage || session.stage === "both"),
    );
    return match ? { ...speaker, status: match.status } : speaker;
  });
}
