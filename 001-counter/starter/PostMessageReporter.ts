import type { Reporter, TestModule } from "vitest/node";

export default class PostMessageReporter implements Reporter {
  async onTestRunEnd(
    testModules: readonly TestModule[],
    unhandledErrors: readonly any[],
    reason: string
  ) {
    try {
      // Armar un objeto con la información relevante
      const results = testModules.map((mod) => mod);

      const payload = {
        type: "vitest:results",
        reason,
        results,
        unhandledErrors,
      };

      // Enviar al contenedor (por ejemplo, Codesandbox o StackBlitz host)
      if (typeof window !== "undefined" && window.top) {
        window.top.postMessage(payload, "*");
      } else {
        console.warn("No window.top available");
      }
    } catch (error) {
      console.error("Error sending postMessage:", error);
    }
  }
}
