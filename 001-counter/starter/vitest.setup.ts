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

function sendToParent(data) {
  let target: Window = window;
  for (let i = 0; i < 5; i++) {
    try {
      target.postMessage(
        {
          type: "vitest:results",
          payload: data,
          stackblitz: true,
        },
        "*"
      );
    } catch (e) {}

    if (target === window.top) break;
    target = target.parent;
  }
}

afterAll(() => {
  console.log("Results:", results);

  sendToParent(results);
});
