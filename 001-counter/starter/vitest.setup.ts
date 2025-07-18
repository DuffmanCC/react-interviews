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
  try {
    localStorage.setItem("testResults", JSON.stringify(results));
    console.log("Test results saved to localStorage.");
  } catch (e) {
    console.error("Failed to save test results to localStorage:", e);
  }
});
