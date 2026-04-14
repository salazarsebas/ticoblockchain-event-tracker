"use client";

// Schedules exactly one client-initiated refresh at the next session-status
// boundary, instead of polling on a fixed interval. The server computes the
// next transition moment (talk start or end) and passes it as an ISO string;
// this component sleeps until then, triggers router.refresh(), and unmounts
// itself when the server re-renders (the new `nextTransitionAt` re-runs the
// effect with the next target).
//
// A visibilitychange listener provides a safety net for the one case setTimeout
// doesn't handle cleanly: the tab was backgrounded or the computer slept past
// a transition. On return to visible, we refresh so the UI catches up.

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type LiveRefreshProps = {
  nextTransitionAt: string | null;
  simulated: boolean;
};

export default function LiveRefresh({
  nextTransitionAt,
  simulated,
}: LiveRefreshProps) {
  const router = useRouter();

  useEffect(() => {
    // When QA is time-travelling via ?now=, auto-refresh would loop back to
    // the same frozen moment and mask whatever they're inspecting.
    if (simulated) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (nextTransitionAt) {
      const target = new Date(nextTransitionAt).getTime();
      // 2s buffer past the boundary so the server sees the new minute for sure.
      // Min 1s so a transition that's already passed (stale prop) still fires.
      const delay = Math.max(1_000, target - Date.now() + 2_000);
      timeoutId = setTimeout(() => router.refresh(), delay);
    }

    const onVisible = () => {
      if (document.visibilityState === "visible") router.refresh();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      if (timeoutId !== null) clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [nextTransitionAt, simulated, router]);

  return null;
}
