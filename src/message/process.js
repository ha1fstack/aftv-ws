import { SVC } from "../const/svc.js";
import { getColor, getFlags } from "./utils.js";

export function processChat(message) {
  switch (message.serviceCode) {
    case SVC.SVC_CHATMESG:
      return processChatMesg(message);
  }
}

function processChatMesg(data) {
  const message = data.packet[0].replace(/\r/gi, "");
  const senderID = data.packet[1];
  const permission = Number(data.packet[3]);
  const chatLang = Number(data.packet[4]);
  const nickname = data.packet[5];
  const flag = data.packet[6];
  const subscriptionMonth =
    data.packet[7] === "-1" ? null : parseInt(data.packet[7]);

  const color = getColor(data.packet[8]);

  switch (permission) {
    case 1:
      return { cmd: "staff", data: { message, nickname } };
    case 2:
      return { cmd: "police", data: { message, nickname } };
    case 3:
    case 0:
    default:
      try {
        const [flag1, flag2] = flag.split("|");

        return {
          cmd: "msg",
          data: {
            senderID,
            nickname,
            message,
            // flag1,
            // flag2,
            // trans,
            // localLang: 3,
            chatLang,
            // familyNickname: this.chatRoom.familyNickname,
            // familyNicknamePos: this.chatRoom.familyNicknamePos,
            color,
            subscriptionMonth,

            // 직접 추가
            flags: getFlags(flag1, flag2),
          },
        };
      } catch (e) {
        return null;
      }
  }
}
