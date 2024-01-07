import { processChat } from "../message/process.js";
import { parsePacket } from "../packet/parse.js";
import { AftvChatClientSession } from "./session.js";

export class AftvChatClient {
  constructor(session = new AftvChatClientSession()) {
    this.session = session;
  }

  async connect(BJID, credential) {
    return await this.session.connect(BJID, credential);
  }

  async close() {
    this.session.client.close();
  }

  async readyState() {
    return this.session.client.readyState;
  }

  async isConnected() {
    return this.readyState === WebSocket.OPEN;
  }

  on(event, callback) {
    switch (event) {
      case "message":
        return this.session.client.on("message", (rawData) => {
          try {
            const message = parsePacket(rawData);
            const chat = processChat(message);

            callback(chat, rawData);
          } catch (e) {
            console.error(e);
          }
        });
      default:
        return this.session.client.on(event, callback);
    }
  }
}
