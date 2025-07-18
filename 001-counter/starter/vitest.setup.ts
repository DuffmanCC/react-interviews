import "@testing-library/jest-dom";
import { afterAll, afterEach } from "vitest";
import WebSocket from "ws";

let ws: WebSocket | null = null;

function connectWS() {
  ws = new WebSocket("wss://5098bf30a793.ngrok-free.app/api/ws");
  ws.on("open", () => console.log("WS conectado"));
  ws.on("close", () => console.log("WS desconectado"));
  ws.on("error", (e) => console.error("WS error", e));
}

connectWS();

afterEach((test) => {
  console.log("test", test.task.name, test.task.result?.state);
  console.log("Intentando conectar...");
  if (ws && ws.readyState === ws.OPEN) {
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
  if (ws && ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify({ type: "tests-finished" }));
    ws.close();
  }
});
