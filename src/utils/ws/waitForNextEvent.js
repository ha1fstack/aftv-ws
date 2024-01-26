export function waitForNextEvent(ws, event) {
  return new Promise((resolve) => {
    const handler = () => {
      resolve();
      ws.removeEventListener(event, handler);
    };
    ws.on(event, handler);
  });
}
