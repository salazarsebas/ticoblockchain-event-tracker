import { defineConfig } from "vitest/config";

// Node env is fine — the tested functions are pure and don't touch the DOM.
// Keeping scope narrow so Next.js files and .next/ are excluded from discovery.
export default defineConfig({
  test: {
    environment: "node",
    include: ["app/**/*.test.ts"],
  },
});
