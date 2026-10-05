import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./", import.meta.url)) } },
  // tsconfig usa `jsx: preserve` (Next); en tests se transforma con el runtime automático.
  oxc: { jsx: { runtime: "automatic" } },
  test: { include: ["tests/**/*.test.ts"] },
});
