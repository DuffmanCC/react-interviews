import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

function safeStringify(obj: any, indent = 2) {
  const seen = new WeakSet();
  return JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return "[Circular]";
        }
        seen.add(value);
      }
      return value;
    },
    indent
  );
}

function simplifySuite(suite) {
  return {
    id: suite.id,
    name: suite.name,
    type: suite.type,
    result: suite.result
      ? {
          state: suite.result.state,
          duration: suite.result.duration,
        }
      : undefined,
    tasks: suite.tasks ? suite.tasks.map(simplifySuite) : [],
  };
}

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // necesario para React
    globals: true, // para no importar describe, it, expect
    setupFiles: "./vitest.setup.ts", // para cargar jest-dom manualmente
    reporters: [
      "default",
      "json",
      {
        onFinished(suite) {
          const simpleResult = simplifySuite(suite);
          const json = JSON.stringify(simpleResult, null, 2);
          console.log(json);
        },
      },
    ],
  },
});
