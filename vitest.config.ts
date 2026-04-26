import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
      "tests/unit/**/*.test.ts",
    ],
    exclude: [
      "node_modules",
      "dist",
      ".next",
      "tests/e2e/**",
      "**/*.e2e.*",
      "**/*.spec.e2e.*",
    ],
  },
});

