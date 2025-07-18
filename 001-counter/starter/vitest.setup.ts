import "@testing-library/jest-dom";

import { afterAll, afterEach, expect, vi } from "vitest";

const results: any[] = [];

vi.mock("./reportResults", () => ({
  pushResult: (data: any) => results.push(data),
}));

afterEach(() => {
  const state = expect.getState();
  const currentTestName = state.currentTestName;

  results.push({
    name: currentTestName || "(unknown)",
    status: state.assertionCalls > 0 ? "passed" : "unknown",
    timestamp: Date.now(),
  });
});

afterAll(() => {
  console.log("Results:", results);

  window.parent.postMessage(
    {
      type: "vitest:results",
      payload: results,
    },
    "*"
  );
});
