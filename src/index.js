import { WebSocket } from "ws";

import { AftvChatClient } from "./client/index.js";
import { decoder } from "./utils/decoder.js";

const aftv = new AftvChatClient();
await aftv.connect("bjid");

aftv.on("open", () => {
  console.log("websocket connection opened");
});

aftv.on("message", (chat, rawData) => {
  console.log("====================================");
  console.log(rawData.byteLength, JSON.stringify(decoder.decode(rawData)));
  console.log(chat);
});

aftv.on("error", (e) => {
  console.error(e);
});

aftv.on("close", (code, reason) => {
  console.log(`Connection closed, code: ${code}, reason: ${reason}`);
});
