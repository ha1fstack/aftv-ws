const decoder = new TextDecoder("utf-8");

export function parsePacket(data) {
  if (data instanceof ArrayBuffer) return parseMessage(data);
  throw new Error("buffer not ArrayBuffer!");
}

function readInt(buffer) {
  return Number(
    new Int8Array(buffer).reduce((a, c) => a + String.fromCharCode(c), 0)
  );
}

function readBody(tail) {
  return decoder.decode(tail).trim().split("\f");
}

function parseMessage(buffer) {
  const head = buffer.slice(0, 14);
  const tail = buffer.slice(14, buffer.byteLength);

  const serviceCode = readInt(head.slice(2, 6));
  const retCode = readInt(head.slice(12, 14));

  const message = {
    serviceCode,
    retCode,
    packet: readBody(tail),
  };

  if (retCode > 0) {
    throw new Error("packet error!");
  }

  return message;
}
