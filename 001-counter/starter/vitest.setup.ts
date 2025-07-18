import "@testing-library/jest-dom";

import { afterAll, afterEach } from "vitest";

let ws: WebSocket | null = null;

function connectWS() {
  ws = new WebSocket("wss://5098bf30a793.ngrok-free.app/api/ws");
  ws.onopen = () => console.log("WS conectado");
  ws.onclose = () => console.log("WS desconectado");
  ws.onerror = (e) => console.error("WS error", e);
}

connectWS();

afterEach((test) => {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        type: "test-result",
        name: test.task.name,
        status: test.task.result?.state ?? "unknown",
        timestamp: Date.now(),
      })
    );
  }
});

afterAll(() => {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "tests-finished" }));
    ws.close();
  }
});
