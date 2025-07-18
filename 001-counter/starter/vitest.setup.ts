import "@testing-library/jest-dom";

import { afterAll, afterEach } from "vitest";

const results: any[] = [];

afterEach((test) => {
  results.push({
    name: test.task.name,
    status: test.task.result?.state ?? "unknown", // 'passed' | 'failed' | etc.
    // errors: test.task.result?.errors?.map((e) => e.message),
    timestamp: Date.now(),
  });
});

afterAll(() => {
  console.log("Results:", results);

  const targetWindow = window.parent.parent || window.parent || window;

  targetWindow.postMessage(
    {
      type: "vitest:results",
      source: "stackblitz-iframe", // Identificador único
      payload: results,
    },
    "*" // En producción, reemplazar con el dominio específico
  );
});
